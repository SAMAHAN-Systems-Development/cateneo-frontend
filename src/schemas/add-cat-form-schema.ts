import { z } from "zod";

const requiredSelect = (label: string) =>
  z.string().min(1, { message: `${label} is required` });

export const addCatFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    sex: z.enum(["Male", "Female"], {
      message: "Sex is required",
    }),
    type: requiredSelect("Type"),
    dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
    dateRescued: z.string(),
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
    vaccines: z.array(z.string()),
    personality: z
      .string()
      .min(1, { message: "Personality is required" })
      .max(500, { message: "Personality must be 500 characters or less" }),
    image: z.instanceof(File).nullable().optional(),
    color: z.array(z.string()).min(1, { message: "Color is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.type.startsWith("Rescued_") && !data.dateRescued) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date rescued is required for rescued cats",
        path: ["dateRescued"],
      });
    }
  });

export type AddCatFormData = z.infer<typeof addCatFormSchema>;

export const addCatFormDefaultValues: AddCatFormData = {
  name: "",
  sex: "Male",
  type: "",
  dateOfBirth: "",
  dateRescued: "",
  motherCat: "",
  fatherCat: "",
  adoptionStatus: "",
  location: "",
  vitamins: [],
  healthStatus: [],
  vaccines: [],
  personality: "",
  image: null,
  color: [],
};
