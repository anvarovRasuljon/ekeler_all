import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import industry_1 from "../../assets/Industry_1.png";
import industry_2 from "../../assets/Industry_2.png";
import industry_3 from "../../assets/Industry_3.png";
import industry_4 from "../../assets/Industry_4.png";
import industry_5 from "../../assets/Industry_5.png";

export interface GalleryCardData {
  /** Unique key, e.g. a Sanity document _id or slug */
  id: string;
  /** Card title */
  title: string;
  /** Short list of tags */
  tags: string[];
  /** Body copy */
  description: string;
  /** Background image URL */
  imageUrl: string;
  /** Optional alt text */
  imageAlt?: string;
}

export interface IndustrialGalleryGridProps {
  items?: GalleryCardData[];
  /** Optional className for wrapper */
  className?: string;
}

const LOREM_20 =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.";

const DEFAULT_GALLERY: GalleryCardData[] = [
  { id: "1", title: "Industry One", tags: ["Tag 1", "Tag 2"], description: LOREM_20, imageUrl: industry_1 },
  { id: "2", title: "Industry Two", tags: ["Tag 3", "Tag 4"], description: LOREM_20, imageUrl: industry_2 },
  { id: "3", title: "Industry Three", tags: ["Tag 5", "Tag 6"], description: LOREM_20, imageUrl: industry_3 },
  { id: "4", title: "Industry Four", tags: ["Tag 7", "Tag 8"], description: LOREM_20, imageUrl: industry_4 },
  { id: "5", title: "Industry Five", tags: ["Tag 9", "Tag 10"], description: LOREM_20, imageUrl: industry_5 },
];

const GalleryCard = React.memo(function GalleryCard({ item, index }: { item: GalleryCardData; index: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : index * 0.15 }}
      /* Responsive: mobilda balandlik kichikroq, radius va padding moslashadi */
      className={`
        group relative flex h-[300px] w-full flex-col justify-between
        overflow-hidden rounded-xl
        shadow-[0_1px_2px_rgba(0,0,0,0.08)]
        outline outline-1 outline-black/5
        sm:h-[360px] sm:rounded-2xl lg:h-[420px]
      `}
    >
      {/* Background image */}
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.imageAlt ?? item.title}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`
            absolute inset-0 h-full w-full object-cover
            transition-all duration-700 ease-out
            group-hover:scale-[1.04] group-hover:brightness-75
          `}
        />
      )}

      {/* Gradient scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-500 from-black/55 via-black/5 to-black/70 group-hover:opacity-100"
      />

      {/* Top content */}
      <div className="relative z-10 px-5 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        <h3 className="break-words font-inter text-[20px] font-medium leading-[28px] text-white opacity-100 transition-opacity duration-500 sm:text-[22px] md:opacity-0 lg:text-[24px] lg:leading-[32px] group-hover:opacity-100">
          {item.title}
        </h3>
        {item.tags.length > 0 && (
          <div className="mt-[10px] flex flex-wrap items-center gap-x-2 font-inter text-[13px] font-normal leading-[22px] text-white/75 opacity-100 transition-opacity duration-500 sm:text-[14px] md:opacity-0 group-hover:opacity-100">
            {item.tags.map((tag, i) => (
              <React.Fragment key={`${item.id}-tag-${i}`}>
                {i > 0 && <span className="text-white/40">•</span>}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Bottom content */}
      <div className="relative z-10 px-5 pb-5 opacity-100 transition-opacity duration-500 sm:px-6 sm:pb-6 md:opacity-0 lg:px-8 lg:pb-8 group-hover:opacity-100">
        <p className="w-full max-w-[500px] break-words font-inter text-[14px] font-normal leading-relaxed text-white/90 sm:text-[15px] lg:text-[16px] lg:leading-[25px]">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
});

function IndustrialGalleryGrid({ items = DEFAULT_GALLERY, className = "" }: IndustrialGalleryGridProps) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef(null);
  if (!items || items.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl border border-dashed border-stone-300 text-stone-400">
        {t({ ru: "Карты отсутствуют", uz: "Kарталар йўқ", eng: "No cards available" })}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0.01 : 0.7 }}
      className={`bg-[#FBF7F0] ${className} pb-10`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mb-20">
        {items.map((item, index) => (
          <GalleryCard key={item.id} item={item} index={index} />
        ))}
      </div>
      </div>
    </motion.div>
  );
}

export default React.memo(IndustrialGalleryGrid);