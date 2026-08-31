"use client";

import { useEffect } from "react";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";

import { RoundedButton } from "@/components/ui/rounded-button";

type AccountCreationResultModalProps = {
  open: boolean;
  status: "success" | "error";
  message: string;
  onClose: () => void;
};

export function AccountCreationResultModal({
  open,
  status,
  message,
  onClose,
}: AccountCreationResultModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  const isSuccess = status === "success";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-cateneo-black/50 p-4 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="account-creation-result-title"
      aria-describedby="account-creation-result-message"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-[2.5rem] border-[6px] bg-cateneo-white px-8 py-10 text-center font-gaegu shadow-2xl ${
          isSuccess ? "border-success-five" : "border-error-five"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {isSuccess ? (
          <IoMdCheckmarkCircleOutline
            className="mx-auto size-20 text-success-five"
            aria-hidden="true"
          />
        ) : (
          <IoMdCloseCircleOutline
            className="mx-auto size-20 text-error-five"
            aria-hidden="true"
          />
        )}

        <h2
          id="account-creation-result-title"
          className={`mt-3 font-playpen text-3xl font-bold ${
            isSuccess ? "text-success-five" : "text-error-five"
          }`}
        >
          {isSuccess ? "Account Created!" : "Account Creation Failed"}
        </h2>
        <p
          id="account-creation-result-message"
          className="mt-3 break-words text-xl text-cateneo-black sm:text-2xl"
        >
          {message}
        </p>

        <RoundedButton
          type="button"
          onClick={onClose}
          className={`mt-7 px-8 text-cateneo-white ${
            isSuccess
              ? "bg-success-five hover:bg-success-four focus-visible:ring-success-three"
              : "bg-error-five hover:bg-error-four focus-visible:ring-error-three"
          }`}
        >
          Close
        </RoundedButton>
      </div>
    </div>
  );
}
