"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginForm from "@/components/ui/login-form";
import {
  loginFormSchema,
  type loginFormData,
} from "@/schemas/login-form-schema";
import { useLogin } from "@/client/mutations/auth-mutations";

const LoginPage = () => {
  const { mutate, isPending, error } = useLogin();

  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (loginFormData: loginFormData) => {
    mutate(loginFormData);
  };

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Login failed</p>;

  return (
    <div>
      <LoginForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
