"use client";

import React from "react";

import { RoundedButton } from "@/components/ui/rounded-button";
import { cn } from "@/lib/utils";

export type DeleteUserModalProps = {
  userName?: string;
  actionLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
};

export function DeleteUserModal({
  userName = "this user",
  actionLabel = "remove",
  confirmLabel = "Confirm",
  onConfirm = () => {},
  onCancel = () => {},
  className,
}: DeleteUserModalProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`${actionLabel} ${userName}`}
      onClick={onCancel}
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
      }}
      tabIndex={-1}
    >
      <div
        className="w-full max-w-2xl rounded-[2.5rem] bg-cateneo-white px-8 py-10 text-center font-gaegu text-cateneo-black shadow-2xl sm:px-12 sm:py-12"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-2xl leading-tight sm:text-3xl md:text-4xl">
          Are you sure you want to {actionLabel}
        </p>

        <p className="mt-4 text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
          {userName}?
        </p>

        <div className="mt-5 flex items-center justify-center gap-6 sm:gap-10">
          <RoundedButton
            type="button"
            onClick={onConfirm}
            variant="default"
            className="bg-success-five text-cateneo-white hover:bg-success-four focus-visible:ring-success-three"
          >
            {confirmLabel}
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
