"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAdminCreateCat } from "@/client/mutations/cat-mutations";
import AddCatForm from "@/components/ui/add-cat-form";
import type {
  CatClassification,
  CatColor,
  CatLocation,
  CreateNewCatDTO,
  Vaccine,
  Vitamin,
} from "@/client/service/catenean-service";
import {
  addCatFormDefaultValues,
  addCatFormSchema,
  type AddCatFormData,
} from "@/schemas/add-cat-form-schema";

const toOptionalNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const toClassification = (value: string): CatClassification => {
  const normalized = value.trim().toLowerCase();

  if (normalized.includes("rescued") && normalized.includes("kitten")) {
    return "Rescued_KITTENean";
  }
  if (normalized.includes("rescued") && normalized.includes("cat")) {
    return "Rescued_CATenean";
  }
  if (normalized.includes("kitten")) return "KITTENean";

  return "CATenean";
};

const ALLOWED_COLORS = [
  "Black",
  "White",
  "Gray",
  "Orange",
  "DarkBrown",
  "LightBrown",
] as const;

const ALLOWED_LOCATIONS = [
  "MEZZANINE_FLOOR",
  "RODRIGUEZ_HALL",
  "ROXAS_BENCHES",
  "DEL_ROSARIO_GAZEBO",
  "JUBILEE_BUILDING",
  "CENTRAL_CONVENIENCE",
] as const;

const ALLOWED_VITAMINS = ["Nematocide", "LCVit"] as const;
const ALLOWED_VACCINES = ["AntiRabies"] as const;

const isOneOf = <T extends readonly string[]>(
  value: string,
  options: T,
): value is T[number] => {
  return options.includes(value as T[number]);
};

const toCatColor = (value: string): CatColor => {
  return isOneOf(value, ALLOWED_COLORS) ? value : "Black";
};

const toCatLocation = (value: string): CatLocation => {
  return isOneOf(value, ALLOWED_LOCATIONS) ? value : "MEZZANINE_FLOOR";
};

const toVitamins = (values: string[]): Vitamin[] => {
  return values.filter((value): value is Vitamin =>
    isOneOf(value, ALLOWED_VITAMINS),
  );
};

const toVaccines = (values: string[]): Vaccine[] => {
  return values.filter((value): value is Vaccine =>
    isOneOf(value, ALLOWED_VACCINES),
  );
};

const Page = () => {
  const createCatMutation = useAdminCreateCat();

  const form = useForm<AddCatFormData>({
    resolver: zodResolver(addCatFormSchema),
    defaultValues: addCatFormDefaultValues,
  });

  const handleSubmit = async (data: AddCatFormData) => {
    const payload: CreateNewCatDTO = {
      name: data.name,
      sex: data.sex,
      dob: data.dateOfBirth,
      personality: data.personality,
      colors: [toCatColor(data.color)],
      classification: toClassification(data.type),
      status: data.adoptionStatus,
      motherId: toOptionalNumber(data.motherCat),
      fatherId: toOptionalNumber(data.fatherCat),
      currentLocation: toCatLocation(data.location),
      vitamins: toVitamins(data.vitamins),
      vaccines: toVaccines(data.healthStatus),
      imageUrl: undefined,
    };

    await createCatMutation.mutateAsync(payload);
    form.reset(addCatFormDefaultValues);
  };

  const handleCancel = () => {
    form.reset(addCatFormDefaultValues);
  };

  return (
    <main className="px-3 py-6 md:px-5">
      <div className="mx-auto w-full max-w-7xl">
        <AddCatForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          className="w-full max-w-none sm:max-w-none md:max-w-none lg:max-w-none"
        />
      </div>
    </main>
  );
};

export default Page;
