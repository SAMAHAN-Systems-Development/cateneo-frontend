export type FAQAccordionDataType = {
  AccordionTitle: string;
  Accordioncontent: string;
  link?: {
    label: string;
    href: string;
  };
};

export const FAQAccordionData: FAQAccordionDataType[] = [
  {
    AccordionTitle:
      "Do you adopt lost cat/s, kitten/s, or pregnant cat/s outside the Campus?",
    Accordioncontent:
      "While we find such efforts noble, our organization's current resources and funding are strictly dedicated to the care of our resident Cateneans and their litters within the campus. Consequently, we are unable to adopt or provide financial support for cats found outside our immediate community at this time.",
  },
  {
    AccordionTitle:
      "To all adoptable kittens, ano vaccines na na administer na? or need pa ipa vaccine? Also de-worming.",
    Accordioncontent:
      "All of our currently kittens and cats that are up for adoption regularly take LC Vit and nematocide—following the proper administration and how often they are taken—to ensure that our cateneans are healthy. However, they have not yet been vaccinated.",
  },
  {
    AccordionTitle:
      "Are non-Atenean students allowed to adopt cats from CATeneo?",
    Accordioncontent:
      "Yes! Non-ateneans individuals are eligible to adopt a catenean so long as they pass the standard adoption screening process.",
  },
  {
    AccordionTitle: "Where to find the Cateneans?",
    Accordioncontent:
      "Our Cateneans have their own turfs around the campus! Some are very sociable while others only approach staff who regularly take care of them! It's best to approach them with caution whenever you encounter them in their territory!",
  },
  {
    AccordionTitle: "How can we adopt?",
    Accordioncontent:
      "To view and adopt kitteneans you may refer to the latest adoption drive post and reach out to our page for the kitten you wish to adopt. Alternatively, you may also visit them at our cat hotel at the mezzanine floor of CCFC!",
    link: {
      label: "This is our adoption screening.",
      href: "/",
    },
  },
  {
    AccordionTitle: "How to join CATeneo?",
    Accordioncontent:
      "For this term, CATeneo membership is open the entire A.Y. 2025-2026! You may sign up to be a catenista through our pinned post in our Facebook page.",
  },
  {
    AccordionTitle: "Can I become a member if I am not an Atenean?",
    Accordioncontent:
      "Unfortunately, we can only account bona fide Ateneans as our members as we are a student organization under the university. However, you may still show your support through in-kind donations and engaging with our page!",
  },
  {
    AccordionTitle: "How do we help the cats if we cannot adopt?",
    Accordioncontent:
      "You can help our cateneans in ways more than adopting them! We accept in-kind donations such as cat food, litter, and other necessities that can greatly improve their quality of life!",
  },
];
