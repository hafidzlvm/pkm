import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button pill ala Starbucks (DESIGN.md §4).
 * Radius 50px universal, active = scale(0.95), transition 0.2s ease.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-(--radius-pill) border font-semibold whitespace-nowrap transition-all duration-200 ease-out cursor-pointer hover:opacity-90 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-green-accent)",
  {
    variants: {
      variant: {
        /** Primary filled — Green Accent bg, putih */
        primary:
          "bg-(--color-green-accent) text-white border-(--color-green-accent)",
        /** Primary outlined — Green Accent text */
        outline:
          "bg-transparent text-(--color-green-accent) border-(--color-green-accent)",
        /** Hitam — momen konversi ("Gabung Sekarang") */
        black: "bg-(--color-ink) text-white border-(--color-ink)",
        /** Outlined teks gelap — ("Masuk") */
        "outline-dark":
          "bg-transparent text-(--color-text-black) border-(--color-text-black)",
        /** Inverted di atas House Green — putih + teks Green Accent */
        inverted:
          "bg-white text-(--color-green-accent) border-white",
        /** Outlined putih di atas House Green */
        "on-dark": "bg-transparent text-white border-white",
      },
      size: {
        sm: "px-4 py-1.75 text-sm",
        md: "px-4 py-1.75 text-base",
        lg: "px-10 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
