import AnimatedImage from './AnimatedImage';
import React, { useEffect, useMemo, useRef, useState } from "react";
import inpus_left_img from "../../assets/home_features_img.webp";
import inpus_right_img from "../../assets/home_feature_secont_img.webp";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

interface InpusSectionProps {
  twoColorMode?: boolean;
  badgeText?: any;
  description?: any;
  descriptionPart1?: any;
  descriptionHighlight?: any;
  descriptionPart2?: any;
  buttonText?: any;
  topImage?: any;
  bottomImage?: any;
}

const FeaturesSection: React.FC<InpusSectionProps> = ({
  badgeText = translations.home.featuresSection.badgeText,
  description = translations.home.featuresSection.description,
  descriptionHighlight = translations.home.featuresSection.descriptionHighlight,
}) => {
  const { t } = useLanguage();
  const fallbackBadge = { ru: 'О НАС', uz: 'BIZ HAQIMIZDA', eng: 'ABOUT US' };
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : t(fallbackBadge)), [t, badgeText]);
  const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);
  const highlightText = useMemo(() => (descriptionHighlight ? String(t(descriptionHighlight) || '') : ''), [t, descriptionHighlight]);

  const allWords = useMemo(() => {
    if (!descriptionText) return [] as { text: string; colored: boolean }[];
    const text = String(descriptionText);
    const idx = highlightText ? text.indexOf(highlightText) : -1;
    if (idx === -1) {
      return text.trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: false }));
    }
    const before = text.slice(0, idx).trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: false }));
    const after = text.slice(idx).trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: true }));
    return [...before, ...after];
  }, [descriptionText, highlightText]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
  ref={sectionRef}
  className="relative mx-auto flex w-full max-w-[1540px] items-center justify-between overflow-hidden border-b-0 border-[#ECECEC] bg-white pt-[clamp(32px,2rem+1vw,60px)] md:border-b md:pt-0 lg:min-h-[600px]"
>
      {/* Left image — desktop/tablet (o‘zgartirilmagan) */}
      <div
        className={`absolute left-2 hidden overflow-hidden shadow-sm sm:block sm:left-6 md:left-16 h-[clamp(160px,10rem+2vw,250px)] w-[270px] transition-all duration-[3000ms] ease-out ${
          inView ? 'top-1/2 -translate-y-1/2' : 'top-0 -translate-y-full'
        }`}
      >
        <AnimatedImage
          src={inpus_left_img}
          alt=""
          width={300}
          height={260}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="object-cover w-full h-full rounded-[8px]"
          style={{
            opacity: inView ? 1 : 0.6,
            transform: inView ? "scale(1)" : "scale(1.05)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">

        {/* ===== MOBILE ONLY — rasmlar title dan yuqorida ===== */}
        <div className="flex relative gap-1 justify-around mb-8 w-full sm:hidden">
          {/* Left image — joyida turadi, tepadan pastga kesilib ochiladi */}
          <div className="relative h-[110px] w-[160px] overflow-hidden rounded-b-[12px] rounded-t-none shadow-sm">
            <AnimatedImage
              src={inpus_left_img}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={`h-full w-full object-cover transition-[clip-path,opacity,transform] duration-1000 ease-out ${
                inView ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(100%_0_0_0)]'
              }`}
              style={{
                opacity: inView ? 1 : 0.6,
                transform: inView ? "scale(1)" : "scale(1.05)",
                willChange: "transform, opacity",
              }}
            />
          </div>

          {/* Right image — joyida turadi, pastdan tepaga kesilib ochiladi */}
          <div className="relative h-[110px] w-[160px] overflow-hidden rounded-b-[12px] rounded-t-none shadow-sm">
            <AnimatedImage
              src={inpus_right_img}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={`h-full w-full object-cover transition-[clip-path,opacity,transform] duration-1000 ease-out ${
                inView ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
              }`}
              style={{
                opacity: inView ? 1 : 0.6,
                transform: inView ? "scale(1)" : "scale(1.05)",
                willChange: "transform, opacity",
              }}
            />
          </div>
        </div>

        {/* Badge + Title (hamma ekranlar uchun) */}
        <span className="mt-4 mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
          {badgeTextValue}
        </span>

        <h2 className="mb-12 md:mb-8 w-full max-w-[610px] break-words font-normal text-[clamp(24px,1.5rem+0.8vw,40px)] leading-[clamp(30px,2rem+1vw,50px)] text-[#1B1D20]">
          {allWords.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: "0.28em" }}>
              <span
                className={`inline-block will-change-transform ${w.colored ? 'text-[#E88029]' : 'text-[#1B1D20]'}`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0%)" : "translateY(115%)",
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms`,
                }}
              >
                {w.text}
              </span>
            </span>
          ))}
        </h2>
      </div>

      {/* Right image — desktop/tablet (o‘zgartirilmagan) */}
      <div
        className="absolute right-2 bottom-[-30px] hidden overflow-hidden shadow-sm sm:block sm:right-6 sm:bottom-[-40px] md:right-16 md:bottom-[-50px] h-[clamp(160px,10rem+2vw,250px)] w-[270px]"
      >
        <AnimatedImage
          src={inpus_right_img}
          alt=""
          width={300}
          height={250}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="object-cover w-full h-full rounded-[8px]"
          style={{
            opacity: inView ? 1 : 0.6,
            transform: inView ? "translateY(0) scale(1)" : "translateY(100%) scale(1.05)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 3000ms cubic-bezier(0,0,0.2,1)",
            willChange: "transform, opacity",
          }}
        />
      </div>
    </section>
  );
};

export default React.memo(FeaturesSection);