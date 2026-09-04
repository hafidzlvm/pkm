import clsx from "clsx";
import React from "react";

export function Title({
  title,
  children,
  className
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("text-center flex flex-col items-center justify-center gap-2 font-manrope", className)}>
      <h6 className="text-[28px] md:text-[48px] leading-[150%] tracking-[-2%] font-semibold">
        {title}
      </h6>
      {children}
    </div>
  );
}
