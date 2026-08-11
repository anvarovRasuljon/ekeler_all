import AnimatedImage from './AnimatedImage';
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
  // Mobil (< lg / 1024px): 1 ta card. Desktop (lg+): 2 ta card.
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

  const navDisabled = testimonials.length <= perPage;

  return (
    <section
      className={`flex overflow-hidden relative flex-col w-full min-h-screen bg-center bg-no-repeat bg-cover rounded-[8px] ${className}`}
      style={{ backgroundImage: `url(${CommentBg})` }}
    >
      <div className="mx-[25px] flex flex-col flex-1 px-0 pb-[30px] pt-20 sm:pt-28 lg:pt-32">
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

        <div className="mt-auto">
          <div className="overflow-hidden bg-white min-h-[350px] rounded-[8px] border border-[#ECECEC] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col lg:flex-row lg:items-stretch">
              {/* Chap arrow — faqat desktop (lg+), card bilan orasida #ECECEC border */}
              <button
                type="button"
                onClick={() => changePage("prev")}
                aria-label="Oldingi"
                disabled={navDisabled}
                className="hidden shrink-0 justify-center items-center w-16 border-r border-[#ECECEC] text-[#1B1D20] transition-colors duration-300 hover:bg-[#FAFAFA] disabled:opacity-30 lg:flex"
              >
                <ArrowIcon direction="left" />
              </button>

              <div
                className={`grid min-w-0 flex-1 grid-cols-1 lg:grid-cols-2 transition-all duration-300 ease-out ${
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

              {/* O'ng arrow — faqat desktop (lg+) */}
              <button
                type="button"
                onClick={() => changePage("next")}
                aria-label="Keyingi"
                disabled={navDisabled}
                className="hidden shrink-0 justify-center items-center w-16 border-l border-[#ECECEC] text-[#1B1D20] transition-colors duration-300 hover:bg-[#FAFAFA] disabled:opacity-30 lg:flex"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            {/* Mobil (< lg): arrowlar pastda, top border bilan ajratilgan, ora-orasida 1 ta vertikal border */}
            <div className="flex border-t border-[#ECECEC] lg:hidden">
              <button
                type="button"
                onClick={() => changePage("prev")}
                aria-label="Oldingi"
                disabled={navDisabled}
                className="flex flex-1 justify-center items-center py-5 border-r border-[#ECECEC] text-[#1B1D20] transition-colors duration-300 hover:bg-[#FAFAFA] disabled:opacity-30"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => changePage("next")}
                aria-label="Keyingi"
                disabled={navDisabled}
                className="flex flex-1 justify-center items-center py-5 text-[#1B1D20] transition-colors duration-300 hover:bg-[#FAFAFA] disabled:opacity-30"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
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
    <div className="flex min-h-[clamp(220px,14rem+4vw,320px)] flex-col justify-between px-5 py-6 sm:px-8 sm:py-8">
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