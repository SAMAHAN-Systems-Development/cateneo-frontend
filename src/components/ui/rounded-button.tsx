"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full text-sm sm:text-base md:text-lg lg:text-xl font-light transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-6 py-2 hover:scale-110 font-gaegu",
  {
    variants: {
      variant: {
        // Solid variants
        "default":        "bg-cateneo-black text-cateneo-white",
        "primary":        "bg-cateneo-darkbrown text-cateneo-white",
        "secondary":      "bg-cateneo-lightbrown text-cateneo-black",
        "accent":         "bg-cateneo-orange text-cateneo-black",
        "muted":          "bg-cateneo-white text-cateneo-black",

        // Outline variants
        "default-outline":    "bg-transparent border-2 border-cateneo-black text-cateneo-black",
        "primary-outline":    "bg-transparent border-2 border-cateneo-darkbrown text-cateneo-darkbrown",
        "secondary-outline":  "bg-transparent border-2 border-cateneo-lightbrown text-cateneo-lightbrown",
        "accent-outline":     "bg-transparent border-2 border-cateneo-orange text-cateneo-orange",
        "muted-outline":      "bg-transparent border-2 border-cateneo-white text-cateneo-white",

        // Text variants
        "default-text":    "bg-transparent text-cateneo-black hover:underline underline-offset-2 decoration-2",
        "primary-text":    "bg-transparent text-cateneo-darkbrown hover:underline underline-offset-2 decoration-2",
        "secondary-text":  "bg-transparent text-cateneo-lightbrown hover:underline underline-offset-2 decoration-2",
        "accent-text":     "bg-transparent text-cateneo-orange hover:underline underline-offset-2 decoration-2",
        "muted-text":      "bg-transparent text-cateneo-white hover:underline underline-offset-2 decoration-2",
      },

      iconPosition: {
        none:  "",
        start: "pl-8 pr-10",
        end:   "pl-10 pr-8",
      },

      iconSize: {
        sm:      "[&>span>*]:w-3 [&>span>*]:h-3",
        default: "[&>span>*]:w-4 [&>span>*]:h-4",
        lg:      "[&>span>*]:w-5 [&>span>*]:h-5",
        xl:      "[&>span>*]:w-6 [&>span>*]:h-6",
      },
    },

    defaultVariants: {
      variant:      "default",
      iconPosition: "none",
      iconSize:     "default",
    },
  }
);

const RoundedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      iconPosition,
      iconSize,
      icon,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const content = (
      <>
        {icon && iconPosition === "start" && (
          <span className="shrink-0 transform-none">{icon}</span>
        )}
        <span className="transform-none">{children}</span>
        {icon && iconPosition === "end" && (
          <span className="shrink-0 transform-none">{icon}</span>
        )}
      </>
    );

    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(
            buttonVariants({ variant, iconPosition, iconSize }),
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, iconPosition, iconSize }),
          className
        )}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

RoundedButton.displayName = "Button";

export { RoundedButton, buttonVariants };
