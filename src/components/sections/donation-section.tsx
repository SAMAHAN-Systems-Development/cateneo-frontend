import React from "react";
import Image from "next/image";
import { RoundedButton } from "@/components/ui/rounded-button";
import Link from "next/link";

const DonationSection = () => {
  return (
    <section className="min-h-screen w-full bg-cateneo-white flex items-center justify-center">
      <div className="px-4 md:px-16 md:gap-20 flex flex-col md:flex-row items-center">
        {/* cat icon */}
        <div className="relative shrink-0 w-[150px] h-[150px] md:w-[250px] md:h-[250px]">
          <Image
            src="/images/cat.svg"
            alt="Cat icon"
            width={250}
            height={250}
            className="absolute top-0 left-0 w-[150px] md:w-[250px]"
          />

          <Image
            src="/images/cat-bowl.svg"
            alt="Cat bowl icon"
            width={120}
            height={120}
            className="absolute bottom-4 md:bottom-7 left-0 w-[80px] md:w-[120px]"
          />
        </div>

        {/* text */}
        <div className="max-w-xs md:max-w-2xl gap-4 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-playpen text-cateneo-darkbrown font-bold text-3xl md:text-5xl leading-tight">
            Help us keep our bowls full!
          </h2>
          <p className="text-cateneo-black text-lg md:text-2xl font-gaegu">
            Contact us if you&apos;re interested in donating or simply helping
            our campus cats.
          </p>
          <Link
            href="https://www.facebook.com/AdDUCATeneo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RoundedButton className="bg-cateneo-orange w-fit">
              Donate Now
            </RoundedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
