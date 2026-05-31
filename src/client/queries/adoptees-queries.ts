import { useQuery } from "@tanstack/react-query";
import { findAdoptees } from "../service/adoptees-service";

export const useFindAdoptees = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["adoptees", page, limit],
    queryFn: () => findAdoptees(page, limit),
  });
};
