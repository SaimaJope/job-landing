import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-medium outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-accent-glow/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-background shadow-[0_0_22px_rgba(0,141,200,0.18)] hover:border-accent-glow hover:bg-accent-glow hover:text-background hover:shadow-[0_0_30px_rgba(103,232,249,0.3)]",
        outline:
          "border-white/[0.12] bg-white/[0.035] text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:border-accent-glow hover:bg-white/[0.07]",
        ghost:
          "border-transparent bg-transparent text-text-secondary hover:text-text-primary",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
