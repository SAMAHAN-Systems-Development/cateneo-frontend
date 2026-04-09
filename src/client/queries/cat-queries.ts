import { useQuery } from "@tanstack/react-query";
import {
  getAdminCatById,
  getAdminCats,
  getCateneanById,
  getEligibleFathers,
  getEligibleMothers,
} from "../service/catenean-service";

export const useGetAdminCats = () => {
  return useQuery({
    queryKey: ["admin-cats"],
    queryFn: getAdminCats,
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
