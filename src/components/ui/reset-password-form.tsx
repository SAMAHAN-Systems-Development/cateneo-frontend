"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useResetPassword } from "@/client/mutations/auth-mutations";
import { Input } from "@/components/ui/input";
import {
  PasswordRecoveryCard,
  recoveryButtonClass,
  recoveryInputClass,
  recoveryLinkClass,
} from "@/components/ui/password-recovery-card";
import {
  resetPasswordFormSchema,
  type ResetPasswordFormData,
} from "@/schemas/password-recovery-form-schema";

function subscribeToResetLink(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const getResetLink = () => window.location.hash;
const getServerResetLink = () => null;

export default function ResetPasswordForm() {
  const fragment = useSyncExternalStore(
    subscribeToResetLink,
    getResetLink,
    getServerResetLink,
  );

  if (fragment === null) {
    return (
      <PasswordRecoveryCard title="Reset password">
        <p role="status" className="text-center font-gaegu text-cateneo-darkbrown">
          Checking your reset link...
        </p>
      </PasswordRecoveryCard>
    );
  }

  return <ResetPasswordFields key={fragment} fragment={fragment} />;
}

function ResetPasswordFields({ fragment }: { fragment: string }) {
  const [token, setToken] = useState<string | null>(() => {
    const candidate = new URLSearchParams(fragment.slice(1)).get("token");
    return candidate && /^[a-f0-9]{64}$/.test(candidate) ? candidate : null;
  });
  const [complete, setComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const submitting = useRef(false);
  const { mutateAsync, isPending, reset } = useResetPassword();
  const {
    register,
    handleSubmit,
    reset: clearForm,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!token || submitting.current || complete) return;
    submitting.current = true;
    setErrorMessage(null);
    reset();

    try {
      await mutateAsync({ token, newPassword: values.newPassword });
      setComplete(true);
      setToken(null);
      clearForm();
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";

      if (/invalid or expired password reset link/i.test(message)) {
        setToken(null);
        clearForm();
        setErrorMessage("This password reset link has expired or has already been used.");
      } else if (/same as your current password/i.test(message)) {
        setErrorMessage("Choose a password that is different from your current password.");
      } else if (/72 bytes/i.test(message)) {
        setErrorMessage("Your password is too long. Use a shorter password and try again.");
      } else if (/too many requests|429/i.test(message)) {
        setErrorMessage("Too many attempts. Please wait a minute and try again.");
      } else {
        setErrorMessage("We couldn't reset your password. Please try again.");
      }
    } finally {
      submitting.current = false;
    }
  };

  if (complete) {
    return (
      <PasswordRecoveryCard title="Password reset!">
        <p role="status" className="text-center font-gaegu text-lg text-cateneo-darkbrown">
          Your password has been updated. You can now log in with your new password.
        </p>
        <Link href="/login" className={`${recoveryButtonClass} mt-6 block text-center`}>
          Log in
        </Link>
      </PasswordRecoveryCard>
    );
  }

  if (!token) {
    return (
      <PasswordRecoveryCard title="Reset link unavailable">
        <p role="alert" className="text-center font-gaegu text-lg text-cateneo-darkbrown">
          {errorMessage ?? "This password reset link is missing or invalid. Open the link from your email or request a new one."}
        </p>
        <Link href="/forgot-password" className={`${recoveryButtonClass} mt-6 block text-center`}>
          Request a new reset link
        </Link>
      </PasswordRecoveryCard>
    );
  }

  const pending = isPending || isSubmitting;

  return (
    <PasswordRecoveryCard
      title="Reset password"
      description="Choose a new password for your Cateneo account."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 font-gaegu">
        {errorMessage && (
          <p role="alert" className="text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}
        <div className="space-y-2">
          <label htmlFor="reset-new-password" className="text-lg font-semibold text-cateneo-darkbrown">
            New password
          </label>
          <Input
            id="reset-new-password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter a new password"
            disabled={pending}
            aria-invalid={Boolean(errors.newPassword)}
            aria-describedby={`reset-password-help${errors.newPassword ? " reset-new-password-error" : ""}`}
            className={recoveryInputClass}
            {...register("newPassword")}
          />
          <p id="reset-password-help" className="text-sm text-cateneo-darkbrown">
            Use at least 8 characters, including an uppercase letter and a special character (for example, ! or @).
          </p>
          {errors.newPassword && (
            <p id="reset-new-password-error" className="text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="reset-confirm-password" className="text-lg font-semibold text-cateneo-darkbrown">
            Confirm password
          </label>
          <Input
            id="reset-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm your new password"
            disabled={pending}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={errors.confirmPassword ? "reset-confirm-password-error" : undefined}
            className={recoveryInputClass}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p id="reset-confirm-password-error" className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button type="submit" disabled={pending} className={recoveryButtonClass}>
          {pending ? "Resetting password..." : "Reset password"}
        </button>
        <p className="text-center text-sm text-cateneo-darkbrown">
          Link expired?{" "}
          <Link href="/forgot-password" className={recoveryLinkClass}>
            Request a new reset link
          </Link>
        </p>
      </form>
    </PasswordRecoveryCard>
  );
}
