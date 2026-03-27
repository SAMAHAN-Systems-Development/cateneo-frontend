"use client";

import HomeHeroSection from "@/components/sections/home-hero-section";
import AboutUsSection from "@/components/sections/about-us";
import DonationSection from "@/components/sections/donation-section";
import PillarsOfCateneoSection from "@/components/sections/pillars-of-cateneo-section";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <Image
        src="/black-camo.svg"
        alt=""
        width={180}
        height={180}
        priority
        className="pointer-events-none absolute left-0 -top-18 md:-top-24 z-30 w-30 sm:w-32 md:w-40 lg:w-44"
      />

      <Image
        src="/orange-camo.svg"
        alt=""
        width={220}
        height={220}
        priority
        className="pointer-events-none absolute right-0 -top-18 md:-top-24 z-30 w-50 sm:w-36 md:w-44 lg:w-52"
      />

      <HomeHeroSection />
      <AboutUsSection />
      <PillarsOfCateneoSection/>
      <DonationSection />
    </div>
  );
};

export default page;
