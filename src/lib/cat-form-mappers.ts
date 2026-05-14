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
  mother?: ParentReference;
  father?: ParentReference;
  motherCat?: ParentReference;
  fatherCat?: ParentReference;
  motherId?: string | number;
  fatherId?: string | number;
  vitamins?: RawListInput;
  vitamin?: RawListInput;
  vaccines?: RawListInput;
  reproductiveStatus?: string;
  personality?: string;
  colors?: string[];
  imageUrl?: string;
};

type ParentReference =
  | string
  | number
  | {
      id?: string | number;
      name?: string;
      catName?: string;
    };

type RawListValue =
  | string
  | {
      name?: string;
      value?: string;
      type?: string;
    };

type RawListInput = RawListValue[] | string | null;

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
  const normalized = value.trim().toLowerCase().replace(/[-_\s]/g, "");

  if (normalized === "nematocide") return "Nematocide";
  if (normalized === "lcvit") return "LCVit";

  return null;
};

export const normalizeCatStatus = (status?: string) => {
  const normalized = status?.trim().toLowerCase().replace(/[-\s]/g, "_");

  if (!normalized) return "";
  if (normalized === "available") return "Available";
  if (normalized === "pending" || normalized === "adoption_pending") {
    return "Adoption_Pending";
  }
  if (normalized === "adopted") return "Adopted";
  if (normalized === "resident") return "Resident";
  if (normalized === "tooyoung" || normalized === "too_young") {
    return "TooYoung";
  }
  if (normalized === "notready" || normalized === "not_ready") {
    return "NotReady";
  }
  if (normalized === "deceased") return "Deceased";

  return status ?? "";
};

const toParentIdString = (value?: ParentReference): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return value;

  return toParentIdString(value.id) ?? value.name ?? value.catName;
};

const toOptionalNumber = (value: string) => {
  if (!value.trim()) return undefined;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const toReproductiveStatusForSex = (
  sex: EditCatFormData["sex"],
  healthStatus: string[],
) => {
  const selectedStatus = healthStatus[0];

  if (sex === "Female") {
    return selectedStatus === "Spayed" ? selectedStatus : "Spayed";
  }

  return selectedStatus === "Neutered" ? selectedStatus : "Neutered";
};

const toStringArray = (value?: RawListInput) => {
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return item;
      return item.name ?? item.value ?? item.type;
    })
    .filter((item): item is string => Boolean(item?.trim()));
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
  const rawMotherCat =
    toParentIdString(cat.motherCat ?? cat.mother) ?? cat.motherId;
  const rawFatherCat =
    toParentIdString(cat.fatherCat ?? cat.father) ?? cat.fatherId;
  const rawVitaminValues = toStringArray(cat.vitamins);
  const rawVitaminFallbackValues = toStringArray(cat.vitamin);
  const rawVaccineFallbackValues = toStringArray(cat.vaccines);
  const rawVitamins =
    rawVitaminValues.length > 0
      ? rawVitaminValues
      : rawVitaminFallbackValues.length > 0
        ? rawVitaminFallbackValues
        : rawVaccineFallbackValues;

  return {
    id: cat.id,
    name: cat.name,
    sex: cat.sex,
    classification: cat.classification,
    dob: toIsoDateString(cat.dob),
    dod: toIsoDateString(cat.dod),
    dateOfDeath: toIsoDateString(rawDateOfDeath),
    status: normalizeCatStatus(rawStatus),
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
    reproductiveStatus: toReproductiveStatusForSex(
      formData.sex,
      formData.healthStatus,
    ),
    personality: formData.personality,
    colors: mappedColors.length > 0 ? mappedColors : ["Black"],
    classification: toClassification(formData.type),
    status: normalizeCatStatus(formData.adoptionStatus),
    motherId: toOptionalNumber(formData.motherCat),
    fatherId: toOptionalNumber(formData.fatherCat),
    currentLocation: formData.location,
    vitamins: mappedVitamins,
  };
};
