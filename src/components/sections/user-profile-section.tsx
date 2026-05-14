"use client";

import React from "react";
import Image from "next/image";
import { RoundedButton } from "@/components/ui/rounded-button";
import { cn } from "@/lib/utils";

export type UserProfileSectionProps = {
  userName?: string;
  roleLabel?: string;
  memberSinceLabel?: string;
  avatarSrc?: string;
  onEditProfile?: () => void;
  className?: string;
};

const AVATAR_FALLBACK = "/images/cathead.svg";

export default function UserProfileSection({
  userName = "Andrew Jacob Lomanta",
  roleLabel = "Admin",
  memberSinceLabel = "Member since 2024",
  avatarSrc = AVATAR_FALLBACK,
  onEditProfile = () => {},
  className,
}: UserProfileSectionProps) {
  const [displaySrc, setDisplaySrc] = React.useState(avatarSrc);

  React.useEffect(() => {
    setDisplaySrc(avatarSrc);
  }, [avatarSrc]);

  return (
    <section className={cn("w-full bg-cateneo-white", className)}>
      {/* Decorative header band */}
      <div className="relative w-full overflow-hidden border-y-2 border-cateneo-darkbrown bg-cateneo-white">
        {/* <div className="h-24 sm:h-28 md:h-32" /> */}
        <Image
          src="/user-header-image.png"
          alt="User profile header band"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          priority
        />
      </div>

        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-4">
          <div className="flex flex-col gap-7 items-center md:flex-row md:items-center md:gap-10">
          {/* Avatar */}
          <div className="relative shrink-0 md:-translate-y-1/2">
            <div className="relative h-36 w-36 sm:h-40 sm:w-40 md:h-60 md:w-60">
              <Image
                src="/user-icon-background.png"
                alt="User icon background"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, 176px"
                priority
              />

              {/* Tuned inset so avatar sits cleanly within the decorative frame */}
              <div className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-2/5 overflow-hidden rounded-full border-0 border-cateneo-white bg-cateneo-black/10">
                <Image
                  src={displaySrc}
                  alt="User avatar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90px, (max-width: 768px) 100px, 110px"
                  priority
                  onError={() => setDisplaySrc(AVATAR_FALLBACK)}
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <h1 className="sm:align-center font-playpen font-black text-cateneo-orange leading-tight text-4xl sm:text-5xl md:text-6xl">
              {userName}
            </h1>

            <div className="mt-2 space-y-1 font-gaegu font-bold text-cateneo-black">
              <p className="text-lg sm:text-xl">{roleLabel}</p>
              <p className="text-lg sm:text-xl">{memberSinceLabel}</p>
            </div>

            <div className="mt-5">
              <RoundedButton
                type="button"
                variant="secondary"
                onClick={onEditProfile}
                className="font-gaegu"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.12L16.62 4.5a1.5 1.5 0 0 0-2.12 0L4 15v5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5 5.5 18.5 10.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                iconPosition="start"
              >
                Edit Profile
              </RoundedButton>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

