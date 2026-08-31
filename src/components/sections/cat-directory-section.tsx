"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useGetAllCats } from "@/client/queries/cat-queries";
import PublicCateneanCard, {
  type PublicCateneanCardProps,
} from "@/components/ui/public-catenean-card";
import PublicKitteneanCard, {
  type PublicKitteneanCardProps,
} from "@/components/ui/public-kittenean-card";
import TabButton from "@/components/ui/tab-button";
import { Button } from "@/components/ui/button";
import { PageTransitionOverlay } from "@/components/ui/page-transition-overlay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = ["Cateneans", "Kitteneans", "Cherished Felines"] as const;
type TabName = (typeof tabs)[number];

type DirectoryCat = {
  id: number;
  name?: string;
  sex?: string;
  dob?: string | Date;
  colors?: string[];
  personality?: string;
  imageUrl?: string;
  reproductiveStatus?: string;
  classification?: string;
  status?: string;
  currentLocation?: string;
  currentlocation?: string;
  location?: string;
  current_location?: string;
  residence?: string;
};

type CardColor = PublicCateneanCardProps["color"][number];
const allowedColors: CardColor[] = [
  "white",
  "darkbrown",
  "lightbrown",
  "orange",
  "black",
  "gray",
];

const toColors = (values?: string[]): CardColor[] => {
  const colors = (values ?? [])
    .map((value) => {
      const normalized = value.toLowerCase().replace(/[\s_-]/g, "");
      const color = normalized === "grey" ? "gray" : normalized;
      return allowedColors.includes(color as CardColor)
        ? (color as CardColor)
        : null;
    })
    .filter((color): color is CardColor => color !== null);
  return colors.length > 0 ? colors : ["orange"];
};

const toLocation = (cat: DirectoryCat) => {
  const location = [
    cat.currentLocation,
    cat.currentlocation,
    cat.location,
    cat.current_location,
    cat.residence,
  ].find((value) => value?.trim());
  return (location ?? "Cateneo Shelter").replace(/_/g, " ").trim();
};

const toDate = (value?: string | Date) => {
  if (!value) return "N/A";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const toCateneanCard = (cat: DirectoryCat): PublicCateneanCardProps => {
  const colors = toColors(cat.colors);
  return {
    imageUrl: cat.imageUrl || "/images/cat-placeholder.png",
    sex: cat.sex?.toLowerCase() === "female" ? "female" : "male",
    catName: cat.name || "Unknown Cat",
    location: toLocation(cat),
    color: colors,
    healthStatus: cat.classification || "N/A",
    medicine: cat.reproductiveStatus || null,
    personality: cat.personality || "No personality details yet.",
    svgColor: colors[0],
  };
};

const toKitteneanCard = (cat: DirectoryCat): PublicKitteneanCardProps => {
  const colors = toColors(cat.colors);
  return {
    imageUrl: cat.imageUrl || "/images/cat-placeholder.png",
    name: cat.name || "Unknown Kittenean",
    gender: cat.sex?.toLowerCase() === "female" ? "female" : "male",
    parent: "N/A",
    dateOfBirth: toDate(cat.dob),
    medicine: cat.reproductiveStatus || null,
    residence: toLocation(cat),
    color: colors,
    healthStatus: cat.classification || "N/A",
    status: cat.status || "N/A",
    personality: cat.personality || "No personality details yet.",
    svgColor: colors[0],
  };
};

const CatDirectorySection = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Cateneans");
  const [cateneanPage, setCateneanPage] = useState(1);
  const [kitteneanPage, setKitteneanPage] = useState(1);
  const [cateneanLimit, setCateneanLimit] = useState(10);
  const [kitteneanLimit, setKitteneanLimit] = useState(10);
  const cateneansQuery = useGetAllCats(
    {
      type: "catenean",
      page: cateneanPage,
      limit: cateneanLimit,
    },
    { keepPreviousData: true, minimumDelayMs: 300 },
  );
  const kitteneansQuery = useGetAllCats(
    {
      type: "kittenean",
      page: kitteneanPage,
      limit: kitteneanLimit,
    },
    { keepPreviousData: true, minimumDelayMs: 300 },
  );

  const cateneanTotalPages = Math.max(
    1,
    cateneansQuery.data?.meta.totalPages ?? 1,
  );
  const kitteneanTotalPages = Math.max(
    1,
    kitteneansQuery.data?.meta.totalPages ?? 1,
  );

  const cateneans = useMemo(
    () =>
      ((cateneansQuery.data?.data ?? []) as DirectoryCat[]).map(
        toCateneanCard,
      ),
    [cateneansQuery.data?.data],
  );
  const kitteneans = useMemo(
    () =>
      ((kitteneansQuery.data?.data ?? []) as DirectoryCat[]).map(
        toKitteneanCard,
      ),
    [kitteneansQuery.data?.data],
  );

  const activeQuery =
    activeTab === "Cateneans"
      ? cateneansQuery
      : activeTab === "Kitteneans"
        ? kitteneansQuery
        : null;

  return (
    <section className="w-full bg-cateneo-white px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-0">
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              title={tab}
              color="orange"
              style={activeTab === tab ? "invertedLight" : "invertedDark"}
              tabChange={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {activeTab === "Cateneans" && (
          <DirectoryPagination
            position="top"
            page={cateneanPage}
            totalPages={cateneanTotalPages}
            onPageChange={setCateneanPage}
            isPending={cateneansQuery.isFetching}
            limit={cateneanLimit}
            onLimitChange={(limit) => {
              setCateneanLimit(limit);
              setCateneanPage(1);
            }}
          />
        )}
        {activeTab === "Kitteneans" && (
          <DirectoryPagination
            position="top"
            page={kitteneanPage}
            totalPages={kitteneanTotalPages}
            onPageChange={setKitteneanPage}
            isPending={kitteneansQuery.isFetching}
            limit={kitteneanLimit}
            onLimitChange={(limit) => {
              setKitteneanLimit(limit);
              setKitteneanPage(1);
            }}
          />
        )}

        <div
          className="relative mt-10"
          aria-live="polite"
          aria-busy={activeQuery?.isFetching ?? false}
        >
          {activeQuery?.isFetching && !activeQuery.isLoading && (
            <PageTransitionOverlay />
          )}
          <div
            className={`transition-opacity duration-200 ${
              activeQuery?.isFetching && !activeQuery.isLoading
                ? "opacity-45"
                : "opacity-100"
            }`}
          >
          {activeQuery?.isLoading ? (
            <DirectoryMessage>Loading cats...</DirectoryMessage>
          ) : activeQuery?.isError ? (
            <DirectoryMessage error>Unable to load cats right now.</DirectoryMessage>
          ) : activeTab === "Cateneans" ? (
            cateneans.length > 0 ? (
              <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cateneans.map((cat, index) => (
                  <PublicCateneanCard key={`${cat.catName}-${index}`} {...cat} />
                ))}
              </div>
            ) : (
              <DirectoryMessage>No cats found.</DirectoryMessage>
            )
          ) : activeTab === "Kitteneans" ? (
            kitteneans.length > 0 ? (
              <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {kitteneans.map((cat, index) => (
                  <PublicKitteneanCard key={`${cat.name}-${index}`} {...cat} />
                ))}
              </div>
            ) : (
              <DirectoryMessage>No cats found.</DirectoryMessage>
            )
          ) : (
            <DirectoryMessage>
              Cherished felines will be available soon.
            </DirectoryMessage>
          )}
          </div>
        </div>

        {!activeQuery?.isLoading &&
          !activeQuery?.isError &&
          activeTab === "Cateneans" && (
            <DirectoryPagination
              page={cateneanPage}
              totalPages={cateneanTotalPages}
              onPageChange={setCateneanPage}
              isPending={cateneansQuery.isFetching}
            />
          )}
        {!activeQuery?.isLoading &&
          !activeQuery?.isError &&
          activeTab === "Kitteneans" && (
            <DirectoryPagination
              page={kitteneanPage}
              totalPages={kitteneanTotalPages}
              onPageChange={setKitteneanPage}
              isPending={kitteneansQuery.isFetching}
            />
          )}
      </div>
    </section>
  );
};

function DirectoryMessage({
  children,
  error = false,
}: {
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <p
      className={`text-center font-gaegu text-2xl ${
        error ? "text-error-five" : "text-cateneo-darkbrown"
      }`}
    >
      {children}
    </p>
  );
}

function DirectoryPagination({
  page,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
  position = "bottom",
  isPending = false,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  position?: "top" | "bottom";
  isPending?: boolean;
}) {
  return (
    <nav
      className={`${position === "top" ? "mt-6" : "mt-10"} flex flex-wrap items-center justify-center gap-3 font-gaegu text-cateneo-darkbrown`}
      aria-label="Cat directory pagination"
    >
      {limit !== undefined && onLimitChange && (
        <div className="mr-2 flex items-center gap-2">
          <span className="text-lg">Cats per page</span>
          <Select
            value={String(limit)}
            onValueChange={(value) => onLimitChange(Number(value))}
          >
            <SelectTrigger
              className="w-20 border-2 border-cateneo-lightbrown bg-cateneo-white font-gaegu text-lg text-cateneo-darkbrown"
              aria-label="Cats per page"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-2 border-cateneo-lightbrown bg-cateneo-white font-gaegu">
              {[5, 10, 15, 20].map((value) => (
                <SelectItem
                  key={value}
                  value={String(value)}
                  className="font-gaegu text-lg text-cateneo-darkbrown"
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous page"
        disabled={page <= 1 || isPending}
        onClick={() => onPageChange(page - 1)}
        className="border-2 border-cateneo-lightbrown"
      >
        <ChevronLeft />
      </Button>
      <span className="min-w-24 text-center text-lg">
        Page {page} of {totalPages}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Next page"
        disabled={page >= totalPages || isPending}
        onClick={() => onPageChange(page + 1)}
        className="border-2 border-cateneo-lightbrown"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}

export default CatDirectorySection;
