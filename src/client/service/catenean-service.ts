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
  currentLocation?: string;
  location?: string;
  current_location?: string;
  currentlocation?: string;
  residence?: string;
}

type CateneanListResponse =
  | Catenean[]
  | {
      data?: Catenean[];
      items?: Catenean[];
      results?: Catenean[];
      meta?: Partial<CateneanPaginationMeta>;
    };

export interface CateneanPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CateneanPage {
  data: Catenean[];
  meta: CateneanPaginationMeta;
}

const normalizeCateneanList = (result: CateneanListResponse): Catenean[] => {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.items)) return result.items;
  if (Array.isArray(result?.results)) return result.results;
  return [];
};

const normalizeCateneanPage = (
  result: CateneanListResponse,
  requestedPage = 1,
  requestedLimit = 10,
): CateneanPage => {
  const data = normalizeCateneanList(result);
  const meta = Array.isArray(result) ? undefined : result.meta;
  const total = meta?.total ?? data.length;
  const limit = meta?.limit ?? requestedLimit;

  return {
    data,
    meta: {
      total,
      page: meta?.page ?? requestedPage,
      limit,
      totalPages: meta?.totalPages ?? Math.max(1, Math.ceil(total / limit)),
    },
  };
};

export interface CateneanDTO {
  page?: number;
  limit?: number;
  status?: CatStatus;
  classification?: CatClassification;
  type?: "catenean" | "kittenean";
  sex?: Sex;
  name?: string;
  reproductiveStatus?: ReproductiveStatus;
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

export const getCatColors = () => apiClient<CatColor[]>("/api/cats/colors");

export const getAllCateneans = async (
  filters?: CateneanDTO,
): Promise<CateneanPage> => {
  const queryParams = new URLSearchParams();

  if (filters?.page !== undefined) {
    queryParams.set("page", String(filters.page));
  }
  if (filters?.limit !== undefined) {
    queryParams.set("limit", String(filters.limit));
  }
  if (filters?.status) queryParams.set("status", filters.status);
  if (filters?.classification) {
    queryParams.set("classification", filters.classification);
  }
  if (filters?.type) queryParams.set("type", filters.type);
  if (filters?.sex) queryParams.set("sex", filters.sex);
  if (filters?.name) queryParams.set("name", filters.name);
  if (filters?.reproductiveStatus) {
    queryParams.set("reproductiveStatus", filters.reproductiveStatus);
  }

  const endpoint = queryParams.toString()
    ? `/api/cats?${queryParams.toString()}`
    : "/api/cats";

  const result = await apiClient<CateneanListResponse>(endpoint, {
    method: "GET",
  });

  return normalizeCateneanPage(result, filters?.page, filters?.limit);
};

export const getCateneanById = async (id: number): Promise<Catenean> => {
  const result = await apiClient<Catenean>(`/api/cats/${id}`, {
    method: "GET",
  });

  return result;
};

export const getAdminCats = async (
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
    ? `/api/cats/admin?${queryParams.toString()}`
    : "/api/cats/admin";

  const result = await apiClient<CateneanListResponse>(endpoint, {
    method: "GET",
    credentials: "include",
  });

  return normalizeCateneanList(result);
};

/**
 * POST /api/cats/admin
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
  const result = await apiClient<Catenean>("/api/cats/admin", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * GET /api/cats/admin/parents/mothers
 * Returns eligible mother cats (female, resident)
 */
export const getEligibleMothers = async (): Promise<Catenean[]> => {
  const result = await apiClient<CateneanListResponse>(
    "/api/cats/admin/parents/mothers",
    {
      method: "GET",
    },
  );
  return normalizeCateneanList(result);
};

/**
 * GET /api/cats/admin/parents/fathers
 * Returns eligible father cats (male, resident)
 */
export const getEligibleFathers = async (): Promise<Catenean[]> => {
  const result = await apiClient<CateneanListResponse>(
    "/api/cats/admin/parents/fathers",
    {
      method: "GET",
    },
  );
  return normalizeCateneanList(result);
};

/**
 * GET /api/cats/admin/:id
 * Any Admin - fetches full admin details
 */

export const getAdminCatById = async (id: number): Promise<Catenean> => {
  const result = await apiClient<Catenean>(`/api/cats/admin/${id}`, {
    method: "GET",
  });
  return result;
};

/**
 * PATCH /api/cats/admin/:id
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
  const result = await apiClient<Catenean>(`/api/cats/admin/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * PATCH /api/cats/admin/:id/status
 * Any Admin - updates status field
 */

export const adminUpdateCatStatus = async (
  id: number,
  status: string,
  adopterId?: number,
): Promise<Catenean> => {
  const payload = {
    status,
    adopterId,
  };

  const result = await apiClient<Catenean>(`/api/cats/admin/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * POST /api/cats/admin/:id/adoption
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
  const result = await apiClient<Catenean>(
    `/api/cats/admin/${id}/adoption`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      credentials: "include",
    },
  );
  return result;
};

/**
 * POST /api/cats/admin/adoptions
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
  const result = await apiClient<Catenean>("/api/cats/admin/adoptions", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return result;
};

/**
 * DELETE /api/cats/admin/:id
 * SuperAdmin only - hard delete a cat if all business rules are satisfied
 */

export const adminDeleteCat = async (id: number): Promise<void> => {
  await apiClient(`/api/cats/admin/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

/**
 * DELETE /api/cats/admin/:id/adoption
 * Reverts a cat adoption (makes cat available again)
 */

export const adminRevertAdoption = async (id: number): Promise<Catenean> => {
  const result = await apiClient<Catenean>(
    `/api/cats/admin/${id}/adoption`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  return result;
};
