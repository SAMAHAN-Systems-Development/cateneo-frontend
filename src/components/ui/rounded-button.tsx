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
        "default":        "bg-stone-800 text-white",
        "primary":        "bg-amber-700 text-white",
        "secondary":      "bg-amber-500 text-stone-900",
        "accent":         "bg-amber-300 text-stone-900",
        "muted":          "bg-stone-200 text-stone-800",

        // Outline variants
        "default-outline":    "bg-transparent border-2 border-stone-800 text-stone-800",
        "primary-outline":    "bg-transparent border-2 border-amber-700 text-amber-700",
        "secondary-outline":  "bg-transparent border-2 border-amber-500 text-amber-500",
        "accent-outline":     "bg-transparent border-2 border-amber-300 text-amber-300",
        "muted-outline":      "bg-transparent border-2 border-stone-400 text-stone-400",

        // Text variants
        "default-text":    "bg-transparent text-stone-800 hover:underline underline-offset-2 decoration-2",
        "primary-text":    "bg-transparent text-amber-700 hover:underline underline-offset-2 decoration-2",
        "secondary-text":  "bg-transparent text-amber-500 hover:underline underline-offset-2 decoration-2",
        "accent-text":     "bg-transparent text-amber-300 hover:underline underline-offset-2 decoration-2",
        "muted-text":      "bg-transparent text-stone-400 hover:underline underline-offset-2 decoration-2",
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
          <span className="flex-shrink-0 transform-none">{icon}</span>
        )}
        <span className="transform-none">{children}</span>
        {icon && iconPosition === "end" && (
          <span className="flex-shrink-0 transform-none">{icon}</span>
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



///////// FOR page.tsx TESTING ////////


// "use client";

// import { RoundedButton } from "@/components/ui/rounded-button";
// import { Check } from "lucide-react";

// const solidVariants = [
//   "default",
//   "primary",
//   "secondary",
//   "accent",
//   "muted",
// ] as const;

// const outlineVariants = [
//   "default-outline",
//   "primary-outline",
//   "secondary-outline",
//   "accent-outline",
//   "muted-outline",
// ] as const;

// const textVariants = [
//   "default-text",
//   "primary-text",
//   "secondary-text",
//   "accent-text",
//   "muted-text",
// ] as const;

// const ButtonShowcase = () => {
//   return (
//     <div className="min-h-screen bg-[#d6d9ce] p-10 font-gaegu">

//       {/* SOLID */}
//       <div className="grid grid-cols-3 gap-6 mb-10">
//         {/* Plain */}
//         <div className="flex flex-col gap-3">
//           {solidVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v}>button</RoundedButton>
//               <RoundedButton variant={v}>button</RoundedButton>
//             </div>
//           ))}
//         </div>

//         {/* With icon start */}
//         <div className="flex flex-col gap-3">
//           {solidVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v} icon={<Check />} iconPosition="start" iconSize="sm">button</RoundedButton>
//               <RoundedButton variant={v} icon={<Check />} iconPosition="start" iconSize="sm">button</RoundedButton>
//             </div>
//           ))}
//         </div>

//         {/* With icon end */}
//         <div className="flex flex-col gap-3">
//           {solidVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v} icon={<Check />} iconPosition="end" iconSize="sm">button</RoundedButton>
//               <RoundedButton variant={v} icon={<Check />} iconPosition="end" iconSize="sm">button</RoundedButton>
//             </div>
//           ))}
//         </div>
//       </div>


//           {/* outline */}
//       <div className="grid grid-cols-3 gap-6 mb-10">
        
//         <div className="flex flex-col gap-3">
//           {outlineVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v}>button</RoundedButton>
//               <RoundedButton variant={v}>button</RoundedButton>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col gap-3">
//           {outlineVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v} icon={<Check />} iconPosition="start" iconSize="sm">button</RoundedButton>
//               <RoundedButton variant={v} icon={<Check />} iconPosition="start" iconSize="sm">button</RoundedButton>
//             </div>
//           ))}
//         </div>

//         {/* With icon end */}
//         <div className="flex flex-col gap-3">
//           {outlineVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v} icon={<Check />} iconPosition="end" iconSize="sm">button</RoundedButton>
//               <RoundedButton variant={v} icon={<Check />} iconPosition="end" iconSize="sm">button</RoundedButton>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* TEXT */}
//       <div className="grid grid-cols-3 gap-6">
//         {/* Plain */}
//         <div className="flex flex-col gap-3">
//           {textVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v}>button</RoundedButton>
//               <RoundedButton variant={v}>button</RoundedButton>
//             </div>
//           ))}
//         </div>

//         {/* With icon start */}
//         <div className="flex flex-col gap-3">
//           {textVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v} icon={<Check />} iconPosition="start" iconSize="sm">button</RoundedButton>
//               <RoundedButton variant={v} icon={<Check />} iconPosition="start" iconSize="sm">button</RoundedButton>
//             </div>
//           ))}
//         </div>

//         {/* With icon end */}
//         <div className="flex flex-col gap-3">
//           {textVariants.map((v) => (
//             <div key={v} className="flex gap-3">
//               <RoundedButton variant={v} icon={<Check />} iconPosition="end" iconSize="sm">button</RoundedButton>
//               <RoundedButton variant={v} icon={<Check />} iconPosition="end" iconSize="sm">button</RoundedButton>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ButtonShowcase;


/////// FOR page.tsx TESTING /////////