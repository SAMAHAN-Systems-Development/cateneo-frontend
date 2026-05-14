"use client";

import * as React from "react";

import {
  useAdminDeleteCat,
  useAdminUpdateCat,
  useAdminUpdateCatStatus,
} from "@/client/mutations/cat-mutations";
import { useGetAllCats } from "@/client/queries/cat-queries";
import { getAdminCatById } from "@/client/service/catenean-service";
import type { CateneanDTO } from "@/client/service/catenean-service";
import DashboardCategoryShell from "@/components/sections/dashboard-category-shell";
import CateneanCard, { type CatProps } from "@/components/ui/catenean-card";
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
  normalizeCatStatus,
} from "@/lib/cat-form-mappers";

type CardColor = CatProps["color"][number];

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

const toCardSex = (sex: string): CatProps["sex"] => {
  return sex.toLowerCase() === "female" ? "female" : "male";
};

const toKittenGender = (sex: string): KitteneanProps["gender"] => {
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

const isKittenClassification = (value: string) =>
  value.toLowerCase().includes("kitten");

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

  const filters = React.useMemo<CateneanDTO>(
    () => ({ status: "deceased" }),
    [],
  );
  const {
    data: deadCats = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllCats(filters);
  const { mutateAsync: deleteCat } = useAdminDeleteCat();
  const { mutateAsync: updateCat } = useAdminUpdateCat();
  const { mutateAsync: updateCatStatus } = useAdminUpdateCatStatus();

  const filteredCats = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const cats = Array.isArray(deadCats) ? (deadCats as RawCat[]) : [];

    if (!query) return cats;

    return cats.filter((cat) => {
      return (
        cat.name.toLowerCase().includes(query) ||
        (cat.currentLocation ?? "").toLowerCase().includes(query) ||
        cat.personality.toLowerCase().includes(query) ||
        cat.classification.toLowerCase().includes(query)
      );
    });
  }, [deadCats, searchQuery]);

  const handleEditClick = async (catId: number) => {
    const detailedCat = await getAdminCatById(catId);
    setEditedCard(mapRawCatToEditInitialData(detailedCat));
    setIsEditModalOpen(true);
  };

  return (
    <>
      <DashboardCategoryShell
        title="Crossed the Rainbow"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search for crossed cats"
        isLoading={isLoading}
        errorMessage={
          isError ? "Failed to load crossed-the-rainbow cats." : null
        }
      >
        {filteredCats.length === 0 ? (
          <p className="font-gaegu text-2xl text-cateneo-darkbrown">
            No cats found.
          </p>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filteredCats.map((cat) => {
              const cardColors = toCardColors(
                Array.isArray(cat.colors) ? cat.colors : [],
              );
              const commonImageUrl =
                cat.imageUrl || "/images/cat-placeholder.png";
              const commonPersonality =
                cat.personality || "No personality details yet.";

              if (isKittenClassification(cat.classification)) {
                return (
                  <KitteneanCard
                    key={cat.id}
                    imageUrl={commonImageUrl}
                    name={cat.name || "Unknown Kittenean"}
                    gender={toKittenGender(cat.sex ?? "male")}
                    parent="N/A"
                    dateOfBirth={toReadableDate(cat.dob)}
                    medicine={cat.reproductiveStatus || null}
                    residence={toDisplayLocation(cat)}
                    color={cardColors}
                    healthStatus={cat.classification || "N/A"}
                    status={cat.status || "N/A"}
                    personality={commonPersonality}
                    svgColor={cardColors[0]}
                    onEdit={() => {
                      void handleEditClick(cat.id);
                    }}
                    onDelete={() => {
                      setCatToDelete({
                        id: cat.id,
                        name: cat.name || "this cat",
                      });
                    }}
                  />
                );
              }

              return (
                <CateneanCard
                  key={cat.id}
                  imageUrl={commonImageUrl}
                  sex={toCardSex(cat.sex ?? "male")}
                  catName={cat.name || "Unknown Cat"}
                  location={toDisplayLocation(cat)}
                  color={cardColors}
                  healthStatus={cat.classification || "N/A"}
                  medicine={cat.reproductiveStatus || null}
                  personality={commonPersonality}
                  svgColor={cardColors[0]}
                  onEdit={() => {
                    void handleEditClick(cat.id);
                  }}
                  onDelete={() => {
                    setCatToDelete({
                      id: cat.id,
                      name: cat.name || "this cat",
                    });
                  }}
                />
              );
            })}
          </div>
        )}
      </DashboardCategoryShell>

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
                const nextStatus = normalizeCatStatus(formData.adoptionStatus);
                const currentStatus = normalizeCatStatus(editedCard.status);

                if (nextStatus && nextStatus !== currentStatus) {
                  await updateCatStatus({
                    id: editedCard.id,
                    status: nextStatus,
                  });
                }
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
    </>
  );
}
