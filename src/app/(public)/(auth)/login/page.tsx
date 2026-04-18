"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import LoginForm from "@/components/ui/login-form";
import {
  loginFormSchema,
  type loginFormData,
} from "@/schemas/login-form-schema";
import { useLogin } from "@/client/mutations/auth-mutations";

const LoginPage = () => {
  const { mutateAsync, error, reset } = useLogin();
  const router = useRouter();

  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (loginFormData: loginFormData) => {
    reset();
    try {
      await mutateAsync(loginFormData);
      router.push("/dashboard/cateneans");
    } catch {
      // Error state is handled by react-query and displayed in the form.
    }
  };

  const errorMessage = error instanceof Error ? error.message : null;

  return (
    <div>
      <LoginForm form={form} onSubmit={onSubmit} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
