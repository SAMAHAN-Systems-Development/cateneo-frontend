"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginForm from "@/components/ui/login-form";
import {
  loginFormSchema,
  type loginFormData,
} from "@/schemas/login-form-schema";

const LoginPage = () => {
  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: loginFormData) => {
    console.log("submitted", data); // Placeholder for actual login logic
  };

  return (
    <div>
      <LoginForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
