export const mtvPlaceholderImageUrl = "/footer-cateneo-logo.svg";

export const mtvSectionOrder = [
  "projectHeads",
  "uiux",
  "frontend",
  "backend",
  "qualityAssurance",
  "devops",
] as const;

export type MtvSectionId = (typeof mtvSectionOrder)[number];

export const mtvSectionLabels: Record<
  MtvSectionId,
  { title: string; subtitle?: string }
> = {
  projectHeads: {
    title: "Project Heads",
    subtitle: "Lead the development of the Cateneo website.",
  },
  uiux: { title: "UI/UX" },
  frontend: { title: "Frontend" },
  backend: { title: "Backend" },
  qualityAssurance: { title: "Quality Assurance" },
  devops: { title: "DevOps" },
};

export type MtvTeamMember = {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  section: MtvSectionId;
};

export const mtvTeamMembers: MtvTeamMember[] = [
  {
    id: "andrew-jacob-lamanta",
    name: "Andrew Jacob Lamanta",
    position: "Project Manager",
    imageUrl: mtvPlaceholderImageUrl,
    section: "projectHeads",
  },
  {
    id: "geah-sept-igtanloc",
    name: "Geah Sept Igtanloc",
    position: "Project Manager",
    imageUrl: mtvPlaceholderImageUrl,
    section: "projectHeads",
  },
  {
    id: "lyuji-fabular",
    name: "Lyuji Fabular",
    position: "Project Manager",
    imageUrl: mtvPlaceholderImageUrl,
    section: "projectHeads",
  },
  {
    id: "alyssa-mhie-matila",
    name: "Alyssa Mhie Matila",
    position: "Project Manager",
    imageUrl: mtvPlaceholderImageUrl,
    section: "projectHeads",
  },
  {
    id: "shanaiah-cava",
    name: "Shanaiah Cava",
    position: "UI/UX Designer",
    imageUrl: mtvPlaceholderImageUrl,
    section: "uiux",
  },
  {
    id: "hanz-regaldo",
    name: "Hanz Regaldo",
    position: "Frontend Developer",
    imageUrl: mtvPlaceholderImageUrl,
    section: "frontend",
  },
  {
    id: "greece-ancog",
    name: "Greece Ancog",
    position: "Backend Developer",
    imageUrl: mtvPlaceholderImageUrl,
    section: "backend",
  },
  {
    id: "camille-reyes",
    name: "Camille Reyes",
    position: "QA Engineer",
    imageUrl: mtvPlaceholderImageUrl,
    section: "qualityAssurance",
  },
  {
    id: "rafael-mendoza",
    name: "Rafael Mendoza",
    position: "DevOps Engineer",
    imageUrl: mtvPlaceholderImageUrl,
    section: "devops",
  },
];

export function getMtvMembersBySection(
  section: MtvSectionId,
): MtvTeamMember[] {
  return mtvTeamMembers.filter((m) => m.section === section);
}
