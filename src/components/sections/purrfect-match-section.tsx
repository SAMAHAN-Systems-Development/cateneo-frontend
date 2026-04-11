import Image from "next/image";

export default function PurrfectMatchSection() {
  return (
    <section className="w-full h-auto flex flex-row items-center justify-between py-8 bg-cateneo-white px-0">
      <div className="hidden md:flex flex-col justify-between h-full pl-0">
        {/* DESKTOP LEFT PAWS */}
        <Image
          src="/paws.svg"
          alt="Paws icon"
          width={250}
          height={250}
          className="w-auto h-auto object-contain"
        />
      </div>

      {/* MOBILE LEFT PAWS */}
      <div className="flex flex-col justify-between h-full pl-0 md:hidden">
        <Image
          src="/mobile-paws.svg"
          alt="Paws icon"
          width={250}
          height={250}
          className="w-20 h-auto object-contain"
        />
      </div>

      <div className="w-full max-w-2xl text-center z-10 relative flex flex-col px-8 ">
        <h1 className="text-5xl md:text-8xl lg:text-5xl font-bold mb-4 text-cateneo-darkbrown font-playpen ">
          The Purrfect Match
        </h1>

        <p className="text-cateneo-lightbrown md:text-cateneo-darkbrown text-base xs:text-lg md:text-xl font-medium tracking-wide leading-relaxed font-gaegu">
          Everything you need to start your nine lives together.
        </p>
      </div>
      {/* DESKTOP RIGHT PAWS */}
      <div className="hidden md:flex flex-col justify-between h-full pl-0">
        <Image
          src="/paws.svg"
          alt="Paws icon"
          width={250}
          height={250}
          className="w-auto h-auto object-contain rotate-180"
        />
      </div>
      {/* MOBILE RIGHT PAWS */}
      <div className="flex flex-col justify-between h-full pl-0 md:hidden">
        <Image
          src="/mobile-paws.svg"
          alt="Paws icon"
          width={250}
          height={250}
          className="w-20 h-auto object-contain rotate-180"
        />
      </div>
    </section>
  );
}
