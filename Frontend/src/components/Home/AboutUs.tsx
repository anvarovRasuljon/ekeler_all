import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import inpus_left_img from "../../assets/Inpus_left_img.png";
import inpus_right_img from "../../assets/Inpus_right_img.png";
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

const AboutUs: React.FC<InpusSectionProps> = ({
  twoColorMode = true,
  badgeText = "About us",
  description = LOREM_20,
  descriptionPart1 = LOREM_20,
  buttonText = "About us",
}) => {
  const { t } = useLanguage();
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : 'ABOUT US'), [t, badgeText]);
  const descriptionPart1Text = useMemo(() => (descriptionPart1 ? t(descriptionPart1) : null), [t, descriptionPart1]);
  const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);

  const highlightPart = 'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.';
  const { descBefore, descAfter } = useMemo(() => {
    if (!descriptionPart1Text) return { descBefore: '', descAfter: '' };
    const index = String(descriptionPart1Text).indexOf(highlightPart);
    if (index === -1) return { descBefore: String(descriptionPart1Text), descAfter: '' };
    return {
      descBefore: String(descriptionPart1Text).slice(0, index),
      descAfter: String(descriptionPart1Text).slice(index),
    };
  }, [descriptionPart1Text]);
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
      // Responsive: mobilda balandlik kontentga qarab, dekorativ rasmlar kichrayadi
      className="relative flex w-full items-center justify-between overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-0 lg:min-h-[600px] lg:px-8 xl:px-8"
    >

      {/* Left image */}
      <div
        className="absolute left-2 top-[-50px] h-[180px] w-[250px] overflow-hidden rounded-[8px] shadow-sm sm:left-6 sm:top-[-60px] sm:h-[160px] sm:w-[160px] md:left-16 md:top-[-70px] md:h-[250px] md:w-[270px]"
      >
        <img
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

        <span
          className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
        >
          {badgeTextValue}
        </span>

        <h2 className="mb-8 w-full max-w-[610px] break-words text-[26px] leading-[34px] text-[#1B1D20] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[50px]">
          {twoColorMode ? (
            <>
              {descBefore && <span className="text-[#1B1D20]">{descBefore}</span>}
              {descAfter && <span className="text-[#E88029]">{descAfter}</span>}
            </>
          ) : (
            <span
              className="text-[#1B1D20]"
            >
              {descriptionText}
            </span>
          )}
        </h2>

        <Link
          to="/about"
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

      {/* Right image */}
      <div
        className="absolute right-2 bottom-[-50px] h-[180px] w-[250px] overflow-hidden rounded-[8px] shadow-sm sm:right-6 sm:bottom-[-60px] sm:h-[160px] sm:w-[160px] md:right-16 md:bottom-[-70px] md:h-[250px] md:w-[270px]"
      >
        <img
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

export default React.memo(AboutUs);