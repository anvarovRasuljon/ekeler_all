import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import inpus_left_img from "../../assets/secont_ctasection_img.png";
import inpus_right_img from "../../assets/secont_ctasection_img_right_top.png";
import { useLanguage } from "../../context/LanguageContext";

interface ServiceCtaSectionProps {
  badgeText?: any;
  headingPart1?: any;
  headingHighlight?: any;
  buttonText?: any;
  buttonLink?: any;
}

const ServiceCtaSection: React.FC<ServiceCtaSectionProps> = ({
  badgeText = { ru: 'Наши отрасли', uz: 'Bizning tarmoqlar', eng: 'Our industries' },
  headingPart1 = { ru: 'От упаковки до автомобильной промышленности — для каждой отрасли есть свое решение из гофрокартона', uz: "Qadoqlashdan tortib avtomobil sanoatigacha — har bir soha uchun sota kartondan yaratilgan o'z yechimi bor", eng: 'From packaging to automotive — every industry has its own corrugated cardboard solution' },
  headingHighlight = { ru: 'для каждой отрасли есть свое решение из гофрокартона', uz: "har bir soha uchun sota kartondan yaratilgan o'z yechimi bor", eng: 'every industry has its own corrugated cardboard solution' },
  buttonText = { ru: 'Наша продукция', uz: 'Bizning mahsulotlar', eng: 'Our products' },
  buttonLink = "/products",
}) => {
  const { t } = useLanguage();
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : null), [t, badgeText]);
  const headingText = useMemo(() => (headingPart1 ? t(headingPart1) : null), [t, headingPart1]);
  const highlightText = useMemo(() => (headingHighlight ? String(t(headingHighlight) || '') : ''), [t, headingHighlight]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);

  const allWords = useMemo(() => {
    if (!headingText) return [] as { text: string; colored: boolean }[];
    const text = String(headingText);
    const idx = highlightText ? text.indexOf(highlightText) : -1;
    if (idx === -1) {
      return text.trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: false }));
    }
    const before = text.slice(0, idx).trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: false }));
    const after = text.slice(idx).trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: true }));
    return [...before, ...after];
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
      className="relative flex w-full items-center justify-between overflow-hidden bg-[#FFF7F0] pb-[clamp(48px,3rem+2vw,80px)] md:pb-0 lg:min-h-[600px]"
    >
      {/* Left image — desktop/tablet */}
      <div
        className={`absolute left-2 top-1/2 hidden -translate-y-1/2 overflow-hidden shadow-sm sm:block sm:left-6 md:left-16 h-[clamp(160px,10rem+2vw,250px)] w-[270px] transition-all duration-[3000ms] ease-out ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={inpus_left_img}
          alt=""
          width={300}
          height={260}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="object-cover w-full h-full rounded-[8px]"
          style={{
            filter: inView ? "blur(0px)" : "blur(18px)",
            opacity: inView ? 1 : 0.6,
            transform: inView ? "scale(1)" : "scale(1.05)",
            transition: "filter 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            willChange: "filter, transform, opacity",
          }}
        />
      </div>

      {/* Center content */}
      <div className="flex relative z-10 flex-col flex-1 items-center px-0 min-w-0 text-center">

        {/* ===== MOBILE ONLY ===== */}
        <div className="flex relative gap-1 justify-around mb-8 w-full sm:hidden">
          {/* Left image */}
          <div className="relative h-[120px] w-[180px] overflow-hidden rounded-b-[12px] rounded-t-none shadow-sm">
            <img
              src={inpus_left_img}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={`h-full w-full object-cover transition-[clip-path,filter,opacity,transform] duration-1000 ease-out ${
                inView ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(100%_0_0_0)]'
              }`}
              style={{
                filter: inView ? "blur(0px)" : "blur(18px)",
                opacity: inView ? 1 : 0.6,
                transform: inView ? "scale(1)" : "scale(1.05)",
                willChange: "filter, transform, opacity",
              }}
            />
          </div>

          {/* Right image */}
          <div className="relative h-[120px] w-[180px] overflow-hidden rounded-b-[12px] rounded-t-none shadow-sm">
            <img
              src={inpus_right_img}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={`h-full w-full object-cover transition-[clip-path,filter,opacity,transform] duration-1000 ease-out ${
                inView ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
              }`}
              style={{
                filter: inView ? "blur(0px)" : "blur(18px)",
                opacity: inView ? 1 : 0.6,
                transform: inView ? "scale(1)" : "scale(1.05)",
                willChange: "filter, transform, opacity",
              }}
            />
          </div>
        </div>

        {/* Badge + Title */}
        {badgeTextValue && (
          <span className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
            {badgeTextValue}
          </span>
        )}

        <h2 className="mb-8 w-full max-w-[610px] break-words font-normal text-[clamp(24px,1.5rem+0.8vw,40px)] leading-[clamp(30px,2rem+1vw,50px)] text-[#1B1D20]">
          {allWords.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: "0.28em" }}>
              <span
                className={`inline-block will-change-transform ${w.colored ? 'text-[#E88029]' : 'text-[#1B1D20]'}`}
                style={{
                  opacity: inView ? 1 : 0,
                  filter: inView ? "blur(0px)" : "blur(6px)",
                  transform: inView ? "translateY(0%)" : "translateY(115%)",
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms, filter 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms`,
                }}
              >
                {w.text}
              </span>
            </span>
          ))}
        </h2>

        {buttonLabel && (
          <Link
            to={buttonLink}
            className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] mt-[28px] cursor-pointer transition-all duration-700 ease-out"
          >
            <span className="inline-flex gap-6 items-center">
              <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
                <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                  <p className="whitespace-nowrap text-[16px] font-['Inter'] font-normal leading-[1.2em] text-[#1B1D20]">
                    {buttonLabel}
                  </p>
                  <p className="whitespace-nowrap text-[16px] font-['Inter'] font-medium leading-[1.2em] text-[#1B1D20]">
                    {buttonLabel}
                  </p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-[#E88029] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:scale-110" />
            </span>
            <div className="relative mt-[8px] h-[1.5px] w-full overflow-hidden">
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC]/40 transition-colors duration-500 group-hover:bg-transparent" />
              <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#1B1D20] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
            </div>
          </Link>
        )}
      </div>

      {/* Right image — desktop/tablet (TOP) */}
      <div
        className="absolute right-2 top-[-30px] hidden overflow-hidden shadow-sm sm:block sm:right-6 sm:top-[-40px] md:right-16 md:top-[-50px] h-[clamp(160px,10rem+2vw,250px)] w-[270px]"
      >
        <img
          src={inpus_right_img}
          alt=""
          width={300}
          height={250}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="object-cover w-full h-full rounded-[8px]"
          style={{
            filter: inView ? "blur(0px)" : "blur(18px)",
            opacity: inView ? 1 : 0.6,
            transform: inView ? "translateY(0) scale(1)" : "translateY(-100%) scale(1.05)",
            transition: "filter 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 3000ms cubic-bezier(0,0,0.2,1)",
            willChange: "filter, transform, opacity",
          }}
        />
      </div>
    </section>
  );
};

export default React.memo(ServiceCtaSection);
