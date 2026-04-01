import React from "react";
import Image from "next/image";

interface CateneoPillarProps {
  title: string;
  description: string;
  className?: string;
}

const CateneoPillar: React.FC<CateneoPillarProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`relative p-5 rounded-xl w-full max-w-[800px] h-[269px] md:h-[300px] overflow-hidden min-w-0 flex-shrink-0 ${className} bg-[url('/mobile-camo-pattern.svg')] md:bg-[url('/camo-pattern.svg')] bg-cateneo-white bg-cover bg-center`}
      style={{ fontFamily: "Playpen Sans, Gaegu, sans-serif" }}
    >
      <div className="bg-cateneo-white p-6 px-5 md:px-25 lg:px-30 w-full h-full rounded-lg z-10 justify-center flex flex-col">
        <h3 className="font-playpen text-cateneo-darkbrown text-2xl md:text-4xl font-bold">
          {title}
        </h3>
        <p className="font-gaegu text-cateneo-black text-[12px] md:text-[16px] leading-relaxed">
          {description}
        </p>
      </div>
      {/* Desktop Cat Pillar: bottom left on md+ */}
      <Image
        src="/desktop-black-cat-pillar.svg"
        alt="Paws icon"
        width={130}
        height={130}
        className="hidden md:block absolute -left-3 bottom-0 w-[80px] h-[80px] md:w-[110px] md:h-[110px] lg:w-[130px] lg:h-[130px] object-bottom object-contain pointer-events-none select-none"
      />
      {/* Mobile Cat Pillar: bottom right on mobile */}
      <Image
        src="/mobile-black-cat-pillar.svg"
        alt="Paws icon"
        width={120}
        height={120}
        className="md:hidden absolute right-0 bottom-0 w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] object-bottom object-contain max-w-full max-h-full pointer-events-none select-none z-0"
      />
    </div>
  );
};

export default CateneoPillar;
