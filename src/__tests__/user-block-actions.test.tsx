import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import UsersPage from "@/app/(superadmin)/management/list-of-users/page";

const user = {
  id: "42",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  role: "VOLUNTEER",
  createdAt: "2026-01-01T00:00:00.000Z",
};

function jsonResponse(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function renderUsers() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false, gcTime: 0 },
    },
  });
  render(<QueryClientProvider client={client}><UsersPage /></QueryClientProvider>);
}

async function chooseAction(name: "Block user" | "Unblock user") {
  const trigger = await screen.findByRole("button", { name: "Open actions for Test User" });
  fireEvent.keyDown(trigger, { key: "ArrowDown" });
  fireEvent.click(await screen.findByRole("menuitem", { name }));
  return screen.findByRole("dialog");
}

describe("blocking and unblocking users", () => {
  let isActive: boolean;
  let updateStatus: (active: boolean) => Promise<Response>;
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(() => {
    isActive = true;
    updateStatus = async (active) => {
      isActive = active;
      return jsonResponse({ ...user, is_active: isActive });
    };
    fetchMock = vi.fn<typeof fetch>().mockImplementation(async (url, options) => {
      if (options?.method === "GET" && /\/api\/users\?/.test(String(url))) {
        return jsonResponse({ data: [{ ...user, is_active: isActive }] });
      }
      if (options?.method === "PATCH" && /\/api\/users\/42\/status$/.test(String(url))) {
        const body = JSON.parse(options.body as string);
        return updateStatus(body.isActive);
      }
      throw new Error("Unexpected API request in user-action test");
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  const statusCalls = () => fetchMock.mock.calls.filter(([, options]) => options?.method === "PATCH");

  it("requires confirmation and refreshes the blocked value after blocking and unblocking", async () => {
    renderUsers();
    await chooseAction("Block user");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(statusCalls()).toHaveLength(0);

    await chooseAction("Block user");
    fireEvent.click(screen.getByRole("button", { name: "Block" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(within(screen.getByRole("row", { name: /Test User/ })).getByText("Yes")).toBeInTheDocument();

    await chooseAction("Unblock user");
    fireEvent.click(screen.getByRole("button", { name: "Unblock" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(within(screen.getByRole("row", { name: /Test User/ })).getByText("No")).toBeInTheDocument();
    expect(statusCalls().map(([, options]) => JSON.parse(options?.body as string))).toEqual([
      { isActive: false },
      { isActive: true },
    ]);
  });

  it("keeps unblocking pending until the request finishes and allows retry after an error", async () => {
    isActive = false;
    let finishRequest!: (response: Response) => void;
    updateStatus = () => new Promise(resolve => { finishRequest = resolve; });
    renderUsers();
    const dialog = await chooseAction("Unblock user");
    fireEvent.click(screen.getByRole("button", { name: "Unblock" }));

    const pendingButton = await screen.findByRole("button", { name: "Unblocking..." });
    expect(pendingButton).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    fireEvent.click(pendingButton);
    fireEvent.keyDown(dialog, { key: "Escape" });
    fireEvent.click(dialog);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(statusCalls()).toHaveLength(1);

    await act(async () => finishRequest(jsonResponse({ message: "Status update failed" }, 500)));
    expect(await screen.findByRole("alert")).toHaveTextContent("Status update failed");
    expect(within(screen.getByRole("row", { name: /Test User/ })).getByText("Yes")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Unblock" })).toBeEnabled();

    updateStatus = async (active) => {
      isActive = active;
      return jsonResponse({ ...user, is_active: active });
    };
    fireEvent.click(screen.getByRole("button", { name: "Unblock" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(within(screen.getByRole("row", { name: /Test User/ })).getByText("No")).toBeInTheDocument();
    expect(statusCalls()).toHaveLength(2);
  });
});
