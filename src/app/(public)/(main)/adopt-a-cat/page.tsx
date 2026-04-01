import PurrfectMatchSection from "@/components/sections/purrfect-match-section";
import AdoptionProcessSection from "@/components/sections/adoption-process-section";
import AssessmentCriteriaSection from "@/components/sections/assessment-criteria-section";
import ClaimYourBestFuriend from "@/components/sections/claim-your-best-furiend";
import EligibilityProcessSection from "@/components/sections/eligbility-process-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adoption",
  description: "Adoption process for cats in Cateneo.",
};

const AdoptACatPage = () => {
  return (
    <main>
      <PurrfectMatchSection />
      <EligibilityProcessSection />
      <AdoptionProcessSection />
      <AssessmentCriteriaSection />
      <ClaimYourBestFuriend />
    </main>
  );
};

export default AdoptACatPage;
