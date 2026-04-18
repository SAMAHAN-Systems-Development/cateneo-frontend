import { useMutation } from "@tanstack/react-query";
import { createAdopterService } from "../service/adopters-service";

export const useCreateAdopter = () => {
  return useMutation({
    mutationFn: createAdopterService,
  });
};
