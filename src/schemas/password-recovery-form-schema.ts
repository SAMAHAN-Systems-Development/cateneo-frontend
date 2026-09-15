import * as z from "zod";
import { loginFormSchema } from "@/schemas/login-form-schema";

export const forgotPasswordFormSchema = z.object({
  email: loginFormSchema.shape.email,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export const resetPasswordFormSchema = z
  .object({
    newPassword: loginFormSchema.shape.password
      .max(72, "Password is too long. Try fewer characters.")
      .refine(
        (password) => new TextEncoder().encode(password).length <= 72,
        "Password is too long. Try fewer characters.",
      ),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;
