import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeUserPasswordService,
  reactivateUser,
  softDeleteUser,
  updateMyProfile,
  updateUserByAdmin,
  updateUserStatus,
  type UpdateUserByAdminDTO,
} from "../service/user-service";

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

type ChangeUserPasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export const useChangeUserPassword = () => {
  return useMutation({
    mutationKey: ["change-user-password"],
    mutationFn: ({ currentPassword, newPassword }: ChangeUserPasswordInput) =>
      changeUserPasswordService({ currentPassword, newPassword }),
  });
};

export const useUpdaterUserByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user-by-admin"],
    mutationFn: ({
      id,
      userData,
    }: {
      id: string;
      userData: UpdateUserByAdminDTO;
    }) => updateUserByAdmin(id, userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["find-all-users"] });
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user-status"],
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateUserStatus(id, isActive),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["find-all-users"] });
    },
  });
};

export const useSoftDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["soft-delete-user"],
    mutationFn: (id: string) => softDeleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["find-all-users"] });
    },
  });
};

export const useReactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["reactivate-user"],
    mutationFn: (id: string) => reactivateUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["find-all-users"] });
    },
  });
};
