"use client";

import React from "react";

import { RoundedButton } from "@/components/ui/rounded-button";
import { cn } from "@/lib/utils";

export type ViewProfileModalProps = {
  userName?: string;
  email?: string;
  role?: string;
  isBlocked?: string;
  joinedAt?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
  onClose?: () => void;
  className?: string;
};

const detailItemClass =
  "rounded-2xl border border-cateneo-darkbrown/15 bg-cateneo-white px-4 py-3 text-left shadow-sm";

export function ViewProfileModal({
  userName = "this user",
  email = "-",
  role = "-",
  isBlocked = "-",
  joinedAt = "-",
  isLoading = false,
  errorMessage = null,
  onClose = () => {},
  className,
}: ViewProfileModalProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`Account details for ${userName}`}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      tabIndex={-1}
    >
      <div
        className="w-full max-w-2xl rounded-[2.5rem] bg-cateneo-white px-8 py-10 font-gaegu text-cateneo-black shadow-2xl sm:px-12 sm:py-12"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          Account details
        </p>

        <p className="mt-4 text-center text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          {userName}
        </p>

        {isLoading ? (
          <p className="mt-8 text-center text-2xl sm:text-3xl">
            Loading account details...
          </p>
        ) : errorMessage ? (
          <p className="mt-8 text-center text-xl sm:text-2xl text-cateneo-darkbrown">
            {errorMessage}
          </p>
        ) : (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className={detailItemClass}>
              <p className="text-sm uppercase tracking-[0.2em] text-cateneo-darkbrown/70">
                Email
              </p>
              <p className="mt-1 break-words text-xl sm:text-2xl">{email}</p>
            </div>
            <div className={detailItemClass}>
              <p className="text-sm uppercase tracking-[0.2em] text-cateneo-darkbrown/70">
                Role
              </p>
              <p className="mt-1 text-xl sm:text-2xl">{role}</p>
            </div>
            <div className={detailItemClass}>
              <p className="text-sm uppercase tracking-[0.2em] text-cateneo-darkbrown/70">
                Is Blocked
              </p>
              <p className="mt-1 text-xl sm:text-2xl">{isBlocked}</p>
            </div>
            <div className={detailItemClass}>
              <p className="text-sm uppercase tracking-[0.2em] text-cateneo-darkbrown/70">
                Joined At
              </p>
              <p className="mt-1 text-xl sm:text-2xl">{joinedAt}</p>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center">
          <RoundedButton
            type="button"
            onClick={onClose}
            variant="default"
            className="bg-cateneo-darkbrown text-cateneo-white hover:bg-cateneo-darkbrown/90 focus-visible:ring-cateneo-darkbrown"
          >
            Close
          </RoundedButton>
        </div>
      </div>
    </div>
  );
}
