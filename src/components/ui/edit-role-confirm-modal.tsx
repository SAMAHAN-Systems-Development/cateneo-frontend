"use client";

import React from "react";

import { RoundedButton } from "@/components/ui/rounded-button";
import { cn } from "@/lib/utils";

export type EditRoleConfirmModalProps = {
  userName?: string;
  roleLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
};

export function EditRoleConfirmModal({
  userName = "this user",
  roleLabel = "Volunteer",
  onConfirm = () => {},
  onCancel = () => {},
  className,
}: EditRoleConfirmModalProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`Confirm role change for ${userName}`}
      onClick={onCancel}
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
      }}
      tabIndex={-1}
    >
      <div
        className="w-full max-w-2xl rounded-[2.5rem] bg-cateneo-white px-8 py-10 font-gaegu text-cateneo-black shadow-2xl sm:px-12 sm:py-12"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          Are you sure you want to update
        </p>

        <p className="mt-4 text-center text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          {userName}'s role to {roleLabel}?
        </p>

        <div className="mt-5 flex items-center justify-center gap-6 sm:gap-10">
          <RoundedButton
            type="button"
            onClick={onConfirm}
            variant="default"
            className="bg-success-five text-cateneo-white hover:bg-success-four focus-visible:ring-success-three"
          >
            Confirm
          </RoundedButton>

          <RoundedButton
            type="button"
            onClick={onCancel}
            variant="default"
            className="bg-[#83271B] text-cateneo-white hover:bg-[#A33A2B] focus-visible:ring-cateneo-darkbrown"
          >
            Cancel
          </RoundedButton>
        </div>
      </div>
    </div>
  );
}
