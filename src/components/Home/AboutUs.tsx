// import AnimatedImage from './AnimatedImage';
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { ArrowUpRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import inpus_right_img from "../../assets/Industry_1.png";
// import inpus_left_img from "../../assets/inpus_left.png";
// import { useLanguage } from "../../context/LanguageContext";
// import { translations } from "../../locales/translations";

// interface InpusSectionProps {
//   twoColorMode?: boolean;
//   badgeText?: any;
//   description?: any;
//   descriptionPart1?: any;
//   descriptionHighlight?: any;
//   descriptionPart2?: any;
//   buttonText?: any;
//   topImage?: any;
//   bottomImage?: any;
// }

// const AboutUs: React.FC<InpusSectionProps> = ({
//   twoColorMode = true,
//   badgeText = translations.home.aboutUs.badgeText,
//   description = translations.home.aboutUs.description,
//   descriptionPart1 = translations.home.aboutUs.description,
//   descriptionHighlight = translations.home.aboutUs.descriptionHighlight,
//   buttonText = translations.home.aboutUs.buttonText,
// }) => {
//   const { t } = useLanguage();
//   const fallbackBadge = { ru: 'О НАС', uz: 'BIZ HAQIMIZDA', eng: 'ABOUT US' };
//   const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : t(fallbackBadge)), [t, badgeText]);
//   const descriptionPart1Text = useMemo(() => (descriptionPart1 ? t(descriptionPart1) : null), [t, descriptionPart1]);
//   const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);
//   const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);

//   const highlightText = useMemo(() => String(t(descriptionHighlight) || ''), [t, descriptionHighlight]);
//   const fullText = useMemo(() => String(descriptionPart1Text || ''), [descriptionPart1Text]);

//   const sectionRef = useRef<HTMLElement | null>(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const node = sectionRef.current;
//     if (!node) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );
//     observer.observe(node);
//     return () => observer.disconnect();
//   }, []);

//   // Matnni so'zlarga bo'lib, highlight qismini belgilaymiz
//   const highlightIndex = fullText.indexOf(highlightText);
//   const beforeWords = useMemo(
//     () => (highlightIndex === -1 ? fullText.split(" ") : fullText.slice(0, highlightIndex).trim().split(" ")),
//     [fullText, highlightIndex]
//   );
//   const afterWords = useMemo(
//     () => (highlightIndex === -1 ? [] : fullText.slice(highlightIndex).trim().split(" ")),
//     [fullText, highlightIndex]
//   );
//   const allWords = useMemo(
//     () => [
//       ...beforeWords.map((w) => ({ text: w, colored: false })),
//       ...afterWords.map((w) => ({ text: w, colored: true })),
//     ],
//     [beforeWords, afterWords]
//   );

//   return (
//   <section
//   ref={sectionRef}
//   className="relative mx-auto flex w-full max-w-[1540px] items-center justify-between overflow-hidden border-b border-[#ECECEC] bg-white pt-[clamp(32px,2rem+1vw,60px)] md:pt-0 lg:min-h-[600px]"
// >
//       {/* Left image — desktop/tablet (o‘zgartirilmagan) */}
//       <div
//         className="absolute left-2 top-[-30px] hidden overflow-hidden shadow-sm sm:block sm:left-6 sm:top-[-30px] md:left-16 md:top-[-30px] h-[clamp(160px,10rem+2vw,250px)] w-[270px]"
//       >
//         <AnimatedImage
//           src={inpus_left_img}
//           alt=""
//           width={300}
//           height={260}
//           loading="lazy"
//           decoding="async"
//           fetchPriority="low"
//           className={`object-cover w-full h-full rounded-[8px] transition-transform duration-1000 ease-out ${
//             inView ? 'translate-y-0' : '-translate-y-full'
//           }`}
//         />
//       </div>

//       {/* Center text */}
//       <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">
//         <span
//           className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500 transition-all duration-700 ease-out"
//           style={{
//             opacity: inView ? 1 : 0,
//             transform: inView ? "translateY(0)" : "translateY(14px)",
//           }}
//         >
//           {badgeTextValue}
//         </span>

//         {/* font-normal (400) — kichik ekran uchun */}
//         <h2 className="mb-8 w-full max-w-[810px] break-words font-normal text-[clamp(24px,1.5rem+0.8vw,40px)] leading-[clamp(30px,2rem+1vw,50px)] text-[#1B1D20]">
//           {twoColorMode ? (
//             <span className="inline">
//               {allWords.map((w, i) => (
//                 <span
//                   key={i}
//                   className="inline-block overflow-hidden align-bottom"
//                   style={{ marginRight: "0.28em" }}
//                 >
//                   <span
//                     className={`inline-block will-change-transform ${w.colored ? "text-[#E88029]" : "text-[#1B1D20]"}`}
//                     style={{
//                       opacity: inView ? 1 : 0,
//                       filter: inView ? "blur(0px)" : "blur(6px)",
//                       transform: inView ? "translateY(0%)" : "translateY(115%)",
//                       transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms, filter 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms`,
//                     }}
//                   >
//                     {w.text}
//                   </span>
//                 </span>
//               ))}
//             </span>
//           ) : (
//             <span className="text-[#1B1D20]">{descriptionText}</span>
//           )}
//         </h2>

//         <Link
//           to="/about"
//           className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] mt-[28px] cursor-pointer transition-all duration-700 ease-out"
//           style={{
//             opacity: inView ? 1 : 0,
//             transform: inView ? "translateY(0)" : "translateY(14px)",
//             transitionDelay: `${allWords.length * 28 + 150}ms`,
//           }}
//         >
//           <span className="inline-flex items-center gap-6">
//             <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
//               <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                 <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,17px)] font-['Inter'] font-normal leading-[1.2em] text-[#1B1D20]">
//                   {buttonLabel}
//                 </p>
//                 <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,17px)] font-['Inter'] font-medium leading-[1.2em] text-[#1B1D20]">
//                   {buttonLabel}
//                 </p>
//               </div>
//             </div>
//             <ArrowUpRight size={18} className="text-[#E88029] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:scale-110" />
//           </span>
//           <div className="relative mt-[8px] h-[1.5px] w-full overflow-hidden">
//             <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC]/40 transition-colors duration-500 group-hover:bg-transparent" />
//             <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#1B1D20] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
//           </div>
//         </Link>

//         {/* ===== MOBILE ONLY (sm:hidden) ===== */}
// <div className="relative w-full mt-10 sm:hidden">
//   {/* Left image — o‘z joyidan paydo bo‘ladi */}
//   <div
//     className={`relative z-10 h-[130px] w-[160px] overflow-hidden rounded-[12px] shadow-sm transition-all duration-1000 ease-out ${
//       inView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
//     }`}
//   >
//     <AnimatedImage
//       src={inpus_left_img}
//       alt=""
//       loading="lazy"
//       decoding="async"
//       fetchPriority="low"
//       className="object-cover w-full h-full"
//     />
//   </div>

//   {/* Right image — pastdan tepaga chiqadi, bottom radius yo‘q */}
//   <div
//     className={`absolute bottom-[-16px] right-0 z-0 h-[110px] w-[180px] overflow-hidden rounded-t-[12px] rounded-b-none shadow-sm transition-all duration-1000 ease-out ${
//       inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
//     }`}
//   >
//     <AnimatedImage
//       src={inpus_right_img}
//       alt=""
//       loading="lazy"
//       decoding="async"
//       fetchPriority="low"
//       className="object-cover object-center w-full h-full"
//     />
//   </div>
// </div>
//       </div>

//       {/* Right image — desktop/tablet (o‘zgartirilmagan) */}
//       <div
//         className="absolute right-2 bottom-[-30px] hidden overflow-hidden shadow-sm sm:block sm:right-6 sm:bottom-[-40px] md:right-16 md:bottom-[-50px] h-[clamp(160px,10rem+2vw,250px)] w-[270px]"
//                 // className="absolute left-2 top-[-30px] hidden overflow-hidden shadow-sm sm:block sm:left-6 sm:top-[-30px] md:left-16 md:top-[-30px] h-[clamp(160px,10rem+2vw,250px)] w-[270px]"

//       >
//         <AnimatedImage
//           src={inpus_right_img}
//           alt=""
//           width={300}
//           height={250}
//           loading="lazy"
//           decoding="async"
//           fetchPriority="low"
//           className={`object-cover w-full h-full rounded-[8px] transition-transform duration-1000 ease-out ${
//             inView ? 'translate-y-0' : 'translate-y-full'
//           }`}
//         />
//       </div>
//     </section>
//   );
// };

// export default React.memo(AboutUs);


import AnimatedImage from './AnimatedImage';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import inpus_right_img from "../../assets/Industry_1.png";
import inpus_left_img from "../../assets/inpus_left.png";
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

const AboutUs: React.FC<InpusSectionProps> = ({
  twoColorMode = true,
  badgeText = translations.home.aboutUs.badgeText,
  description = translations.home.aboutUs.description,
  descriptionPart1 = translations.home.aboutUs.description,
  descriptionHighlight = translations.home.aboutUs.descriptionHighlight,
  buttonText = translations.home.aboutUs.buttonText,
}) => {
  const { t } = useLanguage();
  const fallbackBadge = { ru: 'О НАС', uz: 'BIZ HAQIMIZDA', eng: 'ABOUT US' };
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : t(fallbackBadge)), [t, badgeText]);
  const descriptionPart1Text = useMemo(() => (descriptionPart1 ? t(descriptionPart1) : null), [t, descriptionPart1]);
  const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);

  const highlightText = useMemo(() => String(t(descriptionHighlight) || ''), [t, descriptionHighlight]);
  const fullText = useMemo(() => String(descriptionPart1Text || ''), [descriptionPart1Text]);

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

  // Matnni so'zlarga bo'lib, highlight qismini belgilaymiz
  const highlightIndex = fullText.indexOf(highlightText);
  const beforeWords = useMemo(
    () => (highlightIndex === -1 ? fullText.split(" ") : fullText.slice(0, highlightIndex).trim().split(" ")),
    [fullText, highlightIndex]
  );
  const afterWords = useMemo(
    () => (highlightIndex === -1 ? [] : fullText.slice(highlightIndex).trim().split(" ")),
    [fullText, highlightIndex]
  );
  const allWords = useMemo(
    () => [
      ...beforeWords.map((w) => ({ text: w, colored: false })),
      ...afterWords.map((w) => ({ text: w, colored: true })),
    ],
    [beforeWords, afterWords]
  );

  return (
  <section
    ref={sectionRef}
    className="relative mx-auto flex w-full max-w-[1540px] items-center justify-between overflow-hidden border-b border-[#ECECEC] bg-white pt-[clamp(32px,2rem+1vw,60px)] md:pt-0 lg:min-h-[600px]"
  >
      {/* Left image — desktop/tablet */}
      <div
        className="absolute left-2 top-[-30px] hidden overflow-hidden shadow-sm sm:block sm:left-6 sm:top-[-30px] md:left-16 md:top-[-30px] h-[clamp(160px,10rem+2vw,250px)] w-[270px]"
      >
        <AnimatedImage
          src={inpus_left_img}
          alt=""
          width={300}
          height={260}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`object-cover w-full h-full rounded-[8px] transition-transform duration-1000 ease-out ${
            inView ? 'translate-y-0' : '-translate-y-full'
          }`}
        />
      </div>

      {/* Center text */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">
        <span
          className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500 transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
          }}
        >
          {badgeTextValue}
        </span>

        {/* font-normal (400) — kichik ekran uchun */}
        <h2 className="mb-8 w-full max-w-[810px] break-words font-normal text-[clamp(24px,1.5rem+0.8vw,40px)] leading-[clamp(30px,2rem+1vw,50px)] text-[#1B1D20]">
          {twoColorMode ? (
            <span className="inline">
              {allWords.map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom"
                  style={{ marginRight: "0.28em" }}
                >
                  <span
                    className={`inline-block will-change-transform ${w.colored ? "text-[#E88029]" : "text-[#1B1D20]"}`}
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
            </span>
          ) : (
            <span className="text-[#1B1D20]">{descriptionText}</span>
          )}
        </h2>

        {/* Button with Default Gray Border -> Black Hover Animation */}
        <Link
          to="/about"
          className="group relative inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] mt-[28px] pb-2 cursor-pointer transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transitionDelay: `${allWords.length * 28 + 150}ms`,
          }}
        >
          <span className="inline-flex items-center gap-6">
            <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
              <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,17px)] font-['Inter'] font-normal leading-[1.2em] text-[#1B1D20]">
                  {buttonLabel}
                </p>
                <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,17px)] font-['Inter'] font-medium leading-[1.2em] text-[#1B1D20]">
                  {buttonLabel}
                </p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-[#E88029] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:scale-110" />
          </span>

          {/* Default kulrang chiziq va hoverda qoraga to'lish animatsiyasi */}
          <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC] transition-colors duration-500 group-hover:bg-transparent" />
          <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#1B1D20] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
        </Link>

        {/* ===== MOBILE ONLY (sm:hidden) ===== */}
        <div className="relative w-full mt-10 sm:hidden">
          {/* Left image */}
          <div
            className={`relative z-10 h-[130px] w-[160px] overflow-hidden rounded-[12px] shadow-sm transition-all duration-1000 ease-out ${
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

          {/* Right image */}
          <div
            className={`absolute bottom-[-16px] right-0 z-0 h-[110px] w-[180px] overflow-hidden rounded-t-[12px] rounded-b-none shadow-sm transition-all duration-1000 ease-out ${
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

      {/* Right image — desktop/tablet */}
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
          className={`object-cover w-full h-full rounded-[8px] transition-transform duration-1000 ease-out ${
            inView ? 'translate-y-0' : 'translate-y-full'
          }`}
        />
      </div>
    </section>
  );
};

export default React.memo(AboutUs);