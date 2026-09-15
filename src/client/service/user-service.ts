import { apiClient } from "@/lib/api-client";
import type { UserRole } from "@/lib/user-roles";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  is_active?: boolean;
  createdAt?: string;
}

interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  is_active?: boolean;
}

export interface UpdateUserByAdminDTO extends UpdateUserDTO {
  role: UserRole;
}

export interface PaginationQueryDTO {
  page?: number;
  limit?: number;
}

type UserListResponse =
  | User[]
  | {
      data?: User[];
      items?: User[];
      results?: User[];
      users?: User[];
    };

export const getMyProfile = async (): Promise<User> => {
  const result = await apiClient<User>(`/api/users/me`, {
    method: "GET",
    credentials: "include",
  });

  return result;
};

export const updateMyProfile = async (
  userData: UpdateUserDTO,
): Promise<User> => {
  const result = await apiClient<User>(`/api/users/me`, {
    method: "PATCH",
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

  await apiClient(`/api/users/me/password`, {
    method: "PUT",
    body: JSON.stringify(payload),
    credentials: "include",
  });
};

// --- SuperAdmin endpoints ---

export const findAllUsers = async (
  pagination: PaginationQueryDTO = {},
): Promise<User[]> => {
  const query = new URLSearchParams();

  if (pagination.page !== undefined) {
    query.set("page", String(pagination.page));
  }

  if (pagination.limit !== undefined) {
    query.set("limit", String(pagination.limit));
  }

  const queryString = query.toString();
  const path = queryString ? `/api/users?${queryString}` : `/api/users`;

  const result = await apiClient<UserListResponse>(path, {
    method: "GET",
    credentials: "include",
  });

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  if (Array.isArray(result?.items)) {
    return result.items;
  }

  if (Array.isArray(result?.results)) {
    return result.results;
  }

  if (Array.isArray(result?.users)) {
    return result.users;
  }

  return [];
};

export const findUserById = async (id: string): Promise<User> => {
  const result = await apiClient<User>(`/api/users/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return result;
};

export const updateUserByAdmin = async (
  id: string,
  userData: UpdateUserByAdminDTO,
): Promise<User> => {
  const result = await apiClient<User>(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
    credentials: "include",
  });
  return result;
};

export const changeUserPasswordService = async (formData: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  await apiClient(`/api/users/me/password`, {
    method: "PATCH",
    body: JSON.stringify(formData),
    credentials: "include",
  });
};

export const updateUserStatus = async (
  id: string,
  isActive: boolean,
): Promise<User> => {
  const result = await apiClient<User>(`/api/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
    credentials: "include",
  });
  return result;
};

export const softDeleteUser = async (id: string): Promise<User> => {
  return updateUserStatus(id, false);
};

export const reactivateUser = async (id: string): Promise<User> => {
  return updateUserStatus(id, true);
};
