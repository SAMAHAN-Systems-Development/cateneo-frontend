import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TestComponent from "../components/ui/test-component";

describe("TestComponent", () => {
  it("renders the name correctly", () => {
    render(<TestComponent name="Hanz" />);

    const heading = screen.getByRole("heading", {
      name: "Hello Hanz",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders the button", () => {
    render(<TestComponent name="Hanz" />);

    const button = screen.getByRole("button", {
      name: "Click Me",
    });

    expect(button).toBeInTheDocument();
  });
});
