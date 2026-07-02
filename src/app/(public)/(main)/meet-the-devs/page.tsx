import Image from "next/image";
import type { Metadata } from "next";
import MtdCard from "@/components/ui/mtd-card";
import {
  getMtvMembersBySection,
  mtvSectionLabels,
  mtvSectionOrder,
} from "@/data/mtv-data";

export const metadata: Metadata = {
  title: "Meet the Developurrs",
  description: "Meet the team behind the Cateneo website.",
};

export default function MeetTheDevelopurrsPage() {
  return (
    <div className="relative bg-cateneo-white pb-16 pt-14 sm:pb-20 sm:pt-20 md:pb-24 md:pt-24">
      <Image
        src="/faq-page/tl-brown.svg"
        alt=""
        width={180}
        height={180}
        priority
        className="pointer-events-none absolute left-0 top-[-100px] z-0 w-20 opacity-80 sm:w-28 md:w-36 lg:w-40"
      />
      <Image
        src="/images/mustard-cat.svg"
        alt=""
        width={180}
        height={180}
        priority
        className="pointer-events-none absolute left-0 top-[100vh] z-0 w-20 opacity-80 sm:w-28 md:w-36 lg:w-40"
      />
      <Image
        src="/images/black-asset.svg"
        alt=""
        width={113}
        height={707}
        priority
        className="pointer-events-none absolute left-0 top-[300vh] z-0 h-auto w-20 opacity-80 max-[413px]:top-[340vh] sm:w-28 md:top-[220vh] md:w-48 lg:top-[300vh] lg:w-40"
      />
      <Image
        src="/images/brown-yarn.svg"
        alt=""
        width={180}
        height={180}
        priority
        className="pointer-events-none absolute right-0 top-[200vh] z-0 w-24 opacity-70 sm:w-32 md:w-40 lg:w-48"
      />

      <Image
        src="/faq-page/tr-black.svg"
        alt=""
        width={220}
        height={220}
        priority
        className="pointer-events-none absolute right-0 top-[-100px] z-0 w-24 opacity-70 sm:w-32 md:w-40 lg:w-48"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-playpen text-4xl font-bold leading-tight text-cateneo-darkbrown sm:text-5xl md:text-6xl">
            Meet the Developurrs
          </h1>

          <div
            className="mx-auto mt-6 flex max-w-md items-center gap-3 sm:mt-8 md:max-w-lg"
            aria-hidden
          >
            <span className="h-px flex-1 bg-cateneo-darkbrown/40" />
            <Image
              src="/images/cathead.svg"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
            />
            <span className="h-px flex-1 bg-cateneo-darkbrown/40" />
          </div>

          <p className="mt-10 font-gaegu text-base text-cateneo-darkbrown/90 sm:mt-12 sm:text-lg md:text-xl">
            The team behind the Cateneo website.
          </p>
        </header>

        <div className="mt-12 w-full space-y-14 sm:mt-14 sm:space-y-16 md:mt-16 md:space-y-20">
          {mtvSectionOrder.map((sectionId) => {
            const members = getMtvMembersBySection(sectionId);
            const { title, subtitle } = mtvSectionLabels[sectionId];

            return (
              <section
                key={sectionId}
                className="w-full"
                aria-labelledby={`mtv-section-${sectionId}`}
              >
                <div className="mx-auto max-w-3xl text-center">
                  <h2
                    id={`mtv-section-${sectionId}`}
                    className="font-playpen text-2xl font-bold text-cateneo-darkbrown sm:text-3xl md:text-4xl"
                  >
                    {title}
                  </h2>
                  {subtitle ? (
                    <p className="mt-3 font-gaegu text-base text-cateneo-darkbrown/90 sm:mt-4 sm:text-lg md:text-xl">
                      {subtitle}
                    </p>
                  ) : null}
                </div>

                {members.length > 0 ? (
                  <ul className="mx-auto mt-8 flex w-full max-w-6xl list-none flex-wrap justify-center gap-x-8 gap-y-12 sm:mt-10 lg:mt-12 lg:gap-y-14">
                    {members.map((member) => (
                      <li
                        key={member.id}
                        className="flex shrink-0 justify-center"
                      >
                        <MtdCard
                          imageUrl={member.imageUrl}
                          name={member.name}
                          position={member.position}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 text-center font-gaegu text-base text-cateneo-darkbrown/60 sm:mt-8 sm:text-lg">
                    To be announced.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
