import { apiClient } from "@/lib/api-client";

export interface AdopterDTO {
  id: string;
  address: string;
  age: number;
  contact_number: string;
  created_at: string;
  email: string;
  full_name: string;
  isActive: boolean;
}

export interface RegisteredAdoptersMetaDTO {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RegisteredAdoptersResponseDTO {
  data: AdopterDTO[];
  meta: RegisteredAdoptersMetaDTO;
}

export const fetchRegisteredAdoptersService = async (page = 1, limit = 10) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await apiClient<RegisteredAdoptersResponseDTO>(
    `/api/admin/adopters?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  return res;
};

export const createAdopterService = async (formData: {
  full_name: string;
  email: string;
  contact_number: string;
  age: number;
  address: string;
}) => {
  const res = await apiClient("/api/adopters", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  return res;
};

export const getOneAdopterService = async (id: string) => {
  const res = await apiClient<AdopterDTO>(`/api/admin/adopters/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};
