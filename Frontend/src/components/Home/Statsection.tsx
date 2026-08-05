import React, { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import imageUrl  from "../../assets/home_stat_img.png";

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

const LOREM_20 = "Lorem Impus porum dor, forem dorem quick, lore puel duit Lorem Impus porum dor, forem dorem";
const Lorem_15 = "Lorem Impus porum dor, forem dorem quick, lore puel duit "
const Lorem_10 = "Lorem Impus porum dor, forem dorem quick"
const DEFAULT_STATISTICS: StatItem[] = [
  { value: "10+", title: "Years", description: Lorem_10 },
  { value: "500+", title: "Projects", description: Lorem_10 },
  { value: "50+", title: "Clients", description: Lorem_10 },
  { value: "24/7", title: "Support", description: Lorem_10 },
];

const StatsSection: React.FC<StatsSectionProps> = ({
  eyebrow = "Bizning statistika",
  descriptionPart1 = LOREM_20,
  miniDescription = Lorem_15,
  statistics = DEFAULT_STATISTICS,
}) => {
  // Agar ma'lumot bo'lmasa, component ko'rsatilmaydi
  if (!statistics || statistics.length === 0) {
    return null;
  }

  const { t } = useLanguage();
  const eyebrowText = useMemo(() => (eyebrow ? t(eyebrow) : null), [t, eyebrow]);
  const descriptionText = useMemo(() => (descriptionPart1 ? t(descriptionPart1) : null), [t, descriptionPart1]);
  const miniText = useMemo(() => (miniDescription ? t(miniDescription) : null), [t, miniDescription]);

  const highlightPart = 'lore puel duit Lorem Impus porum dor, forem dorem';
  const { descBefore, descAfter } = useMemo(() => {
    if (!descriptionText) return { descBefore: '', descAfter: '' };
    const index = String(descriptionText).indexOf(highlightPart);
    if (index === -1) return { descBefore: String(descriptionText), descAfter: '' };
    return {
      descBefore: String(descriptionText).slice(0, index),
      descAfter: String(descriptionText).slice(index),
    };
  }, [descriptionText]);

  return (
    <div
      className="w-full bg-white"
    >
      {/* Main content */}
      {/* Responsive: mobilda 1 ustun + kichik padding, md dan boshlab 2 ustun */}
      <div className="grid grid-cols-1 gap-8 items-center mx-auto sm:px-6 md:grid-cols-2 md:gap-12 md:px-12 md:pb-20 md:pt-0">
        {" "}
        {/* Left column */}
        <div className="flex flex-col">
          {/* Eyebrow badge */}
          {eyebrowText && (
            <div className="mb-6 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
              {eyebrowText}
            </div>
          )}

          {/* Paragraph — bitta yoki uchta rangli qismdan iborat bo'lishi mumkin */}
            <p className="mb-8 w-full max-w-[600px] break-words text-[26px] leading-[34px] sm:text-[32px] sm:leading-[42px] md:mb-12 lg:text-[40px] lg:leading-[48px]">
              {descBefore && <span className="text-[#1B1D20]">{descBefore}</span>}
              {descAfter && <span className="text-[#E88029]">{descAfter}</span>}
            </p>

          {/* Mini description */}
          {miniText && (
            <p className="mb-8 w-full max-w-[400px] break-words text-[15px] leading-relaxed font-normal text-[#1B1D20] md:mb-10 md:text-[16px] md:leading-[24px]">
              {miniText}
            </p>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {statistics.map((stat, i) => (
              <div
                key={i}
                className={[
                  "border-t border-dotted border-neutral-300 py-6 pr-0 sm:py-7",
                  i % 2 === 0 ? "sm:pr-8" : "sm:pl-8 sm:border-l",
                ].join(" ")}>
                <div className="mb-3 text-3xl font-normal text-[#E88029] sm:mb-4 sm:text-4xl md:text-[2.5rem]">{t(stat.value)}</div>
                <div className="mb-1 text-[15px] font-semibold text-neutral-800">{t(stat.title)}</div>
                {stat.description && (
                  <p className="w-full max-w-[170px] break-words text-[14px] leading-snug text-neutral-500">{t(stat.description)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Right column - image */}
        {imageUrl && (
          <div
            className="overflow-hidden rounded-xl md:rounded-2xl"
          >
            <img
              src={imageUrl}
              alt="Stats section"
              width={600}
              height={400}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-auto max-h-[420px] w-full object-cover grayscale md:max-h-none md:h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(StatsSection);
