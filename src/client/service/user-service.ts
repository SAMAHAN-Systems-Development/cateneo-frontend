import { apiClient } from "@/lib/api-client";

interface User {
  id: string;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  role: "ADMIN" | "SUPERADMIN" | "VOLUNTEER";
}

export const getUser = (id: number) => {
  return apiClient<User>(`/api/user/${id}`, {
    method: "GET",
    credentials: "include",
  });
};
