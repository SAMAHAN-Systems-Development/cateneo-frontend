"use client";

import React, { useEffect, useState } from "react";

const segments = [
  { rod: "bg-cateneo-darkbrown",  badge: "border-cateneo-darkbrown",  num: "text-cateneo-darkbrown"  },
  { rod: "bg-cateneo-lightbrown", badge: "border-cateneo-lightbrown", num: "text-cateneo-lightbrown" },
  { rod: "bg-cateneo-black",      badge: "border-cateneo-black",      num: "text-cateneo-black"      },
  { rod: "bg-cateneo-darkbrown",  badge: "border-cateneo-darkbrown",  num: "text-cateneo-darkbrown"  },
  { rod: "bg-cateneo-lightbrown", badge: "border-cateneo-lightbrown", num: "text-cateneo-lightbrown" },
];

const steps = [
  { number: 1, title: "Application",  description: "Fill out the official CATeneo Adoption Form" },
  { number: 2, title: "Interview",    description: "A short conversation to help us understand your lifestyle and capacity to care for a cat." },
  { number: 3, title: "Assessment",   description: "We want to make sure adopters can provide a stable, loving, and lifelong home. We look at a criteria shown below." },
  { number: 4, title: "Orientation",  description: "Before adoption, all applicants must have a Cat Care Orientation." },
  { number: 5, title: "Trial Period", description: "2–4 week adjustment period to ensure a perfect match. Volunteers may visit or call to check in." },
];

// ── Desktop constants ──
const DESIGN_W     = 1000;
const DESIGN_H     = 1100;
const SEGMENT_H    = 240;
const CAP_H        = 30;
const BADGE_SIZE   = 87;
const BADGE_OFFSET = (SEGMENT_H - BADGE_SIZE) / 2;
const segTop       = (idx: number) => idx * (SEGMENT_H - CAP_H);

// ── Mobile constants ──
const MOB_SEGMENT_H = 240;
const MOB_CAP_H     = 12;
const MOB_ROD_W     = 28;
const MOB_BADGE     = 89;

const BREAKPOINT = 1024;

export default function AdoptionProcessSection() {
  const lastIdx = steps.length - 1;
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale]       = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w < BREAKPOINT);
      setScale(w < BREAKPOINT ? 1 : Math.min(w / DESIGN_W, 1));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── MOBILE (FIXED ABSOLUTE TIMELINE) ──
  if (isMobile) {
    const totalHeight =
      steps.length * (MOB_SEGMENT_H - MOB_CAP_H) + MOB_CAP_H;

    return (
      <div className="min-h-screen w-full bg-cateneo-white flex flex-col items-center px-4 py-8">

        <h2 className="font-playpen font-bold text-cateneo-darkbrown text-center text-[40px] leading-[1.2] mb-40">
          The Adoption<br />Process
        </h2>

        <div className="flex flex-row gap-5 w-full max-w-sm">

          <div
            className="relative shrink-0 max-sm:px-8"
            style={{ width: MOB_BADGE, height: totalHeight }}
          >
            {steps.map((step, idx) => {
              const isLast = idx === lastIdx;
              const top = idx * (MOB_SEGMENT_H - MOB_CAP_H);

              return (
                <div
                  key={step.number}
                  className="absolute flex flex-col items-center "
                  style={{ top }}
                >
                  <div
                    className={`${segments[idx].rod} `}
                    style={{
                      width: MOB_ROD_W,
                      height: MOB_CAP_H,
                      borderRadius: "30px 30px 0 0",
                    }}
                  />

                  <div
                    className={`bg-cateneo-white border-4 rounded-[12px] flex items-center justify-center font-playpen font-black ${segments[idx].badge} ${segments[idx].num}`}
                    style={{
                      width: MOB_BADGE,
                      height: MOB_BADGE,
                      fontSize: 42,
                      position: "absolute",
                      top: (MOB_SEGMENT_H - MOB_BADGE) / 2,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {step.number}
                  </div>

                  <div
                    className={`${segments[idx].rod}`}
                    style={{
                      width: MOB_ROD_W,
                      height: MOB_SEGMENT_H - MOB_CAP_H - (isLast ? MOB_CAP_H : 0),
                    }}
                  />

                  {isLast && (
                    <div
                      className={`${segments[idx].rod}`}
                      style={{
                        width: MOB_ROD_W,
                        height: MOB_CAP_H,
                        borderRadius: "0 0 30px 30px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* CONTENT */}
          <div
            className="relative flex-1"
            style={{ height: totalHeight }}
          >
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="absolute"
                style={{
                  top: idx * (MOB_SEGMENT_H - MOB_CAP_H) + 56,
                }}
              >
                <p className="font-gaegu font-bold text-cateneo-darkbrown text-[30px] mb-1">
                  {step.title}
                </p>
                <p className="font-gaegu font-bold text-cateneo-black text-[18px] leading-snug">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // ── DESKTOP ──
  return (
    <div className="bg-cateneo-white w-full min-h-screen flex items-start justify-center align-center">
      <div
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        <div className="w-full flex items-start justify-center">
          <div className="relative w-[1017px] h-[994px]">

            <h2
              className="absolute left-0 top-0 w-[278px] font-playpen font-black text-cateneo-darkbrown"
              style={{
                fontSize: "clamp(56px, 7vw, 60px)",
              }}
            >
              The<br />Adoption<br />Process
            </h2>

            <div className="absolute left-[327px] top-0 w-[87px] h-[994px]">
              {steps.map((step, idx) => {
                const isLast = idx === lastIdx;
                const top = segTop(idx);

                return (
                  <div key={step.number} className="absolute w-[87px]" style={{ top }}>

                    <div
                      className={`absolute w-[42px] left-[23px] top-0 ${segments[idx].rod}`}
                      style={{ height: CAP_H, borderRadius: "30px 30px 0 0" }}
                    />

                    <div
                      className={`absolute w-[42px] left-[23px] ${segments[idx].rod}`}
                      style={{
                        top: CAP_H,
                        height: SEGMENT_H - CAP_H - (isLast ? CAP_H : 0),
                      }}
                    />

                    {isLast && (
                      <div
                        className={`absolute w-[42px] left-[23px] ${segments[idx].rod}`}
                        style={{
                          top: SEGMENT_H - CAP_H,
                          height: CAP_H,
                          borderRadius: "0 0 30px 30px",
                        }}
                      />
                    )}

                    {/* CENTERED BADGE */}
                    <div
                      className={`absolute w-[87px] h-[87px] left-0 bg-cateneo-white border-4 rounded-[15px] flex items-center justify-center ${segments[idx].badge}`}
                      style={{ top: BADGE_OFFSET }}
                    >
                      <span
                        className={`font-playpen font-black ${segments[idx].num}`}
                        style={{ fontSize: "clamp(44px, 5.2vw, 72px)" }}
                      >
                        {step.number}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            <div
              className="absolute top-[-45px]"
              style={{
                left: "44%",
                width: "clamp(300px, 40vw, 572px)",
              }}
            >
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  className="absolute"
                  style={{ top: segTop(idx) + BADGE_OFFSET + 30 }}
                >
                  <p className="font-gaegu font-bold text-cateneo-darkbrown text-[38px] leading-tight ">
                    {step.title}
                  </p>
                  <p className="font-gaegu font-bold text-cateneo-black text-[24px] leading-snug">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}