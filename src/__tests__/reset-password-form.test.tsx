import { StrictMode } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ResetPasswordForm from "@/components/ui/reset-password-form";

const { mutateAsync, reset } = vi.hoisted(() => ({
  mutateAsync: vi.fn<(payload: { token: string; newPassword: string }) => Promise<{ message: string }>>(),
  reset: vi.fn(),
}));

vi.mock("@/client/mutations/auth-mutations", () => ({
  useResetPassword: () => ({ mutateAsync, reset, isPending: false }),
}));

const token = "a".repeat(64);
const password = "NewPassword!234";

function enterPasswords(confirmPassword = password) {
  fireEvent.change(screen.getByLabelText("New password"), {
    target: { value: password },
  });
  fireEvent.change(screen.getByLabelText("Confirm password"), {
    target: { value: confirmPassword },
  });
}

describe("password reset form", () => {
  beforeEach(() => {
    mutateAsync.mockReset().mockResolvedValue({ message: "Password reset successfully." });
    reset.mockReset();
    window.history.replaceState({}, "", `/reset-password#token=${token}`);
  });

  afterEach(() => {
    cleanup();
    window.history.replaceState({}, "", "/");
  });

  it.each([
    ["missing", "/reset-password"],
    ["malformed", "/reset-password#token=invalid"],
    ["query-only", `/reset-password?token=${token}`],
  ])("offers a new link for a %s fragment token", (_reason, path) => {
    window.history.replaceState({}, "", path);
    render(<ResetPasswordForm />);

    expect(screen.getByRole("alert")).toHaveTextContent("missing or invalid");
    expect(screen.getByRole("link", { name: "Request a new reset link" })).toHaveAttribute(
      "href",
      "/forgot-password",
    );
    expect(screen.queryByLabelText("New password")).not.toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("uses the email fragment token, preserves it for refresh, and returns to login after success", async () => {
    render(<StrictMode><ResetPasswordForm /></StrictMode>);
    expect(window.location.hash).toBe(`#token=${token}`);
    expect(screen.getByLabelText("New password")).toHaveAttribute("autocomplete", "new-password");
    enterPasswords();
    fireEvent.click(screen.getByRole("button", { name: "Reset password" }));

    await waitFor(() => expect(mutateAsync).toHaveBeenCalledExactlyOnceWith({ token, newPassword: password }));
    expect(await screen.findByRole("status")).toHaveTextContent("Your password has been updated");
    expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute("href", "/login");
    expect(screen.queryByLabelText("New password")).not.toBeInTheDocument();
  });

  it("does not send mismatched passwords", async () => {
    render(<ResetPasswordForm />);
    enterPasswords("DifferentPassword!234");
    fireEvent.click(screen.getByRole("button", { name: "Reset password" }));

    expect(await screen.findByText("Passwords do not match")).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("prevents another request while a password reset is pending", async () => {
    let finishReset!: (value: { message: string }) => void;
    mutateAsync.mockImplementation(() => new Promise((resolve) => { finishReset = resolve; }));
    render(<ResetPasswordForm />);
    enterPasswords();
    const button = screen.getByRole("button", { name: "Reset password" });
    fireEvent.click(button);

    await waitFor(() => expect(button).toBeDisabled());
    expect(screen.getByLabelText("New password")).toBeDisabled();
    fireEvent.submit(button.closest("form")!);
    await act(async () => { await Promise.resolve(); });
    expect(mutateAsync).toHaveBeenCalledOnce();

    await act(async () => { finishReset({ message: "Password reset successfully." }); });
    expect(await screen.findByRole("status")).toHaveTextContent("Your password has been updated");
  });

  it("replaces an expired or used link with a way to request another", async () => {
    mutateAsync.mockRejectedValue(new Error("Invalid or expired password reset link"));
    render(<ResetPasswordForm />);
    enterPasswords();
    fireEvent.click(screen.getByRole("button", { name: "Reset password" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("expired or has already been used");
    expect(screen.queryByLabelText("New password")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Request a new reset link" })).toHaveAttribute("href", "/forgot-password");
  });

  it("keeps the form available when the server rejects the current password", async () => {
    mutateAsync.mockRejectedValue(new Error("New password cannot be the same as your current password."));
    render(<ResetPasswordForm />);
    enterPasswords();
    fireEvent.click(screen.getByRole("button", { name: "Reset password" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("different from your current password");
    expect(screen.getByRole("button", { name: "Reset password" })).toBeEnabled();
    expect(screen.getByLabelText("New password")).toBeInTheDocument();
  });

  it("clears the previous form state and uses the new token when another email link changes the fragment", async () => {
    mutateAsync.mockRejectedValueOnce(new Error("New password cannot be the same as your current password."));
    render(<ResetPasswordForm />);
    enterPasswords();
    fireEvent.click(screen.getByRole("button", { name: "Reset password" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("different from your current password");

    const nextToken = "b".repeat(64);
    act(() => {
      window.history.replaceState({}, "", `/reset-password#token=${nextToken}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByLabelText("New password")).toHaveValue("");
    expect(screen.getByLabelText("Confirm password")).toHaveValue("");
    enterPasswords();
    fireEvent.click(screen.getByRole("button", { name: "Reset password" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Your password has been updated");
    expect(mutateAsync).toHaveBeenLastCalledWith({ token: nextToken, newPassword: password });
    expect(mutateAsync).toHaveBeenCalledTimes(2);
  });
});
