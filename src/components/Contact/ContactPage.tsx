// import React, { useMemo } from "react";
// import contactMainImage from "../../assets/contact_main_img.png";
// import contactMiniImage from "../../assets/contact_mini_img.png";
// import { useLanguage } from "../../context/LanguageContext";
// import type { Language } from "../../context/LanguageContext";
// import ZohoLeadForm from "./ZohoLeadForm";

// const NAV_HEIGHT_PX = 65;

// const CONTENT: Record<Language, { eyebrow: string; title: string; highlight: string }> = {
//   ru: {
//     eyebrow: "КОНТАКТЫ",
//     title: "Lorem impus\nLorem ipsum dolor ",
//     highlight: "sit amet,\nconsectetur adipiscing elit",
//   },
//   uz: {
//     eyebrow: "ALOQA",
//     title: "Lorem impus\nLorem ipsum dolor ",
//     highlight: "sit amet,\nconsectetur adipiscing elit",
//   },
//   eng: {
//     eyebrow: "CONTACT",
//     title: "Lorem impus\nLorem ipsum dolor ",
//     highlight: "sit amet,\nconsectetur adipiscing elit",
//   },
// };

// export const ContactPage: React.FC = () => {
//   const { language } = useLanguage();
//   const t = useMemo(() => CONTENT[language], [language]);
//   const stickyTop = useMemo(() => NAV_HEIGHT_PX + 30, []);

//   return (
//     <div className="w-full bg-white text-[#1B1D20]">
//       <div className="px-4 pt-6 pb-16 w-full md:px-6 lg:px-8">
//         {/* O'NG — sarlavha + kichkina rasm + forma (mobilda birinchi) */}
//         <div className="flex flex-col gap-8 lg:flex-row-reverse">
//           <div className="flex flex-col gap-16 w-full min-w-0 lg:w-1/2 md:gap-20">
//             <div className="flex flex-col gap-8">
//               <div className="flex flex-row gap-4 justify-between items-start">
//                 <span className="w-fit shrink-0 rounded-full border border-neutral-300 px-4 py-1.5 font-['Inter'] text-xs font-medium tracking-wide text-neutral-500">
//                   {t.eyebrow}
//                 </span>
//                 <img
//                   src={contactMiniImage}
//                   alt="Contact mini"
//                   className="h-[110px] w-[170px] shrink-0 rounded-lg object-cover"
//                   loading="lazy"
//                   decoding="async"
//                   fetchPriority="low"
//                 />
//               </div>

//               <h2 className="max-w-[600px] whitespace-pre-line break-words font-['Manrope'] text-[26px] font-normal leading-[34px] text-[#1B1D20] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px] xl:max-w-[700px]">
//                 {t.title}
//                 <span className="text-[#E88029]">{t.highlight}</span>
//               </h2>
//             </div>

//             <ZohoLeadForm />
//           </div>

//           {/* CHAP — asosiy rasm (mobilda keyin) */}
//           <div className="w-full shrink-0 lg:w-1/2">
//             <div
//               className="overflow-hidden w-full rounded-lg h-[50vh] max-h-[420px] lg:sticky lg:h-[calc(100vh_-_125px)]"
//               style={{ top: stickyTop }}
//             >
//               <img
//                 src={contactMainImage}
//                 alt="Contact"
//                 className="block object-cover w-full h-full"
//                 loading="eager"
//                 decoding="async"
//                 fetchPriority="high"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(ContactPage);


import React, { useEffect, useMemo, useRef, useState } from "react";
import contactMainImage from "../../assets/contact_main_img.png";
import contactMiniImage from "../../assets/contact_mini_img.png";
import { useLanguage } from "../../context/LanguageContext";
import type { Language } from "../../context/LanguageContext";
import ZohoLeadForm from "./ZohoLeadForm";



const NAV_HEIGHT_PX = 65;
const IMG_GAP = 30;

const CONTENT: Record<Language, { eyebrow: string; title: string; highlight: string }> = {
  ru: {
    eyebrow: "КОНТАКТЫ",
    title: "Lorem impus\nLorem ipsum dolor ",
    highlight: "sit amet,\nconsectetur adipiscing elit",
  },
  uz: {
    eyebrow: "ALOQA",
    title: "Lorem impus\nLorem ipsum dolor ",
    highlight: "sit amet,\nconsectetur adipiscing elit",
  },
  eng: {
    eyebrow: "CONTACT",
    title: "Lorem impus\nLorem ipsum dolor ",
    highlight: "sit amet,\nconsectetur adipiscing elit",
  },
};

/**
 * useStickyColumn — AboutPage.tsx bilan bir xil, CSS `position: sticky`ga
 * bog'liq bo'lmagan, scroll holatini o'zi kuzatib `position: fixed` beruvchi
 * yechim. Sabab va ishlash tafsilotlari uchun AboutPage.tsx'dagi izohga qarang.
 */
function useStickyColumn(topOffset: number, bottomGap: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const container = containerRef.current;
      const column = columnRef.current;
      if (!container || !column) return;

      if (window.innerWidth < 1024) {
        setStyle((prev) => (Object.keys(prev).length ? {} : prev));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const stickyHeightPx = Math.max(200, window.innerHeight - topOffset - bottomGap);

      let next: React.CSSProperties;

      if (containerRect.top > topOffset) {
        next = { height: stickyHeightPx };
      } else if (containerRect.bottom < topOffset + stickyHeightPx) {
        next = {
          position: "absolute",
          bottom: 0,
          top: "auto",
          left: 0,
          width: "100%",
          height: stickyHeightPx,
        };
      } else {
        next = {
          position: "fixed",
          top: topOffset,
          left: columnRect.left,
          width: columnRect.width,
          height: stickyHeightPx,
        };
      }

      setStyle((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [topOffset, bottomGap]);

  return { containerRef, columnRef, style };
}

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const t = useMemo(() => CONTENT[language], [language]);
  const stickyTop = useMemo(() => NAV_HEIGHT_PX + IMG_GAP, []);

  const { containerRef, columnRef, style: stickyStyle } = useStickyColumn(stickyTop, IMG_GAP);

  return (
    <div className="w-full bg-white text-[#1B1D20]">
      <div className="px-4 pt-6 pb-16 w-full md:px-6 lg:px-8">
        {/* O'NG — sarlavha + kichkina rasm + forma (mobilda birinchi) */}
        <div ref={containerRef} className="flex relative flex-col gap-8 lg:flex-row-reverse">
          <div className="flex flex-col gap-16 w-full min-w-0 lg:w-1/2 md:gap-20">
            <div className="flex flex-col gap-8">
              <div className="flex flex-row gap-4 justify-between items-start">
                <span className="w-fit shrink-0 rounded-full border border-neutral-300 px-4 py-1.5 font-['Inter'] text-xs font-medium tracking-wide text-neutral-500">
                  {t.eyebrow}
                </span>
                <img
                  src={contactMiniImage}
                  alt="Contact mini"
                  className="h-[110px] w-[170px] shrink-0 rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>

              <h2 className="max-w-[600px] whitespace-pre-line break-words font-['Manrope'] text-[26px] font-normal leading-[34px] text-[#1B1D20] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px] xl:max-w-[700px]">
                {t.title}
                <span className="text-[#E88029]">{t.highlight}</span>
              </h2>
            </div>

            <ZohoLeadForm />
          </div>

          {/* CHAP — asosiy rasm (mobilda keyin), JS-based sticky */}
          <div ref={columnRef} className="relative w-full shrink-0 lg:w-1/2">
            <div
              className="overflow-hidden w-full rounded-lg h-[50vh] max-h-[420px] lg:h-auto lg:max-h-none"
              style={stickyStyle}
            >
              <img
                src={contactMainImage}
                alt="Contact"
                className="block object-cover w-full h-full"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactPage);