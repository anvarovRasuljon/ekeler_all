import AnimatedImage from './AnimatedImage';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CommentBg from "../../assets/Comment_bg.webp";
import { useLanguage } from "../../context/LanguageContext";

// ─── API types ────────────────────────────────────────────────────────────────
interface CommentApiItem {
  id: number;
  commentator_full_name_uz: string;
  commentator_full_name_ru: string;
  commentator_full_name_en: string;
  commentator_location_uz: string;
  commentator_location_ru: string;
  commentator_location_en: string;
  comment_text_uz: string;
  comment_text_ru: string;
  comment_text_en: string;
  commentator_profile_picture_uz: string;
  commentator_profile_picture_ru: string;
  commentator_profile_picture_en: string;
  created_at: string;
  updated_at: string;
}

// ─── Internal type ────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatarUrl?: string;
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface MonialsSectionProps {
  title?: string;
  subtitle?: string;
  /** Pass custom testimonials to override API data */
  testimonials?: Testimonial[];
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function safeText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  const v = value as Record<string, string>;
  return v.ru || v.uz || v.eng || "";
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "https://api.ekeler.uz";

function getSuffix(lang: string) {
  return lang === 'eng' ? 'en' : lang;
}

function pickComment(item: CommentApiItem, lang: string): Testimonial {
  const suffix = getSuffix(lang);
  const name = item[`commentator_full_name_${suffix}`] || item.commentator_full_name_uz || '';
  const location = item[`commentator_location_${suffix}`] || item.commentator_location_uz || '';
  const text = item[`comment_text_${suffix}`] || item.comment_text_uz || '';
  const picture = item[`commentator_profile_picture_${suffix}`] || item.commentator_profile_picture_uz || null;
  return {
    id: String(item.id),
    quote: text,
    name,
    location,
    avatarUrl: picture
      ? picture.startsWith("http")
        ? picture
        : `${BASE_URL}${picture}`
      : undefined,
  };
}

function mapApiItem(item: CommentApiItem, lang: string): Testimonial {
  return pickComment(item, lang);
}

// ─── Fetch hook ───────────────────────────────────────────────────────────────
function useComments() {
  const { language } = useLanguage();
  const [rawTestimonials, setRawTestimonials] = useState<CommentApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(`${BASE_URL}/api/v1/comments?page=0&size=50`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<CommentApiItem[]>;
      })
      .then((data) => {
        if (cancelled) return;
        setRawTestimonials(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const testimonials = useMemo(() => rawTestimonials.map(item => mapApiItem(item, language)), [rawTestimonials, language]);

  return { testimonials, loading, error };
}

// ─── Main component ───────────────────────────────────────────────────────────
const MonialsSection: React.FC<MonialsSectionProps> = ({
  title = "",
  subtitle = "",
  testimonials: propTestimonials,
  className = "",
}) => {
  const { testimonials: apiTestimonials, loading, error } = useComments();

  // Prefer prop testimonials; fallback to API data
  const testimonials: Testimonial[] = propTestimonials ?? apiTestimonials;

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

  useEffect(() => { setPage(0); }, [testimonials]);

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

  // Loading skeleton
  if (loading) {
    return (
      <section
        className={`flex overflow-hidden relative flex-col w-full bg-center bg-no-repeat bg-cover min-h-[85vh] max-h-[85vh] rounded-[8px] ${className}`}
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
            <div className="overflow-hidden flex flex-col items-center bg-white min-h-[350px] max-w-[1540px] mx-auto rounded-[8px] border border-[#ECECEC] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <SkeletonCard />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error or empty
  if (error || testimonials.length === 0) return null;

  const navDisabled = testimonials.length <= perPage;

  return (
    <section
      className={`flex overflow-hidden relative flex-col w-full bg-center bg-no-repeat bg-cover min-h-[85vh] max-h-[85vh] rounded-[8px] ${className}`}
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
          {/*
            Card container: always stretches to fill width.
            When only 1 card is visible on desktop (e.g. last odd item),
            the card itself takes up the entire row via flex-1 / w-full.
          */}
          <div className="overflow-hidden flex flex-col bg-white min-h-[350px] max-w-[1540px] mx-auto rounded-[8px] border border-[#ECECEC] shadow-[0_10px_40px_rgba(0,0,0,0.08)] lg:flex-row">
            <div className="flex flex-col flex-1 lg:flex-row lg:items-stretch">
              {/* Left arrow — desktop only */}
              <button
                type="button"
                onClick={() => changePage("prev")}
                aria-label="Oldingi"
                disabled={navDisabled}
                className="hidden shrink-0 justify-center items-center w-16 border-r border-[#ECECEC] text-[#1B1D20] transition-colors duration-300 hover:bg-[#FAFAFA] disabled:opacity-30 lg:flex"
              >
                <ArrowIcon direction="left" />
              </button>

              {/* Cards grid — always fills remaining width */}
              <div
                className={`grid flex-1 min-w-0 grid-cols-1 lg:grid-cols-2 transition-all duration-300 ease-out ${
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

              {/* Right arrow — desktop only */}
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

            {/* Mobile arrows — below cards */}
            <div className="flex w-full border-t border-[#ECECEC] lg:hidden">
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

// ─── Testimonial card ─────────────────────────────────────────────────────────
const TestimonialCard = React.memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="flex w-full flex-col justify-between overflow-hidden px-5 py-10 min-h-[320px] sm:px-8 sm:py-8">
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

// ─── Loading skeleton ─────────────────────────────────────────────────────────
const SkeletonCard = React.memo(function SkeletonCard() {
  return (
    <div className="flex w-full flex-col justify-between px-5 py-10 min-h-[320px] sm:px-8 sm:py-8 animate-pulse">
      <div className="space-y-3">
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-5/6 h-4 bg-gray-200 rounded" />
        <div className="w-4/6 h-4 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-3 items-center mt-6">
        <div className="h-[55px] w-[55px] shrink-0 rounded-[8px] bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="w-28 h-3 bg-gray-200 rounded" />
          <div className="w-20 h-3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
});

// ─── Arrow icon ───────────────────────────────────────────────────────────────
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