import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import EditCatForm, {
  type EditCatInitialData,
} from "@/components/ui/edit-cat-form";
import {
  mapEditFormDataToUpdateCatDTO,
  mapRawCatToEditInitialData,
} from "@/lib/cat-form-mappers";
import type { EditCatFormData } from "@/schemas/edit-cat-form-schema";

vi.mock("@/client/queries/cat-queries", () => ({
  useGetEligbleMothers: () => ({ data: [] }),
  useGetEligbleFathers: () => ({ data: [] }),
}));

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

const cat: EditCatInitialData = {
  id: 1,
  name: "Miming",
  sex: "Male",
  classification: "CATenean",
  dob: "2020-01-01",
  status: "Available",
  currentLocation: "MEZZANINE_FLOOR",
  vitamins: ["Nematocide", "LCVit"],
  healthStatus: ["Neutered"],
  personality: "Friendly",
  colors: ["Orange"],
  imageUrl: "https://storage.example.com/cats/miming.jpg",
};

describe("edit cat form save", () => {
  it("saves ordinary edits without inventing a missing health status", async () => {
    const onSave = vi.fn();
    render(
      <EditCatForm
        cat={{ ...cat, healthStatus: [] }}
        onSubmit={(data) => onSave(mapEditFormDataToUpdateCatDTO(data))}
      />,
    );

    expect(screen.getByRole("img", { name: "Cat preview" })).toHaveAttribute(
      "src",
      cat.imageUrl,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: "Updated Miming" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() => expect(onSave).toHaveBeenCalledOnce());
    expect(onSave.mock.calls[0][0]).toMatchObject({
      name: "Updated Miming",
      reproductiveStatus: undefined,
      vitamins: ["Nematocide", "LCVit"],
      dateDeceased: null,
    });
  });

  it("requires an explicit compatible health status after changing sex", async () => {
    const onSave = vi.fn();
    render(
      <EditCatForm
        cat={cat}
        onSubmit={(data) => onSave(mapEditFormDataToUpdateCatDTO(data))}
      />,
    );

    fireEvent.keyDown(screen.getAllByRole("combobox")[0], {
      key: "ArrowDown",
    });
    fireEvent.click(await screen.findByRole("option", { name: "Female" }));
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(
      await screen.findByText(
        "Female cats can only have Spayed as their health status",
      ),
    ).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Spayed" }));
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() => expect(onSave).toHaveBeenCalledOnce());
    expect(onSave.mock.calls[0][0]).toMatchObject({
      sex: "Female",
      reproductiveStatus: "Spayed",
      vitamins: ["Nematocide", "LCVit"],
    });
  });

  it("keeps an explicitly empty medicine list separate from vaccines", async () => {
    const onSave = vi.fn();
    const initialCat = mapRawCatToEditInitialData({
      ...cat,
      reproductiveStatus: "Neutered",
      vitamins: [],
      vitamin: ["LCVit"],
      vaccines: ["AntiRabies"],
    });
    expect(initialCat.vitamins).toEqual([]);

    render(
      <EditCatForm
        cat={initialCat}
        onSubmit={(data: EditCatFormData) =>
          onSave(mapEditFormDataToUpdateCatDTO(data))
        }
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() => expect(onSave).toHaveBeenCalledOnce());
    expect(onSave.mock.calls[0][0]).toMatchObject({
      reproductiveStatus: "Neutered",
      vitamins: [],
    });
  });
});
