'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpForm from "@/components/ui/sign-up-form";
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/schemas/sign-up-form-schema";

const Page = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    // Temporary: just log to verify submission works
    console.log("Sign up submitted", data);
  };

  return (
    <div>
      <SignUpForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default Page;
