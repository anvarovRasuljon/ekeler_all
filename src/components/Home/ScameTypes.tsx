import AnimatedImage from './AnimatedImage';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import inpus_left_img from "../../assets/Inpus_left_img.png";
import inpus_right_img from "../../assets/Inpus_right_img.png";
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

const InpusSection: React.FC<InpusSectionProps> = ({
  twoColorMode = true,
  badgeText = translations.home.inpusSection.badgeText,
  description = translations.home.inpusSection.description,
  descriptionPart1 = translations.home.inpusSection.description,
  descriptionHighlight = translations.home.inpusSection.descriptionHighlight,
  buttonText = translations.home.inpusSection.buttonText,
}) => {
  const { t } = useLanguage();
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : 'ABOUT US'), [t, badgeText]);
  const descriptionPart1Text = useMemo(() => (descriptionPart1 ? t(descriptionPart1) : null), [t, descriptionPart1]);
  const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);
  const highlightText = useMemo(() => (descriptionHighlight ? String(t(descriptionHighlight) || '') : ''), [t, descriptionHighlight]);

  const { descBefore, descAfter } = useMemo(() => {
    if (!descriptionPart1Text) return { descBefore: '', descAfter: '' };
    const index = highlightText ? String(descriptionPart1Text).indexOf(highlightText) : -1;
    if (index === -1) return { descBefore: String(descriptionPart1Text), descAfter: '' };
    return {
      descBefore: String(descriptionPart1Text).slice(0, index),
      descAfter: String(descriptionPart1Text).slice(index),
    };
  }, [descriptionPart1Text, highlightText]);

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
      {/* Left image — faqat desktop/tablet */}
      <div
        className="absolute left-2 top-[-50px] hidden overflow-hidden rounded-[8px] shadow-sm sm:block sm:left-6 sm:top-[-60px] md:left-16 md:top-[-70px] h-[clamp(160px,10rem+2vw,250px)] w-[clamp(160px,10rem+3vw,270px)]"
      >
        <AnimatedImage
          src={inpus_left_img}
          alt=""
          width={250}
          height={260}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`object-cover w-full h-full transition-transform duration-1000 ease-out ${
            inView ? 'translate-y-0' : '-translate-y-full'
          }`}
        />
      </div>

      {/* Center text */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">
        <span className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
          {badgeTextValue}
        </span>

        <h2 className="mb-8 w-full max-w-[510px] break-words font-normal text-[28px] leading-[34px] text-[#1B1D20] md:text-[40px] md:leading-[48px]">
          {twoColorMode ? (
            <>
              {descBefore && <span className="text-[#1B1D20]">{descBefore}</span>}
              {descAfter && <span className="text-[#E88029]">{descAfter}</span>}
            </>
          ) : (
            <span className="text-[#1B1D20]">{descriptionText}</span>
          )}
        </h2>

        <Link
          to="/about"
          className="group inline-flex w-fit flex-col items-center text-[clamp(13px,0.8rem+0.1vw,16px)] text-[#1B1D20] hover:text-[#E88029] mt-[28px] cursor-pointer"
        >
          <span className="inline-flex gap-6 items-center">
            {buttonLabel}
            <ArrowUpRight size={18} className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-neutral-300 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#1B1D20] group-hover:scale-x-100" />
          </div>
        </Link>

        {/* ===== MOBILE ONLY ===== */}
        <div className="relative mt-10 h-[180px] w-full sm:hidden">
          {/* Left image */}
          <div
            className={`absolute left-0 top-0 z-10 h-[150px] w-[150px] overflow-hidden rounded-[12px] shadow-sm transition-all duration-1000 ease-out ${
              inView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
            }`}
          >
            <AnimatedImage
              src={inpus_left_img}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right image — bottom radius yo‘q */}
          <div
            className={`absolute bottom-0 right-0 z-0 h-[120px] w-[140px] overflow-hidden rounded-t-[12px] rounded-b-none shadow-sm transition-all duration-1000 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`}
          >
            <AnimatedImage
              src={inpus_right_img}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Right image — faqat desktop/tablet */}
      <div
        className="absolute right-2 bottom-[-50px] hidden overflow-hidden rounded-[8px] shadow-sm sm:block sm:right-6 sm:bottom-[-60px] md:right-16 md:bottom-[-70px] h-[clamp(160px,10rem+2vw,250px)] w-[clamp(160px,10rem+3vw,270px)]"
      >
        <AnimatedImage
          src={inpus_right_img}
          alt=""
          width={250}
          height={250}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`object-cover w-full h-full transition-transform duration-1000 ease-out ${
            inView ? 'translate-y-0' : 'translate-y-full'
          }`}
        />
      </div>
    </section>
  );
};

export default React.memo(InpusSection);