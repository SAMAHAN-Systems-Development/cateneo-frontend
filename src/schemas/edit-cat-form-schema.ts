import { z } from "zod";
import {differenceInYears} from "date-fns"

const KITTEN_TYPES = ["KITTENean", "Rescued_KITTENean"]
const ADULT_TYPES = ["CATenean", "Rescued_CATenean"]

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
      .max(1, { message: "Select only one health status" }),
    personality: z
      .string()
      .min(1, { message: "Personality is required" })
      .max(500, { message: "Personality must be 500 characters or less" }),
    image: z.instanceof(File).nullable().optional(),
    color: z.array(z.string()).min(1, { message: "Color is required" }),
  })
  .superRefine((data, ctx) => {
    const healthStatus = data.healthStatus[0];
    const expectedHealthStatus = data.sex === "Female" ? "Spayed" : "Neutered";

    if (healthStatus && healthStatus !== expectedHealthStatus) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${data.sex} cats can only have ${expectedHealthStatus} as their health status`,
        path: ["healthStatus"],
      });
    }

    if (
      data.adoptionStatus === "Deceased" &&
      (!data.dateOfDeath || !data.dateOfDeath.trim())
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date of death is required when status is Deceased",
        path: ["dateOfDeath"],
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
