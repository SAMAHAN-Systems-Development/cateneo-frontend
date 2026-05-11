"use client";

import * as React from "react";

import {
  useAdminDeleteCat,
  useAdminUpdateCat,
} from "@/client/mutations/cat-mutations";
import { useGetAllCats } from "@/client/queries/cat-queries";
import { getAdminCatById } from "@/client/service/catenean-service";
import type { CateneanDTO } from "@/client/service/catenean-service";
import DashboardCategoryShell from "@/components/sections/dashboard-category-shell";
import { DeleteCatModal } from "@/components/ui/delete-cat-modal";
import EditCatForm, {
  type EditCatInitialData,
} from "@/components/ui/edit-cat-form";
import KitteneanCard, {
  type KitteneanProps,
} from "@/components/ui/kittenean-card";
import {
  mapEditFormDataToUpdateCatDTO,
  mapRawCatToEditInitialData,
} from "@/lib/cat-form-mappers";

type CardColor = KitteneanProps["color"][number];

type RawCat = {
  id: number;
  name: string;
  sex: string;
  dob?: string | Date;
  colors: string[];
  personality: string;
  imageUrl: string;
  reproductiveStatus: string;
  classification: string;
  status?: string;
  currentLocation?: string;
  currentlocation?: string;
  location?: string;
  current_location?: string;
  residence?: string;
  vitamins?: string[];
};

type DashboardCardData = KitteneanProps & { rawCat: RawCat };

const ALLOWED_COLORS: CardColor[] = [
  "white",
  "darkbrown",
  "lightbrown",
  "orange",
  "black",
  "gray",
];

const normalizeColorToken = (value: string): CardColor | null => {
  const normalized = value.toLowerCase().replace(/[\s_-]/g, "");

  if (normalized === "white") return "white";
  if (normalized === "black") return "black";
  if (normalized === "gray" || normalized === "grey") return "gray";
  if (normalized === "orange") return "orange";
  if (normalized === "darkbrown") return "darkbrown";
  if (normalized === "lightbrown") return "lightbrown";

  return null;
};

const toCardColors = (colors: string[]): CardColor[] => {
  const filteredColors = colors
    .map((color) => normalizeColorToken(color))
    .filter((color): color is CardColor => {
      return color !== null && ALLOWED_COLORS.includes(color);
    });

  return filteredColors.length > 0 ? filteredColors : ["orange"];
};

const toCardSex = (sex: string): KitteneanProps["gender"] => {
  return sex.toLowerCase() === "female" ? "female" : "male";
};

const firstNonEmptyString = (values: Array<string | undefined>) => {
  return values.find((value) => typeof value === "string" && value.trim());
};

const toDisplayLocation = (cat: RawCat) => {
  const rawLocation =
    firstNonEmptyString([
      cat.currentLocation,
      cat.currentlocation,
      cat.location,
      cat.current_location,
      cat.residence,
    ]) ?? "Cateneo Shelter";

  return rawLocation.replace(/_/g, " ").trim();
};

const toReadableDate = (value?: string | Date) => {
  if (!value) return "N/A";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const mapCatsToCardData = (cats: RawCat[] | undefined): DashboardCardData[] => {
  if (!Array.isArray(cats)) {
    return [];
  }

  return cats.map((cat) => {
    const cardColors = toCardColors(
      Array.isArray(cat.colors) ? cat.colors : [],
    );

    return {
      imageUrl: cat.imageUrl || "/images/cat-placeholder.png",
      name: cat.name || "Unknown Kittenean",
      gender: toCardSex(cat.sex ?? "male"),
      parent: "N/A",
      dateOfBirth: toReadableDate(cat.dob),
      medicine: cat.reproductiveStatus || null,
      residence: toDisplayLocation(cat),
      color: cardColors,
      healthStatus: cat.classification || "N/A",
      status: cat.status || "N/A",
      personality: cat.personality || "No personality details yet.",
      svgColor: cardColors[0],
      rawCat: cat,
    };
  });
};

export default function Page() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editedCard, setEditedCard] = React.useState<EditCatInitialData | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [catToDelete, setCatToDelete] = React.useState<{
    id: number;
    name: string;
  } | null>(null);

  const filters = React.useMemo<CateneanDTO>(() => ({ type: "kittenean" }), []);
  const {
    data: kittenCats = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllCats(filters);
  const { mutateAsync: deleteCat } = useAdminDeleteCat();
  const { mutateAsync: updateCat } = useAdminUpdateCat();

  const kittens = React.useMemo(
    () => mapCatsToCardData(kittenCats as RawCat[]),
    [kittenCats],
  );

  const filteredKittens = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return kittens;

    return kittens.filter((kitten) => {
      return (
        kitten.name.toLowerCase().includes(query) ||
        kitten.residence.toLowerCase().includes(query) ||
        kitten.personality.toLowerCase().includes(query)
      );
    });
  }, [kittens, searchQuery]);

  const handleEditClick = async (catId: number) => {
    const detailedCat = await getAdminCatById(catId);
    setEditedCard(mapRawCatToEditInitialData(detailedCat));
    setIsEditModalOpen(true);
  };

  return (
    <DashboardCategoryShell
      title="Kitteneans"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search for Kitteneans"
      isLoading={isLoading}
      errorMessage={isError ? "Failed to load kitteneans." : null}
    >
      {filteredKittens.length === 0 ? (
        <p className="font-gaegu text-2xl text-cateneo-darkbrown">
          No cats found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredKittens.map((kitten) => (
            <KitteneanCard
              key={kitten.rawCat.id}
              imageUrl={kitten.imageUrl}
              name={kitten.name}
              gender={kitten.gender}
              parent={kitten.parent}
              dateOfBirth={kitten.dateOfBirth}
              medicine={kitten.medicine}
              residence={kitten.residence}
              color={kitten.color}
              healthStatus={kitten.healthStatus}
              status={kitten.status}
              personality={kitten.personality}
              svgColor={kitten.svgColor}
              onEdit={() => {
                void handleEditClick(kitten.rawCat.id);
              }}
              onDelete={() => {
                setCatToDelete({
                  id: kitten.rawCat.id,
                  name: kitten.rawCat.name || "this cat",
                });
              }}
            />
          ))}
        </div>
      )}
      {isEditModalOpen && editedCard ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setIsEditModalOpen(false);
            setEditedCard(null);
          }}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <EditCatForm
              cat={editedCard}
              onSubmit={async (formData) => {
                if (!editedCard.id) return;

                await updateCat({
                  id: editedCard.id,
                  formData: mapEditFormDataToUpdateCatDTO(formData),
                });
                await refetch();
                setIsEditModalOpen(false);
                setEditedCard(null);
              }}
              onCancel={() => {
                setIsEditModalOpen(false);
                setEditedCard(null);
              }}
            />
          </div>
        </div>
      ) : null}

      {catToDelete ? (
        <DeleteCatModal
          catName={catToDelete.name}
          onCancel={() => setCatToDelete(null)}
          onConfirm={async () => {
            await deleteCat(catToDelete.id);
            await refetch();
            setCatToDelete(null);
          }}
        />
      ) : null}
    </DashboardCategoryShell>
  );
}
