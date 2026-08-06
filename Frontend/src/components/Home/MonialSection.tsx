// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import backgroundImageUrl from "../../assets/Comment_bg.png"
// import avatar_1 from "../../assets/avatar_1.png"
// import avatar_2 from "../../assets/avatar_2.png"
// /** 
//  * MonialsSection (fayl: MonialSection.tsx)
//  * -----------------------------------------------------------------------
//  * Full-screen (100vh) background image with a white, slightly-overlapping
//  * card panel at the bottom showing 2 testimonials side by side, plus
//  * left/right arrows to page through the full list.
//  * -----------------------------------------------------------------------
//  */

// export interface Testimonial {
//   id: string;
//   quote: string;
//   name: string;
//   location: string;
//   avatarUrl?: string;
// }

// export interface MonialsSectionProps {
//   /** Full-width background image behind the card panel */
//   // backgroundImageUrl?: string;
//   backgroundImageAlt?: string;
//   testimonials?: Testimonial[];
//   className?: string;
// }

// const LOREM_20 =
//   "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.";

// const DEFAULT_TESTIMONIALS: Testimonial[] = [
//   { id: "1", quote: LOREM_20, name: "John Doe", location: "Tashkent", avatarUrl: avatar_1 },
//   { id: "2", quote: LOREM_20, name: "Jane Smith", location: "Samarkand", avatarUrl: avatar_2 },
//   { id: "3", quote: LOREM_20, name: "Bob Brown", location: "Bukhara", avatarUrl: avatar_1 },
//   { id: "4", quote: LOREM_20, name: "Alice Green", location: "Fergana", avatarUrl: avatar_2 },
//   { id: "5", quote: LOREM_20, name: "Tom White", location: "Andijan", avatarUrl: avatar_1 },
// ];

// function MonialsSection({
//   // backgroundImageUrl = "",
//   backgroundImageAlt = "",
//   testimonials = DEFAULT_TESTIMONIALS,
//   className = "",
// }: MonialsSectionProps) {
//   const [perPage, setPerPage] = useState(2);
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     const update = () => {
//       setPerPage(window.innerWidth < 768 ? 1 : 2);
//     };
//     update();
//     window.addEventListener('resize', update);
//     return () => window.removeEventListener('resize', update);
//   }, []);

//   useEffect(() => {
//     setPage(0);
//   }, [testimonials]);

//   const pageCount = useMemo(() => Math.max(1, Math.ceil(testimonials.length / perPage)), [testimonials.length]);
//   const visible = useMemo(() => testimonials.slice(page * perPage, page * perPage + perPage), [testimonials, page, perPage]);

//   const goPrev = useCallback(() => {
//     setPage((p) => (p - 1 + pageCount) % pageCount);
//   }, [pageCount]);
//   const goNext = useCallback(() => {
//     setPage((p) => (p + 1) % pageCount);
//   }, [pageCount]);

//   if (!testimonials || testimonials.length === 0) {
//     return null;
//   }

//   return (
//     <section
//       className={`relative my-8 sm:my-12 lg:my-16 ${className}`}
//     >
//       {/* Background image — full screen height, relative so the card can be absolutely positioned inside it */}
//       {/* Responsive: mobilda rasm pastroq balandlikda, karta esa oqim ichida (absolute emas) */}
//       <div className="relative w-full h-[45vh] min-h-[280px] overflow-hidden sm:h-[60vh] md:h-[98vh]">
//         {backgroundImageUrl && (
//           <img
//             src={backgroundImageUrl}
//             alt={backgroundImageAlt}
//             loading="eager"
//             decoding="async"
//             fetchPriority="high"
//             className="object-cover absolute inset-0 w-full h-full"
//           />
//         )}
//       </div>

//       {/* Overlapping white card panel — absolute, centered on the bottom edge of the image */}
//       <div className="relative z-10 -mt-16 px-4 md:absolute md:inset-x-0 md:top-[33%] md:mt-0 md:translate-y-1/2 md:px-8">
//           <div className="mx-auto max-w-7xl rounded-2xl bg-white px-5 py-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:px-6 sm:py-10 md:px-14 md:py-12">
//             <div className="grid relative grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
//               {/* Prev arrow */}
//               <button
//                 type="button"
//                 onClick={goPrev}
//                 aria-label="Oldingi"
//                 disabled={testimonials.length <= perPage}
//                 className="absolute left-[-2.5rem] top-1/2 hidden -translate-y-1/2 items-center justify-center text-stone-500 hover:text-stone-900 disabled:opacity-30 md:flex"
//               >
//                 <ArrowIcon direction="left" />
//               </button>

//                 <div
//                   className="grid grid-cols-1 col-span-full gap-10 transition-all duration-500 ease-in-out md:grid-cols-2 md:gap-16"
//                 >
//                   {visible.map((t) => (
//                     <TestimonialCard testimonial={t} key={t.id} />
//                   ))}
//                 </div>

//               {/* Next arrow */}
//               <button
//                 type="button"
//                 onClick={goNext}
//                 aria-label="Keyingi"
//                 disabled={testimonials.length <= perPage}
//                 className="absolute right-[-2.5rem] top-1/2 hidden -translate-y-1/2 items-center justify-center text-stone-500 hover:text-stone-900 disabled:opacity-30 md:flex"
//               >
//                 <ArrowIcon direction="right" />
//               </button>
//             </div>

//             {/* Mobile arrows (side arrows are hidden on small screens) */}
//             <div className="flex gap-6 justify-center items-center mt-8 md:hidden">
//               <button
//                 type="button"
//                 onClick={goPrev}
//                 aria-label="Oldingi"
//                 disabled={testimonials.length <= perPage}
//                 className="flex justify-center items-center w-11 h-11 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-30"
//               >
//                 <ArrowIcon direction="left" />
//               </button>
//               <button
//                 type="button"
//                 onClick={goNext}
//                 aria-label="Keyingi"
//                 disabled={testimonials.length <= perPage}
//                 className="flex justify-center items-center w-11 h-11 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-30"
//               >
//                 <ArrowIcon direction="right" />
//               </button>
//             </div>
//           </div>
//       </div>
//     </section>
//   );
// }

// function safeText(value: any): string {
//   if (!value) return "";
//   if (typeof value === "string") return value;
//   return value.ru || value.uz || value.eng || "";
// }

// const TestimonialCard = React.memo(function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
//   return (
//     <div className="flex min-h-[clamp(160px,11rem+2vw,180px)] flex-col justify-between transition-all duration-500 ease-in-out md:min-h-[clamp(200px,14rem+3vw,220px)]">
//       <p className="break-words text-[clamp(15px,0.9rem+0.2vw,20px)] leading-relaxed text-[#1B1D20] md:leading-snug">
//         {safeText(testimonial.quote)}
//       </p>

//       <div className="flex gap-3 items-center mt-6 md:mt-10">
//         {testimonial.avatarUrl && (
//           <img
//             src={testimonial.avatarUrl}
//             alt={safeText(testimonial.name)}
//             width={55}
//             height={55}
//             loading="lazy"
//             decoding="async"
//             className="h-[clamp(44px,2.75rem+0.5vw,55px)] w-[clamp(44px,2.75rem+0.5vw,55px)] shrink-0 rounded-[8px] border object-cover"
//           />
//         )}
//         <div>
//           <div className="text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium text-stone-900">
//             {safeText(testimonial.name)}
//           </div>
//           <div className="text-[clamp(12px,0.75rem+0.1vw,14px)] text-stone-400">{safeText(testimonial.location)}</div>
//         </div>
//       </div>
//     </div>
//   );
// });

// const ArrowIcon = React.memo(function ArrowIcon({ direction }: { direction: "left" | "right" }) {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
//     >
//       <path
//         d="M5 12H19M19 12L13 6M19 12L13 18"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// });

// export default React.memo(MonialsSection);

import React, { useCallback, useEffect, useMemo, useState } from "react";
import CommentBg from "../../assets/Comment_bg.png";
import avatar_1 from "../../assets/avatar_1.png";
import avatar_2 from "../../assets/avatar_2.png";

/**
 * MonialsSection (fayl: MonialSection.tsx)
 * -----------------------------------------------------------------------
 * ContactSection bilan bir xil joylashuv patterni:
 * - fon rasm to'g'ridan-to'g'ri section'ning CSS background'i (bg-cover/bg-center),
 *   alohida <img> va absolute overlap YO'Q — shuning uchun kontent hech qachon
 *   pastga siljib ketmaydi.
 * - Header (title + subtitle) xuddi ContactSection'dagidek.
 * - Grid: mobil = 1 ustun (1 comment), lg (1024px) dan boshlab = 2 ustun (2 comment) —
 *   ContactSection'dagi lg:grid-cols-2 bilan bir xil breakpoint.
 * - Pastda next/prev tugmalari, silliq transition bilan.
 * -----------------------------------------------------------------------
 */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatarUrl?: string;
}

export interface MonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  className?: string;
}

const TITLE_TEXT = "Mijozlarimiz fikri:";
const SUBTITLE_TEXT = `Lorem Impus porum dor,
forem dorem quick,
lore puel duit`;

const LOREM_20 =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.";

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "1", quote: LOREM_20, name: "John Doe", location: "Tashkent", avatarUrl: avatar_1 },
  { id: "2", quote: LOREM_20, name: "Jane Smith", location: "Samarkand", avatarUrl: avatar_2 },
  { id: "3", quote: LOREM_20, name: "Bob Brown", location: "Bukhara", avatarUrl: avatar_1 },
  { id: "4", quote: LOREM_20, name: "Alice Green", location: "Fergana", avatarUrl: avatar_2 },
  { id: "5", quote: LOREM_20, name: "Tom White", location: "Andijan", avatarUrl: avatar_1 },
];

function safeText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.ru || value.uz || value.eng || "";
}

const MonialsSection: React.FC<MonialsSectionProps> = ({
  title = TITLE_TEXT,
  subtitle = SUBTITLE_TEXT,
  testimonials = DEFAULT_TESTIMONIALS,
  className = "",
}) => {
  // ContactSection grid lg (1024px) da 2 ustunga o'tadi — perPage ham shu breakpointga moslandi
  const [perPage, setPerPage] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 1024 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [testimonials]);

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(testimonials.length / perPage)),
    [testimonials.length, perPage]
  );
  const visible = useMemo(
    () => testimonials.slice(page * perPage, page * perPage + perPage),
    [testimonials, page, perPage]
  );

  const goPrev = useCallback(() => {
    setPage((p) => (p - 1 + pageCount) % pageCount);
  }, [pageCount]);
  const goNext = useCallback(() => {
    setPage((p) => (p + 1) % pageCount);
  }, [pageCount]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className={`overflow-hidden relative w-full h-auto bg-center bg-no-repeat bg-cover ${className}`}
      style={{ backgroundImage: `url(${CommentBg})` }}
    >
      {/* Responsive: mobilda kichik padding va sarlavha, lg da original o'lchamlar — ContactSection bilan bir xil */}
      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-0 lg:pt-32">
        <header className="flex flex-col items-center text-center">
          <h2 className="break-words text-[28px] font-light leading-tight text-white sm:text-[42px] lg:text-[72px]">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-white/80 sm:text-base">
            {subtitle}
          </p>
        </header>

        <div className="mt-10 md:mt-16">
          <div className="grid grid-cols-1 gap-5 justify-center transition-all duration-500 ease-in-out sm:gap-8 lg:grid-cols-2">
            {visible.map((t) => (
              <TestimonialCard testimonial={t} key={t.id} />
            ))}
          </div>

          {/* Next/Prev — barcha ekranlarda bir xil, silliq transition bilan */}
          <div className="flex gap-6 justify-center items-center mt-10">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Oldingi"
              disabled={testimonials.length <= perPage}
              className="flex justify-center items-center w-11 h-11 rounded-full bg-white/90 text-stone-600 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-white hover:text-stone-900 disabled:opacity-30"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Keyingi"
              disabled={testimonials.length <= perPage}
              className="flex justify-center items-center w-11 h-11 rounded-full bg-white/90 text-stone-600 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-white hover:text-stone-900 disabled:opacity-30"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = React.memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="flex min-h-[clamp(160px,11rem+2vw,180px)] flex-col justify-between rounded-2xl bg-white px-5 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-in-out sm:px-6 sm:py-8">
      <p className="break-words text-[clamp(15px,0.9rem+0.2vw,20px)] leading-relaxed text-[#1B1D20]">
        {safeText(testimonial.quote)}
      </p>

      <div className="flex gap-3 items-center mt-6">
        {testimonial.avatarUrl && (
          <img
            src={testimonial.avatarUrl}
            alt={safeText(testimonial.name)}
            width={55}
            height={55}
            loading="lazy"
            decoding="async"
            className="h-[clamp(44px,2.75rem+0.5vw,55px)] w-[clamp(44px,2.75rem+0.5vw,55px)] shrink-0 rounded-[8px] border object-cover"
          />
        )}
        <div>
          <div className="text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium text-stone-900">
            {safeText(testimonial.name)}
          </div>
          <div className="text-[clamp(12px,0.75rem+0.1vw,14px)] text-stone-400">
            {safeText(testimonial.location)}
          </div>
        </div>
      </div>
    </div>
  );
});

const ArrowIcon = React.memo(function ArrowIcon({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default React.memo(MonialsSection);
export { MonialsSection };