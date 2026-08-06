import React, { useEffect, useMemo, useRef, useState } from "react";
import inpus_left_img from "../../assets/home_features_img.png";
import inpus_right_img from "../../assets/home_feature_secont_img.png";
import { useLanguage } from "../../context/LanguageContext";

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

const LOREM_20 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.";

const FeaturesSection: React.FC<InpusSectionProps> = ({
  badgeText = "Features",
  description = LOREM_20,
}) => {
  const { t } = useLanguage();
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : 'ABOUT US'), [t, badgeText]);
  const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);

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
  className="relative flex w-full items-center justify-between overflow-hidden bg-white pt-[clamp(32px,2rem+1vw,60px)] md:pt-0 lg:min-h-[600px]"
>
      {/* Left image — desktop/tablet (o‘zgartirilmagan) */}
      <div
        className={`absolute left-2 hidden overflow-hidden shadow-sm sm:block sm:left-6 md:left-16 h-[clamp(160px,10rem+2vw,250px)] w-[clamp(160px,10rem+3vw,270px)] transition-all duration-[3000ms] ease-out ${
          inView ? 'top-1/2 -translate-y-1/2' : 'top-0 -translate-y-full'
        }`}
      >
        <img
          src={inpus_left_img}
          alt=""
          width={250}
          height={260}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="object-cover w-full h-full rounded-[8px]"
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">

        {/* ===== MOBILE ONLY — rasmlar title dan yuqorida (screenshot dagi kabi) ===== */}
       {/* ===== MOBILE ONLY — rasmlar title dan yuqorida ===== */}
<div className="flex relative gap-3 mb-8 w-full sm:hidden">
  {/* Left image — joyida turadi, tepadan pastga kesilib ochiladi */}
  <div className="relative h-[120px] w-1/2 overflow-hidden rounded-b-[12px] rounded-t-none shadow-sm">
    <img
      src={inpus_left_img}
      alt=""
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      className={`h-full w-full object-cover transition-[clip-path] duration-1000 ease-out ${
        inView ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(100%_0_0_0)]'
      }`}
    />
  </div>

  {/* Right image — joyida turadi, pastdan tepaga kesilib ochiladi */}
  <div className="relative h-[120px] w-1/2 overflow-hidden rounded-b-[12px] rounded-t-none shadow-sm">
    <img
      src={inpus_right_img}
      alt=""
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      className={`h-full w-full object-cover transition-[clip-path] duration-1000 ease-out ${
        inView ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
      }`}
    />
  </div>
</div>

        {/* Badge + Title (hamma ekranlar uchun) */}
        <span className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
          {badgeTextValue}
        </span>

        <h2 className="mb-8 w-full max-w-[610px] break-words font-normal text-[clamp(24px,1.5rem+0.8vw,40px)] leading-[clamp(30px,2rem+1vw,50px)] text-[#1B1D20]">
          {descriptionText}
        </h2>
      </div>

      {/* Right image — desktop/tablet (o‘zgartirilmagan) */}
      <div
        className="absolute right-2 bottom-[-30px] hidden overflow-hidden shadow-sm sm:block sm:right-6 sm:bottom-[-40px] md:right-16 md:bottom-[-50px] h-[clamp(160px,10rem+2vw,250px)] w-[clamp(160px,10rem+3vw,270px)]"
      >
        <img
          src={inpus_right_img}
          alt=""
          width={250}
          height={250}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`object-cover w-full h-full rounded-[8px] transition-transform duration-[3000ms] ease-out ${
            inView ? 'translate-y-0' : 'translate-y-full'
          }`}
        />
      </div>
    </section>
  );
};

export default React.memo(FeaturesSection);