import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormErrorPopup } from "../app/(superadmin)/management/add-new-cat/form-error-popup";

describe("FormErrorPopup", () => {
  it("renders nothing when errorMessage is null", () => {
    const handleClose = vi.fn();
    const { container } = render(
      <FormErrorPopup errorMessage={null} onClose={handleClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders the error message and title when errorMessage is provided", () => {
    const handleClose = vi.fn();
    render(
      <FormErrorPopup errorMessage="Server returned a 500 error" onClose={handleClose} />
    );

    expect(screen.getByText("Submission Error")).toBeInTheDocument();
    expect(screen.getByText("Server returned a 500 error")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <FormErrorPopup errorMessage="Invalid format" onClose={handleClose} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the backdrop is clicked", () => {
    const handleClose = vi.fn();
    render(
      <FormErrorPopup errorMessage="Something went wrong" onClose={handleClose} />
    );

    // The overlay is the root element of the rendered component
    const overlay = screen.getByRole("dialog");
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when the inner modal card is clicked", () => {
    const handleClose = vi.fn();
    render(
      <FormErrorPopup errorMessage="Network timeout" onClose={handleClose} />
    );

    const titleElement = screen.getByText("Submission Error");
    fireEvent.click(titleElement);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("calls onClose when the Escape key is pressed", () => {
    const handleClose = vi.fn();
    render(
      <FormErrorPopup errorMessage="Database error" onClose={handleClose} />
    );

    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
