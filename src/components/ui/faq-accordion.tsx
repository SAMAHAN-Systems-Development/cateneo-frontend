"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

import { type FAQAccordionDataType } from "@/data/FAQ-accordion-data";

export interface FAQAccordionProps {
  FaqAccordionData: FAQAccordionDataType[];
}

type Variant = "light" | "dark" | "orange";

const VARIANT_CYCLE: Variant[] = [
  "light",
  "dark",
  "orange",
  "orange",
  "light",
  "dark",
  "light",
  "dark",
];

const variantClasses: Record<
  Variant,
  { item: string; trigger: string; content: string }
> = {
  light: {
    item: "rounded-xl border border-cateneo-darkbrown bg-cateneo-white",
    trigger:
      "px-4 py-3 sm:px-6 text-cateneo-orange font-gaegu text-sm sm:text-base hover:no-underline data-[state=open]:rounded-b-none",
    content:
      "px-4 pt-0 pb-3 sm:px-6 text-cateneo-black font-gaegu text-sm sm:text-base",
  },
  dark: {
    item: "rounded-xl bg-cateneo-black",
    trigger:
      "px-4 py-3 sm:px-6 text-cateneo-white font-gaegu text-sm sm:text-base hover:no-underline data-[state=open]:rounded-b-none",
    content:
      "px-4 pt-0 pb-3 sm:px-6 text-cateneo-white font-gaegu text-sm sm:text-base",
  },
  orange: {
    item: "rounded-xl bg-cateneo-orange",
    trigger:
      "px-4 py-3 sm:px-6 text-cateneo-white font-gaegu text-sm sm:text-base hover:no-underline data-[state=open]:rounded-b-none",
    content:
      "px-4 pt-0 pb-3 sm:px-6 text-cateneo-white font-gaegu text-sm sm:text-base",
  },
};

function FAQAccordion({ FaqAccordionData }: FAQAccordionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
      <Accordion type="single" collapsible className="flex flex-col gap-3">
        {FaqAccordionData.map((accordion, i) => {
          const variant = VARIANT_CYCLE[i % VARIANT_CYCLE.length];
          const classes = variantClasses[variant];
          return (
            <AccordionItem key={i} value={`item-${i}`} className={classes.item}>
              <AccordionTrigger className={classes.trigger}>
                <span className="text-left">{accordion.AccordionTitle}</span>
              </AccordionTrigger>
              <AccordionContent className={classes.content}>
                <p>
                  {accordion.Accordioncontent}{" "}
                  {accordion.link && (
                    <a
                      href={accordion.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      {accordion.link.label}
                    </a>
                  )}
                </p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default FAQAccordion;
