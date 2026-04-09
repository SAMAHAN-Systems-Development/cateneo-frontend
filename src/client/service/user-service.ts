import { apiClient } from "@/lib/api-client";

interface User {
  id: string;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  role: "ADMIN" | "SUPERADMIN" | "VOLUNTEER";
}

interface UpdateUserDTO {
  firstName?: String;
  lastName?: String;
}

interface UpdateUserByAdminDTO extends UpdateUserDTO {
  role: string;
}

export const getMyProfile = async (): Promise<User> => {
  const result = await apiClient<User>(`/api/admin/users/me`, {
    method: "GET",
    credentials: "include",
  });

  return result;
};

export const updateMyProfile = async (
  userData: UpdateUserDTO,
): Promise<User> => {
  const result = await apiClient<User>(`/api/admin/users/me`, {
    method: "PUT",
    body: JSON.stringify(userData),
    credentials: "include",
  });
  return result;
};

export const updateMyPassword = async (
  id: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  const payload = {
    currentPassword,
    newPassword,
  };

  await apiClient(`/api/admin/users/me/password`, {
    method: "PUT",
    body: JSON.stringify(payload),
    credentials: "include",
  });
};

// --- SuperAdmin endpoints ---

export const findAllUsers = async (): Promise<User[]> => {
  const result = await apiClient<User[]>(`/api/admin/users`, {
    method: "GET",
    credentials: "include",
  });
  return result;
};

export const findUserById = async (id: string): Promise<User> => {
  const result = await apiClient<User>(`/api/admin/users/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return result;
};

export const updateUserByAdmin = async (
  id: string,
  userData: UpdateUserByAdminDTO,
): Promise<User> => {
  const result = await apiClient<User>(`/api/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    credentials: "include",
  });
  return result;
};

export const softDeleteUser = async (id: string): Promise<User> => {
  const result = await apiClient<User>(`/api/admin/users/${id}`, {
    method: "PUT",
    credentials: "include",
  });
  return result;
};
