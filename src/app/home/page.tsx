"use client";

import Navbar from "@/components/ui/navigation-bar";
import HomeHeroSection from "@/components/section/home-hero-section";
import AboutUsSection from "@/components/section/about-us";
const page = () => {
  return (
    <div>
      <Navbar />
      <HomeHeroSection />
      <AboutUsSection />
    </div>
  );
};

export default page;
