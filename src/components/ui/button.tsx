import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "text-zinc-400 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",

  variants: {
    size: {
      default: "px-3 py-2",
      icon: "p-2",
      "icon-sm": "p-1",
    },
  },

  defaultVariants: {
    size: "default",
  },
});

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLElement, ButtonProps>(
  ({ size, className, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    const combinedClassName = buttonVariants({ size }) + (className ? ` ${className}` : "");

    return (
      <Component ref={ref as any} className={combinedClassName} {...props} />
    );
  }
);

Button.displayName = "Button";
