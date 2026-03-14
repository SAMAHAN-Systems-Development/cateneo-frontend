import { cva } from "class-variance-authority";
import { FC } from "react";

const tabButtonStyles = cva(
  [
    "font-playpen font-light",
    "w-full h-full",
    "flex items-center justify-center",
    "rounded-t-[40px]",
    "py-1 px-3",
    "h-8 lg:h-10",
    "text-xs sm:text-sm lg:text-base xl:text-lg",
    "transition-all duration-150",
  ].join(" "),
  {
    variants: {
      color: {
        orange: "bg-cateneo-orange",
        lightbrown: "bg-cateneo-lightbrown",
        darkbrown: "bg-cateneo-darkbrown",
      },
      style: {
        filled: "text-cateneo-white",
        filledOutline:
          "text-cateneo-white outline outline-2 outline-cateneo-white",
        invertedLight: "",
        filledDark: "text-cateneo-black",
        filledDarkOutline:
          "text-cateneo-black outline outline-2 outline-cateneo-black",
        invertedDark: "",
      },
    },
    defaultVariants: {
      color: "orange",
      style: "filled",
    },
  },
);

type ColorType = "orange" | "lightbrown" | "darkbrown";
type StyleType =
  | "filled"
  | "filledOutline"
  | "invertedLight"
  | "filledDark"
  | "filledDarkOutline"
  | "invertedDark";

interface TabButtonProps {
  title?: string;
  color?: ColorType;
  style?: StyleType;
  tabChange?: () => void;
  className?: string;
}

const invertedBg: Record<string, string> = {
  invertedLight: "!bg-cateneo-white",
  invertedDark: "!bg-cateneo-black",
};

const invertedText: Record<ColorType, string> = {
  orange: "text-cateneo-orange",
  lightbrown: "text-cateneo-lightbrown",
  darkbrown: "text-cateneo-darkbrown",
};

const TabButton: FC<TabButtonProps> = ({
  title,
  color = "orange",
  style = "filled",
  tabChange,
  className,
}) => {
  const isInverted = style === "invertedLight" || style === "invertedDark";

  return (
    <button
      className={[
        tabButtonStyles({ color, style }),
        isInverted ? invertedBg[style] : "",
        isInverted ? invertedText[color] : "",
        className ?? "",
      ].join(" ")}
      onClick={tabChange}
    >
      {title}
    </button>
  );
};

export default TabButton;