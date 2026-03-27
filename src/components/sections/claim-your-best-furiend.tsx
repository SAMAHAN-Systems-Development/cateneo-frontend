import React from "react";
import Image from "next/image";
import { RoundedButton } from "@/components/ui/rounded-button";

const ClaimYourBestFuriend = () => {
  return (
    <section className="w-full  px-4 py-16 md:py-24">
      <div className="mx-auto w-full max-w-2xl flex flex-col items-center">
        <h2 className="font-playpen font-bold text-cateneo-darkbrown text-center text-4xl md:text-5xl mb-4">
          Ready to claim your new
          <br />
          best fur-iend?
        </h2>

        <p className="font-gaegu text-cateneo-black text-center text-lg md:text-xl lg:text-2xl mb-8 md:mb-12">
          Scan here and fill up the adoption form below
        </p>

        <div className="mb-8 md:mb-12">
          <Image
            src="/best-furiend-qr.png"
            alt="QR code to adoption form"
            width={160}
            height={160}
            className="w-40 h-40 md:w-48 md:h-48"
          />
        </div>

        <RoundedButton variant="primary" className="text-base md:text-lg">
          Or click here!
        </RoundedButton>
      </div>
    </section>
  );
};

export default ClaimYourBestFuriend;
