import type { UpdateCatDTO } from "@/client/service/catenean-service";
import type { EditCatInitialData } from "@/components/ui/edit-cat-form";
import type { EditCatFormData } from "@/schemas/edit-cat-form-schema";

type RawCatForEdit = {
  id?: number;
  name?: string;
  sex?: string;
  classification?: string;
  dob?: string | Date;
  dod?: string | Date;
  dateDeceased?: string | Date;
  dateOfDeath?: string | Date;
  status?: string;
  adoptionStatus?: string;
  currentLocation?: string;
  location?: string;
  current_location?: string;
  residence?: string;
  motherCat?: string | number;
  fatherCat?: string | number;
  motherId?: string | number;
  fatherId?: string | number;
  vitamins?: string[];
  vitamin?: string[];
  vaccines?: string[];
  reproductiveStatus?: string;
  personality?: string;
  colors?: string[];
  imageUrl?: string;
};

const toIsoDateString = (value?: string | Date) => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  return value.toISOString();
};

const allowedClassifications = [
  "CATenean",
  "KITTENean",
  "Rescued_CATenean",
  "Rescued_KITTENean",
] as const;

const toClassification = (value: string) => {
  return allowedClassifications.includes(
    value as (typeof allowedClassifications)[number],
  )
    ? (value as (typeof allowedClassifications)[number])
    : undefined;
};

const toApiColor = (value: string) => {
  const normalized = value.trim().toLowerCase();

  if (normalized === "black") return "Black";
  if (normalized === "white") return "White";
  if (
    normalized === "gray" ||
    normalized === "grey" ||
    normalized === "mixed"
  ) {
    return "Gray";
  }
  if (normalized === "orange") return "Orange";
  if (normalized === "darkbrown" || normalized === "dark_brown") {
    return "DarkBrown";
  }
  if (normalized === "lightbrown" || normalized === "light_brown") {
    return "LightBrown";
  }

  return null;
};

const toApiVitamin = (value: string) => {
  const normalized = value.trim().toLowerCase();

  if (normalized === "nematocide") return "Nematocide";
  if (normalized === "lcvit" || normalized === "lc vit") return "LCVit";

  return null;
};

export const mapRawCatToEditInitialData = (
  cat: RawCatForEdit,
): EditCatInitialData => {
  const rawDateOfDeath = cat.dateOfDeath ?? cat.dateDeceased ?? cat.dod;
  const rawStatus = cat.status ?? cat.adoptionStatus;
  const rawLocation =
    cat.currentLocation ??
    cat.location ??
    cat.current_location ??
    cat.residence;
  const rawMotherCat = cat.motherCat ?? cat.motherId;
  const rawFatherCat = cat.fatherCat ?? cat.fatherId;
  const rawVitamins = Array.isArray(cat.vitamins)
    ? cat.vitamins
    : Array.isArray(cat.vitamin)
      ? cat.vitamin
      : Array.isArray(cat.vaccines)
        ? cat.vaccines
        : [];

  return {
    id: cat.id,
    name: cat.name,
    sex: cat.sex,
    classification: cat.classification,
    dob: toIsoDateString(cat.dob),
    dod: toIsoDateString(cat.dod),
    dateOfDeath: toIsoDateString(rawDateOfDeath),
    status: rawStatus,
    currentLocation: rawLocation,
    motherCat:
      rawMotherCat !== undefined && rawMotherCat !== null
        ? String(rawMotherCat)
        : undefined,
    fatherCat:
      rawFatherCat !== undefined && rawFatherCat !== null
        ? String(rawFatherCat)
        : undefined,
    motherId: cat.motherId,
    fatherId: cat.fatherId,
    vitamins: rawVitamins,
    healthStatus: cat.reproductiveStatus ? [cat.reproductiveStatus] : [],
    personality: cat.personality,
    colors: cat.colors,
    imageUrl: cat.imageUrl,
  };
};

export const mapEditFormDataToUpdateCatDTO = (
  formData: EditCatFormData,
): UpdateCatDTO => {
  const mappedColors = formData.color
    .map(toApiColor)
    .filter(
      (value): value is NonNullable<ReturnType<typeof toApiColor>> =>
        value !== null,
    );
  const mappedVitamins = formData.vitamins
    .map(toApiVitamin)
    .filter(
      (value): value is NonNullable<ReturnType<typeof toApiVitamin>> =>
        value !== null,
    );

  return {
    name: formData.name,
    sex: formData.sex,
    dob: formData.dateOfBirth,
    dateDeceased: formData.dateOfDeath || undefined,
    reproductiveStatus: formData.healthStatus[0],
    personality: formData.personality,
    colors: mappedColors.length > 0 ? mappedColors : ["Black"],
    classification: toClassification(formData.type),
    status: formData.adoptionStatus,
    currentLocation: formData.location,
    vitamins: mappedVitamins.length > 0 ? mappedVitamins : undefined,
  };
};
