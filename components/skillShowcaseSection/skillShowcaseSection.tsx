import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { ArrowRightLink } from "./clientSkillShowcase";

export function SkillShowcaseItem({
  title,
  subTitle,
  classNameImage,
  widthImage,
  heightImage,
  srcImage,
  altImage,
  classNameWrapperImage,
  urlLink,
}: {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
  classNameImage?: string;
  widthImage?: number;
  heightImage?: number;
  srcImage: string;
  altImage: string;
  classNameWrapperImage?: string;
  urlLink: string;
}) {
  return (
    <div className="flex justify-between items-center p-3.5 border rounded-[12px]">
      <div className="flex items-center gap-2.5">
        <div
          className={clsx(
            classNameWrapperImage,
            "rounded-[8px] flex py-0.5 px-2 items-center justify-center h-[50px] w-[50px] shadow-md",
          )}
        >
          <Image
            className={classNameImage}
            width={widthImage}
            height={heightImage}
            src={srcImage}
            alt={altImage}
          />
        </div>
        <div className="flex flex-col">
          <h5 className="font-poppins text-base leading-[25px] tracking-[0%]">
            {title}
          </h5>
          <p className="font-sans text-sm tracking-[0%] font-medium text-[rgba(21,_20,_57,_0.4)]">
            {subTitle}
          </p>
        </div>
      </div>
      <ArrowRightLink urlLink={urlLink} />
    </div>
  );
}
