'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormValues } from "@/schemas/sign-up-form-schema";
import { Input } from "@/components/ui/input";
import { RoundedButton } from "@/components/ui/rounded-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdMailOutline } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import Image from "next/image";

const SignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: SignUpFormValues) => {
    // Temporary: just log to verify submission works
    console.log("Sign up submitted", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="sm:w-full w-2/3 max-w-md bg-amber-50 border-2 sm:border-3 md:border-4 border-cateneo-darkbrown rounded-2xl sm:rounded-3xl shadow-lg sm:px-10 py-8">
        <CardHeader className="items-center text-center">
          <div className="w-full flex justify-center mb-2 sm:mb-3 sm:hidden">
            <Image
              src="/Group-17.svg"
              alt="SignUp Cat"
              width={120}
              height={120}
              priority
            />
          </div>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-cateneo-darkbrown font-playpen">
            Hello!
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5 font-gaegu flex flex-col items-center text-center"
          >
          <div className="relative w-full">
            <div className="flex items-center border-2 border-cateneo-darkbrown rounded-full px-4 sm:px-5 py-2.5 sm:py-3">
              <span className="text-cateneo-darkbrown mr-2 sm:mr-3 text-lg sm:text-xl ">
                <FiUser />
              </span>
              <Input
                type="text"
                placeholder="First name"
                {...register("firstName")}
                className="border-none outline-none text-cateneo-darkbrown placeholder:text-cateneo-darkbrown placeholder-opacity-70 w-full"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="relative w-full">
            <div className="flex items-center border-2 border-cateneo-darkbrown rounded-full px-4 sm:px-5 py-2.5 sm:py-3">
              <span className="text-cateneo-darkbrown mr-2 sm:mr-3 text-lg sm:text-xl">
                <FiUser />
              </span>
              <Input
                type="text"
                placeholder="Last name"
                {...register("lastName")}
                className="border-none outline-none text-cateneo-darkbrown placeholder:text-cateneo-darkbrown placeholder-opacity-70 w-full"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="relative w-full">
            <div className="flex items-center border-2 border-cateneo-darkbrown rounded-full px-4 sm:px-5 py-2.5 sm:py-3">
              <span className="text-cateneo-darkbrown mr-2 sm:mr-3 text-lg sm:text-xl">
                <MdMailOutline />
              </span>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="border-none outline-none text-cateneo-darkbrown placeholder:text-cateneo-darkbrown placeholder-opacity-70 w-full"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative w-full">
            <div className="flex items-center border-2 border-cateneo-darkbrown rounded-full px-4 sm:px-5 py-2.5 sm:py-3">
              <span className="text-cateneo-darkbrown mr-2 sm:mr-3 text-lg sm:text-xl">
                <GoLock />
              </span>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="border-none outline-none text-cateneo-darkbrown placeholder:text-cateneo-darkbrown placeholder-opacity-70 w-full"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <RoundedButton
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-0 sm:mt-0"
            variant="default"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </RoundedButton>
        </form>

        <p className="text-center text-amber-900 mt-4 sm:mt-6 font-gaegu text-sm sm:text-base">
          Already have an account?{" "}
          <a href="/login" className="text-darkbrown hover:underline font-semibold border-b-1 border-cateneo-darkbrown">
            Sign In
          </a>
        </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
