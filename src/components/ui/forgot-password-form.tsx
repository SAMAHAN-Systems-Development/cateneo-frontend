"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MailCheck } from "lucide-react";

import { useForgotPassword } from "@/client/mutations/auth-mutations";
import { Input } from "@/components/ui/input";
import {
  PasswordRecoveryCard,
  recoveryButtonClass,
  recoveryInputClass,
  recoveryLinkClass,
} from "@/components/ui/password-recovery-card";
import {
  forgotPasswordFormSchema,
  type ForgotPasswordFormData,
} from "@/schemas/password-recovery-form-schema";

export default function ForgotPasswordForm() {
  const { mutateAsync, isPending, reset } = useForgotPassword();
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const submitting = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });
  const pending = isPending || isSubmitting;

  const onSubmit = async (values: ForgotPasswordFormData) => {
    if (submitting.current) return;
    submitting.current = true;
    setErrorMessage(null);
    reset();
    try {
      await mutateAsync(values);
      setSent(true);
    } catch {
      setErrorMessage(
        "We couldn't send a reset link right now. Please wait a moment and try again.",
      );
    } finally {
      submitting.current = false;
    }
  };

  if (sent) {
    return (
      <PasswordRecoveryCard title="Check your email">
        <div role="status" className="space-y-4 text-center text-lg leading-snug">
          <MailCheck
            className="mx-auto size-12 text-cateneo-lightbrown"
            aria-hidden="true"
          />
          <p>
            If an active account exists for that email address, you&apos;ll receive
            a link to reset your password.
          </p>
          <p>Check your inbox and spam folder. The link expires in 15 minutes.</p>
        </div>
        <div className="mt-5 text-center text-base">
          <button
            type="button"
            className={`cursor-pointer ${recoveryLinkClass}`}
            onClick={() => setSent(false)}
          >
            Try another email
          </button>
        </div>
      </PasswordRecoveryCard>
    );
  }

  return (
    <PasswordRecoveryCard
      title="Forgot password?"
      description="Enter your email address and we'll send you a link to reset your password."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-busy={pending}
      >
        <div>
          <label htmlFor="recovery-email" className="mb-2 block text-lg">
            Email address
          </label>
          <Input
            id="recovery-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className={recoveryInputClass}
            disabled={pending}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "recovery-email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="recovery-email-error"
              role="alert"
              className="mt-2 text-base text-error-five"
            >
              {errors.email.message}
            </p>
          )}
        </div>
        {errorMessage && (
          <p role="alert" className="text-base text-error-five">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className={recoveryButtonClass}
        >
          {pending ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </PasswordRecoveryCard>
  );
}
