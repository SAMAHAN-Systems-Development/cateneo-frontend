import React, { FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";

// HOW TO USE
// <TabButton color="amberLight" title="button" />
// <TabButton color="amberLight" state="active" title="button" />
// <TabButton color="amberOutlined" state="outlined" title="button" />

const tabButtonStyles = cva(
  "font-gaegu w-full h-full flex items-center justify-center transition-all duration-150 rounded-t-full",
  {
    variants: {
      color: {
        // Left panel - solid filled variants (warm palette)
        amberLight:
          "bg-[#D4A017] text-[#F5ECD7] hover:bg-[#C49010] active:bg-[#B48010]",
        amberMid:
          "bg-[#C07C1A] text-[#F5ECD7] hover:bg-[#B06C0A] active:bg-[#A05C00]",
        cream:
          "bg-[#F5ECD7] text-[#C07C1A] hover:bg-[#EDE0C8] active:bg-[#E0D0B0]",
        brownMid:
          "bg-[#9B5C1A] text-[#F5ECD7] hover:bg-[#8B4C0A] active:bg-[#7B3C00]",
        brownDeep:
          "bg-[#7A3B0E] text-[#F5ECD7] hover:bg-[#6A2B00] active:bg-[#5A1B00]",
        creamLight:
          "bg-[#FAF3E3] text-[#9B5C1A] hover:bg-[#F0E8D0] active:bg-[#E0D8C0]",
        darkBrown:
          "bg-[#2C1A0E] text-[#F5ECD7] hover:bg-[#1C0A00] active:bg-[#0C0000]",
        darkMid:
          "bg-[#3D2010] text-[#F5ECD7] hover:bg-[#2D1000] active:bg-[#1D0000]",
        offWhite:
          "bg-[#F0E8D5] text-[#3D2010] hover:bg-[#E0D8C5] active:bg-[#D0C8B5]",

        // Right panel - outlined variants
        amberOutlined:
          "bg-[#D4A017] border-2 border-[#2C1A0E] text-[#F5ECD7] hover:bg-[#C49010] active:bg-[#B48010]",
        amberMidOutlined:
          "bg-[#C07C1A] border-2 border-[#D4A017] text-[#F5ECD7] hover:bg-[#B06C0A] active:bg-[#A05C00]",
        darkOutlined:
          "bg-[#2C1A0E] border-2 border-[#2C1A0E] text-[#F5ECD7] hover:bg-[#1C0A00] active:bg-[#0C0000]",
        brownOutlined:
          "bg-[#9B5C1A] border-2 border-[#D4A017] text-[#C07C1A] hover:bg-[#8B4C0A] active:bg-[#7B3C00]",
        brownMidOutlined:
          "bg-[#7A3B0E] border-2 border-[#9B5C1A] text-[#D4A017] hover:bg-[#6A2B00] active:bg-[#5A1B00]",
        darkMidOutlined:
          "bg-[#3D2010] border-2 border-[#7A3B0E] text-[#9B5C1A] hover:bg-[#2D1000] active:bg-[#1D0000]",
      },
      state: {
        filled: "",
        outlined: "",
        active: "brightness-75",
        disabled: "opacity-50 cursor-not-allowed pointer-events-none",
      },
      size: {
        sm: "h-8 py-1 px-3 text-xs",
        md: "h-10 py-1 px-4 text-sm",
        lg: "h-12 py-2 px-5 text-base",
        xl: "h-14 py-2 px-6 text-lg",
        responsive:
          "h-8 lg:h-10 py-1 px-3 text-xs sm:text-sm lg:text-base xl:text-lg",
      },
    },
    defaultVariants: {
      color: "amberLight",
      size: "responsive",
    },
  },
);

interface TabButtonProps extends VariantProps<typeof tabButtonStyles> {
  title?: string;
  color?:
    | "amberLight"
    | "amberMid"
    | "cream"
    | "brownMid"
    | "brownDeep"
    | "creamLight"
    | "darkBrown"
    | "darkMid"
    | "offWhite"
    | "amberOutlined"
    | "amberMidOutlined"
    | "darkOutlined"
    | "brownOutlined"
    | "brownMidOutlined"
    | "darkMidOutlined";
  size?: "sm" | "md" | "lg" | "xl" | "responsive";
  state?: "filled" | "outlined" | "active" | "disabled";
  tabChange?: () => void;
  className?: string;
}

const TabButton: FC<TabButtonProps> = ({
  title,
  color,
  size,
  state,
  tabChange,
  className = "",
}) => {
  return (
    <button
      className={`${tabButtonStyles({ color, size, state })} ${className}`}
      onClick={tabChange}
    >
      {title}
    </button>
  );
};

export default TabButton;
