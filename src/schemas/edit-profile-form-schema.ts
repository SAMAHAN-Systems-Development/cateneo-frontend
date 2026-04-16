import * as z from "zod";

export const editProfileFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
});

export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;
