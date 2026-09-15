import type { UseFormReturn } from "react-hook-form";
import Link from "next/link";
import { type loginFormData } from "@/schemas/login-form-schema";
import { MdMailOutline } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  form: UseFormReturn<loginFormData>;
  onSubmit: (data: loginFormData) => Promise<void>;
  errorMessage?: string | null;
}

const LoginForm = ({ form, onSubmit, errorMessage }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <div className="w-full">
      <div className="w-full max-w-md bg-amber-50 border-2 sm:border-3 md:border-4 border-cateneo-darkbrown rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cateneo-darkbrown text-center mb-6 sm:mb-8 font-playpen">
          Welcome back!
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5 font-gaegu"
        >
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          <div className="relative">
            <div className="flex items-center border-2 border-cateneo-darkbrown rounded-full px-4 sm:px-5 py-2.5 sm:py-3">
              <span className="text-cateneo-darkbrown mr-2 sm:mr-3 text-lg sm:text-xl">
                <MdMailOutline />
              </span>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="border-none outline-none text-cateneo-darkbrown placeholder:text-cateneo-darkbrown placeholder-opacity-70"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="flex items-center border-2 border-cateneo-darkbrown rounded-full px-4 sm:px-5 py-2.5 sm:py-3">
              <span className="text-cateneo-darkbrown mr-2 sm:mr-3 text-lg sm:text-xl">
                <GoLock />
              </span>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="border-none outline-none text-cateneo-darkbrown placeholder:text-cateneo-darkbrown placeholder-opacity-70"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="rounded-sm text-sm text-cateneo-darkbrown underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cateneo-darkbrown sm:text-base"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cateneo-black hover:scale-105 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-full transition duration-200 disabled:opacity-50 mt-6 sm:mt-8 cursor-pointer text-sm sm:text-base"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
