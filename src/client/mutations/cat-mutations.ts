import { useMutation } from "@tanstack/react-query";
import {
  adminCreateCat,
  adminUpdateCat,
  adminUpdateCatStatus,
  adminAtomicAdoptCat,
  adminAdoptCat,
  adminDeleteCat,
  adminRevertAdoption,
  getAllCateneans,
} from "../service/catenean-service";
import { CateneanDTO } from "../service/catenean-service";

export const useAdminCreateCat = () => {
  return useMutation({
    mutationFn: adminCreateCat,
  });
};

export const useAdminUpdateCat = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: CateneanDTO }) =>
      adminUpdateCat(id, formData),
  });
};

export const useAdminUpdateCatStatus = () => {
  return useMutation({
    mutationFn: ({
      id,
      status,
      adoptedId,
    }: {
      id: number;
      status: string;
      adoptedId: string;
    }) => adminUpdateCatStatus(id, status, adoptedId),
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
