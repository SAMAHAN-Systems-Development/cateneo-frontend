import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  changeUserPasswordService,
  getMyProfile,
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
  const router = useRouter();

  return useMutation({
    mutationKey: ["update-user-by-admin"],
    mutationFn: ({
      id,
      userData,
    }: {
      id: string;
      userData: UpdateUserByAdminDTO;
    }) => updateUserByAdmin(id, userData),
    onSuccess: async (updatedUser) => {
      const profile = queryClient.getQueryData<
        Awaited<ReturnType<typeof getMyProfile>>
      >(["get-my-profile"]);
      const isEditingSelf =
        profile && String(profile.id) === String(updatedUser.id);

      if (isEditingSelf) {
        await queryClient.cancelQueries({ queryKey: ["get-my-profile"] });
        queryClient.setQueryData(["get-my-profile"], { ...profile, ...updatedUser });
        queryClient.setQueryData<{ user: { role: string } | null }>(
          ["currentUser"],
          (current) =>
            current?.user
              ? { ...current, user: { ...current.user, role: updatedUser.role } }
              : current,
        );

        if (updatedUser.role === "Volunteer") {
          // The account can no longer fetch the SuperAdmin-only users list.
          await queryClient.cancelQueries({ queryKey: ["find-all-users"] });
          await queryClient.invalidateQueries({
            queryKey: ["find-all-users"],
            refetchType: "none",
          });
          router.replace("/dashboard/cateneans");
          return;
        }
      }

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
