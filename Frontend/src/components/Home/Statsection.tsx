import React from "react";
import { urlFor } from "../../sanity/client";
import { useLanguage } from "../../context/LanguageContext";

interface StatItem {
  value: string;
  title: any;
  description?: any;
}

interface StatsSectionProps {
  eyebrow?: any;
  twoColorMode?: boolean;
  description?: any;
  descriptionPart1?: any;
  descriptionHighlight?: any;
  descriptionPart2?: any;
  miniDescription?: any;
  statistics?: StatItem[];
  image?: any;
}

const fallbackImage = "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1400&auto=format&fit=crop";

const StatsSection: React.FC<StatsSectionProps> = ({
  eyebrow,
  twoColorMode = false,
  description,
  descriptionPart1,
  descriptionHighlight,
  descriptionPart2,
  miniDescription,
  statistics,
  image,
}) => {
  // Agar ma'lumot bo'lmasa, component ko'rsatilmaydi
  if (!statistics || statistics.length === 0) {
    return null;
  }

  const { t } = useLanguage();
  const imageUrl = image ? urlFor(image).url() : fallbackImage;

  const hasDescription = twoColorMode
    ? descriptionPart1 || descriptionHighlight || descriptionPart2
    : description;

  return (
    <div className="w-full bg-white">
      {/* Main content */}
      <div className="grid grid-cols-1 gap-12 items-center mx-auto md:grid-cols-2 md:px-12 md:py-20">
        {" "}
        {/* Left column */}
        <div className="flex flex-col">
          {/* Eyebrow badge */}
          {eyebrow && (
            <div className="mb-6 inline-flex w-fit items-center rounded-full  px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
              {t(eyebrow)}
            </div>
          )}

          {/* Paragraph — bitta yoki uchta rangli qismdan iborat bo'lishi mumkin */}
          {hasDescription && (
            <p className="my-12 w-[320px] text-[15px] leading-relaxed">
              {twoColorMode ? (
                <>
                  {descriptionPart1 && <span className="text-[#1B1D20]">{t(descriptionPart1)} </span>}
                  {descriptionHighlight && <span className="text-[#E88029]">{t(descriptionHighlight)} </span>}
                  {descriptionPart2 && <span className="text-[#1B1D20]">{t(descriptionPart2)}</span>}
                </>
              ) : (
                <span className="text-[#1B1D20]">{t(description)}</span>
              )}
            </p>
          )}

          {/* Mini description */}
          {miniDescription && (
            <p className="mb-10 w-[400px] text-[16px] leading-[24px] font-normal text-[#1B1D20]">
              {t(miniDescription)}
            </p>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {statistics.map((stat, i) => (
              <div
                key={i}
                className={[
                  "border-t border-dotted border-neutral-300 py-7 pr-8",
                  i % 2 === 0 ? "sm:pr-8" : "sm:pl-8 sm:border-l",
                ].join(" ")}>
                <div className="mb-4 text-4xl font-normal text-[#E88029] md:text-[2.5rem]">{t(stat.value)}</div>
                <div className="mb-1 text-[15px] font-semibold text-neutral-800">{t(stat.title)}</div>
                {stat.description && (
                  <p className="text-[14px] leading-snug text-neutral-500 w-[170px]">{t(stat.description)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Right column - image */}
        <div className="overflow-hidden rounded-2xl">
          <img src={imageUrl} alt="Stats section" className="object-cover w-full h-full grayscale" />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
