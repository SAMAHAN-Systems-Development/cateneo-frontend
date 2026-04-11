import { useMutation } from "@tanstack/react-query";
import {
  loginService,
  createUserService,
  logoutService,
} from "../service/auth-service";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutService,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserService,
  });
};
