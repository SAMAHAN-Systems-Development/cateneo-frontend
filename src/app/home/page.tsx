"use client";

import Navbar from "@/components/ui/navigation-bar";
import HomeHeroSection from "@/components/section/home-hero-section";
import AboutUsSection from "@/components/section/about-us";
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
