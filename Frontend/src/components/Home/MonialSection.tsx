import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  avatarUrl: string;
}

export interface MonialsSectionProps {
  /** Full-width background image behind the card panel */
  backgroundImageUrl: string;
  backgroundImageAlt?: string;
  testimonials: Testimonial[];
  className?: string;
}

export default function MonialsSection({
  backgroundImageUrl,
  backgroundImageAlt = "",
  testimonials,
  className = "",
}: MonialsSectionProps) {
  const perPage = 2;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setPage(0);
    setDirection(1);
  }, [testimonials]);

  const pageCount = Math.max(1, Math.ceil(testimonials.length / perPage));

  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  const goPrev = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + pageCount) % pageCount);
  };
  const goNext = () => {
    setDirection(1);
    setPage((p) => (p + 1) % pageCount);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className={`relative my-3 ${className}`}>
      {/* Background image — full screen height, relative so the card can be absolutely positioned inside it */}
      <div className="relative w-full h-[98vh] overflow-hidden">
        {backgroundImageUrl && (
          <img
            src={backgroundImageUrl}
            alt={backgroundImageAlt}
            className="object-cover absolute inset-0 w-full h-full"
          />
        )}

        {/* Overlapping white card panel — absolute, centered on the bottom edge of the image */}
        <div className="absolute inset-x-0 top-[33%] px-4 translate-y-1/2 md:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl bg-white px-4 py-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:px-14 md:py-12">
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
                  initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="grid grid-cols-1 col-span-full gap-10 md:grid-cols-2 md:gap-16"
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
      </div>
    </section>
  );
}

function safeText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.ru || value.uz || value.eng || "";
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex min-h-[220px] flex-col justify-between ">
      <p className="text-xl leading-snug text-[#1B1D20] md:text-2xl">
        {safeText(testimonial.quote)}
      </p>

      <div className="flex gap-3 items-center mt-10">
        <img
          src={testimonial.avatarUrl}
          alt={safeText(testimonial.name)}
          className="object-cover w-[56px] h-[56px] border  rounded-[8px]"
        />
        <div>
          <div className="text-sm font-medium text-stone-900">
            {safeText(testimonial.name)}
          </div>
          <div className="text-sm text-stone-400">{safeText(testimonial.location)}</div>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
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
}