import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import inpus_left_img from "../../assets/redyImg_left.png";
import inpus_right_img from "../../assets/redyimg_right.png";
import { useLanguage } from "../../context/LanguageContext";

interface CtaSectionProps {
  badgeText?: any;
  headingPart1?: any;
  buttonText?: any;
  buttonLink?: any;
}

const CatalogCtaSection: React.FC<CtaSectionProps> = ({
  badgeText = "Products",
  headingPart1 = "Lorem ipsum dolor sit amet consectetur ahimenaeos - donec. Lorem ipsum dolor",
  buttonText = "Bizning mahsulotlar",
  buttonLink = "/service",
}) => {
  const { t } = useLanguage();
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : null), [t, badgeText]);
  const headingText = useMemo(() => (headingPart1 ? t(headingPart1) : null), [t, headingPart1]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);

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
  className="relative flex w-full items-center justify-between overflow-hidden bg-white pb-[clamp(48px,3rem+2vw,80px)] md:pb-0 lg:min-h-[600px] mt-6"
>
      {/* Left image — desktop/tablet (comment dagi uslub) */}
      <div
        className={`absolute left-2 top-1/2 hidden -translate-y-1/2 overflow-hidden shadow-sm sm:block sm:left-6 md:left-16 h-[clamp(160px,10rem+2vw,250px)] w-[clamp(160px,10rem+3vw,270px)] transition-all duration-[3000ms] ease-out ${
          inView ? 'opacity-100' : 'opacity-0'
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

        {/* ===== MOBILE ONLY — Features dagi kabi (o‘zgartirilmagan) ===== */}
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

        {/* Badge + Title */}
        {badgeTextValue && (
          <span className="mb-10 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
            {badgeTextValue}
          </span>
        )}

        <h2 className="mb-8 w-full max-w-[610px] break-words font-normal text-[clamp(24px,1.5rem+0.8vw,40px)] leading-[clamp(30px,2rem+1vw,50px)] text-[#1B1D20]">
          {headingText}
        </h2>

        {buttonLabel && (
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
        )}
      </div>

      {/* Right image — desktop/tablet (TOP da, comment dagi kabi) */}
      <div
        className="absolute right-2 top-[-30px] hidden overflow-hidden shadow-sm sm:block sm:right-6 sm:top-[-40px] md:right-16 md:top-[-50px] h-[clamp(160px,10rem+2vw,250px)] w-[clamp(160px,10rem+3vw,270px)]"
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
            inView ? 'translate-y-0' : '-translate-y-full'
          }`}
        />
      </div>
    </section>
  );
};

export default React.memo(CatalogCtaSection);