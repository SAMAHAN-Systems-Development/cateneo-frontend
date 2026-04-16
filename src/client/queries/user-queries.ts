import { useQuery } from "@tanstack/react-query";
import {
  findAllUsers,
  getMyProfile,
  type PaginationQueryDTO,
} from "../service/user-service";

export const useFindAllUsers = (pagination: PaginationQueryDTO = {}) => {
  return useQuery({
    queryKey: ["find-all-users", pagination],
    queryFn: () => findAllUsers(pagination),
  });
};

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["get-my-profile"],
    queryFn: () => getMyProfile(),
  });
};
