import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const recoveryInputClass =
  "h-12 rounded-full border-2 border-cateneo-darkbrown px-4 text-base text-cateneo-darkbrown placeholder:text-cateneo-darkbrown/60 focus-visible:border-cateneo-darkbrown focus-visible:ring-cateneo-darkbrown/25 sm:h-14 md:text-base";

export const recoveryButtonClass =
  "w-full cursor-pointer rounded-full bg-cateneo-black px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-cateneo-darkbrown focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cateneo-darkbrown disabled:cursor-not-allowed disabled:opacity-50";

export const recoveryLinkClass =
  "rounded-sm text-cateneo-darkbrown underline underline-offset-4 hover:text-cateneo-lightbrown focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cateneo-darkbrown";

export function PasswordRecoveryCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="w-full max-w-md rounded-2xl border-2 border-cateneo-darkbrown bg-amber-50 p-6 shadow-lg sm:rounded-3xl sm:border-3 sm:p-8 md:border-4">
      <h1 className="text-center font-playpen text-2xl font-bold text-cateneo-darkbrown sm:text-3xl md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-center font-gaegu text-lg leading-snug text-cateneo-darkbrown">
          {description}
        </p>
      )}
      <div className="mt-6 font-gaegu text-cateneo-darkbrown">{children}</div>
      <div className="mt-6 text-center font-gaegu text-base">
        <Link
          href="/login"
          className={`inline-flex items-center gap-2 ${recoveryLinkClass}`}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to login
        </Link>
      </div>
    </section>
  );
}
