import Image from "next/image";
import { RoundedButton } from "@/components/ui/rounded-button";
import Link from "next/dist/client/link";
import { Download } from "lucide-react";

const bulletItems = [
  {
    icon: "/support-cat1.svg",
    text: "Guidance on trusted veterinary partners and affordable spay/neuter programs.",
  },
  {
    icon: "/support-cat2.svg",
    text: "Tips for a smooth transition and behavior management.",
  },
  {
    icon: "/support-cat3.svg",
    text: "An invitation to join the Cateneo Community, where adopters share experiences, updates, and get continued support.",
  },
];

export default function SupportFromCateneoSection() {
  return (
    <section className="w-full bg-cateneo-white sm:px-15 py-12 lg:py-16">
      {/* Desktop: frame SVG as background, content overlaid */}
      <div className="relative max-w-5xl mx-auto">
        {/* Frame (desktop only) */}
        <Image
          src="/support-pillar.svg"
          alt=""
          width={1457}
          height={537}
          aria-hidden="true"
          className="hidden lg:block w-full h-auto"
          priority
        />

        {/* Content — desktop: absolute over frame | mobile: static card */}
        <div className="lg:absolute lg:inset-0 flex flex-col lg:flex-row items-start lg:items-center lg:gap-10 lg:px-25 lg:py-10 rounded-2xl lg:bg-transparent lg:rounded-none p-6 lg:p-0">
          {/* Left: title + bullets */}
          <div className="flex flex-col gap-5 lg:gap-3 lg:flex-1">
            <h2 className="font-playpen font-bold text-cateneo-darkbrown text-2xl sm:text-5xl lg:text-2xl leading-tight text-center lg:text-left">
              Support from Cateneo
            </h2>

            <ul className="flex flex-col gap-8 lg:gap-4 mt-3 lg:mt-0">
              {bulletItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-8 lg:gap-4">
                  <Image
                    src={item.icon}
                    alt=""
                    width={45}
                    height={33}
                    className="shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="font-gaegu font-bold text-cateneo-black text-base sm:text-lg lg:text-base leading-snug">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: Full Guidelines button */}
          <Link
            href="https://drive.google.com/file/d/1Aq0vmkJOkIwvzKA8C15oZ3P7aR7ZON7k/view?usp=drivesdk"
            className="lg:hidden w-1/2 align-center self-center mt-5"
          >
            <RoundedButton
              variant="primary"
              className="w-full justify-center text-lg py-3 "
              icon={<Download />}
              iconPosition="end"
            >
              Full Guidelines
            </RoundedButton>
          </Link>

          {/* Right: QR section (desktop only) */}
          <div className="hidden lg:flex flex-col items-center gap-3 shrink-0">
            <p className="font-gaegu font-bold text-cateneo-lightbrown text-center text-md leading-snug">
              Scan here for the
              <br />
              full guidelines
            </p>
            <Image
              src="/support-qr.svg"
              alt="QR code for full guidelines"
              width={120}
              height={120}
            />
            <Link href="https://drive.google.com/file/d/1Aq0vmkJOkIwvzKA8C15oZ3P7aR7ZON7k/view?usp=drivesdk">
              <RoundedButton
                variant="primary"
                className="text-sm px-4 py-1 cursor-pointer"
              >
                Or click here!
              </RoundedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
