"use client";

import { cloneElement, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MALE_SVG, FEMALE_SVG, COLOR_MAP } from "@/lib/kittenean-card-config";
import { Popover as PopoverPrimitive } from "radix-ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type CatProps = {
  imageUrl: string;
  sex: "male" | "female";
  catName: string;
  location: string;
  color: ("white" | "darkbrown" | "lightbrown" | "orange" | "black" | "gray")[];
  healthStatus: string;
  medicine: string | null;
  personality: string;
  svgColor: "white" | "darkbrown" | "lightbrown" | "orange" | "black" | "gray";
  onEdit?: () => void;
  onDelete?: () => void;
};

const VITAMIN_DICTIONARY: Record<string, string> = {
  "LC-Vit":
    "LC-Vit (or LC-Vit Plus) for cats is a popular, over-the-counter multivitamin syrup designed to boost immunity, increase appetite, and treat vitamin deficiencies during stress or illness.",
  "Nutri-Plus Gel":
    "Nutri-Plus Gel is a fast-acting energy supplement and nutritional support for growing, active, or recovering cats.",
};

const getMedicineDescriptions = (medicineString: string | null): string[] => {
  if (!medicineString) return ["No medicine assigned."];
  const matches: string[] = [];
  Object.entries(VITAMIN_DICTIONARY).forEach(([key, description]) => {
    if (medicineString.toLowerCase().includes(key.toLowerCase())) {
      matches.push(description);
    }
  });
  return matches.length > 0 ? matches : [medicineString];
};

const responsiveClamp = (min: number, max: number) =>
  `clamp(${min}px, calc(${min}px + ${max - min} * ((100vw - 640px) / 384)), ${max}px)`;

function CateneanCard({
  imageUrl,
  sex,
  catName,
  location,
  color,
  healthStatus,
  medicine,
  personality,
  svgColor,
  onEdit,
  onDelete,
}: CatProps) {
  const [medicineIsOpen, setMedicineIsOpen] = useState(false);
  const [actionsIsOpen, setActionsIsOpen] = useState(false);

  const genderIcon =
    sex === "male"
      ? cloneElement(MALE_SVG, {
          style: {
            width: responsiveClamp(10, 16),
            height: responsiveClamp(15, 24),
          },
        })
      : cloneElement(FEMALE_SVG, {
          style: {
            width: responsiveClamp(10, 16),
            height: responsiveClamp(15, 24),
          },
        });

  return (
    <Card
      className="flex bg-cateneo-white border-[2px] rounded-[17.41px] relative pt-[22.29px] pb-[17.5px] border-[#83491B] max-[640px]:!w-[calc(100vw-2rem)] max-[640px]:max-w-[360px] max-[640px]:max-h-[175.5px]"
      style={{
        width: responsiveClamp(282, 297.36),
        height: responsiveClamp(290, 482),
      }}
    >
      {/* ── Actions popover ── */}
      <Popover open={actionsIsOpen} onOpenChange={setActionsIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-cateneo-lightbrown/10 transition-colors z-10"
            aria-label="Open card actions"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="12" r="2" fill="#83491B" />
              <circle cx="12" cy="12" r="2" fill="#83491B" />
              <circle cx="19" cy="12" r="2" fill="#83491B" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-[190px] rounded-[24px] border-2 border-[#83491B] bg-[#e8e4d8] p-3 font-gaegu text-[#83491B]"
        >
          <button
            type="button"
            onClick={() => {
              setActionsIsOpen(false);
              onEdit?.();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[28px] leading-none hover:bg-[#ded8c8] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!onEdit}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z"
                stroke="#83491B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActionsIsOpen(false);
              onDelete?.();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[28px] leading-none hover:bg-[#ded8c8] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!onDelete}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H21"
                stroke="#83491B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6"
                stroke="#83491B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 6L18.3 18.2C18.2367 19.3128 17.3156 20.1875 16.2 20.1875H7.8C6.68439 20.1875 5.76332 19.3128 5.7 18.2L5 6"
                stroke="#83491B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Delete</span>
          </button>
        </PopoverContent>
      </Popover>

      <CardContent className="flex flex-col w-[100%] max-[640px]:flex-row max-[640px]:flex-wrap">
        {/* ── Cat SVG + photo ── */}
        <div className="w-full flex items-center justify-center relative max-[640px]:w-[40%]">
          <svg
            style={{
              width: responsiveClamp(100, 216),
              height: responsiveClamp(74.28, 176),
              marginBottom: responsiveClamp(5, 28),
            }}
            width="216"
            height="176"
            viewBox="0 0 216 176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.3869 145.301C23.0377 142.433 22.2522 142.055 19.2636 142.414C15.2561 142.905 11.2713 143.351 7.30936 143.754C4.47449 144.056 2.35688 142.527 2.1861 140.149C2.01533 137.772 3.41568 135.753 6.37009 135.413C9.6319 135.036 12.8937 134.715 16.1384 134.356C16.1115 132.978 15.5913 131.668 14.6918 130.713C13.7923 129.758 12.5869 129.236 11.3396 129.261C8.98295 128.978 6.64333 128.676 4.30371 128.356C1.38346 127.922 -0.307213 125.997 0.000181936 123.562C0.307577 121.128 2.47642 119.788 5.41375 120.015L10.9298 120.656C10.4916 118.663 10.1778 116.64 9.99053 114.599C9.64638 109.929 9.60072 105.237 9.85391 100.56C10.6565 91.2188 11.6812 81.8781 13.0986 72.5939C14.6327 62.9587 16.9183 53.4883 19.9296 44.2885C22.9159 34.1671 27.2004 24.5714 32.6524 15.7943C35.8256 11.1149 39.2471 6.64735 42.8989 2.41532C45.1873 -0.301998 47.8172 -0.622792 51.1132 0.9057C55.2932 2.95142 59.0438 5.9328 62.1282 9.66151C68.481 16.7945 74.6289 24.0784 80.7085 31.4189C81.2499 32.1571 81.975 32.7041 82.7943 32.9924C83.6136 33.2808 84.4914 33.298 85.3194 33.0418C96.6723 31.0236 108.208 30.5672 119.662 31.6831C123.505 32.0417 127.33 32.6266 131.138 33.2305C131.669 33.3673 132.223 33.3314 132.736 33.1271C133.248 32.9228 133.696 32.5589 134.024 32.0794C139.916 25.0219 145.74 17.9078 151.87 11.0202C154.672 8.09299 157.656 5.38782 160.802 2.92482C162.033 1.98974 163.371 1.24086 164.781 0.698127C165.985 0.0548031 167.341 -0.154669 168.659 0.0992499C169.976 0.353169 171.189 1.05767 172.124 2.1134C178.026 8.12953 182.989 15.1812 186.811 22.9839C193.618 36.9034 198.483 51.8792 201.242 67.4045C203.688 79.7781 205.174 92.36 205.682 105.013C205.953 109.934 205.544 114.872 204.469 119.656C204.44 119.989 204.44 120.324 204.469 120.656C206.416 120.43 208.226 120.204 210.036 120.015C212.957 119.732 214.955 121.053 215.331 123.487C215.706 125.921 214.05 127.922 211.181 128.337C208.67 128.695 206.16 129.11 203.632 129.299C202.873 129.211 202.109 129.407 201.462 129.855C200.815 130.303 200.322 130.977 200.063 131.771C199.725 132.616 199.337 133.436 198.902 134.224C200.917 134.488 202.693 134.753 204.486 134.96C205.972 135.13 207.475 135.224 208.978 135.394C211.966 135.734 213.623 137.621 213.298 140.244C212.974 142.867 210.89 144.018 208.038 143.773C204.076 143.357 200.092 142.911 196.084 142.433C193.061 142.055 192.412 142.433 190.961 145.301L196.392 147.301C198.697 148.188 199.807 149.66 199.807 151.528C199.67 154.491 196.631 156.397 193.642 155.302C190.654 154.208 188.058 153.264 185.291 152.17C184.86 151.956 184.384 151.88 183.916 151.95C183.449 152.02 183.008 152.233 182.644 152.566C170.929 161.869 157.352 167.662 142.597 171.436C125.723 175.496 108.373 176.573 91.1941 174.625C73.1602 172.738 56.1852 167.757 40.935 158.303C38.1513 156.585 35.5214 154.529 32.9256 152.642C32.5367 152.297 32.0686 152.08 31.5738 152.013C31.0791 151.946 30.5774 152.033 30.1249 152.264C27.4779 153.34 24.7967 154.34 22.0985 155.302C21.0178 155.813 19.8045 155.864 18.6917 155.446C17.579 155.028 16.6453 154.17 16.0701 153.038C15.0967 150.83 16.1897 148.528 18.7513 147.509C20.4932 146.697 22.4742 146.018 24.3869 145.301Z"
              fill={COLOR_MAP[svgColor]}
            />
          </svg>
          <img
            className="rounded-full absolute border-[2.41px] border-white border-solid"
            style={{
              width: responsiveClamp(49.5, 121.61),
              height: responsiveClamp(49.5, 121.61),
              top: responsiveClamp(19.25, 42.72),
            }}
            src={imageUrl}
            alt="image of a cat"
          />
        </div>

        {/* ── Info rows ── */}
        <div
          className="font-gaegu flex flex-col relative w-[100%] max-[640px]:flex-wrap max-[640px]:flex-row max-[640px]:w-[60%] max-[640px]:pl-[5px]"
          style={{ gap: responsiveClamp(2.25, 3.11) }}
        >
          {/* Name + gender */}
          <div
            className="flex items-center max-[640px]:order-1 max-[640px]:w-[80%]"
            style={{ height: responsiveClamp(15.5, 27), gap: responsiveClamp(5.84, 8) }}
          >
            <CardTitle
              className="text-[24.9px] text-cateneo-darkbrown max-w-[80%] leading-none line-clamp-1"
              style={{ fontSize: responsiveClamp(13.5, 24.9) }}
            >
              {catName}
            </CardTitle>
            {genderIcon}
          </div>

          {/* Location */}
          <div
            className="flex items-center pl-[4px] max-[640px]:order-3 max-[640px]:w-[100%]"
            style={{ height: responsiveClamp(15.5, 27), gap: responsiveClamp(5.84, 8) }}
          >
            <svg
              viewBox="0 0 19 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: responsiveClamp(9.45, 18.52),
                height: responsiveClamp(11.41, 22.36),
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.71237 2.71217C4.44894 0.975598 6.80424 0 9.26013 0C11.716 0 14.0713 0.975598 15.8079 2.71217C17.5445 4.44875 18.5201 6.80405 18.5201 9.25993C18.5201 11.7158 17.5445 14.0711 15.8079 15.8077L9.26013 22.3555L2.71237 15.8077C1.85245 14.9479 1.17032 13.9271 0.704925 12.8036C0.239534 11.6801 0 10.476 0 9.25993C0 8.04388 0.239534 6.83974 0.704925 5.71627C1.17032 4.5928 1.85245 3.572 2.71237 2.71217ZM9.26013 11.9055C9.96177 11.9055 10.6347 11.6268 11.1308 11.1306C11.627 10.6345 11.9057 9.96158 11.9057 9.25993C11.9057 8.55829 11.627 7.88538 11.1308 7.38924C10.6347 6.8931 9.96177 6.61437 9.26013 6.61437C8.55848 6.61437 7.88557 6.8931 7.38944 7.38924C6.8933 7.88538 6.61457 8.55829 6.61457 9.25993C6.61457 9.96158 6.8933 10.6345 7.38944 11.1306C7.88557 11.6268 8.55848 11.9055 9.26013 11.9055Z"
                fill="#BF7900"
              />
            </svg>
            <p
              className="text-[21.79px] text-cateneo-darkbrown max-w-[220px] leading-none line-clamp-1"
              style={{ fontSize: responsiveClamp(13.5, 21.79) }}
            >
              {location}
            </p>
          </div>

          {/* Color */}
          <div
            className="flex items-center max-[640px]:order-5 max-[640px]:w-[100%]"
            style={{ height: responsiveClamp(16, 27.97), gap: responsiveClamp(5.84, 8) }}
          >
            <p
              className="text-[17.12px] text-cateneo-lightbrown"
              style={{ fontSize: responsiveClamp(12, 17.12) }}
            >
              Color:
            </p>
            {color.map((colorName, index) => (
              <svg
                key={index}
                viewBox="0 0 35 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: responsiveClamp(16.49, 34.26),
                  height: responsiveClamp(13.49, 28.02),
                }}
              >
                <path
                  d="M26.7461 0.397461C26.8666 0.420767 26.9849 0.486898 27.0801 0.594727L27.0859 0.602539L27.0928 0.609375C28.0012 1.53891 28.7672 2.62966 29.3574 3.83887C30.4238 6.02757 31.1857 8.38396 31.6182 10.8271L31.6201 10.834C32.0053 12.7892 32.2383 14.7777 32.3184 16.7773L32.3193 16.7832C32.3605 17.5332 32.2978 18.2859 32.1348 19.0146L32.1299 19.04L32.127 19.0654C32.1204 19.141 32.1204 19.2174 32.127 19.293L32.1621 19.6914L32.5596 19.6455C32.8722 19.609 33.153 19.5727 33.4365 19.543L33.4375 19.5439C33.606 19.5276 33.7067 19.5613 33.7588 19.5957C33.8037 19.6254 33.8427 19.6742 33.8574 19.7695C33.8708 19.8568 33.8488 19.9202 33.8086 19.9678C33.776 20.0064 33.7185 20.0489 33.6279 20.0771L33.5264 20.0996C33.1226 20.1575 32.7499 20.2186 32.3721 20.248C32.1728 20.2373 31.9777 20.2938 31.8145 20.4072C31.6817 20.4995 31.5768 20.6241 31.5049 20.7656L31.4531 20.8887C31.4053 21.0088 31.3495 21.1256 31.2881 21.2373L31.0137 21.7363L31.5791 21.8105L32.4727 21.9287C32.5965 21.9429 32.7206 21.9534 32.8389 21.9639C32.9588 21.9745 33.0737 21.9851 33.1875 21.998C33.3546 22.0171 33.4413 22.0737 33.4814 22.1191C33.5172 22.1596 33.5462 22.2246 33.5322 22.3379C33.5191 22.4441 33.48 22.4861 33.4414 22.5107C33.3901 22.5435 33.2876 22.5754 33.1152 22.5605C32.49 22.4947 31.861 22.4244 31.2285 22.3486H31.2295C30.9989 22.3197 30.7292 22.2953 30.4893 22.4307C30.257 22.5617 30.1281 22.8022 30.0195 23.0176L29.8232 23.4062L30.2314 23.5576L31.0898 23.874V23.875C31.227 23.9279 31.2981 23.9869 31.334 24.0322C31.3646 24.0709 31.3811 24.115 31.3828 24.1768C31.3691 24.3561 31.1778 24.5161 30.9268 24.4238C30.4501 24.2486 30.0426 24.1001 29.6084 23.9277H29.6074C29.4765 23.8695 29.3321 23.8476 29.1885 23.8691C29.0725 23.8866 28.9644 23.9307 28.8701 23.9951L28.8018 24.0479C27.1062 25.3993 25.1505 26.2788 23.0098 26.8721L22.5791 26.9873C19.9416 27.6236 17.2304 27.7918 14.5459 27.4863H14.542C11.7203 27.1899 9.08015 26.4093 6.71484 24.9375H6.71387C6.28797 24.6738 5.8927 24.362 5.46484 24.0498H5.46387C5.38267 23.9842 5.29033 23.9332 5.18945 23.9033L5.07324 23.8779L4.9541 23.8711C4.84653 23.8732 4.74136 23.8993 4.64355 23.9443V23.9434C4.22945 24.1123 3.80851 24.2704 3.38281 24.4229L3.36426 24.4287L3.34766 24.4375C3.27063 24.474 3.18686 24.4774 3.10938 24.4482C3.0325 24.4193 2.95815 24.3558 2.90723 24.2598C2.87932 24.1893 2.8853 24.132 2.9082 24.084C2.93446 24.0293 2.99775 23.9575 3.12598 23.9062L3.13672 23.9023L3.14648 23.8975C3.40531 23.7764 3.69521 23.6768 4.01465 23.5566L4.4082 23.4082L4.23047 23.0273C4.12506 22.8024 3.99579 22.5612 3.75684 22.4287C3.51696 22.2957 3.2472 22.3179 3.0166 22.3457H3.01562C2.38111 22.4237 1.75025 22.4946 1.12305 22.5586H1.12109C0.973581 22.5744 0.875153 22.5393 0.821289 22.501C0.772121 22.4659 0.740667 22.4163 0.735352 22.3428C0.727766 22.2368 0.755801 22.1635 0.793945 22.1172C0.821478 22.0838 0.870513 22.0453 0.957031 22.0205L1.05762 22.001C1.57723 21.9406 2.08493 21.8902 2.60938 21.832L2.96191 21.793L2.95508 21.4385C2.94903 21.1278 2.83273 20.8242 2.62012 20.5977C2.41594 20.3801 2.13687 20.25 1.83789 20.2441C1.47038 20.1998 1.10534 20.1528 0.740234 20.1025H0.741211C0.579831 20.0784 0.48689 20.0189 0.44043 19.9668C0.398394 19.9195 0.374868 19.8583 0.385742 19.7715C0.395857 19.6911 0.430583 19.6424 0.484375 19.6074C0.545727 19.5677 0.656131 19.5315 0.822266 19.543L1.69238 19.6455L2.23438 19.709L2.11816 19.1758C2.05245 18.8758 2.00495 18.571 1.97656 18.2637C1.93643 17.7169 1.92247 17.1682 1.93457 16.6201L1.95508 16.0723C2.08206 14.5912 2.24459 13.1128 2.46777 11.6455L2.4668 11.6445C2.67744 10.3177 2.9791 9.01102 3.36719 7.73535L3.53906 7.18945L3.54199 7.17871C4.00649 5.59853 4.67234 4.10124 5.51855 2.73242C6.01354 2.00027 6.54721 1.30158 7.11621 0.639648L7.12012 0.635742C7.25796 0.471492 7.3762 0.412076 7.47949 0.394531C7.58893 0.375991 7.73998 0.393814 7.95605 0.493164V0.494141C8.56906 0.795271 9.12232 1.23575 9.5791 1.79004L9.58398 1.79492L9.58887 1.80078C10.5946 2.93425 11.5689 4.09281 12.5342 5.2627L12.5352 5.26172C12.6635 5.43022 12.8349 5.56169 13.0361 5.63281C13.2298 5.70125 13.4368 5.70663 13.6348 5.65527L13.6357 5.65723C15.4061 5.34133 17.2052 5.26969 18.9912 5.44434H18.9922C19.5893 5.50026 20.1865 5.59211 20.792 5.68848V5.68652C20.9464 5.7191 21.1053 5.70712 21.252 5.64844C21.3976 5.59014 21.5189 5.49073 21.6104 5.36816L21.6113 5.36914C22.5514 4.23879 23.4719 3.11085 24.4414 2.01758L24.4404 2.0166C24.8692 1.56784 25.3264 1.15413 25.8066 0.776367C25.9738 0.64888 26.1546 0.54768 26.3438 0.474609L26.3662 0.46582L26.3877 0.454102C26.5017 0.393068 26.6264 0.374357 26.7461 0.397461Z"
                  fill={COLOR_MAP[colorName]}
                  stroke="#83491B"
                  strokeWidth="0.778106"
                />
              </svg>
            ))}
          </div>

          {/* Health status */}
          <div
            className="flex min-w-0 items-center max-[640px]:order-7 max-[640px]:w-[100%]"
            style={{ height: responsiveClamp(15.5, 27), gap: responsiveClamp(5.84, 8) }}
          >
            <p
              className="shrink-0 text-[17.12px] text-cateneo-lightbrown max-[640px]:w-[75px]"
              style={{ fontSize: responsiveClamp(12, 17.12) }}
            >
              Health Status:
            </p>
            <p
              className="min-w-0 flex-1 text-[21.79px] text-cateneo-darkbrown truncate"
              style={{ fontSize: responsiveClamp(13.5, 21.79) }}
              title={healthStatus}
            >
              {healthStatus}
            </p>
          </div>

          {/* Medicines */}
          <div
            className="flex items-center relative max-[640px]:order-8 max-[640px]:w-[90%]"
            style={{ height: responsiveClamp(15.5, 27), gap: responsiveClamp(5.84, 8) }}
          >
            <p
              className="shrink-0 text-[17.12px] text-cateneo-lightbrown"
              style={{ fontSize: responsiveClamp(12, 17.12) }}
            >
              Medicines:
            </p>
            <p
              className="text-[21.79px] text-cateneo-darkbrown truncate max-w-[220px]"
              style={{ fontSize: responsiveClamp(13.5, 21.79) }}
            >
              {medicine ?? "💊 N/A"}
            </p>
            <Popover open={medicineIsOpen} onOpenChange={setMedicineIsOpen}>
              <PopoverTrigger asChild>
                <button>
                  <svg
                    style={{
                      width: responsiveClamp(10.36, 16),
                      height: responsiveClamp(10.36, 16),
                    }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.90264 0C3.53719 0 0 3.53719 0 7.90264C0 12.2681 3.53719 15.8053 7.90264 15.8053C12.2681 15.8053 15.8053 12.2681 15.8053 7.90264C15.8053 3.53719 12.2681 0 7.90264 0ZM8.62452 11.55H7.17317V6.07515H8.62452V11.55ZM7.89884 5.47866C7.46951 5.47866 7.11997 5.15191 7.11997 4.71879C7.11997 4.28566 7.47331 3.96272 7.89884 3.96272C8.33197 3.96272 8.68531 4.28566 8.68531 4.71879C8.68531 5.15191 8.33197 5.47866 7.89884 5.47866Z"
                      fill="#BF7900"
                    />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                align="start"
                alignOffset={-12}
                sideOffset={8}
                className="bg-cateneo-lightbrown flex flex-col gap-2"
                style={{ width: responsiveClamp(172, 207) }}
              >
                <PopoverPrimitive.Arrow
                  width={12}
                  height={8}
                  fill="#BF7900"
                  style={{ strokeWidth: 1 }}
                />
                {getMedicineDescriptions(medicine).map((desc, idx) => (
                  <p
                    key={idx}
                    className="font-gaegu text-cateneo-white leading-tight"
                    style={{ fontSize: responsiveClamp(13.5, 16) }}
                  >
                    {desc}
                  </p>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Personality — full width below both columns */}
        <div className="pr-[41px] font-gaegu w-[100%] max-[640px]:order-9">
          <p
            className="text-[17.12px] text-cateneo-lightbrown"
            style={{ fontSize: responsiveClamp(12, 17.12) }}
          >
            Personality:
          </p>
          <p
            className="text-[21.79px] text-cateneo-darkbrown leading-none line-clamp-2 cursor-help break-words"
            style={{ fontSize: responsiveClamp(13.5, 21.79) }}
            title={personality}
          >
            {personality}
          </p>
        </div>
      </CardContent>

      {/* ── Paw print decoration ── */}
      <svg
        className="absolute bottom-[15.74px] right-[13.24px]"
        width="42"
        height="40"
        viewBox="0 0 42 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: responsiveClamp(40, 42),
          height: responsiveClamp(36, 38.5),
        }}
      >
        <path d="M9.36617 19.4304C11.5416 19.0999 12.9778 16.7278 12.574 14.132C12.1702 11.5363 10.0794 9.70001 7.90394 10.0305C5.72852 10.361 4.29233 12.7331 4.69611 15.3289C5.0999 17.9246 7.19076 19.7609 9.36617 19.4304Z" fill="#83491B" />
        <path d="M18.699 13.2058C21.0875 13.1576 22.9712 10.8088 22.9064 7.95977C22.8415 5.11068 20.8526 2.84012 18.4641 2.88832C16.0756 2.93651 14.1919 5.28522 14.2568 8.1343C14.3216 10.9834 16.3105 13.254 18.699 13.2058Z" fill="#83491B" />
        <path d="M34.9014 13.4824C36.2783 10.9876 35.6966 8.03312 33.6022 6.88334C31.5078 5.73355 28.6938 6.8239 27.3169 9.3187C25.9401 11.8135 26.5217 14.768 28.6161 15.9178C30.7105 17.0676 33.5245 15.9772 34.9014 13.4824Z" fill="#83491B" />
        <path d="M37.2359 24.2518C38.9924 22.2977 39.0853 19.5266 37.4435 18.0623C35.8017 16.598 33.0468 16.9951 31.2904 18.9491C29.5339 20.9032 29.441 23.6743 31.0828 25.1386C32.7246 26.6029 35.4795 26.2059 37.2359 24.2518Z" fill="#83491B" />
        <path d="M19.6842 29.5281C22.9276 30.3972 26.258 28.4851 27.1229 25.2573C27.9878 22.0295 26.0596 18.7083 22.8162 17.8392C19.5728 16.9701 16.2424 18.8823 15.3775 22.1101C14.5126 25.3379 16.4408 28.6591 19.6842 29.5281Z" fill="#83491B" />
        <path d="M13.3137 34.5046C16.9897 35.4896 20.6708 33.6714 21.5357 30.4436C22.4006 27.2158 20.1217 23.8007 16.4457 22.8157C12.7697 21.8307 9.08857 23.6489 8.22368 26.8767C7.35879 30.1045 9.63765 33.5196 13.3137 34.5046Z" fill="#83491B" />
        <path d="M23.1027 37.1277C26.7787 38.1127 30.4598 36.2945 31.3247 33.0667C32.1896 29.8389 29.9108 26.4237 26.2348 25.4387C22.5588 24.4538 18.8776 26.2719 18.0127 29.4997C17.1479 32.7276 19.4267 36.1427 23.1027 37.1277Z" fill="#83491B" />
      </svg>
    </Card>
  );
}

export default CateneanCard;