import * as z from "zod";

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(
        /[!@#$%^&*(),.?:{}|<>]/,
        "Must contain at least one special character",
      ),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;

export type ChangePasswordSubmitData = {
  currentPassword: string;
  confirmNewPassword: string;
};
