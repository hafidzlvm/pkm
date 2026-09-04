import clsx from "clsx";
import styles from "./projectShowcaseSection.module.scss";
import Image from "next/image";

export function ProjectShowcaseItem({
  description,
  title,
  category = "Mini Project",
  children,
  urlImage,
  isLeft = true,
}: {
  category?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  urlImage?: string;
  isLeft?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-[18px] md:items-center md:justify-center md:relative",
        isLeft ? "md:flex-row" : "md:flex-row-reverse",
      )}
    >
      <div
        className={clsx(
          "flex flex-col gap-[37px]",
          isLeft ? "md:translate-x-10 " : "md:-translate-x-10",
        )}
      >
        <div className="flex flex-col gap-[14px]">
          <div
            className={clsx(
              "flex flex-col font-poppins",
              isLeft ? "" : "text-end",
            )}
          >
            <p className="text-sm md:text-base font-semibold tracking-[2%] text-[rgba(21,_20,_57,_0.4)]">
              {category}
            </p>
            <h3 className="text-[28px] md:text-[34px] font-medium tracking-[2%]">
              {title}
            </h3>
          </div>
          <div
            // data-isLeft={isLeft}
            className={clsx(
              "py-4 flex px-[14px] md:text-[18px] rounded-[14px] relative text-justify backdrop-blur-[80px] md:w-[668px]",
              isLeft ? "" : "",
              styles.description,
            )}
          >
            <p className={isLeft ? "w-full" : ""}>{description}</p>
          </div>
        </div>
        <div className={clsx("flex gap-4 items-center",
          isLeft ? "justify-start" : "justify-end"
        )}>
          <Image
            className="cursor-pointer"
            alt=""
            src="/IconBlack.svg"
            height={0}
            width={34}
          />
          <Image
            className="cursor-pointer"
            alt=""
            src="/IconBlack.svg"
            height={0}
            width={34}
          />
        </div>
      </div>
      <div className={clsx(
          "rounded-[10px] relative w-full overflow-hidden h-[206px] md:max-w-[582px] md:h-[341px] bg-gradient-to-r md:z-[-1]",
          isLeft ? "md:-translate-x-10 from-[#666666] to-black" : "md:translate-x-10 from-black to-[#666666]",
        )}
      >
        <div
          className={clsx(
            "h-full w-full absolute bg-white rounded-[15px]",
            isLeft ? "top-[18px] left-[26px] md:left-[44px] md:top-[30px]" : "top-[18px] right-[26px] md:top-[31px] md:right-[47px]",
          )}
        />
      </div>
    </div>
  );
}
