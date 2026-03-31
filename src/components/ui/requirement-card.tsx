import React from "react";
import Image from "next/image";

interface RequirementCardProps {
  title: string;
  description: string;
  iconBgColor: string; // e.g., "bg-cateneo-darkbrown"
  titleColor: string; // e.g., "text-cateneo-darkbrown"
  borderColor: string; // e.g., "border-cateneo-darkbrown"
  iconSrc: string; // e.g., "/adopt-a-cat-page/calendar-svg.svg"
}

const RequirementCard = ({
  title,
  description,
  iconBgColor,
  titleColor,
  borderColor,
  iconSrc,
}: RequirementCardProps) => {
  return (
    <div
      className={`border-2 ${borderColor} rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="flex gap-4">
        {/* Icon Circle */}
        <div
          className={`${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <Image
            src={iconSrc}
            alt={title}
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className={`${titleColor} font-playpen text-xl font-semibold mb-2`}
          >
            {title}
          </h3>
          <p className="text-gray-700 font-gaegu text-md leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequirementCard;
