import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[10px] border px-6 text-[12px] font-medium uppercase tracking-[0.16em] outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "border-[rgba(140,200,255,0.35)] bg-[linear-gradient(180deg,#2f9bff,#1265cf)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_10px_32px_rgba(28,110,220,0.4),0_0_30px_rgba(47,130,255,0.28)] hover:brightness-[1.1] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.36),0_14px_40px_rgba(40,125,235,0.5),0_0_44px_rgba(77,166,255,0.34)]",
        outline:
          "border-[rgba(99,170,255,0.45)] bg-[rgba(16,32,58,0.28)] text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_22px_rgba(45,130,230,0.12)] backdrop-blur-xl hover:border-[rgba(140,200,255,0.7)] hover:bg-[rgba(26,48,82,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_0_30px_rgba(77,166,255,0.22)]",
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
