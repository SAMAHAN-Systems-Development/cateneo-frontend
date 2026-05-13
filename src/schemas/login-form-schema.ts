import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email({ error: "Enter a valid email address (e.g. name@example.com)" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?:{}|<>]/,
      "Must contain at least one special character",
    ),
});

export type loginFormData = z.infer<typeof loginFormSchema>;
