"use client";

import Image from "next/image";
import { LoaderCircle } from "lucide-react";

type PageTransitionOverlayProps = {
  message?: string;
};

export function PageTransitionOverlay({
  message = "Fetching more cats...",
}: PageTransitionOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-start justify-center rounded-3xl bg-cateneo-white/70 px-4 pt-10 backdrop-blur-[2px]">
      <div
        className="relative flex min-w-60 flex-col items-center overflow-hidden rounded-[2rem] border-2 border-cateneo-darkbrown bg-cateneo-white px-8 py-6 text-center shadow-xl"
        role="status"
        aria-live="polite"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-cateneo-orange" />
        <div className="relative flex size-16 items-center justify-center rounded-full bg-cateneo-orange/10">
          <LoaderCircle
            className="absolute size-16 animate-spin text-cateneo-orange"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <Image
            src="/images/paw.svg"
            alt=""
            width={30}
            height={30}
            className="size-8"
            aria-hidden="true"
          />
        </div>
        <p className="mt-4 font-playpen text-xl font-bold text-cateneo-darkbrown">
          Just a moment
        </p>
        <p className="mt-1 font-gaegu text-lg text-cateneo-lightbrown">
          {message}
        </p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
