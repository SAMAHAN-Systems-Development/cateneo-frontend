import { CatProps } from "@/components/ui/catenean-card";
import { KitteneanProps } from "@/components/ui/kittenean-card";

export const cateneans: CatProps[] = [
  {
    imageUrl: "https://picsum.photos/200",
    sex: "male",
    catName: "Iggy",
    location: "Mezzanine Floor",
    color: ["orange"],
    healthStatus: "N/A",
    medicine: "💊 Nematicide, LG Vit",
    personality: "Loves to sleep and gets zoomies at night.",
    svgColor: "lightbrown",
  },
  {
    imageUrl: "https://picsum.photos/201",
    sex: "female",
    catName: "Peddy",
    location: "Mezzanine Floor",
    color: ["orange"],
    healthStatus: "N/A",
    medicine: "💊 Nematicide, LG Vit",
    personality: "Playful, curious, and loves attention.",
    svgColor: "darkbrown",
  },
];

export const kitteneans: KitteneanProps[] = [
  {
    imageUrl: "https://picsum.photos/202",
    name: "Favy",
    gender: "female",
    parent: "Peddy",
    dateOfBirth: "04/15/2025",
    residence: "Mezzanine Floor",
    color: ["orange"],
    healthStatus: "Healthy",
    medicine: "💊 Nematicide, LG Vit",
    status: "Adopted",
    personality: "Friendly and usually a lap cat.",
    svgColor: "orange",
  },
  {
    imageUrl: "https://picsum.photos/203",
    name: "Anchy",
    gender: "female",
    parent: "Iggy",
    dateOfBirth: "01/07/2025",
    residence: "Mezzanine Floor",
    color: ["lightbrown"],
    healthStatus: "Healthy",
    medicine: "💊 Nematicide, LG Vit",
    status: "Adopted",
    personality: "Confident and energetic around people.",
    svgColor: "lightbrown",
  },
];
