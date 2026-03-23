"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  type signUpFormData,
} from "@/schemas/sign-up-form-schema";
import SignUpForm from "@/components/ui/sign-up-form";
const SignUpPage = () => {
  const form = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: signUpFormData) => {
    console.log("submitted", data); // Placeholder for actual login logic
  };

  return (
    <div className="w-full">
      <SignUpForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default SignUpPage;
