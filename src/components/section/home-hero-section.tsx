import Image from "next/image";
import { RoundedButton } from "../ui/rounded-button";

export default function HomeHeroSection() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[80vh] lg:min-h-[90vh] w-full bg-cateneo-white px-4 sm:px-8 lg:px-70 py-8 relative lg:overflow-hidden">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center mb-8 lg:mb-0 lg:pr-8 ">
        <h1 className="text-center lg:text-left text-[32px] sm:text-[64px] font-playpen text-cateneo-darkbrown leading-tight mb-6 sm:max-w-[300px] lg:max-w-none mx-auto lg:mx-0">
          Find a Fur-ever Friend
        </h1>
        <p className="text-center lg:text-left text-[20px] sm:text-[24px] font-gaegu font-bold text-cateneo-black mb-6 sm:max-w-[350px] lg:max-w-none mx-auto lg:mx-0">
          Get to know the purr-fectly adorable cats that get everyone “feline”
          more than just fine!
        </p>
        <div className="flex justify-center lg:justify-start w-full">
          <RoundedButton variant="accent">Meet the Cateneans</RoundedButton>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-md aspect-[3/4] relative">
          <Image
            src="/hero-cat-tree.svg"
            alt="Cat tree with cats"
            fill
            style={{ objectFit: "contain" }}
            priority
            sizes="(max-width: 1024px) 100vw, 400px"
          />
        </div>
      </div>
    </section>
  );
}
