import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TabButton from "../components/ui/tab-button";

describe("TabButton", () => {
  it("renders the title correctly", () => {
    render(<TabButton title="button" />);

    const btn = screen.getByRole("button", {
      name: "button",
    });

    expect(btn).toBeInTheDocument();
  });

  it("renders without a title", () => {
    render(<TabButton />);

    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
  });

  it("calls tabChange when clicked", () => {
    const mockTabChange = vi.fn();
    render(<TabButton title="button" tabChange={mockTabChange} />);

    fireEvent.click(screen.getByRole("button", { name: "button" }));

    expect(mockTabChange).toHaveBeenCalledTimes(1);
  });

  it("applies rounded-t-full for the half-circle shape", () => {
    render(<TabButton title="button" />);

    const btn = screen.getByRole("button", { name: "button" });

    expect(btn).toHaveClass("rounded-t-full");
  });

  it("applies the correct color variant", () => {
    render(<TabButton title="button" color="darkBrown" />);

    const btn = screen.getByRole("button", { name: "button" });

    expect(btn).toHaveClass("bg-[#2C1A0E]");
  });
});