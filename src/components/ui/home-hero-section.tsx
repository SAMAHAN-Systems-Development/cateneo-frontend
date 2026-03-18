import Image from "next/image";
import { RoundedButton } from "./rounded-button";

export default function HomeHeroSection() {
  return (
    <section className="flex flex-col items-center justify-between min-h-[90vh] w-full bg-cateneo-white px-4 py-8 rounded-br-[40px] relative overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-md aspect-[3/4] mb-4 relative">
          <Image
            src="/hero-cat-tree.svg"
            alt="Cat tree with cats"
            fill
            style={{ objectFit: "contain" }}
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <h1 className="text-center text-[32px] sm:text-[64px] font-playpen text-cateneo-darkbrown leading-tight mb-10 sm:max-w-[300px] mx-auto">
          Find a Fur-ever friend
        </h1>
        <p className="text-center text-[24px] font-gaegu font-bold text-cateneo-black mb-6 sm:max-w-[350px]">
          Get to know the purr-fectly adorable cats that get everyone “feline”
          more than just fine!
        </p>
        <RoundedButton variant="accent">Meet the Cateneans</RoundedButton>
      </div>
    </section>
  );
}
