"use client";

import CateneanCard, { type CatProps } from "@/components/ui/catenean-card";

export type PublicCateneanCardProps = Omit<CatProps, "onEdit" | "onDelete">;

export default function PublicCateneanCard(props: PublicCateneanCardProps) {
  return <CateneanCard {...props} />;
}
