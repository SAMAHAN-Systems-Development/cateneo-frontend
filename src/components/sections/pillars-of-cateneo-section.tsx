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
    <section className="w-full bg-cateneo-white px-0 py-12 md:px-1 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-20 text-center font-playpen text-4xl font-bold text-cateneo-darkbrown md:mb-24 md:text-6xl">
          Pillars of Cateneo
        </h2>

        <Carousel
          opts={{ align: "center", loop: true }}
          className="mx-auto w-full max-w-7xl px-0 md:px-1"
        >
          <CarouselContent className="items-center">
            {pillars.map((pillar) => (
              <CarouselItem
                key={pillar.title}
                className="basis-11/12 sm:basis-5/6 lg:basis-3/4"
              >
                <CateneoPillar
                  title={pillar.title}
                  description={pillar.description}
                  className="mx-auto h-90 max-w-none sm:h-105 md:h-120"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            variant="ghost"
            className="left-2 z-20 h-20 w-20 rounded-none border-0 bg-transparent p-0 text-cateneo-darkbrown shadow-none hover:bg-transparent disabled:opacity-40 md:left-6 md:h-24 md:w-24 [&>svg]:size-16 md:[&>svg]:size-20"
          />
          <CarouselNext
            variant="ghost"
            className="right-2 z-20 h-20 w-20 rounded-none border-0 bg-transparent p-0 text-cateneo-darkbrown shadow-none hover:bg-transparent disabled:opacity-40 md:right-6 md:h-24 md:w-24 [&>svg]:size-16 md:[&>svg]:size-20"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default PillarsOfCateneoSection;
