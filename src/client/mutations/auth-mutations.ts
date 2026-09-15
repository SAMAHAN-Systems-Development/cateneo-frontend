import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginService,
  createUserService,
  logoutService,
  forgotPasswordService,
  resetPasswordService,
} from "../service/auth-service";
import { loginFormData } from "@/schemas/login-form-schema";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (formData: loginFormData) => loginService(formData),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], { user: null });
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserService,
  });
};

export const useForgotPassword = () =>
  useMutation({ mutationFn: forgotPasswordService, retry: false, gcTime: 0 });

export const useResetPassword = () =>
  useMutation({ mutationFn: resetPasswordService, retry: false, gcTime: 0 });
