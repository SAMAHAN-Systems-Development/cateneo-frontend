import { apiClient } from "@/lib/api-client";

interface Catenean {
  id: number;
  name: string;
  sex: string;
  dob: Date;
  colors: string[];
  personality: string;
  classification: string;
  imageUrl: string;
  reproductiveStatus: string;
  createdAt: Date;
}

type CateneanListResponse =
  | Catenean[]
  | {
      data?: Catenean[];
      items?: Catenean[];
      results?: Catenean[];
    };

export interface CateneanDTO {
  status?: string;
  classification?:
    | "CATenean"
    | "KITTENean"
    | "Rescued_CATenean"
    | "Rescued_KITTENean";
  type?: string;
  sex?: string;
  name?: string;
  reproductiveStatus?: string;
  currentLocation?: string;
}

export type Sex = "Male" | "Female";
export type ReproductiveStatus = string;
export type CatColor = string;
export type CatClassification =
  | "CATenean"
  | "KITTENean"
  | "Rescued_CATenean"
  | "Rescued_KITTENean";
export type CatStatus = string;
export type CatLocation = string;
export type Vitamin = string;
export type Vaccine = string;

export interface CreateNewCatDTO {
  name: string;
  sex: Sex;
  dob: string;
  dateRescued?: string;
  dateDeceased?: string;
  reproductiveStatus?: ReproductiveStatus;
  personality: string;
  colors: CatColor[];
  classification: CatClassification;
  status: CatStatus;
  imageUrl?: string;
  motherId?: number;
  fatherId?: number;
  currentLocation: CatLocation;
  vitamins?: Vitamin[];
  vaccines?: Vaccine[];
}

export interface UpdateCatDTO extends Partial<CreateNewCatDTO> {
  currentLocation?: CatLocation;
}

export const getAllCateneans = async (
  filters?: CateneanDTO,
): Promise<Catenean[]> => {
  const queryParams = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.set(key, String(value));
      }
    });
  }

  const endpoint = queryParams.toString()
    ? `/api/public/cats?${queryParams.toString()}`
    : "/api/public/cats";

  const result = await apiClient<CateneanListResponse>(endpoint, {
    method: "GET",
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

  return [];
};

export const getCateneanById = async (id: number): Promise<Catenean> => {
  const result = await apiClient<Catenean>(`/api/public/cats/${id}`, {
    method: "GET",
  });

  return result;
};

export const getAdminCats = (): Promise<Catenean[]> => {
  return apiClient<Catenean[]>("/api/admin/cats", {
    method: "GET",
  });
};

/**
 * POST /api/admin/cats/create
 * SuperAdmin only - creates a new cat record
 */

export const adminCreateCat = async (
  formData: CreateNewCatDTO,
): Promise<Catenean> => {
  const payload = {
    name: formData.name,
    sex: formData.sex,
    dob: formData.dob,
    dateRescued: formData.dateRescued,
    dateDeceased: formData.dateDeceased,
    reproductiveStatus: formData.reproductiveStatus,
    personality: formData.personality,
    colors: formData.colors,
    classification: formData.classification,
    status: formData.status,
    imageUrl: formData.imageUrl,
    motherId: formData.motherId,
    fatherId: formData.fatherId,
    currentLocation: formData.currentLocation,
    vitamins: formData.vitamins,
    vaccines: formData.vaccines,
  };
  const result = await apiClient<Catenean>("/api/admin/cats/create", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * GET /api/admin/cats/parents/mothers
 * Returns eligible mother cats (female, resident)
 */
export const getEligibleMothers = async (): Promise<Catenean[]> => {
  const result = await apiClient<Catenean[]>(
    "/api/admin/cats/parents/mothers",
    {
      method: "GET",
    },
  );
  return result;
};

/**
 * GET /api/admin/cats/parents/fathers
 * Returns eligible father cats (male, resident)
 */
export const getEligibleFathers = async (): Promise<Catenean[]> => {
  const result = await apiClient<Catenean[]>(
    "/api/admin/cats/parents/fathers",
    {
      method: "GET",
    },
  );
  return result;
};

/**
 * GET /api/admin/cats/:id
 * Any Admin - fetches full admin details
 */

export const getAdminCatById = async (id: number): Promise<Catenean> => {
  const result = await apiClient<Catenean>(`/api/admin/cats/${id}`, {
    method: "GET",
  });
  return result;
};

/**
 * PATCH /api/admin/cats/:id
 * Any Admin - updates general info
 */

export const adminUpdateCat = async (
  id: number,
  formData: UpdateCatDTO,
): Promise<Catenean> => {
  const payload = {
    name: formData.name,
    sex: formData.sex,
    dob: formData.dob,
    dateRescued: formData.dateRescued,
    dateDeceased: formData.dateDeceased,
    reproductiveStatus: formData.reproductiveStatus,
    colors: formData.colors,
    classification: formData.classification,
    status: formData.status,
    imageUrl: formData.imageUrl,
    motherId: formData.motherId,
    fatherId: formData.fatherId,
    currentLocation: formData.currentLocation,
    vitamins: formData.vitamins,
    vaccines: formData.vaccines,
    personality: formData.personality,
  };
  const result = await apiClient<Catenean>(`/api/admin/cats/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * PATCH /api/admin/cats/:id/status
 * Any Admin - updates status field
 */

export const adminUpdateCatStatus = async (
  id: number,
  status: string,
  adoptedId: string,
): Promise<Catenean> => {
  const payload = {
    status,
    adoptedId,
  };

  const result = await apiClient<Catenean>(`/api/admin/cats/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * PATCH /api/admin/cats/:id/adopt
 * Any Admin - finalizes adoption
 */

interface AtomicAdoptionDto {
  catId: string;
  adopterName: string;
}

export const adminAdoptCat = async (
  id: number,
  adopterName: string,
): Promise<Catenean> => {
  const payload = {
    adopterName,
  };
  const result = await apiClient<Catenean>(`/api/admin/cats/${id}/adopt`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * POST /api/admin/cats/adopt-atomic
 * Atomic adoption: creates adopter and links cat in a single transaction
 */

export const adminAtomicAdoptCat = async (
  catId: number,
  adopterName: string,
): Promise<Catenean> => {
  const payload: AtomicAdoptionDto = {
    catId: catId.toString(),
    adopterName,
  };
  const result = await apiClient<Catenean>("/api/admin/cats/adopt-atomic", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * DELETE /api/admin/cats/:id
 * SuperAdmin only - hard delete a cat if all business rules are satisfied
 */

export const adminDeleteCat = async (id: number): Promise<void> => {
  await apiClient(`/api/admin/cats/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

/**
 * POST /api/admin/cats/:id/revert-adoption
 * Reverts a cat adoption (makes cat available again)
 */

export const adminRevertAdoption = async (id: number): Promise<Catenean> => {
  const result = await apiClient<Catenean>(
    `/api/admin/cats/${id}/revert-adoption`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  return result;
};
