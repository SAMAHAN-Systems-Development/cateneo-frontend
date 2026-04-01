import Image from "next/image";

interface CatDirectoryHeroSectionProps {
  title: string;
  description: string;
}

export default function CatDirectoryHeroSection({
  title,
  description,
}: CatDirectoryHeroSectionProps) {
  return (
    <section className="relative w-full bg-cateneo-white overflow-hidden">
      {/* Cat head shape */}
      <Image
        src="/cat-directory.svg"
        alt=""
        width={1581}
        height={673}
        priority
        className="w-full h-auto"
        aria-hidden="true"
      />

      {/* Text overlaid in the face area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-12 sm:pt-16 md:pt-20">
        <h1 className="font-playpen font-bold text-center text-cateneo-darkbrown text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
          {title}
        </h1>
        <p className="mt-3 font-gaegu font-bold text-cateneo-darkbrown text-center text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl tracking-wide max-w-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
