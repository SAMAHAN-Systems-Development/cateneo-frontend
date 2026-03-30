"use client";

import { useState } from "react";
import TabButton from "../ui/tab-button";

const tabs = ["Cateneans", "Kitteneans", "Cherished Felines"] as const;
type TabName = (typeof tabs)[number];

const CatDirectorySection = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Cateneans");

  return (
    <section className="w-full bg-cateneo-white px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-3 gap-0">
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
      </div>
    </section>
  );
};

export default CatDirectorySection;
