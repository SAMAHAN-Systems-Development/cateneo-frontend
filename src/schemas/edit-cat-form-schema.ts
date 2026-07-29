import { z } from "zod";

const requiredSelect = (label: string) =>
  z.string().min(1, { message: `${label} is required` });

export const editCatFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    sex: z.enum(["Male", "Female"], {
      message: "Sex is required",
    }),
    type: requiredSelect("Type"),
    dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
    dateOfDeath: z.string(),
    motherCat: z.string(),
    fatherCat: z.string(),
    adoptionStatus: requiredSelect("Status"),
    location: requiredSelect("Location"),
    vitamins: z.array(z.string()),
    healthStatus: z
      .array(z.string())
      .min(1, { message: "Select at least one health status" }),
    personality: z
      .string()
      .min(1, { message: "Personality is required" })
      .max(500, { message: "Personality must be 500 characters or less" }),
    image: z.instanceof(File).nullable().optional(),
    color: z.array(z.string()).min(1, { message: "Color is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.adoptionStatus !== "Deceased") {
      return;
    }

    if (!data.dateOfDeath || !data.dateOfDeath.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date of death is required when status is Deceased",
        path: ["dateOfDeath"],
      });
    }
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
  color: [],
};
