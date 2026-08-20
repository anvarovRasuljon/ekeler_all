import React from "react";
import { gsap } from 'gsap';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import industry_1 from "../../assets/Industry_1.webp";
import industry_2 from "../../assets/Industry_2.webp";
import industry_3 from "../../assets/Industry_3.webp";
import industry_4 from "../../assets/Industry_4.webp";
import industry_5 from "../../assets/Industry_5.webp";

export interface GalleryCardData {
  id: string;
  title: any;
  description: any;
  imageUrl: string;
  imageAlt?: string;
}

export interface IndustrialGalleryGridProps {
  items?: GalleryCardData[];
  className?: string;
}


const DEFAULT_GALLERY: GalleryCardData[] = [
  { id: "1", title: translations.home.industrialGallery.items[0].title, description: translations.home.industrialGallery.items[0].description, imageUrl: industry_1 },
  { id: "2", title: translations.home.industrialGallery.items[1].title, description: translations.home.industrialGallery.items[1].description, imageUrl: industry_2 },
  { id: "3", title: translations.home.industrialGallery.items[2].title, description: translations.home.industrialGallery.items[2].description, imageUrl: industry_3 },
  { id: "4", title: translations.home.industrialGallery.items[3].title, description: translations.home.industrialGallery.items[3].description, imageUrl: industry_4 },
  { id: "5", title: translations.home.industrialGallery.items[4].title, description: translations.home.industrialGallery.items[4].description, imageUrl: industry_5 },
];

const REVEALS = [
  { from: { y: 80, opacity: 0, scale: 1.05 } },
  { from: { x: -80, opacity: 0, scale: 1.05 } },
  { from: { x: 80, opacity: 0, scale: 1.05 } },
  { from: { y: -80, opacity: 0, scale: 1.05 } },
  { from: { scale: 1.2, opacity: 0, rotate: -3 } },
];

interface GalleryImageProps {
  src: string;
  alt: string;
  reveal: number;
  className?: string;
}

const GalleryImage = React.memo(function GalleryImage({ src, alt, reveal, className }: GalleryImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cfg = REVEALS[reveal % REVEALS.length];

  React.useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    gsap.set(img, { ...cfg.from });
  }, [cfg]);

  React.useEffect(() => {
    const img = imgRef.current;
    if (!img || !visible || !loaded) return;
    gsap.to(img, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 1.4,
      ease: 'power3.out',
    });
  }, [visible, loaded]);

  return (
    <div ref={divRef} className="absolute inset-0 h-full w-full group-hover:scale-[1.04] transition-transform duration-500">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover ${className || ''}`}
      />
    </div>
  );
});

const GalleryCard = React.memo(function GalleryCard({ item }: { item: GalleryCardData }) {
  const { t } = useLanguage();
  const titleText = t(item.title);
  const descriptionText = t(item.description);
  const reveal = (parseInt(item.id, 10) - 1) % REVEALS.length;
  return (
    <div
      className={`
        group relative flex h-[320px] w-full mx-auto flex-col justify-between
        overflow-hidden rounded-2xl
        shadow-[0_1px_2px_rgba(0,0,0,0.08)]
        outline outline-1 outline-black/5
        transition-shadow duration-500 ease-out
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]
        md:h-[clamp(300px,20rem+4vw,360px)] lg:h-[clamp(340px,22rem+5vw,420px)]
      `}
    >
      {item.imageUrl && (
        <GalleryImage
          src={item.imageUrl}
          alt={item.imageAlt ?? titleText}
          reveal={reveal}
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b opacity-100 transition-opacity duration-500 from-black/55 via-black/5 to-black/70"
      />

      <div className="relative z-10 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        <h3 className="break-words font-inter text-[18px] font-medium leading-[24px] text-white opacity-100 md:text-[clamp(18px,1.1rem+0.3vw,24px)] md:leading-[clamp(24px,1.5rem+0.3vw,32px)]">
          {titleText}
        </h3>
      </div>

      <div className="relative z-10 px-4 pb-4 opacity-100 transition-[opacity,transform] duration-500 sm:px-6 sm:pb-6 md:translate-y-5 md:opacity-0 lg:px-8 lg:pb-8 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <p className="w-full max-w-[500px] break-words font-inter text-[12px] font-normal leading-relaxed text-white/90 md:text-[clamp(14px,0.85rem+0.1vw,16px)] lg:leading-[25px]">
          {descriptionText}
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
    <div className={`w-full bg-[#FBF7F0] md:pt-16 ${className}`}>
      <div className="p-0 w-full mx-auto max-w-[1540px]">
        {/* 
          Mobile: 1 column (sm:hidden default)
          Tablet + Desktop: 2 columns
        */}
        <div className="grid grid-cols-1 gap-2 mb-12 w-full md:grid-cols-2 md:mb-20">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(IndustrialGalleryGrid);