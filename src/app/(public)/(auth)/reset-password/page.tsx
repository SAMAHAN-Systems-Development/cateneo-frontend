import type { Metadata } from "next";
import ResetPasswordForm from "@/components/ui/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  referrer: "no-referrer",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
