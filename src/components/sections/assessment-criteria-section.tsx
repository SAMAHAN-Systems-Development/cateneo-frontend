import React from "react";
import Image from "next/image";

type CriteriaCardProps = {
  color: "darkbrown" | "orange" | "black";
  icon: string;
  title: string;
  description: string;
};

const colorMap = {
  darkbrown: "bg-cateneo-darkbrown",
  orange: "bg-cateneo-orange",
  black: "bg-cateneo-black",
};

const CriteriaCard = ({
  color,
  icon,
  title,
  description,
}: CriteriaCardProps) => {
  return (
    <div
      className={`${colorMap[color]} rounded-2xl px-4 py-6 md:px-5 md:py-5 w-full sm:max-w-70.75 md:max-w-none md:w-full lg:w-65
        lg:h-97.5 flex flex-row md:flex-col items-center gap-4 md:gap-2 overflow-hidden`}
    >
      <div className="w-20 h-20 md:w-18 md:h-18 bg-white rounded-full flex items-center justify-center shrink-0">
        <Image src={icon} alt={title} width={44} height={44} className="" />
      </div>

      <div className="flex flex-col md:items-center">
        <h3 className="font-playpen text-cateneo-white md:py-3 text-base md:text-lg lg:text-xl text-left md:text-center">
          {title}
        </h3>
        <p className="font-gaegu text-cateneo-white text-left md:text-center text-sm md:text-base lg:text-[17px]">
          {description}
        </p>
      </div>
    </div>
  );
};

const AssessmentCriteriaSection = () => {
  return (
    <section className="flex flex-col items-center py-16 px-4">
      <h2 className="font-playpen text-5xl text-cateneo-darkbrown text-center pb-10">
        Assessment Criteria
      </h2>
      <div className="flex flex-col md:flex-row gap-5 md:gap-3 lg:gap-4 justify-center items-center md:items-stretch w-full max-w-5xl px-4">
        <CriteriaCard
          color="darkbrown"
          icon="/images/financial-stability-icon.svg"
          title="Financial Stability"
          description="Can cover food, litter, vaccines, spay/neuter, and vet checkups."
        />
        <CriteriaCard
          color="orange"
          icon="/images/commitment-icon.svg"
          title="Commitment"
          description="Cats live 10-15 years on average. Adoption means lifelong responsibility, not just when it's convenient."
        />
        <CriteriaCard
          color="black"
          icon="/images/lifestyle-icon.svg"
          title="Lifestyle"
          description="Applicants should have enough time, space, and energy for daily feeding, play, and companionship."
        />
        <CriteriaCard
          color="orange"
          icon="/images/environment-icon.svg"
          title="Environment"
          description="A safe, secure home (e.g., screened windows, no harmful plants, no history of animal cruelty, no aggressive pets)."
        />
      </div>
    </section>
  );
};

export default AssessmentCriteriaSection;
