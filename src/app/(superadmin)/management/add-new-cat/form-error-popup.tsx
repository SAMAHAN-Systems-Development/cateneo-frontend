"use client";

import React, { useEffect } from "react";
import { RoundedButton } from "@/components/ui/rounded-button";
import { cn } from "@/lib/utils";

export type FormErrorPopupProps = {
  errorMessage: string | null;
  onClose: () => void;
  className?: string;
};

export function FormErrorPopup({
  errorMessage,
  onClose,
  className,
}: FormErrorPopupProps) {
  // Listen for Escape key to close the popup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!errorMessage) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-cateneo-black/50 backdrop-blur-sm p-4 animate-fade-in-quick",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
      onClick={onClose}
    >
      {/* Inline styles for custom entrance animations */}
      <style>{`
        @keyframes fadeInQuick {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUpBouncy {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-quick {
          animation: fadeInQuick 0.15s ease-out forwards;
        }
        .animate-scale-up-bouncy {
          animation: scaleUpBouncy 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div
        className="w-full max-w-md rounded-[2.5rem] bg-cateneo-white border-[6px] border-error-five px-8 py-10 shadow-2xl font-gaegu text-center text-cateneo-black animate-scale-up-bouncy"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Error Header Icon/Symbol */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error-one text-error-five">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-9 w-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h3
          id="error-modal-title"
          className="font-playpen text-3xl font-bold text-error-five mb-3"
        >
          Submission Error
        </h3>

        <p className="text-xl sm:text-2xl leading-relaxed mb-6 font-gaegu text-cateneo-black break-words">
          {errorMessage}
        </p>

        <div className="flex items-center justify-center">
          <RoundedButton
            type="button"
            onClick={onClose}
            className="bg-error-five text-cateneo-white hover:bg-error-four focus-visible:ring-error-three px-8 py-2.5 text-xl font-bold shadow-md hover:scale-105 transition-all"
          >
            Close
          </RoundedButton>
        </div>
      </div>
    </div>
  );
}
