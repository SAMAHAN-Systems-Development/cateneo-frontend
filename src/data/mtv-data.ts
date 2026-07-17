import Image from "next/image";
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
    id: "andrew-jacob-lomanta",
    name: "Andrew Jacob Lomanta",
    position: "Project Manager",
    imageUrl: "/dev-images/Cobie_p.jpg",
    section: "projectHeads",
  },
  {
    id: "geah-sept-igtanloc",
    name: "Geah Sept Igtanloc",
    position: "Project Manager",
    imageUrl: "/dev-images/Geah.jpg",
    section: "projectHeads",
  },
  {
    id: "shanaiah-cava",
    name: "Shanaiah Cava",
    position: "Head UI/UX Designer",
    imageUrl: "/dev-images/Shan.jpg",
    section: "uiux",
  },
  {
    id: "bea-donton",
    name: "Bea Donton",
    position: "UI/UX Designer",
    imageUrl: "/dev-images/Bea.jpg",
    section: "uiux",
  },
  {
    id: "daniel-gallego",
    name: "Daniel Gallego",
    position: "UI/UX Designer",
    imageUrl: "/dev-images/Daniel.jpg",
    section: "uiux",
  },
  {
    id: "kauri-lorraine-flores",
    name: "Kauri Lorraine Flores",
    position: "UI/UX Designer",
    imageUrl: "/dev-images/Kauri.jpg",
    section: "uiux",
  },
  {
    id: "anya-espejo",
    name: "Anya Espejo",
    position: "UI/UX Designer",
    imageUrl: "/dev-images/Anya.jpg",
    section: "uiux",
  },
  {
    id: "hanz-regaldo",
    name: "Hanz Regalado",
    position: "Head Frontend Developer",
    imageUrl: "/dev-images/Hanz.png",
    section: "frontend",
  },
  {
    id: "nica-zoe-dable",
    name: "Nica Zoe Dable",
    position: "Frontend Developer",
    imageUrl: "/dev-images/Nica.jpg",
    section: "frontend",
  },
  {
    id: "bernard-louie",
    name: "Bernard Louie",
    position: "Frontend Developer",
    imageUrl: "/dev-images/Bernard.jpg",
    section: "frontend",
  },
  {
    id: "nathan-andrey-ramirez",
    name: "Nathan Andrey Ramirez",
    position: "Frontend Developer",
    imageUrl: "/dev-images/Nathan.jpg",
    section: "frontend",
  },
  {
    id: "eman-torr-berjame",
    name: "Eman Torr Berjame",
    position: "Frontend Developer",
    imageUrl: "/dev-images/Eman.jpg",
    section: "frontend",
  },
  {
    id: "desthiny-dumagan",
    name: "Desthiny Dumagan",
    position: "Frontend Developer",
    imageUrl: "/dev-images/Desthiny.jpg",
    section: "frontend",
  },
  {
    id: "greece-ancog",
    name: "Greece Ancog",
    position: "Head Backend Developer",
    imageUrl: "/dev-images/Greece.jpg",
    section: "backend",
  },
  {
    id: "adolfo-cedric-salcedo-sarillo",
    name: "Adolfo Cedric Salcedo Sarillo",
    position: "Backend Developer",
    imageUrl: "/dev-images/Cedric.jpg",
    section: "backend",
  },
  {
    id: "karl-bacudo",
    name: "Karl Bacudo",
    position: "Backend Developer",
    imageUrl: "/dev-images/Karl.jpg",
    section: "backend",
  },
  {
    id: "lyuji-fabular",
    name: "Lyuji Fabular",
    position: "Head QA Engineer",
    imageUrl: "/dev-images/Lyuji.jpg",
    section: "qualityAssurance",
  },
  {
    id: "shiloh-millondaga",
    name: "Shiloh Millondaga",
    position: "QA Engineer",
    imageUrl: "/dev-images/Shiloh.jpg",
    section: "qualityAssurance",
  },
  {
    id: "yahyah-odin",
    name: "Yahyah Odin",
    position: "QA Engineer",
    imageUrl: "/dev-images/Yahyah.jpg",
    section: "qualityAssurance",
  },
  {
    id: "alyssa-mhie-matila",
    name: "Alyssa Mhie Matila",
    position: "Head DevOps Engineer",
    imageUrl: "/dev-images/Alyssa.jpg",
    section: "devops",
  },
  {
    id: "ellyanna-du",
    name: "Ellyanna Du",
    position: "DevOps Engineer",
    imageUrl: mtvPlaceholderImageUrl,
    section: "devops",
  },
  {
    id: "trixia-maligad",
    name: "Trixia Maligad",
    position: "DevOps Engineer",
    imageUrl: "/dev-images/Trixia.jpg",
    section: "devops",
  },
];

export function getMtvMembersBySection(section: MtvSectionId): MtvTeamMember[] {
  return mtvTeamMembers.filter((m) => m.section === section);
}
