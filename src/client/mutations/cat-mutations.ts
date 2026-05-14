import { useMutation } from "@tanstack/react-query";
import {
  UpdateCatDTO,
  adminCreateCat,
  adminUpdateCat,
  adminUpdateCatStatus,
  adminAtomicAdoptCat,
  adminAdoptCat,
  adminDeleteCat,
  adminRevertAdoption,
} from "../service/catenean-service";

export const useAdminCreateCat = () => {
  return useMutation({
    mutationFn: adminCreateCat,
  });
};

export const useAdminUpdateCat = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: UpdateCatDTO }) =>
      adminUpdateCat(id, formData),
  });
};

export const useAdminUpdateCatStatus = () => {
  return useMutation({
    mutationFn: ({
      id,
      status,
      adopterId,
    }: {
      id: number;
      status: string;
      adopterId?: number;
    }) => adminUpdateCatStatus(id, status, adopterId),
  });
};

export const useAdminAdoptCat = () => {
  return useMutation({
    mutationFn: ({ id, adopterName }: { id: number; adopterName: string }) =>
      adminAdoptCat(id, adopterName),
  });
};

export const useAdminAtomicAdoptCat = () => {
  return useMutation({
    mutationFn: ({
      catId,
      adopterName,
    }: {
      catId: number;
      adopterName: string;
    }) => adminAtomicAdoptCat(catId, adopterName),
  });
};

export const useAdminDeleteCat = () => {
  return useMutation({
    mutationFn: (id: number) => adminDeleteCat(id),
  });
};

export const useAdminRevertAdoption = () => {
  return useMutation({
    mutationFn: (id: number) => adminRevertAdoption(id),
  });
};
