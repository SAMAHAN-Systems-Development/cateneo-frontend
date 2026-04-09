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

  const res = await apiClient<AuthResponseDTO>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    user: mapUser(res.user),
    token: res.token,
  };
};

export const createUserService = async (
  formData: signUpFormData,
): Promise<AuthResponse> => {
  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
    role: formData.role,
  };

  const res = await apiClient<AuthResponseDTO>("/api/user/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    user: mapUser(res.user),
    token: res.token,
  };
};

export const logoutService = async (): Promise<void> => {
  await apiClient("/api/auth/logout", {
    method: "POST",
  });
};
