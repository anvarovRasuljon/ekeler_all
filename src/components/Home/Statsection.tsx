import React, { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import imageUrl from "../../assets/home_stat_img.png";
import BlurImage from "../ui/BlurImage";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

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

const DEFAULT_STATISTICS: StatItem[] = [
  { value: "5+", title: translations.home.statsSection.stats.experience.title, description: translations.home.statsSection.stats.experience.description },
  { value: "100 000+", title: translations.home.statsSection.stats.capacity.title, description: translations.home.statsSection.stats.capacity.description },
  { value: "2-3", title: translations.home.statsSection.stats.time.title, description: translations.home.statsSection.stats.time.description },
  { value: "100%", title: translations.home.statsSection.stats.local.title, description: translations.home.statsSection.stats.local.description },
];

const StatsSection: React.FC<StatsSectionProps> = ({
  eyebrow = translations.home.statsSection.eyebrow,
  descriptionPart1 = translations.home.statsSection.description,
  descriptionHighlight = translations.home.statsSection.descriptionHighlight,
  miniDescription = translations.home.statsSection.miniDescription,
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
  const highlightText = useMemo(() => (descriptionHighlight ? String(t(descriptionHighlight) || '') : ''), [t, descriptionHighlight]);
  const { descBefore, descAfter } = useMemo(() => {
    if (!descriptionText) return { descBefore: '', descAfter: '' };
    const index = String(descriptionText).indexOf(highlightText);
    if (index === -1) return { descBefore: String(descriptionText), descAfter: '' };
    return {
      descBefore: String(descriptionText).slice(0, index),
      descAfter: String(descriptionText).slice(index),
    };
  }, [descriptionText, highlightText]);

  // Har bir matn bloki uchun alohida reveal + stagger delay
  const eyebrowReveal = useRevealOnScroll<HTMLDivElement>();
  const titleReveal = useRevealOnScroll<HTMLParagraphElement>();
  const miniReveal = useRevealOnScroll<HTMLParagraphElement>();
  const statsReveal = useRevealOnScroll<HTMLDivElement>();

  const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : "translate3d(0,28px,0)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  });

  return (
    <div
      className="w-full bg-white"
    >
      {/* Main content */}
      {/* Responsive: mobilda 1 ustun + kichik padding, md dan boshlab 2 ustun */}
<div className="grid grid-cols-1 gap-8 items-center py-12 mx-auto md:grid-cols-2 md:gap-12 md:pb-20 md:pt-0">        {" "}
        {/* Left column */}
        <div className="flex flex-col">
          {/* Eyebrow badge */}
          {eyebrowText && (
            <div
              ref={eyebrowReveal.ref}
              style={revealStyle(eyebrowReveal.visible, 0)}
              className="mb-6 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
            >
              {eyebrowText}
            </div>
          )}

          {/* Paragraph — bitta yoki uchta rangli qismdan iborat bo'lishi mumkin */}
          <p
            ref={titleReveal.ref}
            style={revealStyle(titleReveal.visible, 120)}
            className="mb-8 w-full max-w-[600px] break-words text-[clamp(24px,1.5rem+0.8vw,40px)] leading-[clamp(30px,2rem+1vw,48px)] md:mb-12"
          >
            {descBefore && <span className="text-[#1B1D20]">{descBefore}</span>}
            {descAfter && <span className="text-[#E88029]">{descAfter}</span>}
          </p>

          {/* Mini description */}
          {miniText && (
            <p
              ref={miniReveal.ref}
              style={revealStyle(miniReveal.visible, 220)}
              className="mb-8 w-full max-w-[400px] break-words text-[clamp(14px,0.85rem+0.1vw,16px)] leading-relaxed font-normal text-[#1B1D20] md:mb-10 md:leading-[24px]"
            >
              {miniText}
            </p>
          )}

          <div
            ref={statsReveal.ref}
            className="grid grid-cols-1 sm:grid-cols-2"
          >
            {statistics.map((stat, i) => (
              <div
                key={i}
                style={revealStyle(statsReveal.visible, 320 + i * 90)}
                className={[
                  "border-t border-dotted border-neutral-300 py-6 pr-0 sm:py-7",
                  i % 2 === 0 ? "sm:pr-8" : "sm:pl-8 sm:border-l",
                ].join(" ")}
              >
                <div className="mb-3 text-[clamp(1.75rem,1.5rem+0.5vw,2.5rem)] font-normal text-[#E88029] sm:mb-4">
                  {t(stat.value)}
                </div>
                <div className="mb-1 text-[clamp(14px,0.85rem+0.1vw,16px)] font-semibold text-neutral-800">
                  {t(stat.title)}
                </div>
                {stat.description && (
                  <p className="w-full max-w-[170px] break-words text-[clamp(13px,0.8rem+0.1vw,14px)] leading-snug text-neutral-500">
                    {t(stat.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Right column - image */}
        {imageUrl && (
          <BlurImage
            src={imageUrl}
            alt="Stats section"
            width={600}
            height={400}
            className="rounded-xl md:rounded-2xl max-h-[420px] md:max-h-none md:h-full"
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(StatsSection);
