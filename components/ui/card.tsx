import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card konten ala Starbucks (DESIGN.md §4) — putih, radius 12px,
 * shadow ganda low-alpha. Canvas halaman TIDAK putih (cream), card yang putih.
 */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-(--radius-card) bg-white shadow-card",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 md:p-6", className)} {...props} />;
}
