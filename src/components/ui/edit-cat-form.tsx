"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AddCatForm from "@/components/ui/add-cat-form";
import {
  addCatFormDefaultValues,
  addCatFormSchema,
  type AddCatFormData,
} from "@/schemas/add-cat-form-schema";

export type EditCatInitialData = {
  id?: number;
  name?: string;
  sex?: string;
  classification?: string;
  dob?: string;
  status?: string;
  currentLocation?: string;
  vitamins?: string[];
  healthStatus?: string[];
  personality?: string;
  colors?: string[];
  imageUrl?: string;
};

interface EditCatFormProps {
  cat: EditCatInitialData;
  onSubmit: (data: AddCatFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
}

const toDateInput = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const toSexValue = (value?: string): "Male" | "Female" => {
  return value?.toLowerCase() === "female" ? "Female" : "Male";
};

const toTypeValue = (classification?: string) => {
  if (!classification) return "";

  if (classification.includes("KITTENean")) return "Kittenean";
  if (classification.includes("CATenean")) return "Catenean";

  return classification;
};

const mapInitialCatToFormValues = (cat: EditCatInitialData): AddCatFormData => {
  return {
    ...addCatFormDefaultValues,
    name: cat.name ?? "",
    sex: toSexValue(cat.sex),
    type: toTypeValue(cat.classification),
    dateOfBirth: toDateInput(cat.dob),
    adoptionStatus: cat.status ?? "",
    location: cat.currentLocation ?? "",
    vitamins: Array.isArray(cat.vitamins) ? cat.vitamins : [],
    healthStatus: Array.isArray(cat.healthStatus) ? cat.healthStatus : [],
    personality: cat.personality ?? "",
    color: cat.colors?.[0]?.toLowerCase() ?? "",
    image: null,
  };
};

export default function EditCatForm({
  cat,
  onSubmit,
  onCancel,
  className,
}: EditCatFormProps) {
  const form = useForm<AddCatFormData>({
    resolver: zodResolver(addCatFormSchema),
    defaultValues: mapInitialCatToFormValues(cat),
  });

  useEffect(() => {
    form.reset(mapInitialCatToFormValues(cat));
  }, [cat, form]);

  return (
    <AddCatForm
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      className={className}
      title="Edit New Cat"
      submitLabel="Save Changes"
    />
  );
}
