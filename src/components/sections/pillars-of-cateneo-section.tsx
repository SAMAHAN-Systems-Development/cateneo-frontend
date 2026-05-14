import CateneoPillar from "@/components/ui/cateneo-pillar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const pillars = [
  {
    title: "Care for the Environment",
    description:
      "CATeneo aims to contribute to appreciating God's creation and its responsible stewardship within the University by following the principles outlined in Laudato Si.",
  },
  {
    title: "Compassion for Cats",
    description:
      "We treat every cat with care and dignity, prioritizing humane rescue, gentle handling, and patient rehabilitation.",
  },
  {
    title: "Responsible Adoption",
    description:
      "We promote informed and lifelong pet ownership through education, clear adoption standards, and consistent follow-up.",
  },
];

const PillarsOfCateneoSection = () => {
  return (
    <section className="w-full bg-cateneo-white px-0 py-12 md:py-16">
      <div className="mx-auto w-full">
        <h2 className="mb-100 text-center font-playpen text-4xl font-bold text-cateneo-darkbrown md:mb-24 md:text-6xl">
          Pillars of Cateneo
        </h2>

        <Carousel
          opts={{ align: "center", loop: true }}
          className="mx-auto w-full px-0"
        >
          <CarouselContent className="items-center">
            {pillars.map((pillar) => (
              <CarouselItem
                key={pillar.title}
                className="basis-11/12 sm:basis-5/6 lg:basis-5/6"
              >
                <CateneoPillar
                  title={pillar.title}
                  description={pillar.description}
                  className="mx-auto h-105 max-w-none sm:h-120 md:h-140"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            variant="ghost"
            className="left-1 z-20 !h-8 !w-8 rounded-none border-0 bg-transparent p-0 text-cateneo-darkbrown shadow-none hover:bg-transparent disabled:opacity-40 sm:left-2 sm:!h-10 sm:!w-10 md:left-6 md:!h-16 md:!w-16 [&>svg]:!size-5 sm:[&>svg]:!size-7 md:[&>svg]:!size-12"
          />
          <CarouselNext
            variant="ghost"
            className="right-1 z-20 !h-8 !w-8 rounded-none border-0 bg-transparent p-0 text-cateneo-darkbrown shadow-none hover:bg-transparent disabled:opacity-40 sm:right-2 sm:!h-10 sm:!w-10 md:right-6 md:!h-16 md:!w-16 [&>svg]:!size-5 sm:[&>svg]:!size-7 md:[&>svg]:!size-12"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default PillarsOfCateneoSection;
