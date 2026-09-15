import type { CatParentRelations } from "@/client/service/catenean-service";

export const formatCatParents = (cat: CatParentRelations): string => {
  const names = [cat.mother?.name, cat.father?.name]
    .map((name) => name?.trim())
    .filter(Boolean);

  return names.join(", ") || "N/A";
};
