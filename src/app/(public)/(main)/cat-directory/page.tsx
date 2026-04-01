import CatDirectorySection from "@/components/sections/cat-directory-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat Directory",
  description: "Cat directory for cats in Cateneo.",
};

const page = () => {
  return (
    <div>
      <CatDirectorySection />
    </div>
  );
};

export default page;
