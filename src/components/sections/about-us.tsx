import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center px-4 py-12 bg-cateneo-white overflow-hidden">
      <Image
        src="/lightbrown-camo.svg"
        alt=""
        width={75}
        height={601}
        priority
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block w-10 lg:w-14"
      />
      <Image
        src="/brown-camo.svg"
        alt=""
        width={124}
        height={769}
        priority
        className="pointer-events-none absolute -right-5 -top-5 z-10 block w-12 md:-top-40 md:w-14 lg:w-20"
      />

      <div className="relative z-20 w-full max-w-2xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-cateneo-darkbrown font-playpen">
          About Us
        </h1>
        <div className="flex items-center justify-center mb-6">
          <span className="block h-[3px] w-[100px] md:w-[150px] lg:w-[150px] rounded-full mx-1 md:mx-2 bg-cateneo-darkbrown " />
          <Image
            src="/about-us-cat.svg"
            alt="Cat Icon"
            width={32}
            height={32}
            className="mx-1 md:mx-2"
            priority
          />
          <span className="block h-[3px] w-[100px] md:w-[150px] lg:w-[150px] rounded-full mx-1 md:mx-2 bg-cateneo-darkbrown" />
        </div>
        <p className="text-cateneo-black text-md px-5 sm:px-10 lg:px-0 md:text-xl font-medium tracking-wide leading-relaxed font-gaegu">
          CATeneo is a newly established socio-civic organization under the
          Council of Organizations – Davao (COA-D), which aims to support the
          cat populations on the campus, promote cat adoption, advocate for
          responsible pet ownership, and foster a peaceful coexistence with the
          felines around the campus.
        </p>
      </div>
    </section>
  );
}
