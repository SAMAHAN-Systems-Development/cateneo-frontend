import { apiClient } from "@/lib/api-client";
import { loginFormData } from "@/schemas/login-form-schema";
import { signUpFormData } from "@/schemas/create-an-account-form-schema";

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
  user?: UserDTO;
  id?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}

interface AuthResponse {
  user: AuthUser;
  token?: string;
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
    email: formData.email.trim(),
    password: formData.password,
  };

  const res = await apiClient<AuthResponseDTO>("/api/auth/login", {
    method: "POST",
    body: payload,
    credentials: "include",
  });

  const userPayload: UserDTO = res.user ?? {
    id: res.id ?? "",
    role: res.role ?? "",
    firstName: res.firstName ?? "",
    lastName: res.lastName ?? "",
  };

  return {
    user: mapUser(userPayload),
  };
};

export const createUserService = async (
  formData: signUpFormData,
): Promise<AuthResponse> => {
  const payload = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim(),
    password: formData.password,
    role: formData.role,
  };

  const res = await apiClient<AuthResponseDTO>("/api/auth/user/create", {
    method: "POST",
    body: payload,
    credentials: "include",
  });

  return {
    user: mapUser(
      res.user ?? {
        id: res.id ?? "",
        role: res.role ?? "",
        firstName: res.firstName ?? "",
        lastName: res.lastName ?? "",
      },
    ),
    token: res.token,
  };
};

export const logoutService = async (): Promise<void> => {
  await apiClient("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
