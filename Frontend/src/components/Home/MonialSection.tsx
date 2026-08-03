import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import backgroundImageUrl from "../../assets/Comment_bg.png"
import avatar_1 from "../../assets/avatar_1.png"
import avatar_2 from "../../assets/avatar_2.png"
/** 
 * MonialsSection (fayl: MonialSection.tsx)
 * -----------------------------------------------------------------------
 * Full-screen (100vh) background image with a white, slightly-overlapping
 * card panel at the bottom showing 2 testimonials side by side, plus
 * left/right arrows to page through the full list.
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
  /** Full-width background image behind the card panel */
  // backgroundImageUrl?: string;
  backgroundImageAlt?: string;
  testimonials?: Testimonial[];
  className?: string;
}

const LOREM_20 =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.";

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "1", quote: LOREM_20, name: "John Doe", location: "Tashkent", avatarUrl: avatar_1 },
  { id: "2", quote: LOREM_20, name: "Jane Smith", location: "Samarkand", avatarUrl: avatar_2 },
  { id: "3", quote: LOREM_20, name: "Bob Brown", location: "Bukhara", avatarUrl: avatar_1 },
];

function MonialsSection({
  // backgroundImageUrl = "",
  backgroundImageAlt = "",
  testimonials = DEFAULT_TESTIMONIALS,
  className = "",
}: MonialsSectionProps) {
  const perPage = 2;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setPage(0);
    setDirection(1);
  }, [testimonials]);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(testimonials.length / perPage)), [testimonials.length]);
  const visible = useMemo(() => testimonials.slice(page * perPage, page * perPage + perPage), [testimonials, page, perPage]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setPage((p) => (p - 1 + pageCount) % pageCount);
  }, [pageCount]);
  const goNext = useCallback(() => {
    setDirection(1);
    setPage((p) => (p + 1) % pageCount);
  }, [pageCount]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <motion.section
      ref={ref}
      className={`relative my-3 ${className}`}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0.01 : 0.7 }}
    >
      {/* Background image — full screen height, relative so the card can be absolutely positioned inside it */}
      {/* Responsive: mobilda rasm pastroq balandlikda, karta esa oqim ichida (absolute emas) */}
      <div className="relative w-full h-[45vh] min-h-[280px] overflow-hidden sm:h-[60vh] md:h-[98vh]">
        {backgroundImageUrl && (
          <img
            src={backgroundImageUrl}
            alt={backgroundImageAlt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="object-cover absolute inset-0 w-full h-full"
          />
        )}
      </div>

      {/* Overlapping white card panel — absolute, centered on the bottom edge of the image */}
      <div className="relative z-10 -mt-16 px-4 md:absolute md:inset-x-0 md:top-[33%] md:mt-0 md:translate-y-1/2 md:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl bg-white px-5 py-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:px-6 sm:py-10 md:px-14 md:py-12">
            <div className="grid relative grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
              {/* Prev arrow */}
              <button
                type="button"
                onClick={goPrev}
                aria-label="Oldingi"
                disabled={testimonials.length <= perPage}
                className="absolute left-[-2.5rem] top-1/2 hidden -translate-y-1/2 items-center justify-center text-stone-500 transition hover:text-stone-900 disabled:opacity-30 md:flex"
              >
                <ArrowIcon direction="left" />
              </button>

              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  initial={{ x: reduced ? 0 : (direction > 0 ? 60 : -60), opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: reduced ? 0 : (direction > 0 ? -60 : 60), opacity: 0 }}
                  transition={{ duration: reduced ? 0.01 : 0.35, ease: "easeInOut" }}
                  className="grid grid-cols-1 col-span-full gap-10 md:grid-cols-2 md:gap-16 will-change-transform"
                >
                  {visible.map((t) => (
                    <TestimonialCard key={t.id} testimonial={t} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Next arrow */}
              <button
                type="button"
                onClick={goNext}
                aria-label="Keyingi"
                disabled={testimonials.length <= perPage}
                className="absolute right-[-2.5rem] top-1/2 hidden -translate-y-1/2 items-center justify-center text-stone-500 transition hover:text-stone-900 disabled:opacity-30 md:flex"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            {/* Mobile arrows (side arrows are hidden on small screens) */}
            <div className="flex gap-6 justify-center items-center mt-8 md:hidden">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Oldingi"
                disabled={testimonials.length <= perPage}
                className="transition text-stone-500 hover:text-stone-900 disabled:opacity-30"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Keyingi"
                disabled={testimonials.length <= perPage}
                className="transition text-stone-500 hover:text-stone-900 disabled:opacity-30"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
      </div>
    </motion.section>
  );
}

function safeText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.ru || value.uz || value.eng || "";
}

const TestimonialCard = React.memo(function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex min-h-[180px] flex-col justify-between md:min-h-[220px]">
      <p className="break-words text-base leading-relaxed text-[#1B1D20] sm:text-lg md:text-2xl md:leading-snug">
        {safeText(testimonial.quote)}
      </p>

      <div className="mt-6 flex items-center gap-3 md:mt-10">
        {testimonial.avatarUrl && (
          <img
            src={testimonial.avatarUrl}
            alt={safeText(testimonial.name)}
            width={55}
            height={55}
            loading="lazy"
            decoding="async"
            className="h-[48px] w-[48px] shrink-0 rounded-[8px] border object-cover md:h-[55px] md:w-[55px]"
          />
        )}
        <div>
          <div className="text-sm font-medium text-stone-900">
            {safeText(testimonial.name)}
          </div>
          <div className="text-sm text-stone-400">{safeText(testimonial.location)}</div>
        </div>
      </div>
    </div>
  );
});

const ArrowIcon = React.memo(function ArrowIcon({ direction }: { direction: "left" | "right" }) {
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