"use client";

import { useEffect, useRef } from "react";

import { RoundedButton } from "@/components/ui/rounded-button";

type LogoutConfirmModalProps = {
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function LogoutConfirmModal({
  isPending,
  onConfirm,
  onCancel,
}: LogoutConfirmModalProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    cancelButtonRef.current?.focus();

    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) onCancel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPending, onCancel]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-confirm-title"
      aria-busy={isPending}
      onClick={() => {
        if (!isPending) onCancel();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        event.preventDefault();
        if (isPending) return;

        if (document.activeElement === cancelButtonRef.current) {
          confirmButtonRef.current?.focus();
        } else {
          cancelButtonRef.current?.focus();
        }
      }}
    >
      <div
        className="w-full max-w-2xl rounded-[2.5rem] bg-cateneo-white px-8 py-10 text-center font-gaegu text-cateneo-black shadow-2xl sm:px-12 sm:py-12"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="logout-confirm-title">
          <span className="block text-2xl leading-tight sm:text-3xl md:text-4xl">
            Are you sure you want to
          </span>{" "}
          <span className="mt-4 block text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            log out?
          </span>
        </h2>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <RoundedButton
            ref={confirmButtonRef}
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="bg-success-five text-cateneo-white hover:bg-success-four focus-visible:ring-success-three"
          >
            {isPending ? "Logging out..." : "Confirm"}
          </RoundedButton>
          <RoundedButton
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="bg-[#83271B] text-cateneo-white hover:bg-[#A33A2B] focus-visible:ring-cateneo-darkbrown"
          >
            Cancel
          </RoundedButton>
        </div>
      </div>
    </div>
  );
}
