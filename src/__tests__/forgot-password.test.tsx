import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ForgotPasswordForm from "@/components/ui/forgot-password-form";

const response = (status = 200) =>
  new Response(JSON.stringify({ message: status === 200 ? "Request received" : "Service unavailable" }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function renderForm() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false, gcTime: 0 } },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <ForgotPasswordForm />
    </QueryClientProvider>,
  );
}

describe("forgot password", () => {
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it("validates the email before requesting a reset", async () => {
    renderForm();
    fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
      target: { value: "not-an-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid email");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("waits for the API and shows a generic confirmation without disclosing account existence", async () => {
    let finishRequest!: (value: Response) => void;
    fetchMock.mockImplementation(() => new Promise(resolve => { finishRequest = resolve; }));
    renderForm();
    fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
      target: { value: "  person@example.com  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "Sending..." }).closest("form")!);
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    expect(screen.queryByRole("heading", { name: "Check your email" })).not.toBeInTheDocument();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toEqual(expect.stringMatching(/\/api\/users\/forgot-password$/));
    expect(options?.method).toBe("POST");
    expect(JSON.parse(options?.body as string)).toEqual({ email: "person@example.com" });

    await act(async () => finishRequest(response()));
    expect(await screen.findByRole("heading", { name: "Check your email" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("If an active account exists");
    expect(screen.getByRole("link", { name: "Back to login" })).toHaveAttribute("href", "/login");
  });

  it("shows failed requests as errors and allows a retry", async () => {
    fetchMock.mockResolvedValueOnce(response(503)).mockResolvedValueOnce(response());
    renderForm();
    fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
      target: { value: "person@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn't send a reset link");
    expect(screen.queryByRole("heading", { name: "Check your email" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    expect(await screen.findByRole("heading", { name: "Check your email" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
