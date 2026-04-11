import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type signUpFormData = z.infer<typeof signUpSchema>;

export const addNewAdopteeFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  age: z.string().trim().min(1, { message: "Age is required" }),
  contactNumber: z
    .string()
    .trim()
    .min(1, { message: "Contact number is required" })
    .regex(/^[\d\s+().-]+$/, {
      message: "Enter a valid contact number",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  address: z.string().trim().min(1, { message: "Address is required" }),
  adoptedCat: z
    .string()
    .min(1, { message: "Please select an adopted cat" }),
});

export type AddNewAdopteeFormValues = z.infer<typeof addNewAdopteeFormSchema>;
