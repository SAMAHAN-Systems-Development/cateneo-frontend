import React from "react";
import Image from "next/image";
import { RoundedButton } from "@/components/ui/rounded-button";

const DonationSection = () => {
  return (
    <section className="min-h-screen w-full bg-cateneo-white flex items-center justify-center">
      <div className="px-16 gap-20 flex flex-row items-center">
        {/* cat icon */}
        <div className="relative shrink-0 w-[260px] h-[260px]">
          <Image
            src="/images/cat.svg"
            alt="Cat icon"
            width={260}
            height={260}
            className="absolute top-0 left-0"
          />

          <Image
            src="/images/cat-bowl.svg"
            alt="Cat bowl icon"
            width={120}
            height={120}
            className="absolute bottom-7 left-0"
          />
        </div>

        {/* text */}
        <div className="max-w-2xl gap-4 flex flex-col">
          <h2 className="font-playpen text-cateneo-darkbrown font-bold text-5xl leading-tight">
            Help us keep our bowls full!
          </h2>
          <p className="text-cateneo-black text-2xl font-gaegu">
            Contact us if you&apos;re interested in donating or simply helping
            our campus cats.
          </p>
          <RoundedButton className="bg-cateneo-orange w-fit">
            Donate Now
          </RoundedButton>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
