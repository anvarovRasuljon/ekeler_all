import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import industry_1 from "../../assets/Industry_1.png";
import industry_2 from "../../assets/Industry_2.png";
import industry_3 from "../../assets/Industry_3.png";
import industry_4 from "../../assets/Industry_4.png";
import industry_5 from "../../assets/Industry_5.png";

export interface GalleryCardData {
  id: string;
  title: string;
  tags: string[];
  description: string;
  imageUrl: string;
  imageAlt?: string;
}

export interface IndustrialGalleryGridProps {
  items?: GalleryCardData[];
  className?: string;
}

const LOREM_20 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";

const DEFAULT_GALLERY: GalleryCardData[] = [
  { id: "1", title: "Industry One", tags: ["Tag 1", "Tag 2"], description: LOREM_20, imageUrl: industry_1 },
  { id: "2", title: "Industry Two", tags: ["Tag 3", "Tag 4"], description: LOREM_20, imageUrl: industry_2 },
  { id: "3", title: "Industry Three", tags: ["Tag 5", "Tag 6"], description: LOREM_20, imageUrl: industry_3 },
  { id: "4", title: "Industry Four", tags: ["Tag 7", "Tag 8"], description: LOREM_20, imageUrl: industry_4 },
  { id: "5", title: "Industry Five", tags: ["Tag 9", "Tag 10"], description: LOREM_20, imageUrl: industry_5 },
];

const GalleryCard = React.memo(function GalleryCard({ item }: { item: GalleryCardData }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div
      className={`
        group relative flex h-[320px] w-full flex-col justify-between
        overflow-hidden rounded-2xl
        shadow-[0_1px_2px_rgba(0,0,0,0.08)]
        outline outline-1 outline-black/5
        transition-shadow duration-500 ease-out
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]
        md:h-[clamp(300px,20rem+4vw,360px)] lg:h-[clamp(340px,22rem+5vw,420px)]
      `}
    >
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.imageAlt ?? item.title}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
          className={`
            absolute inset-0 h-full w-full object-cover
            transition-[filter,opacity,transform] duration-500 ease-out
            group-hover:scale-[1.04] group-hover:brightness-75
          `}
          style={{
            filter: loaded ? undefined : "blur(18px)",
            opacity: loaded ? 1 : 0.6,
            transform: loaded ? undefined : "scale(1.05)",
            willChange: "filter, transform, opacity",
          }}
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-500 from-black/55 via-black/5 to-black/70 group-hover:opacity-100"
      />

      <div className="relative z-10 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        <h3 className="break-words font-inter text-[18px] font-medium leading-[24px] text-white opacity-100 transition-opacity duration-500 md:opacity-0 md:text-[clamp(18px,1.1rem+0.3vw,24px)] md:leading-[clamp(24px,1.5rem+0.3vw,32px)] group-hover:opacity-100">
          {item.title}
        </h3>
        {item.tags.length > 0 && (
          <div className="mt-[10px] flex flex-wrap items-center gap-x-2 font-inter text-[12px] font-normal leading-[22px] text-white/75 opacity-100 transition-opacity duration-500 md:opacity-0 md:text-[clamp(12px,0.75rem+0.1vw,14px)] group-hover:opacity-100">
            {item.tags.map((tag, i) => (
              <React.Fragment key={`${item.id}-tag-${i}`}>
                {i > 0 && <span className="text-white/40">•</span>}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 px-4 pb-4 opacity-100 transition-[opacity,transform] duration-500 sm:px-6 sm:pb-6 md:translate-y-5 md:opacity-0 lg:px-8 lg:pb-8 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <p className="w-full max-w-[500px] break-words font-inter text-[12px] font-normal leading-relaxed text-white/90 md:text-[clamp(14px,0.85rem+0.1vw,16px)] lg:leading-[25px]">
          {item.description}
        </p>
      </div>
    </div>
  );
});

function IndustrialGalleryGrid({ items = DEFAULT_GALLERY, className = "" }: IndustrialGalleryGridProps) {
  const { t } = useLanguage();
  if (!items || items.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl border border-dashed border-stone-300 text-stone-400">
        {t({ ru: "Карты отсутствуют", uz: "Kарталар йўқ", eng: "No cards available" })}
      </div>
    );
  }

  return (
    <div className={`bg-[#FBF7F0] p-2 ${className}`}>
      <div className="p-2 mx-auto max-w-7xl">
        {/* 
          Mobile: 1 column (sm:hidden default)
          Tablet + Desktop: 2 columns
        */}
        <div className="grid grid-cols-1 gap-3 mx-auto mb-12 sm:gap-4 md:grid-cols-2 md:mb-20">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(IndustrialGalleryGrid);