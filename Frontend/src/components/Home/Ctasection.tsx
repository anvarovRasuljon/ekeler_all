import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import  leftImage  from "../../assets/redyImg_left.png";
import  rightImage  from "../../assets/redyimg_right.png";
import { ArrowUpRight } from "lucide-react";

interface CtaSectionProps {
  badgeText?: any;
  headingPart1?: any;
  headingHighlight?: any;
  headingPart2?: any;
  buttonText?: any;
  buttonLink?: any;
  leftImage?: any;
  // rightImage?: any;
}


const CtaSection: React.FC<CtaSectionProps> = ({
  badgeText = "Ready",
  headingPart1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo ",
  // headingHighlight = "start",
  // headingPart2 = "?",
  buttonText = "Bizning mahsulotlar",
  buttonLink = "/blog",
  // leftImage,
  // rightImage,
}) => {
  const { t } = useLanguage();
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : null), [t, badgeText]);
  const headingText = useMemo(() => (headingPart1 ? t(headingPart1) : null), [t, headingPart1]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);

  // If essential content is missing, do not render the section
  // if (!headingPart1 && !headingHighlight && !description) {
  //   return null;
  // }

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FBF3EA] pb-16 pt-20 sm:pb-20 sm:pt-24 md:pb-28 md:pt-32"
    >
      {/* Responsive: mobilda kichikroq padding, dekorativ rasmlar ham kichrayadi */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
           {leftImage && (
        <img
          src={leftImage}
          alt=""
          width={260}
          height={260}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute left-3 top-30 h-[110px] w-[110px] -translate-y-1/3 rounded-2xl object-cover shadow-sm sm:left-6 sm:h-[190px] sm:w-[190px] md:left-16 md:h-[260px] md:w-[260px]"
        />
      )}
      {rightImage && (
        <div
          className="absolute right-3 top-[-265px] h-[200px] w-[140px] overflow-hidden rounded-[8px] shadow-sm sm:right-6 sm:h-[350px] sm:w-[250px] md:right-16"
        >
          <img
            src={rightImage}
            alt=""
            width={250}
            height={350}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-2 text-center sm:px-6">
        {badgeTextValue && (
          <span className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
            {badgeTextValue}
          </span>
        )}

        <h1 className="break-words font-inter text-[24px] font-normal leading-tight text-[#1B1D20] sm:text-[32px] md:text-[40px] lg:text-[48px]">
          {headingText}

        </h1>

           <Link
          to={buttonLink}
          className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] mt-[28px] cursor-pointer"
        >
          <span className="inline-flex gap-6 items-center">
            {buttonLabel}
            <ArrowUpRight size={18} className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-neutral-300 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#1B1D20] group-hover:scale-x-100" />
          </div>
        </Link>
      </div>
      </div>

    </section>
  );
};

export default React.memo(CtaSection);