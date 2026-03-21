"use client";

import Navbar from "@/components/ui/navigation-bar";
import HomeHeroSection from "@/components/sections/home-hero-section";
import AboutUsSection from "@/components/sections/about-us";
import Footer from "@/components/ui/footer";
const page = () => {
  return (
    <div>
      <Navbar />
      <HomeHeroSection />
      <AboutUsSection />
      <Footer />
    </div>
  );
};

export default page;
