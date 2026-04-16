import { z } from "zod";

const requiredSelect = (label: string) =>
  z.string().min(1, { message: `${label} is required` });

export const editCatFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  sex: z.enum(["Male", "Female"], {
    message: "Sex is required",
  }),
  type: requiredSelect("Type"),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  dateOfDeath: z.string().min(1, { message: "Date of death is required" }),
  motherCat: requiredSelect("Mother cat"),
  fatherCat: requiredSelect("Father cat"),
  adoptionStatus: requiredSelect("Status"),
  location: requiredSelect("Location"),
  vitamins: z
    .array(z.string())
    .min(1, { message: "Select at least one vitamin" }),
  healthStatus: z
    .array(z.string())
    .min(1, { message: "Select at least one health status" }),
  personality: z
    .string()
    .min(1, { message: "Personality is required" })
    .max(500, { message: "Personality must be 500 characters or less" }),
  image: z.instanceof(File).nullable().optional(),
  color: z.string().min(1, { message: "Color is required" }),
});

export type EditCatFormData = z.infer<typeof editCatFormSchema>;

export const editCatFormDefaultValues: EditCatFormData = {
  name: "",
  sex: "Male",
  type: "",
  dateOfBirth: "",
  dateOfDeath: "",
  motherCat: "",
  fatherCat: "",
  adoptionStatus: "",
  location: "",
  vitamins: [],
  healthStatus: [],
  personality: "",
  image: null,
  color: "",
};
