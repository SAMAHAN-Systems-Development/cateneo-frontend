"use client";

import Dashboard, {
  DashboardTabConfig,
} from "@/components/sections/dashboard-section";
import CateneanCard, { CatProps } from "@/components/ui/catenean-card";
import KitteneanCard, { KitteneanProps } from "@/components/ui/kittenean-card";
import { cateneans, kitteneans } from "@/data/cateneans-data";

const renderCateneans = (cats: CatProps[], searchQuery: string) => {
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
        <CateneanCard key={cat.catName} {...cat} />
      ))}
    </div>
  );
};

const renderKitteneans = (kittens: KitteneanProps[], searchQuery: string) => {
  const query = searchQuery.trim().toLowerCase();
  const filteredKittens = kittens.filter((kitten) => {
    if (!query) return true;

    return (
      kitten.name.toLowerCase().includes(query) ||
      kitten.residence.toLowerCase().includes(query) ||
      kitten.personality.toLowerCase().includes(query)
    );
  });

  if (filteredKittens.length === 0) {
    return (
      <p className="font-gaegu text-2xl text-cateneo-darkbrown">
        No kittens found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {filteredKittens.map((kitten) => (
        <KitteneanCard key={kitten.name} {...kitten} />
      ))}
    </div>
  );
};

const tabs: DashboardTabConfig[] = [
  {
    id: "cateneans",
    label: "Cateneans",
    content: ({ searchQuery }) => renderCateneans(cateneans, searchQuery),
  },
  {
    id: "kitteneans",
    label: "Kitteneans",
    content: ({ searchQuery }) => renderKitteneans(kitteneans, searchQuery),
  },
  {
    id: "crossed-the-rainbow",
    label: "Crossed the Rainbow",
    content: (
      <p className="font-gaegu text-2xl text-cateneo-darkbrown">
        No entries yet.
      </p>
    ),
  },
];

const Page = () => {
  return <Dashboard tabs={tabs} />;
};

export default Page;
