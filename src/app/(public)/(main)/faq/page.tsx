import FAQAccordion from "@/components/ui/faq-accordion";
import { FAQAccordionData } from "@/data/FAQ-accordion-data";
import FaqHeroSection from "@/components/sections/faq-hero-section";
import Image from "next/image";

const FaqPage = () => {
  return (
    <div>
      <Image
        src="/faq-page/tl-brown.svg"
        alt=""
        width={180}
        height={180}
        priority
        className="pointer-events-none absolute left-0 -top-18 md:-top-24 lg:-top-30 xl:-top-34 z-30 w-20 sm:w-32 md:w-40 lg:w-44"
      />

      <Image
        src="/faq-page/tr-black.svg"
        alt=""
        width={220}
        height={220}
        priority
        className="pointer-events-none absolute right-0 -top-18 md:-top-24 lg:-top-30 xl:-top-34 z-30 w-28 sm:w-36 md:w-44 lg:w-52"
      />

      <div className="relative z-20 pt-14 sm:pt-20 md:pt-24">
        <FaqHeroSection />
        <section className="mt-10 mb-14 sm:mt-12 sm:mb-18 md:mt-14 md:mb-24">
          <FAQAccordion FaqAccordionData={FAQAccordionData} />
        </section>
      </div>
    </div>
  );
};

export default FaqPage;
