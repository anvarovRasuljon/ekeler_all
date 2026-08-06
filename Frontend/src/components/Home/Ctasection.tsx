import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import  leftImage  from "../../assets/redyImg_left.png";
import  rightImage  from "../../assets/redyimg_right.png";
import { ArrowUpRight } from "lucide-react";

interface CtaSectionProps {
  badgeText?: any;
  headingPart1?: any;
  headingHighlight?: any;
  headingPart2?: any;
  buttonText?: any;
  buttonLink?: any;
  leftImage?: any;
  // rightImage?: any;
}


const CtaSection: React.FC<CtaSectionProps> = ({
  badgeText = "Ready",
  headingPart1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo ",
  // headingHighlight = "start",
  // headingPart2 = "?",
  buttonText = "Bizning mahsulotlar",
  buttonLink = "/blog",
  // leftImage,
  // rightImage,
}) => {
  const { t } = useLanguage();
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

  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : null), [t, badgeText]);
  const headingText = useMemo(() => (headingPart1 ? t(headingPart1) : null), [t, headingPart1]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);

  // If essential content is missing, do not render the section
  // if (!headingPart1 && !headingHighlight && !description) {
  //   return null;
  // }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FBF3EA] pb-[clamp(48px,3rem+2vw,112px)] pt-[clamp(48px,3rem+2vw,128px)]"
    >
      {/* Responsive: mobilda kichikroq padding, dekorativ rasmlar ham kichrayadi */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
           {leftImage && (
        <img
          src={leftImage}
          alt=""
          width={260}
          height={260}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute left-3 top-30 h-[clamp(80px,5rem+2vw,110px)] w-[clamp(80px,5rem+2vw,110px)] -translate-y-1/3 rounded-2xl object-cover shadow-sm sm:left-6 sm:h-[clamp(140px,9rem+3vw,190px)] sm:w-[clamp(140px,9rem+3vw,190px)] md:left-16 md:h-[clamp(180px,11rem+3vw,260px)] md:w-[clamp(180px,11rem+3vw,260px)]"
        />
      )}
      {rightImage && (
        <div
          className="absolute right-3 top-[-200px] h-[clamp(140px,9rem+3vw,200px)] w-[clamp(100px,6rem+2vw,140px)] overflow-hidden rounded-[8px] shadow-sm sm:right-6 sm:h-[clamp(250px,16rem+4vw,350px)] sm:w-[clamp(180px,11rem+3vw,250px)] md:right-16"
        >
          <img
            src={rightImage}
            alt=""
            width={250}
            height={350}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${
              inView ? 'translate-y-0' : '-translate-y-full'
            }`}
          />
        </div>
      )}

      <div className="flex relative z-10 flex-col items-center px-2 mx-auto max-w-3xl text-center sm:px-6">
        {badgeTextValue && (
          <span className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
            {badgeTextValue}
          </span>
        )}

        <h1 className="break-words font-inter text-[clamp(22px,1.4rem+1vw,48px)] font-normal leading-tight text-[#1B1D20]">
          {headingText}

        </h1>

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
      </div>
      </div>

    </section>
  );
};

export default React.memo(CtaSection);