import type { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import KitteneansPage from "@/app/(superadmin)/dashboard/kitteneans/page";
import CrossedTheRainbowPage from "@/app/(superadmin)/dashboard/crossed-the-rainbow/page";
import type { CatParentRelations } from "@/client/service/catenean-service";
import CatDirectorySection from "@/components/sections/cat-directory-section";

const { useGetAllCats } = vi.hoisted(() => ({ useGetAllCats: vi.fn() }));

vi.mock("@/client/queries/cat-queries", () => ({
  useGetAllCats,
  useGetEligbleMothers: () => ({ data: [] }),
  useGetEligbleFathers: () => ({ data: [] }),
}));

vi.mock("@/client/mutations/cat-mutations", () => ({
  useAdminDeleteCat: () => ({ mutateAsync: vi.fn() }),
  useAdminUpdateCat: () => ({ mutateAsync: vi.fn() }),
  useAdminUpdateCatStatus: () => ({ mutateAsync: vi.fn() }),
}));

vi.mock("@/components/sections/dashboard-category-shell", () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

const setReturnedParents = (parents: CatParentRelations) => {
  useGetAllCats.mockReturnValue({
    data: {
      data: [
        {
          id: 1,
          name: "Miming",
          sex: "Male",
          dob: "2026-06-01",
          classification: "KITTENean",
          status: "Available",
          currentLocation: "MEZZANINE_FLOOR",
          imageUrl: "/images/cat-placeholder.png",
          colors: ["Orange"],
          personality: "Friendly",
          reproductiveStatus: "Neutered",
          vitamins: ["LCVit"],
          ...parents,
        },
      ],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    },
    isLoading: false,
    isFetching: false,
    isError: false,
  });
};

describe("kitten parent names from refreshed cat data", () => {
  it.each([
    ["public directory", CatDirectorySection],
    ["Kitteneans dashboard", KitteneansPage],
    ["Crossed the Rainbow", CrossedTheRainbowPage],
  ] as const)("updates the %s card when its saved parents change", (view, Page) => {
    setReturnedParents({
      mother: { id: 2, name: "Peddy" },
      father: { id: 3, name: "Iggy" },
    });
    const { rerender } = render(<Page />);
    if (view === "public directory") {
      fireEvent.click(screen.getByRole("button", { name: "Kitteneans" }));
    }

    expect(screen.getByTitle("Peddy, Iggy")).toHaveTextContent("Peddy, Iggy");

    setReturnedParents({
      mother: { id: 4, name: "New Mother" },
      father: { id: 5, name: "New Father" },
    });
    rerender(<Page />);
    expect(screen.getByTitle("New Mother, New Father")).toHaveTextContent(
      "New Mother, New Father",
    );
    expect(screen.queryByTitle("Peddy, Iggy")).not.toBeInTheDocument();

    setReturnedParents({ mother: { id: 4, name: "New Mother" }, father: null });
    rerender(<Page />);
    expect(screen.getByTitle("New Mother")).toHaveTextContent("New Mother");

    setReturnedParents({ mother: null, father: { id: 5, name: "New Father" } });
    rerender(<Page />);
    expect(screen.getByTitle("New Father")).toHaveTextContent("New Father");

    setReturnedParents({ mother: null, father: null });
    rerender(<Page />);
    expect(screen.getByTitle("N/A")).toHaveTextContent("N/A");
  });
});
