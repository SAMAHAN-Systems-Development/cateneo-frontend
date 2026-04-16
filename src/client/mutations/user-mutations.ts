import { useMutation } from "@tanstack/react-query";
import { updateMyProfile } from "../service/user-service";

type UpdateMyProfileInput = {
  firstName: string;
  lastName: string;
};

export const useUpdateMyProfile = () => {
  return useMutation({
    mutationKey: ["update-my-profile"],
    mutationFn: (data: UpdateMyProfileInput) =>
      updateMyProfile({
        firstName: data.firstName,
        lastName: data.lastName,
      }),
  });
};
