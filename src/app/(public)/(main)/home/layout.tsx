import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
