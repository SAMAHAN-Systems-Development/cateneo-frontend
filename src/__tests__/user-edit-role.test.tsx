import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import UsersPage from "@/app/(superadmin)/management/list-of-users/page";

const { router } = vi.hoisted(() => ({ router: { replace: vi.fn() } }));

vi.mock("next/navigation", () => ({ useRouter: () => router }));

const user = {
  id: "42",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  is_active: true,
  createdAt: "2026-01-01T00:00:00.000Z",
};

function jsonResponse(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type CachedProfile = Omit<typeof user, "id"> & { id: string | number; role: string };

function renderUsers(profile?: CachedProfile) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false, gcTime: 0 },
    },
  });
  if (profile) {
    client.setQueryDefaults(["get-my-profile"], { gcTime: Infinity });
    client.setQueryDefaults(["currentUser"], { gcTime: Infinity });
    client.setQueryData(["get-my-profile"], profile);
    client.setQueryData(["currentUser"], {
      user: {
        id: profile.id,
        role: profile.role,
        fullName: `${profile.firstName} ${profile.lastName}`,
      },
    });
  }
  render(<QueryClientProvider client={client}><UsersPage /></QueryClientProvider>);
  return client;
}

async function openEditRole() {
  const trigger = await screen.findByRole("button", { name: "Open actions for Test User" });
  fireEvent.keyDown(trigger, { key: "ArrowDown" });
  fireEvent.click(await screen.findByRole("menuitem", { name: "Edit role" }));
  return screen.findByRole("dialog", { name: "Edit role for Test User" });
}

async function chooseRole(role: "Volunteer" | "SuperAdmin") {
  const dialog = await openEditRole();
  const trigger = within(dialog).getByRole("combobox", { name: "Role" });
  fireEvent.keyDown(trigger, { key: "ArrowDown" });
  const listbox = await screen.findByRole("listbox");
  const label = role === "SuperAdmin" ? "Superadmin" : "Volunteer";
  const option = within(listbox).getByRole("option", { name: label });
  fireEvent.keyDown(listbox, { key: role === "SuperAdmin" ? "End" : "Home" });
  await waitFor(() => expect(option).toHaveFocus());
  fireEvent.keyDown(option, { key: "Enter" });
  await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  expect(trigger).toHaveTextContent(label);
  fireEvent.click(within(dialog).getByRole("button", { name: "Continue" }));
  return screen.findByRole("dialog", { name: "Confirm role change for Test User" });
}

describe("editing user roles", () => {
  let savedRole: string;
  let updateRole: (role: string) => Promise<Response>;
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(() => {
    router.replace.mockReset();
    savedRole = "Volunteer";
    updateRole = async (role) => {
      savedRole = role;
      return jsonResponse({ ...user, role: savedRole });
    };
    fetchMock = vi.fn<typeof fetch>().mockImplementation(async (url, options) => {
      if (options?.method === "GET" && /\/api\/users\?/.test(String(url))) {
        return jsonResponse({ data: [{ ...user, role: savedRole }] });
      }
      if (options?.method === "PATCH" && /\/api\/users\/42$/.test(String(url))) {
        const body = JSON.parse(options.body as string);
        return updateRole(body.role);
      }
      throw new Error("Unexpected API request in edit-role test");
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  const roleCalls = () => fetchMock.mock.calls.filter(([, options]) => options?.method === "PATCH");

  it.each([
    ["Volunteer", "Volunteer"],
    ["SuperAdmin", "Superadmin"],
    ["VOLUNTEER", "Volunteer"],
    ["SUPERADMIN", "Superadmin"],
  ])("opens the editor with the saved %s role selected", async (apiRole, label) => {
    savedRole = apiRole;
    renderUsers();
    const dialog = await openEditRole();
    const select = within(dialog).getByRole("combobox", { name: "Role" });

    expect(select).toHaveTextContent(label);
    expect(within(dialog).getByText(`Current role: ${label}`)).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Continue" })).toBeDisabled();

    fireEvent.keyDown(select, { key: "ArrowDown" });
    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getAllByRole("option")).toHaveLength(2);
    const selectedOption = within(listbox).getByRole("option", { name: label });
    await waitFor(() => expect(selectedOption).toHaveAttribute("aria-selected", "true"));
    expect(within(listbox).getByRole("option", {
      name: label === "Volunteer" ? "Superadmin" : "Volunteer",
    })).toHaveAttribute("aria-selected", "false");

    fireEvent.keyDown(selectedOption, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(screen.getByRole("dialog", { name: "Edit role for Test User" })).toBeInTheDocument();
    expect(select).toHaveTextContent(label);
    fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(roleCalls()).toHaveLength(0);
  });

  it("requires confirmation and sends no update when a role change is cancelled", async () => {
    renderUsers();
    const confirmation = await chooseRole("SuperAdmin");
    expect(within(confirmation).getByText(/Test User's role to Superadmin/)).toBeInTheDocument();
    expect(roleCalls()).toHaveLength(0);

    fireEvent.click(within(confirmation).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog", { name: "Confirm role change for Test User" })).not.toBeInTheDocument();
    expect(roleCalls()).toHaveLength(0);
    expect(within(screen.getByRole("row", { name: /Test User/ })).getByText("Volunteer")).toBeInTheDocument();
  });

  it.each([
    ["Volunteer", "SuperAdmin", "Superadmin"],
    ["SuperAdmin", "Volunteer", "Volunteer"],
  ] as const)("saves a change from %s to %s and refreshes the table", async (currentRole, nextRole, nextLabel) => {
    savedRole = currentRole;
    const operator = {
      ...user,
      id: "7",
      firstName: "Other",
      lastName: "Admin",
      email: "admin@example.com",
      role: "SuperAdmin",
    };
    const client = renderUsers(operator);
    const confirmation = await chooseRole(nextRole);
    expect(roleCalls()).toHaveLength(0);
    fireEvent.click(within(confirmation).getByRole("button", { name: "Confirm" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(roleCalls()).toHaveLength(1);
    const [url, options] = roleCalls()[0];
    expect(String(url)).toMatch(/\/api\/users\/42$/);
    expect(options?.credentials).toBe("include");
    expect(JSON.parse(options?.body as string)).toEqual({ role: nextRole });
    expect(within(screen.getByRole("row", { name: /Test User/ })).getByText(nextLabel)).toBeInTheDocument();
    expect(fetchMock.mock.calls.filter(([, request]) => request?.method === "GET").length).toBeGreaterThanOrEqual(2);
    expect(router.replace).not.toHaveBeenCalled();
    expect(client.getQueryData(["get-my-profile"])).toEqual(operator);
    expect(client.getQueryData(["currentUser"])).toEqual({
      user: { id: "7", role: "SuperAdmin", fullName: "Other Admin" },
    });

    const reopenedDialog = await openEditRole();
    expect(within(reopenedDialog).getByRole("combobox", { name: "Role" })).toHaveTextContent(nextLabel);
    expect(within(reopenedDialog).getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("updates the signed-in user's caches and leaves management after self-demotion without refetching users", async () => {
    savedRole = "SuperAdmin";
    const client = renderUsers({ ...user, id: 42, role: "SuperAdmin" });
    const confirmation = await chooseRole("Volunteer");
    fireEvent.click(within(confirmation).getByRole("button", { name: "Confirm" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(roleCalls()).toHaveLength(1);
    expect(JSON.parse(roleCalls()[0][1]?.body as string)).toEqual({ role: "Volunteer" });
    expect(router.replace).toHaveBeenCalledTimes(1);
    expect(router.replace).toHaveBeenCalledWith("/dashboard/cateneans");
    expect(client.getQueryData(["get-my-profile"])).toMatchObject({
      role: "Volunteer",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
    });
    expect(client.getQueryData(["currentUser"])).toEqual({
      user: { id: 42, role: "Volunteer", fullName: "Test User" },
    });
    const patchIndex = fetchMock.mock.calls.findIndex(([, options]) => options?.method === "PATCH");
    expect(fetchMock.mock.calls.slice(patchIndex + 1).filter(([url, options]) =>
      options?.method === "GET" && /\/api\/users\?/.test(String(url)),
    )).toHaveLength(0);
  });

  it("prevents duplicate saves and dismissal while pending, then shows errors and permits retry", async () => {
    let finishRequest!: (response: Response) => void;
    updateRole = () => new Promise(resolve => { finishRequest = resolve; });
    renderUsers();
    const dialog = await chooseRole("SuperAdmin");
    const confirm = within(dialog).getByRole("button", { name: "Confirm" });

    act(() => {
      fireEvent.click(confirm);
      fireEvent.click(confirm);
    });
    const pendingButton = await screen.findByRole("button", { name: "Saving..." });
    expect(pendingButton).toBeDisabled();
    expect(within(dialog).getByRole("button", { name: "Cancel" })).toBeDisabled();
    fireEvent.click(pendingButton);
    fireEvent.keyDown(dialog, { key: "Escape" });
    fireEvent.click(dialog);
    expect(screen.getByRole("dialog", { name: "Confirm role change for Test User" })).toBeInTheDocument();
    expect(roleCalls()).toHaveLength(1);

    await act(async () => finishRequest(jsonResponse({ message: "Role update failed" }, 500)));
    expect(await screen.findByRole("alert")).toHaveTextContent("Role update failed");
    expect(within(screen.getByRole("row", { name: /Test User/ })).getByText("Volunteer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeEnabled();

    updateRole = async (role) => {
      savedRole = role;
      return jsonResponse({ ...user, role: savedRole });
    };
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(within(screen.getByRole("row", { name: /Test User/ })).getByText("Superadmin")).toBeInTheDocument();
    expect(roleCalls()).toHaveLength(2);
    expect(roleCalls().map(([, options]) => JSON.parse(options?.body as string))).toEqual([
      { role: "SuperAdmin" },
      { role: "SuperAdmin" },
    ]);
  });
});
