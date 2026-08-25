import { z } from "zod";
import { differenceInYears } from "date-fns";

const KITTEN_TYPES = ["KITTENean", "Rescued_KITTENean"];
const ADULT_TYPES = ["CATenean", "Rescued_CATenean"];

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

    if (data.dateOfBirth && data.type) {
      const age = differenceInYears(new Date(), new Date(data.dateOfBirth));
      const isKitten = age < 1;

      if (isKitten && !KITTEN_TYPES.includes(data.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Cats under 1 year old must be classified as KITTENean or Rescued_KITTENean",
          path: ["type"],
        });
      }

      if (!isKitten && !ADULT_TYPES.includes(data.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Cats 1 year or older must be classified as CATenean or Rescued_CATenean",
          path: ["type"],
        });
      }
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
