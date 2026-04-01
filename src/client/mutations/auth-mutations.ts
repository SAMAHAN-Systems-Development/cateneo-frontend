import { useMutation } from "@tanstack/react-query";
import { loginService, signUpService } from "../service/auth-service";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpService,
  });
};
