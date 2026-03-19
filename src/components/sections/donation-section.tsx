import React from "react";
import Image from "next/image";
import { RoundedButton } from "@/components/ui/rounded-button";
import Cat from "./public/images/cat.svg";

const DonationSection = () => {
  return (
    <section className="font-gaegu bg-cateneo-white w-full">
      <div className="">
        {/* cat icon */}
        <div className="">
          <div>
            <Image
              src="/images/cat.svg"
              alt="cat icon"
              width={200}
              height={200}
              className=""
            />
          </div>
        </div>

        {/* text */}
        <div className="flex items-center">
          <div>
            <h2 className="text-cateneo-darkbrown font-weight-lg text-xl">
              HEADER
            </h2>
          </div>
          <div>
            <p className="text-cateneo-black">BODY</p>
          </div>
          <div>
            <RoundedButton className="bg-cateneo-orange">
              Donate Now
            </RoundedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
