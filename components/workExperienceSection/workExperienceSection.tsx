import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function WorkExperienceItem({
  title,
  year,
  description,
  url,
}: {
  title: string;
  year: string;
  description: string;
  url?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:gap-[74px] md:items-center md:justify-center gap-[34px]">
      <div className="flex flex-col gap-3 md:max-w-[662px]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-0">
            <h2 className="font-medium font-poppins text-[28px] tracking-[-0.4px] md:leading-[52px] md:text-[42px]">
              {title}
            </h2>
            <p className="font-manrope font-medium text-[14px] leading-[26px] tracking-normal md:text-base">
              {year}
            </p>
          </div>
          <p className="text-base text-justify leading-[26px] font-sans text-[rgba(21,_20,_57,_0.4)]">
            {description}
          </p>
        </div>
        <Button className="rounded-4xl text-white font-manrope text-[16px] leading-[26px] font-medium tracking-[0%] w-fit !px-[26px] !py-2 shadow-2xl gap-3 md:text-[18px]">
          Learn More
          <ArrowUpRight />
        </Button>
      </div>
      <div className="w-full md:max-w-[470px] md:h-[266px] h-[199px] rounded-[10px] bg-blue-200" />
    </div>
  );
}
