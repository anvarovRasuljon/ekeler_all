import React from "react";
import { urlFor } from "../../sanity/client";
import { useLanguage } from "../../context/LanguageContext";

interface CtaSectionProps {
  badgeText?: any;
  headingPart1?: any;
  headingHighlight?: any;
  headingPart2?: any;
  description?: any;
  leftImage?: any;
  rightImage?: any;
}

const CtaSection: React.FC<CtaSectionProps> = ({
  badgeText,
  headingPart1,
  headingHighlight,
  headingPart2,
  description,
  leftImage,
  rightImage,
}) => {
  const { t } = useLanguage();

  // If essential content is missing, do not render the section
  if (!headingPart1 && !headingHighlight && !description) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#FBF3EA] pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="px-6 mx-auto max-w-7xl">
           {leftImage && (
        <img
          src={urlFor(leftImage).url()}
          alt=""
          className="absolute left-6 top-30 h-[190px] w-[190px] -translate-y-1/3 rounded-2xl object-cover shadow-sm md:left-16 md:h-[260px] md:w-[260px]"
        />
      )}
      {rightImage && (
        <img
          src={urlFor(rightImage).url()}
          alt=""
          className="absolute right-6 top-10 h-[110px] w-[190px] -translate-y-1/2 rounded-2xl object-cover shadow-sm md:right-16 md:h-[150px] md:w-[260px]"
        />
      )}

      <div className="flex flex-col items-center max-w-3xl px-6 mx-auto text-center">
        {badgeText && (
          <span className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
            {t(badgeText)}
          </span>
        )}

        <h1 className="font-inter text-[32px] font-normal leading-tight text-[#1B1D20] md:text-[48px]">
          {t(headingPart1)}
          {headingHighlight && (
            <span className="text-[#E2884A]">{t(headingHighlight)}</span>
          )}
          {t(headingPart2)}
        </h1>

        {description && (
          <p className="max-w-xl mt-6 text-base font-inter text-neutral-500 md:text-lg">
            {t(description)}
          </p>
        )}
      </div>
      </div>

    </section>
  );
};

export default CtaSection;