import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TabButton from "../components/ui/tab-button";

describe("TabButton", () => {
  it("renders the title", () => {
    render(<TabButton title="Tab 1" />);
    expect(screen.getByRole("button", { name: "Tab 1" })).toBeInTheDocument();
  });

  it("calls tabChange when clicked", () => {
    const handleClick = vi.fn();
    render(<TabButton title="Tab 1" tabChange={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Tab 1" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with color orange", () => {
    render(<TabButton title="Tab 1" color="orange" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with color lightbrown", () => {
    render(<TabButton title="Tab 1" color="lightbrown" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with color darkbrown", () => {
    render(<TabButton title="Tab 1" color="darkbrown" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders all styles without crashing", () => {
    const styles = [
      "filled",
      "filledOutline",
      "invertedLight",
      "filledDark",
      "filledDarkOutline",
      "invertedDark",
    ] as const;
    styles.forEach((style) => {
      const { unmount } = render(<TabButton title="Tab 1" style={style} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
      unmount();
    });
  });
});
