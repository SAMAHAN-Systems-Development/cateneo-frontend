import { apiClient } from "@/lib/api-client";

export interface AdopteeCatDTO {
  id: string;
  name: string;
  status: string;
  dateAdopted: string | null;
}

export interface AdopteeDTO {
  id: string;
  fullName: string;
  email: string;
  age?: number;
  contactNumber?: string;
  address?: string;
  cats: AdopteeCatDTO[];
}

export interface FindAdopteesMetaDTO {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FindAdopteesResponseDTO {
  data: AdopteeDTO[];
  meta: FindAdopteesMetaDTO;
}

export const findAdoptees = async (
  page = 1,
  limit = 10,
): Promise<FindAdopteesResponseDTO> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return apiClient<FindAdopteesResponseDTO>(
    `/api/adopters/?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
};
