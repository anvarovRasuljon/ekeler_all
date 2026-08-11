import AnimatedImage from './AnimatedImage';
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import CommentBg from "../../assets/Comment_bg.png";
// import avatar_1 from "../../assets/avatar_1.png";
// import avatar_2 from "../../assets/avatar_2.png";

// /**
//  * MonialsSection (fayl: MonialSection.tsx)
//  * -----------------------------------------------------------------------
//  * ContactSection bilan bir xil joylashuv patterni:
//  * - fon rasm to'g'ridan-to'g'ri section'ning CSS background'i (bg-cover/bg-center),
//  *   alohida <AnimatedImage> va absolute overlap YO'Q — shuning uchun kontent hech qachon
//  *   pastga siljib ketmaydi.
//  * - Header (title + subtitle) xuddi ContactSection'dagidek.
//  * - Grid: mobil = 1 ustun (1 comment), lg (1024px) dan boshlab = 2 ustun (2 comment) —
//  *   ContactSection'dagi lg:grid-cols-2 bilan bir xil breakpoint.
//  * - Pastda next/prev tugmalari, silliq transition bilan.
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
//   title?: string;
//   subtitle?: string;
//   testimonials?: Testimonial[];
//   className?: string;
// }

// const TITLE_TEXT = "Mijozlarimiz fikri:";
// const SUBTITLE_TEXT = `Lorem Impus porum dor,
// forem dorem quick,
// lore puel duit`;

// const LOREM_20 =
//   "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.";

// const DEFAULT_TESTIMONIALS: Testimonial[] = [
//   { id: "1", quote: LOREM_20, name: "John Doe", location: "Tashkent", avatarUrl: avatar_1 },
//   { id: "2", quote: LOREM_20, name: "Jane Smith", location: "Samarkand", avatarUrl: avatar_2 },
//   { id: "3", quote: LOREM_20, name: "Bob Brown", location: "Bukhara", avatarUrl: avatar_1 },
//   { id: "4", quote: LOREM_20, name: "Alice Green", location: "Fergana", avatarUrl: avatar_2 },
//   { id: "5", quote: LOREM_20, name: "Tom White", location: "Andijan", avatarUrl: avatar_1 },
// ];

// function safeText(value: any): string {
//   if (!value) return "";
//   if (typeof value === "string") return value;
//   return value.ru || value.uz || value.eng || "";
// }

// const MonialsSection: React.FC<MonialsSectionProps> = ({
//   title = TITLE_TEXT,
//   subtitle = SUBTITLE_TEXT,
//   testimonials = DEFAULT_TESTIMONIALS,
//   className = "",
// }) => {
//   // ContactSection grid lg (1024px) da 2 ustunga o'tadi — perPage ham shu breakpointga moslandi
//   const [perPage, setPerPage] = useState(1);
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     const update = () => setPerPage(window.innerWidth < 1024 ? 1 : 2);
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   useEffect(() => {
//     setPage(0);
//   }, [testimonials]);

//   const pageCount = useMemo(
//     () => Math.max(1, Math.ceil(testimonials.length / perPage)),
//     [testimonials.length, perPage]
//   );
//   const visible = useMemo(
//     () => testimonials.slice(page * perPage, page * perPage + perPage),
//     [testimonials, page, perPage]
//   );

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
//       className={`overflow-hidden relative w-full h-auto bg-center bg-no-repeat bg-cover ${className}`}
//       style={{ backgroundImage: `url(${CommentBg})` }}
//     >
//       {/* Responsive: mobilda kichik padding va sarlavha, lg da original o'lchamlar — ContactSection bilan bir xil */}
//       <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-0 lg:pt-32">
//         <header className="flex flex-col items-center text-center">
//           <h2 className="break-words text-[28px] font-light leading-tight text-white sm:text-[42px] lg:text-[72px]">
//             {title}
//           </h2>
//           <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-white/80 sm:text-base">
//             {subtitle}
//           </p>
//         </header>

//         <div className="mt-10 md:mt-16">
//           <div className="grid grid-cols-1 gap-5 justify-center transition-all duration-500 ease-in-out sm:gap-8 lg:grid-cols-2">
//             {visible.map((t) => (
//               <TestimonialCard testimonial={t} key={t.id} />
//             ))}
//           </div>

//           {/* Next/Prev — barcha ekranlarda bir xil, silliq transition bilan */}
//           <div className="flex gap-6 justify-center items-center mt-10">
//             <button
//               type="button"
//               onClick={goPrev}
//               aria-label="Oldingi"
//               disabled={testimonials.length <= perPage}
//               className="flex justify-center items-center w-11 h-11 rounded-full bg-white/90 text-stone-600 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-white hover:text-stone-900 disabled:opacity-30"
//             >
//               <ArrowIcon direction="left" />
//             </button>
//             <button
//               type="button"
//               onClick={goNext}
//               aria-label="Keyingi"
//               disabled={testimonials.length <= perPage}
//               className="flex justify-center items-center w-11 h-11 rounded-full bg-white/90 text-stone-600 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-white hover:text-stone-900 disabled:opacity-30"
//             >
//               <ArrowIcon direction="right" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const TestimonialCard = React.memo(function TestimonialCard({
//   testimonial,
// }: {
//   testimonial: Testimonial;
// }) {
//   return (
//     <div className="flex min-h-[clamp(160px,11rem+2vw,180px)] flex-col justify-between rounded-2xl bg-white px-5 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-in-out sm:px-6 sm:py-8">
//       <p className="break-words text-[clamp(15px,0.9rem+0.2vw,20px)] leading-relaxed text-[#1B1D20]">
//         {safeText(testimonial.quote)}
//       </p>

//       <div className="flex gap-3 items-center mt-6">
//         {testimonial.avatarUrl && (
//           <AnimatedImage
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
//           <div className="text-[clamp(12px,0.75rem+0.1vw,14px)] text-stone-400">
//             {safeText(testimonial.location)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// const ArrowIcon = React.memo(function ArrowIcon({
//   direction,
// }: {
//   direction: "left" | "right";
// }) {
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
// export { MonialsSection };


import React, { useCallback, useEffect, useMemo, useState } from "react";
import CommentBg from "../../assets/Comment_bg.png";
import avatar_1 from "../../assets/avatar_1.png";
import avatar_2 from "../../assets/avatar_2.png";

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
  title = "",
  subtitle = "",
  testimonials = DEFAULT_TESTIMONIALS,
  className = "",
}) => {
  const [perPage, setPerPage] = useState(1);
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

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

  const changePage = useCallback(
    (dir: "next" | "prev") => {
      if (animating || testimonials.length <= perPage) return;
      setDirection(dir);
      setAnimating(true);

      setTimeout(() => {
        setPage((p) =>
          dir === "next" ? (p + 1) % pageCount : (p - 1 + pageCount) % pageCount
        );
        setAnimating(false);
      }, 300);
    },
    [animating, pageCount, perPage, testimonials.length]
  );

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className={`overflow-hidden relative w-full h-auto rounded-[8px] bg-center bg-no-repeat bg-cover ${className}`}
      style={{ backgroundImage: `url(${CommentBg})` }}
    >
      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-0 lg:pt-32">
        {(title || subtitle) && (
          <header className="flex flex-col items-center text-center">
            {title && (
              <h2 className="break-words text-[28px] font-light leading-tight text-white sm:text-[42px] lg:text-[72px]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-white/80 sm:text-base">
                {subtitle}
              </p>
            )}
          </header>
        )}

        <div className="mt-10 md:mt-16">
          {/* Cards with animation */}
          <div
            className={`grid grid-cols-1 gap-5 justify-center sm:gap-8 lg:grid-cols-2 transition-all duration-300 ease-out ${
              animating
                ? direction === "next"
                  ? "opacity-0 translate-x-6"
                  : "opacity-0 -translate-x-6"
                : "opacity-100 translate-x-0"
            }`}
          >
            {visible.map((t) => (
              <TestimonialCard testimonial={t} key={t.id} />
            ))}
          </div>

          {/* Next / Prev — cardlarga yaqin */}
          <div className="flex gap-4 justify-center items-center mt-8">
            <button
              type="button"
              onClick={() => changePage("prev")}
              aria-label="Oldingi"
              disabled={testimonials.length <= perPage}
              className="flex justify-center items-center w-12 h-12 rounded-full bg-white text-stone-600 shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-white hover:scale-105 hover:text-stone-900 disabled:opacity-30 disabled:hover:scale-100"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => changePage("next")}
              aria-label="Keyingi"
              disabled={testimonials.length <= perPage}
              className="flex justify-center items-center w-12 h-12 rounded-full bg-white text-stone-600 shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-white hover:scale-105 hover:text-stone-900 disabled:opacity-30 disabled:hover:scale-100"
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
    <div className="flex min-h-[clamp(180px,12rem+2vw,220px)] flex-col justify-between rounded-2xl bg-white px-5 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-in-out hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] sm:px-6 sm:py-8">
      <p className="break-words text-[clamp(15px,0.9rem+0.2vw,18px)] leading-relaxed text-[#1B1D20]">
        {safeText(testimonial.quote)}
      </p>

      <div className="flex gap-3 items-center mt-6">
        {testimonial.avatarUrl && (
          <AnimatedImage
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