import ProductImage from './ProductImage';
import React, { useEffect, useMemo, useRef, useState } from "react";
import inpus_left_img from "../../assets/redyImg_left.png";
import inpus_right_img from "../../assets/redyimg_right.png";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";

interface CtaSectionProps {
  badgeText?: any;
  headingPart1?: any;
  headingHighlight?: any;
  buttonText?: any;
  buttonLink?: any;
}

const CatalogCtaSection: React.FC<CtaSectionProps> = ({
  badgeText = translations.home.productCatalog.badgeText,
  headingPart1 = translations.home.productCatalog.headingPart1,
  headingHighlight = translations.home.productCatalog.headingHighlight,
}) => {
  const { t } = useLanguage();
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : null), [t, badgeText]);
  const headingText = useMemo(() => (headingPart1 ? t(headingPart1) : null), [t, headingPart1]);
  const highlightText = useMemo(() => (headingHighlight ? String(t(headingHighlight) || '') : ''), [t, headingHighlight]);

  const { descBefore, descAfter } = useMemo(() => {
    if (!headingText) return { descBefore: '', descAfter: '' };
    const index = highlightText ? String(headingText).indexOf(highlightText) : -1;
    if (index === -1) return { descBefore: String(headingText), descAfter: '' };
    return {
      descBefore: String(headingText).slice(0, index),
      descAfter: String(headingText).slice(index),
    };
  }, [headingText, highlightText]);

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
  className="relative flex w-full items-center justify-between overflow-hidden bg-white lg:min-h-[600px] mt-3"
>
      {/* Left image — desktop/tablet (comment dagi uslub) */}
      <div
        className={`absolute left-2 top-1/2 hidden -translate-y-1/2 overflow-hidden shadow-sm sm:block sm:left-6 md:left-16 h-[clamp(160px,10rem+2vw,250px)] w-[clamp(160px,10rem+3vw,270px)] transition-all duration-[3000ms] ease-out ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ProductImage
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

        {/* ===== MOBILE ONLY — Features dagi kabi (o‘zgartirilmagan) ===== */}
        <div className="flex relative gap-1 mb-8 w-full justify-around sm:hidden">
          {/* Left image — joyida turadi, tepadan pastga kesilib ochiladi */}
          <div className="relative h-[120px] w-[180px] overflow-hidden rounded-b-[12px] rounded-t-none shadow-sm">
            <ProductImage
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
          <div className="relative h-[120px] w-[180px] overflow-hidden rounded-b-[12px] rounded-t-none shadow-sm">
            <ProductImage
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

        {/* Badge + Title */}
        {badgeTextValue && (
          <span className="mb-10 mt-4 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
            {badgeTextValue}
          </span>
        )}

        <h2 className="mb-8 w-full max-w-[610px] break-words font-normal text-[clamp(24px,1.5rem+0.8vw,40px)] leading-[clamp(30px,2rem+1vw,50px)] text-[#1B1D20] px-4 sm:px-0">
          {descBefore && <span className="text-[#1B1D20]">{descBefore}</span>}
          {descAfter && <span className="text-[#E88029]">{descAfter}</span>}
        </h2>

      </div>

      {/* Right image — desktop/tablet (TOP da, comment dagi kabi) */}
      <div
        className="absolute right-2 top-[-30px] hidden overflow-hidden shadow-sm sm:block sm:right-6 sm:top-[-40px] md:right-16 md:top-[-50px] h-[clamp(160px,10rem+2vw,250px)] w-[clamp(160px,10rem+3vw,270px)]"
      >
        <ProductImage
          src={inpus_right_img}
          alt=""
          width={250}
          height={250}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`object-cover w-full h-full rounded-[8px] transition-transform duration-[3000ms] ease-out ${
            inView ? 'translate-y-0' : '-translate-y-full'
          }`}
        />
      </div>
    </section>
  );
};

export default React.memo(CatalogCtaSection);