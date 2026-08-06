// import React from 'react';
// import { getImageUrl } from '../../sanity/client';
// import AboutCompanyContentBlock from './AboutCompanyContentBlock';
// import type { AboutCompanyContentData } from './AboutCompanyContentBlock';
// import AboutCompanyBlock from './AboutCompanyBlock';
// import type { AboutCompanyBlockData } from './AboutCompanyBlock';
// import type { AboutCompanyFeatureData } from './AboutFeatures';
// import AboutCompanyFeature from './AboutFeatures';

// import aboutMainImg from '../../assets/home_about_first_img.png';
// import aboutContentImg from '../../assets/home_features_img.png';
// import block370_1 from '../../assets/Industry_1.png';
// import block370_2 from '../../assets/Industry_2.png';
// import block350_1 from '../../assets/Industry_3.png';
// import block350_2 from '../../assets/Industry_4.png';
// import aboutFeatureImg from '../../assets/home_about_second_img.png';

// const DEFAULT_IMAGE_DATA: AboutCompanyImageData = {
//   image: aboutMainImg,
// };

// const DEFAULT_CONTENT_DATA: AboutCompanyContentData = {
//   image: aboutContentImg,
//   title: { ru: 'О компании', uz: 'Kompaniya haqida', eng: 'About Company' },
//   description: { ru: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.', uz: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.', eng: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
//   phone: '+998 90 123 45 67',
//   email: 'info@ekeler.uz',
//   location: { ru: 'Ташкент, Узбекистан', uz: 'Toshkent, O\'zbekiston', eng: 'Tashkent, Uzbekistan' },
// };
// const NAV_HEIGHT_PX = 65;
// const IMG_GAP = 30;
// const DEFAULT_BLOCK_DATA: AboutCompanyBlockData = {
//   title1: { ru: 'Миссия', uz: 'Missiya', eng: 'Mission' },
//   description1: { ru: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.', uz: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.', eng: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.' },
//   title2: { ru: 'Видение', uz: 'Videniye', eng: 'Vision' },
//   description2: { ru: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.', uz: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.', eng: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.' },
//   bodyText: { ru: 'Lorem ipsum dolor sit amet consectetur.', uz: 'Lorem ipsum dolor sit amet consectetur.', eng: 'Lorem ipsum dolor sit amet consectetur.' },
//   image370_1: block370_1,
//   image370_2: block370_2,
//   image350_1: block350_1,
//   image350_2: block350_2,
// };

// const DEFAULT_FEATURE_DATA: AboutCompanyFeatureData = {
//   image: aboutFeatureImg,
//   title: { ru: 'Наши ценности', uz: 'Bizning qadriyatlar', eng: 'Our Values' },
//   description: { ru: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', uz: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', eng: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
// };

// interface AboutCompanyImageData {
//   image?: unknown;
// }

// function SanityImage({
//   source,
//   alt,
//   className,
//   width,
//   height,
//   priority = false,
// }: {
//   source: unknown;
//   alt?: string;
//   className?: string;
//   width: number;
//   height: number;
//   priority?: boolean;
// }) {
//   const url = getImageUrl(source, { width, height });
//   if (!url) return null;
//   return (
//     <img
//       src={url}
//       alt={alt || ''}
//       className={className}
//       width={width}
//       height={height}
//       loading={priority ? 'eager' : 'lazy'}
//       decoding="async"
//       fetchPriority={priority ? 'high' : 'low'}
//     />
//   );
// }

// function AboutPage({
//   imageData = DEFAULT_IMAGE_DATA,
//   contentData = DEFAULT_CONTENT_DATA,
//   blockData = DEFAULT_BLOCK_DATA,
//   featureData = DEFAULT_FEATURE_DATA,
// }: {
//   imageData?: AboutCompanyImageData | null;
//   contentData?: AboutCompanyContentData | null;
//   blockData?: AboutCompanyBlockData | null;
//   featureData?: AboutCompanyFeatureData | null;
// }) {
//   const showMainImage = !!imageData?.image;
//   const mainImageAlt = (imageData?.image as { alt?: string })?.alt;
// const stickyTop = NAV_HEIGHT_PX + IMG_GAP;
//   const stickyHeight = `calc(100vh - ${NAV_HEIGHT_PX + IMG_GAP * 2}px)`;
//   const renderMainPortrait = (className: string) =>
//     showMainImage ? (
//       <SanityImage
//         source={imageData!.image}
//         alt={mainImageAlt}
//         className={className}
//         width={900}
//         height={1200}
//         priority
//       />
//     ) : null;

//   if (!imageData && !contentData && !blockData && !featureData) {
//     return (
//       <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-24 text-center text-neutral-500 font-['Inter']">
//         Kontent hali qo&apos;shilmagan. Adminkada «About Company» hujjatlarini yarating.
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-white text-[#1B1D20]">
//       <div className="px-4 pt-6 pb-16 w-full md:px-6 lg:px-8">
//         {/* Mobil rasm */}
//         {showMainImage && (
//           <div className="lg:hidden w-full rounded-lg overflow-hidden mb-8 h-[50vh] max-h-[420px]">
//             {renderMainPortrait('w-full h-full object-cover')}
//           </div>
//         )}

//         {/* 50% / 50%, o'rtada 30px */}
//         <div className="flex flex-col lg:flex-row gap-[30px]">
//           {/* CHAP — ekran yarmi */}
//           <div className="flex flex-col gap-16 w-full min-w-0 lg:w-1/2 md:gap-20">
//             <AboutCompanyContentBlock data={contentData} />
//             <AboutCompanyBlock data={blockData} />
//             <AboutCompanyFeature data={featureData} />
//           </div>

//           {/* O'NG — ekran yarmi, full width sticky */}
//           {showMainImage && (
//             <div className="hidden w-1/2 lg:block shrink-0">
//               <div
//                 className="overflow-hidden sticky w-full rounded-lg"
//                 style={{
//                   top: stickyTop,
//                   height: stickyHeight,
//                   maxHeight: stickyHeight,
//                 }}
//               >
//                 {renderMainPortrait('w-full h-full object-cover block')}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default React.memo(AboutPage);

import React, { useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../../sanity/client';
import AboutCompanyContentBlock from './AboutCompanyContentBlock';
import type { AboutCompanyContentData } from './AboutCompanyContentBlock';
import AboutCompanyBlock from './AboutCompanyBlock';
import type { AboutCompanyBlockData } from './AboutCompanyBlock';
import type { AboutCompanyFeatureData } from './AboutFeatures';
import AboutCompanyFeature from './AboutFeatures';

import aboutMainImg from '../../assets/home_about_first_img.png';
import aboutContentImg from '../../assets/home_features_img.png';
import block370_1 from '../../assets/Industry_1.png';
import block370_2 from '../../assets/Industry_2.png';
import block350_1 from '../../assets/Industry_3.png';
import block350_2 from '../../assets/Industry_4.png';
import aboutFeatureImg from '../../assets/home_about_second_img.png';

const DEFAULT_IMAGE_DATA: AboutCompanyImageData = {
  image: aboutMainImg,
};

const DEFAULT_CONTENT_DATA: AboutCompanyContentData = {
  image: aboutContentImg,
  title: { ru: 'О компании', uz: 'Kompaniya haqida', eng: 'About Company' },
  description: {
    ru: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    uz: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    eng: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  },
  phone: '+998 90 123 45 67',
  email: 'info@ekeler.uz',
  location: { ru: 'Ташкент, Узбекистан', uz: "Toshkent, O'zbekiston", eng: 'Tashkent, Uzbekistan' },
};
const NAV_HEIGHT_PX = 65;
const IMG_GAP = 30;
const DEFAULT_BLOCK_DATA: AboutCompanyBlockData = {
  title1: { ru: 'Миссия', uz: 'Missiya', eng: 'Mission' },
  description1: {
    ru: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.',
    uz: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.',
    eng: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.',
  },
  title2: { ru: 'Видение', uz: 'Videniye', eng: 'Vision' },
  description2: {
    ru: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.',
    uz: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.',
    eng: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor.',
  },
  bodyText: {
    ru: 'Lorem ipsum dolor sit amet consectetur.',
    uz: 'Lorem ipsum dolor sit amet consectetur.',
    eng: 'Lorem ipsum dolor sit amet consectetur.',
  },
  image370_1: block370_1,
  image370_2: block370_2,
  image350_1: block350_1,
  image350_2: block350_2,
};

const DEFAULT_FEATURE_DATA: AboutCompanyFeatureData = {
  image: aboutFeatureImg,
  title: { ru: 'Наши ценности', uz: 'Bizning qadriyatlar', eng: 'Our Values' },
  description: {
    ru: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    uz: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    eng: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

interface AboutCompanyImageData {
  image?: unknown;
}

function SanityImage({
  source,
  alt,
  className,
  width,
  height,
  priority = false,
}: {
  source: unknown;
  alt?: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  const url = getImageUrl(source, { width, height });
  if (!url) return null;
  return (
    <img
      src={url}
      alt={alt || ''}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'low'}
    />
  );
}

/**
 * useStickyColumn — CSS `position: sticky`ga BOG'LIQ EMAS.
 * -----------------------------------------------------------------------
 * Sabab: `position: sticky` har doim "eng yaqin scroll container" ota
 * elementga bog'liq ishlaydi — agar biror ajdodda (App.tsx, Navigation,
 * yoki boshqa joyda) `overflow` (hidden/auto/scroll/clip) yoki shunga
 * o'xshash xossa bo'lsa, sticky umuman ishlamay qoladi va buni topish
 * qiyin bo'lishi mumkin.
 *
 * Bu hook o'rniga scroll holatini o'zi window.scroll orqali kuzatadi va
 * kerakli paytda elementga to'g'ridan-to'g'ri `position: fixed` beradi.
 * `position: fixed` faqat `transform`/`filter`/`perspective`/`contain`
 * xossali ajdodlarga bog'liq bo'ladi (bular odatda kamdan-kam uchraydi),
 * `overflow`ga esa umuman bog'liq emas — shuning uchun ancha ishonchli.
 *
 * Uch holat:
 *  1) Hali yetib kelmagan  -> oddiy oqimda, lekin balandligi belgilangan
 *  2) O'rtada               -> position: fixed (ekranga "yopishadi")
 *  3) Ustun tugadi           -> position: absolute, ustun tagida to'xtaydi
 */
function useStickyColumn(topOffset: number, bottomGap: number) {
  const containerRef = useRef<HTMLDivElement>(null); // ikki ustunni o'rab turgan qator
  const columnRef = useRef<HTMLDivElement>(null); // o'ng ustun (joy va kenglikni belgilaydi)
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const container = containerRef.current;
      const column = columnRef.current;
      if (!container || !column) return;

      if (window.innerWidth < 1024) {
        setStyle((prev) => (Object.keys(prev).length ? {} : prev));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const stickyHeightPx = Math.max(200, window.innerHeight - topOffset - bottomGap);

      let next: React.CSSProperties;

      if (containerRect.top > topOffset) {
        // Hali sticky nuqtaga yetib kelmadi — oddiy holatda, lekin bir xil balandlikda
        next = { height: stickyHeightPx };
      } else if (containerRect.bottom < topOffset + stickyHeightPx) {
        // Chap ustun tugadi — rasm pastda to'xtaydi, keyingi bo'limni bosib o'tmaydi
        next = {
          position: 'absolute',
          bottom: 0,
          top: 'auto',
          left: 0,
          width: '100%',
          height: stickyHeightPx,
        };
      } else {
        // O'rtada — ekranga "yopishib" turadi
        next = {
          position: 'fixed',
          top: topOffset,
          left: columnRect.left,
          width: columnRect.width,
          height: stickyHeightPx,
        };
      }

      setStyle((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [topOffset, bottomGap]);

  return { containerRef, columnRef, style };
}

function AboutPage({
  imageData = DEFAULT_IMAGE_DATA,
  contentData = DEFAULT_CONTENT_DATA,
  blockData = DEFAULT_BLOCK_DATA,
  featureData = DEFAULT_FEATURE_DATA,
}: {
  imageData?: AboutCompanyImageData | null;
  contentData?: AboutCompanyContentData | null;
  blockData?: AboutCompanyBlockData | null;
  featureData?: AboutCompanyFeatureData | null;
}) {
  const showMainImage = !!imageData?.image;
  const mainImageAlt = (imageData?.image as { alt?: string })?.alt;
  const stickyTop = NAV_HEIGHT_PX + IMG_GAP;

  const { containerRef, columnRef, style: stickyStyle } = useStickyColumn(stickyTop, IMG_GAP);

  const renderMainPortrait = (className: string) =>
    showMainImage ? (
      <SanityImage
        source={imageData!.image}
        alt={mainImageAlt}
        className={className}
        width={900}
        height={1200}
        priority
      />
    ) : null;

  if (!imageData && !contentData && !blockData && !featureData) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-24 text-center text-neutral-500 font-['Inter']">
        Kontent hali qo&apos;shilmagan. Adminkada «About Company» hujjatlarini yarating.
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-[#1B1D20]">
      <div className="px-4 pt-6 pb-16 w-full md:px-6 lg:px-8">
        {/* Mobil rasm */}
        {showMainImage && (
          <div className="lg:hidden w-full rounded-lg overflow-hidden mb-8 h-[50vh] max-h-[420px]">
            {renderMainPortrait('w-full h-full object-cover')}
          </div>
        )}

        {/* 50% / 50%, o'rtada 30px */}
        <div ref={containerRef} className="flex relative flex-col gap-[30px] lg:flex-row">
          {/* CHAP — ekran yarmi */}
          <div className="flex flex-col gap-16 w-full min-w-0 lg:w-1/2 md:gap-20">
            <AboutCompanyContentBlock data={contentData} />
            <AboutCompanyBlock data={blockData} />
            <AboutCompanyFeature data={featureData} />
          </div>

          {/* O'NG — ekran yarmi, JS-based sticky rasm */}
          {showMainImage && (
            <div ref={columnRef} className="hidden relative w-1/2 lg:block shrink-0">
              <div
                className="overflow-hidden rounded-lg"
                style={stickyStyle}
              >
                {renderMainPortrait('w-full h-full object-cover block')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AboutPage);