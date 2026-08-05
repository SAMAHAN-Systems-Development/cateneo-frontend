import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CateneanDTO,
  getAdminCatById,
  getAdminCats,
  getAllCateneans,
  getCateneanById,
  getEligibleFathers,
  getEligibleMothers,
} from "../service/catenean-service";

const getStableFiltersKey = (filters?: CateneanDTO) => {
  if (!filters) return "";

  return JSON.stringify(
    Object.entries(filters)
      .filter(([, value]) => value !== undefined && value !== null)
      .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey)),
  );
};

const toStableFilters = (filtersKey: string) => {
  if (!filtersKey) return undefined;

  return Object.fromEntries(JSON.parse(filtersKey)) as CateneanDTO;
};

export const useGetAllCats = (filters?: CateneanDTO) => {
  const filtersKey = getStableFiltersKey(filters);
  const stableFilters = useMemo(
    () => toStableFilters(filtersKey),
    [filtersKey],
  );
  const queryKey = useMemo(
    () => ["getAllCats", stableFilters] as const,
    [stableFilters],
  );

  return useQuery({
    queryKey,
    queryFn: () => getAllCateneans(stableFilters),
  });
};

export const useGetAdminCats = () => {
  return useQuery({
    queryKey: ["admin-cats"],
    queryFn: () => getAdminCats(),
  });
};

export const useGetCateneanById = (id: number) => {
  return useQuery({
    queryKey: ["catenean", id],
    queryFn: () => getCateneanById(id),
  });
};

export const useGetEligbleMothers = () => {
  return useQuery({
    queryKey: ["eligible-mothers"],
    queryFn: getEligibleMothers,
  });
};

export const useGetEligbleFathers = () => {
  return useQuery({
    queryKey: ["eligible-fathers"],
    queryFn: getEligibleFathers,
  });
};

export const useGetAdminCatById = (id: number) => {
  return useQuery({
    queryKey: ["admin-cat", id],
    queryFn: () => getAdminCatById(id),
  });
};
