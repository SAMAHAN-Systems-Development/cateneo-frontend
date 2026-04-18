import {
  fetchRegisteredAdoptersService,
  getOneAdopterService,
} from "../service/adopters-service";
import { useQuery } from "@tanstack/react-query";

export const useGetRegisteredAdopters = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["registered-adopters", page, limit],
    queryFn: () => fetchRegisteredAdoptersService(page, limit),
  });
};

export const useGetOneAdopter = (id: string) => {
  return useQuery({
    queryKey: ["one-adopter", id],
    queryFn: () => getOneAdopterService(id),
  });
};
