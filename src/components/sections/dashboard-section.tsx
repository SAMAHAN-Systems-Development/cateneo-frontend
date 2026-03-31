"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import TabButton from "../ui/tab-button";
import { Input } from "../ui/input";

export type DashboardTabConfig = {
  id: string;
  label: string;
  content:
    | ReactNode
    | ((args: { searchQuery: string; tabId: string }) => ReactNode);
};

type DashboardSectionProps = {
  tabs: DashboardTabConfig[];
  title?: string;
  searchPlaceholder?: string;
};

const Dashboard = ({
  tabs,
  title = "Admin Dashboard",
  searchPlaceholder = "Search for Cat",
}: DashboardSectionProps) => {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id ?? "");
  const [searchQuery, setSearchQuery] = useState("");

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

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

          <div
            className="grid w-full grid-cols-1 gap-2 pb-0 md:w-auto md:min-w-140 md:gap-0"
            style={{
              gridTemplateColumns: `repeat(${Math.max(tabs.length, 1)}, minmax(0, 1fr))`,
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab?.id === tab.id;

              return (
                <TabButton
                  key={tab.id}
                  title={tab.label}
                  color="orange"
                  style={isActive ? "filledDark" : "invertedDark"}
                  tabChange={() => setActiveTabId(tab.id)}
                  className="h-11! px-4 text-sm sm:text-base"
                />
              );
            })}
          </div>
        </div>

        <div className="mt-4 w-full max-w-sm">
          <div className="relative">
            <Input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-12 rounded-full border-2 border-cateneo-lightbrown bg-cateneo-white pl-4 pr-11 font-gaegu !text-2xl text-cateneo-darkbrown placeholder:text-cateneo-darkbrown focus-visible:border-cateneo-darkbrown !font-bold focus-visible:ring-0"
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

        <div className="mt-4">
          {typeof activeTab?.content === "function"
            ? activeTab.content({ searchQuery, tabId: activeTab.id })
            : activeTab?.content}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
