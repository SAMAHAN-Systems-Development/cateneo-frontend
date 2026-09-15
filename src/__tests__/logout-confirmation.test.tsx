import type { ImgHTMLAttributes } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SuperAdminNavigationBar from "@/components/ui/superadmin-navigation-bar";

const { logout, replace, logoutState } = vi.hoisted(() => ({
  logout: vi.fn<() => Promise<void>>(),
  replace: vi.fn(),
  logoutState: { isPending: false },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/cateneans",
  useRouter: () => ({ replace }),
}));

vi.mock("next/dynamic", () => ({ default: () => () => null }));
vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt ?? ""} />
  ),
}));

vi.mock("@/client/queries/user-queries", () => ({
  useGetMyProfile: () => ({ data: { role: "VOLUNTEER" } }),
}));

vi.mock("@/client/mutations/auth-mutations", () => ({
  useCreateUser: () => ({ mutateAsync: vi.fn() }),
  useLogout: () => ({ mutateAsync: logout, isPending: logoutState.isPending }),
}));

describe("logout confirmation", () => {
  beforeEach(() => {
    logout.mockReset().mockResolvedValue(undefined);
    replace.mockReset();
    logoutState.isPending = false;
  });

  it("keeps the session when desktop logout is cancelled or dismissed", () => {
    render(<SuperAdminNavigationBar />);

    for (const dismiss of ["cancel", "escape", "backdrop"]) {
      fireEvent.click(screen.getByRole("button", { name: "Logout" }));
      const dialog = screen.getByRole("dialog", {
        name: "Are you sure you want to log out?",
      });
      expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
      expect(logout).not.toHaveBeenCalled();

      if (dismiss === "cancel") {
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
      } else if (dismiss === "escape") {
        fireEvent.keyDown(window, { key: "Escape" });
      } else {
        fireEvent.click(dialog);
      }

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(logout).not.toHaveBeenCalled();
      expect(replace).not.toHaveBeenCalled();
    }
  });

  it("opens the same confirmation from the mobile menu", () => {
    render(<SuperAdminNavigationBar />);
    fireEvent.click(
      screen.getByRole("button", { name: "Open admin navigation menu" }),
    );
    const logoutButtons = screen.getAllByRole("button", { name: "Logout" });
    fireEvent.click(logoutButtons[logoutButtons.length - 1]);

    expect(
      screen.getByRole("dialog", {
        name: "Are you sure you want to log out?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Close admin navigation menu" }),
    ).not.toBeInTheDocument();
    expect(logout).not.toHaveBeenCalled();
  });

  it("logs out only after confirmation and waits before redirecting", async () => {
    let finishLogout!: () => void;
    logout.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          finishLogout = resolve;
        }),
    );
    const { rerender } = render(<SuperAdminNavigationBar />);
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(logout).toHaveBeenCalledOnce();
    expect(replace).not.toHaveBeenCalled();
    logoutState.isPending = true;
    rerender(<SuperAdminNavigationBar />);

    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    for (const button of screen.getAllByRole("button", {
      name: "Logging out...",
    })) {
      expect(button).toBeDisabled();
      fireEvent.click(button);
    }
    fireEvent.keyDown(window, { key: "Escape" });
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(logout).toHaveBeenCalledOnce();

    await act(async () => finishLogout());
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login"));
  });
});
