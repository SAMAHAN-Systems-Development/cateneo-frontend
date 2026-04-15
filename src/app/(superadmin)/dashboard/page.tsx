"use client";

import { useState } from "react";
import Dashboard, {
  DashboardTabConfig,
} from "@/components/sections/dashboard-section";
import CateneanCard, { CatProps } from "@/components/ui/catenean-card";
import KitteneanCard from "@/components/ui/kittenean-card";
import { useGetAllCats } from "@/client/queries/cat-queries";
import { CateneanDTO } from "@/client/service/catenean-service";

type CardColor = CatProps["color"][number];

const ALLOWED_COLORS: CardColor[] = [
  "white",
  "darkbrown",
  "lightbrown",
  "orange",
  "black",
];

const toCardColors = (colors: string[]): CardColor[] => {
  const filteredColors = colors.filter((color): color is CardColor => {
    return ALLOWED_COLORS.includes(color as CardColor);
  });

  return filteredColors.length > 0 ? filteredColors : ["orange"];
};

const toCardSex = (sex: string): CatProps["sex"] => {
  return sex.toLowerCase() === "female" ? "female" : "male";
};

const toIsoDateString = (value?: string | Date) => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  return value.toISOString();
};

const toReadableDate = (value?: string | Date) => {
  if (!value) return "N/A";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

type RawCat = {
  id: number;
  name: string;
  sex: string;
  dob?: string | Date;
  colors: string[];
  personality: string;
  imageUrl: string;
  reproductiveStatus: string;
  classification: string;
  status?: string;
  currentLocation?: string;
  vitamins?: string[];
};

type DashboardCardData = CatProps & {
  rawCat: RawCat;
};

const toCardData = (cats: RawCat[] | undefined): DashboardCardData[] => {
  if (!Array.isArray(cats)) {
    return [];
  }

  return cats.map((cat) => {
    const cardColors = toCardColors(
      Array.isArray(cat.colors) ? cat.colors : [],
    );

    return {
      imageUrl: cat.imageUrl || "/images/cat-placeholder.png",
      sex: toCardSex(cat.sex ?? "male"),
      catName: cat.name || "Unknown Cat",
      location: cat.currentLocation || "Cateneo Shelter",
      color: cardColors,
      healthStatus: cat.classification || "N/A",
      medicine: cat.reproductiveStatus || null,
      personality: cat.personality || "No personality details yet.",
      svgColor: cardColors[0],
      rawCat: cat,
    };
  });
};

const renderCateneans = (
  cats: DashboardCardData[],
  searchQuery: string,
  onEditCard: (card: {
    id?: string | number;
    name: string;
    sex?: string;
    classification?: string;
    dob?: string;
    status?: string;
    currentLocation?: string;
    vitamins?: string[];
    healthStatus?: string[];
    personality?: string;
    colors?: string[];
    imageUrl?: string;
  }) => void,
) => {
  const query = searchQuery.trim().toLowerCase();
  const filteredCats = cats.filter((cat) => {
    if (!query) return true;

    return (
      cat.catName.toLowerCase().includes(query) ||
      cat.location.toLowerCase().includes(query) ||
      cat.personality.toLowerCase().includes(query)
    );
  });

  if (filteredCats.length === 0) {
    return (
      <p className="font-gaegu text-2xl text-cateneo-darkbrown">
        No cats found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {filteredCats.map((cat) => (
        <CateneanCard
          key={cat.catName}
          {...cat}
          onEdit={() =>
            onEditCard({
              id: cat.rawCat.id,
              name: cat.rawCat.name,
              sex: cat.rawCat.sex,
              classification: cat.rawCat.classification,
              dob: toIsoDateString(cat.rawCat.dob),
              status: cat.rawCat.status,
              currentLocation: cat.rawCat.currentLocation,
              vitamins: cat.rawCat.vitamins,
              healthStatus: cat.rawCat.reproductiveStatus
                ? [cat.rawCat.reproductiveStatus]
                : [],
              personality: cat.rawCat.personality,
              colors: cat.rawCat.colors,
              imageUrl: cat.rawCat.imageUrl,
            })
          }
        />
      ))}
    </div>
  );
};

const renderKitteneans = (
  kittens: DashboardCardData[],
  searchQuery: string,
  onEditCard: (card: {
    id?: string | number;
    name: string;
    sex?: string;
    classification?: string;
    dob?: string;
    status?: string;
    currentLocation?: string;
    vitamins?: string[];
    healthStatus?: string[];
    personality?: string;
    colors?: string[];
    imageUrl?: string;
  }) => void,
) => {
  const query = searchQuery.trim().toLowerCase();
  const filteredKittens = kittens.filter((kitten) => {
    if (!query) return true;

    return (
      kitten.catName.toLowerCase().includes(query) ||
      kitten.location.toLowerCase().includes(query) ||
      kitten.personality.toLowerCase().includes(query)
    );
  });

  if (filteredKittens.length === 0) {
    return (
      <p className="font-gaegu text-2xl text-cateneo-darkbrown">
        No cats found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {filteredKittens.map((kitten) => (
        <KitteneanCard
          key={kitten.catName}
          imageUrl={kitten.imageUrl}
          name={kitten.catName}
          gender={kitten.sex}
          parent="N/A"
          dateOfBirth={toReadableDate(kitten.rawCat.dob)}
          medicine={kitten.medicine}
          residence={kitten.location}
          color={kitten.color}
          healthStatus={kitten.healthStatus}
          status={kitten.rawCat.status || "N/A"}
          personality={kitten.personality}
          svgColor={kitten.svgColor}
        />
      ))}
    </div>
  );
};

const Page = () => {
  const [activeTabId, setActiveTabId] = useState("cateneans");

  const tabFilters: Record<string, CateneanDTO> = {
    cateneans: { type: "catenean" },
    kitteneans: { type: "kittenean" },
    "crossed-the-rainbow": { status: "deceased" },
  };

  const {
    data: adminCats = [],
    isLoading,
    isError,
  } = useGetAllCats(tabFilters[activeTabId]);

  const fetchedCateneans = toCardData(adminCats);

  const dashboardTabs: DashboardTabConfig[] = [
    {
      id: "cateneans",
      label: "Cateneans",
      content: ({ searchQuery, onEditCard }) =>
        renderCateneans(fetchedCateneans, searchQuery, onEditCard),
    },
    {
      id: "kitteneans",
      label: "Kitteneans",
      content: ({ searchQuery, onEditCard }) =>
        renderKitteneans(fetchedCateneans, searchQuery, onEditCard),
    },
    {
      id: "crossed-the-rainbow",
      label: "Crossed the Rainbow",
      content: ({ searchQuery, onEditCard }) =>
        renderCateneans(fetchedCateneans, searchQuery, onEditCard),
    },
  ];

  if (isLoading) {
    return (
      <p className="font-gaegu text-2xl text-cateneo-darkbrown">
        Loading cateneans...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="font-gaegu text-2xl text-red-600">
        Failed to load cateneans.
      </p>
    );
  }

  return (
    <Dashboard
      tabs={dashboardTabs}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
    />
  );
};

export default Page;
