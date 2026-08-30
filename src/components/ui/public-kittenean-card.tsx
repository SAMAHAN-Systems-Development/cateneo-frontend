"use client";

import KitteneanCard, {
  type KitteneanProps,
} from "@/components/ui/kittenean-card";

export type PublicKitteneanCardProps = Omit<
  KitteneanProps,
  "onEdit" | "onDelete"
>;

export default function PublicKitteneanCard(
  props: PublicKitteneanCardProps,
) {
  return <KitteneanCard {...props} />;
}
