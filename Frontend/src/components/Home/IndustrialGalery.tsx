import React from "react";
import { useLanguage } from "../../context/LanguageContext";

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
  items: GalleryCardData[];
  /** Optional className for wrapper */
  className?: string;
}

function GalleryCard({ item }: { item: GalleryCardData }) {
  return (
    <div
      className={`
        group relative flex h-[420px] w-full flex-col justify-between
        overflow-hidden rounded-2xl
        shadow-[0_1px_2px_rgba(0,0,0,0.08)]
        outline outline-1 outline-black/5
      `}
    >
      {/* Background image */}
      <img
        src={item.imageUrl}
        alt={item.imageAlt ?? item.title}
        loading="lazy"
        className={`
          absolute inset-0 h-full w-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-[1.04]
        `}
      />

      {/* Gradient scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/70"
      />

      {/* Top content */}
      <div className="relative z-10 px-8 pt-8">
        <h3 className="font-inter text-[24px] font-medium leading-[32px] text-white">
          {item.title}
        </h3>
        {item.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 font-inter text-[14px] font-normal leading-[22px] text-white/75 mt-[10px]">
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
      <div className="relative z-10 px-8 pb-8">
        <p className="w-[500px] max-w-full font-inter text-[16px] font-normal leading-[25px] text-white/90">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function IndustrialGalleryGrid({ items, className = "" }: IndustrialGalleryGridProps) {
  const { t } = useLanguage();
  if (!items || items.length === 0) {
    return (
      <div className="p-10 text-center border border-dashed rounded-2xl border-stone-300 text-stone-400 ">
        {t({ ru: "Карты отсутствуют", uz: "Kарталар йўқ", eng: "No cards available" })}
      </div>
    );
  }

  return (
    <div className={`bg-[#FBF7F0] ${className} pb-10`}>
      <div className="px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-5 mx-auto mb-20 sm:grid-cols-2">
        {items.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
</div>

    </div>
  );
}