import { apiClient } from "@/lib/api-client";
import { loginFormData } from "@/schemas/login-form-schema";
import { signUpFormData } from "@/schemas/sign-up-form-schema";

export interface AuthUser {
  id: string;
  role: string;
  fullName: string;
}

type UserDTO = {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
};

interface AuthResponseDTO {
  user: UserDTO;
  token: string;
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}

const mapUser = (payload: UserDTO): AuthUser => {
  return {
    id: payload.id,
    role: payload.role,
    fullName: `${payload.firstName} ${payload.lastName}`,
  };
};

export const loginService = async (
  formData: loginFormData,
): Promise<AuthResponse> => {
  const payload = {
    email: formData.email,
    password: formData.password,
  };

  const res = await apiClient<AuthResponseDTO>("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    user: mapUser(res.user),
    token: res.token,
  };
};

export const signUpService = async (
  formData: signUpFormData,
): Promise<AuthResponse> => {
  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    role: formData.role,
    email: formData.email,
    password: formData.password,
  };

  const res = await apiClient<AuthResponseDTO>("/api/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    user: mapUser(res.user),
    token: res.token,
  };
};
