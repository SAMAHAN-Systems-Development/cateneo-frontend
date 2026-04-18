import Image from "next/image";
import { RoundedButton } from "../components/ui/rounded-button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F3EA] p-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0">
          <Image
            src="/cat-box.png"
            alt="Cat in a box"
            width={350}
            height={250}
            priority
            className="object-contain"
          />
        </div>
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#444] mb-4 font-playpen">
            Oops... this page ran
            <br />
            off like a curious cat
          </h1>
          <p className="text-lg md:text-xl text-[#444] mb-6 font-gaegu">
            Looks like the page you’re looking for doesn’t exist (or maybe it’s
            hiding under the couch).
          </p>
          <Link href="/home">
            <RoundedButton className="bg-cateneo-orange">
              Back to Homepage
            </RoundedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
