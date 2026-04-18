"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import TabButton from "@/components/ui/tab-button";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard/cateneans", label: "Cateneans" },
  { href: "/dashboard/kitteneans", label: "Kitteneans" },
  {
    href: "/dashboard/crossed-the-rainbow",
    label: "Crossed the Rainbow",
  },
] as const;

type DashboardCategoryShellProps = {
  title: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
  children: ReactNode;
};

const isPathActive = (pathname: string, href: string) => {
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
};

export default function DashboardCategoryShell({
  title,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search for Cat",
  isLoading = false,
  errorMessage = null,
  children,
}: DashboardCategoryShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="w-full bg-cateneo-white px-3 py-4 sm:px-4 sm:py-5">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 border-b-2 border-cateneo-darkbrown sm:gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="flex items-center gap-2 font-gaegu text-2xl text-cateneo-black sm:text-3xl md:pb-1">
            <span>{title}</span>
            <Image
              src="/images/paw.svg"
              alt="Paw icon"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </h2>

          <nav
            className="grid w-full grid-cols-1 gap-2 pb-0 md:w-auto md:min-w-140 md:gap-0"
            style={{
              gridTemplateColumns: `repeat(${Math.max(NAV_ITEMS.length, 1)}, minmax(0, 1fr))`,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = isPathActive(pathname, item.href);

              return (
                <TabButton
                  key={item.href}
                  title={item.label}
                  color="orange"
                  style={isActive ? "filledDark" : "invertedDark"}
                  tabChange={() => router.push(item.href)}
                  className="h-11! px-4 text-sm sm:text-base"
                />
              );
            })}
          </nav>
        </div>

        <div className="mt-4 w-full max-w-sm">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-12 w-full rounded-full border-2 border-cateneo-lightbrown bg-cateneo-white pl-4 pr-11 font-gaegu text-2xl! font-bold! text-cateneo-darkbrown placeholder:text-cateneo-darkbrown focus-visible:border-cateneo-darkbrown focus-visible:ring-0"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cateneo-lightbrown"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {errorMessage ? (
          <div className="mt-4 rounded-3xl border-2 border-red-200 bg-red-50 px-6 py-10">
            <p className="font-gaegu text-2xl text-red-600">{errorMessage}</p>
          </div>
        ) : isLoading ? (
          <div className="mt-4 flex min-h-80 items-center justify-center rounded-3xl bg-cateneo-white/80 px-6 py-10 text-center">
            <div className="flex items-center gap-2 text-cateneo-darkbrown">
              <Spinner className="size-5" />
              <p className="font-gaegu text-2xl">Loading cats...</p>
            </div>
          </div>
        ) : (
          <div className="mt-4">{children}</div>
        )}
      </div>
    </section>
  );
}
