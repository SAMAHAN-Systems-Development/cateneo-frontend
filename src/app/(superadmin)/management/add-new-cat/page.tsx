"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAdminCreateCat } from "@/client/mutations/cat-mutations";
import AddCatForm from "@/components/ui/add-cat-form";
import RoleGuard from "@/lib/role-guard";
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
  const allowedClassifications: CatClassification[] = [
    "CATenean",
    "KITTENean",
    "Rescued_CATenean",
    "Rescued_KITTENean",
  ];

  return allowedClassifications.includes(value as CatClassification)
    ? (value as CatClassification)
    : "CATenean";
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

  return "Black";
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

const toReproductiveStatus = (values: string[]) => {
  return values.find((value) => value.trim().length > 0) ?? undefined;
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
      colors: data.color.map(toCatColor),
      classification: toClassification(data.type),
      status: data.adoptionStatus,
      reproductiveStatus: toReproductiveStatus(data.healthStatus),
      motherId: toOptionalNumber(data.motherCat),
      fatherId: toOptionalNumber(data.fatherCat),
      currentLocation: toCatLocation(data.location),
      vitamins: toVitamins(data.vitamins),
      vaccines: toVaccines(data.vaccines),
      imageUrl: undefined,
    };

    await createCatMutation.mutateAsync(payload);
    form.reset(addCatFormDefaultValues);
  };

  const handleCancel = () => {
    form.reset(addCatFormDefaultValues);
  };

  return (
    <RoleGuard allowedRoles={["SUPERADMIN"]} redirectTo="/dashboard/cateneans">
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
    </RoleGuard>
  );
};

export default Page;
