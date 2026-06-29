import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[10px] border px-6 text-[12px] font-medium uppercase tracking-[0.16em] outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-[#1f7fe0] text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:bg-[#2f8df0]",
        outline:
          "border-[rgba(120,160,210,0.3)] bg-transparent text-text-primary hover:border-[rgba(120,185,255,0.55)] hover:bg-[rgba(120,160,210,0.06)]",
        ghost:
          "border-transparent bg-transparent text-text-secondary hover:text-text-primary",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-[52px] px-8",
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
