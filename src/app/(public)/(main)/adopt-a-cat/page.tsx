import PurrfectMatchSection from "@/components/sections/purrfect-match-section";
import AdoptionProcessSection from "@/components/sections/adoption-process-section";
import AssessmentCriteriaSection from "@/components/sections/assessment-criteria-section";
import ClaimYourBestFuriend from "@/components/sections/claim-your-best-furiend";
import EligibilityProcessSection from "@/components/sections/eligbility-process-section";

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
