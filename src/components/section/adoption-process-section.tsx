import React from "react";

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

const SEGMENT_H = 238;
const CAP_H     = 30;

const segTop = (idx: number) => idx * (SEGMENT_H - CAP_H);

const BADGE_OFFSET_FROM_SEG = 60;

export default function AdoptionProcessSection() {
  const lastIdx = steps.length - 1;

  return (
    <div className="fixed inset-0 bg-cateneo-white flex items-center justify-center">
      <div className="relative w-[1017px] h-[994px]">

        {/* Title */}
        <h2 className="absolute left-0 top-0 w-[278px] font-playpen font-bold text-[60px] leading-[91px] text-cateneo-darkbrown">
          The<br />Adoption<br />Process
        </h2>

        {/* Segments column */}
        <div className="absolute left-[327px] top-0 w-[87px] h-[994px]">
          {steps.map((step, idx) => {
            const isLast = idx === lastIdx;
            const top    = segTop(idx);

            return (
              <div
                key={step.number}
                className="absolute w-[87px]"
                style={{ top, height: SEGMENT_H, zIndex: idx + 1 }}
              >
                {/* Rounded top cap — every segment */}
                <div
                  className={`absolute w-[42px] left-[23px] top-0 ${segments[idx].rod}`}
                  style={{ height: CAP_H, borderRadius: "30px 30px 0 0" }}
                />

                {/* Straight rod body */}
                <div
                  className={`absolute w-[42px] left-[23px] ${segments[idx].rod}`}
                  style={{
                    top: CAP_H,
                    height: SEGMENT_H - CAP_H - (isLast ? CAP_H : 0),
                    borderRadius: 0,
                  }}
                />

                {/* Rounded bottom cap — last segment only */}
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

                {/* Badge */}
                <div
                  className={`absolute w-[87px] h-[87px] left-0 bg-cateneo-white border-[3px] rounded-[15px] flex items-center justify-center ${segments[idx].badge}`}
                  style={{ top: BADGE_OFFSET_FROM_SEG, zIndex: idx + 10 }}
                >
                  <span className={`font-playpen font-bold text-[60px] leading-[91px] ${segments[idx].num}`}>
                    {step.number}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Steps content */}
        <div className="absolute left-[445px] top-0 w-[572px]">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="absolute w-[572px]"
              style={{ top: segTop(idx) + BADGE_OFFSET_FROM_SEG }}
            >
              <p className="font-gaegu font-bold text-[32px] leading-[40px] text-cateneo-darkbrown">
                {step.title}
              </p>
              <p className="font-gaegu font-bold text-[28px] leading-[35px] text-cateneo-black">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}