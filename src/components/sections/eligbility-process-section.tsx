import RequirementCard from "../ui/requirement-card";
import Image from "next/image";

const EligibilityProcessSection = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-cateneo-white">
      <h1 className="font-playpen text-4xl md:text-5xl text-cateneo-darkbrown mb-12">
        Eligibility Process
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Age Requirement */}
        <RequirementCard
          title="Age Requirement"
          description="Must be at least 18 years old or with a legal guardian."
          iconBgColor="bg-cateneo-darkbrown"
          titleColor="text-cateneo-darkbrown"
          borderColor="border-cateneo-darkbrown"
          iconSrc="/adopt-a-cat-page/calendar-svg.svg"
        />

        {/* Consent */}
        <RequirementCard
          title="Consent"
          description="Agreement from all family members/roommates to welcome a cat."
          iconBgColor="bg-cateneo-black"
          titleColor="text-cateneo-black"
          borderColor="border-cateneo-black"
          iconSrc="/adopt-a-cat-page/consent-svg.svg"
        />

        {/* Residency */}
        <RequirementCard
          title="Residency"
          description="Prioritizing Davao City residents & nearby areas for accessible support."
          iconBgColor="bg-cateneo-orange"
          titleColor="text-cateneo-orange"
          borderColor="border-cateneo-orange"
          iconSrc="/adopt-a-cat-page/location-svg.svg"
        />

        {/* Health */}
        <RequirementCard
          title="Health"
          description="No allergies or conditions preventing a comfortable cat environment."
          iconBgColor="bg-cateneo-darkbrown"
          titleColor="text-cateneo-darkbrown"
          borderColor="border-cateneo-darkbrown"
          iconSrc="/adopt-a-cat-page/health-svg.svg"
        />
      </div>
    </div>
  );
};

export default EligibilityProcessSection;
