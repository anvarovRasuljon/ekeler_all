// import { getImageUrl, hasSanityImage } from '../../sanity/client';
// import AboutCompanyContentBlock from './AboutCompanyContentBlock';
// import type { AboutCompanyContentData } from './AboutCompanyContentBlock';
// import AboutCompanyBlock from './AboutCompanyBlock';
// import type { AboutCompanyBlockData } from './AboutCompanyBlock';
// import type { AboutCompanyFeatureData } from './AboutFeatures';
// import AboutCompanyFeature from './AboutFeatures';

// const NAV_HEIGHT_PX = 65;
// const IMG_GAP = 30; // rasm atrofi

// interface AboutCompanyImageData {
//   image?: unknown;
// }

// function SanityImage({
//   source,
//   alt,
//   className,
//   width,
//   height,
// }: {
//   source: unknown;
//   alt?: string;
//   className?: string;
//   width: number;
//   height: number;
// }) {
//   const url = getImageUrl(source, { width, height });
//   if (!url) return null;
//   return <img src={url} alt={alt || ''} className={className} />;
// }

// export default function AboutPage({
//   imageData,
//   contentData,
//   blockData,
//   featureData,
// }: {
//   imageData: AboutCompanyImageData | null;
//   contentData: AboutCompanyContentData | null;
//   blockData: AboutCompanyBlockData | null;
//   featureData: AboutCompanyFeatureData | null;
// }) {
//   const showMainImage = hasSanityImage(imageData?.image);
//   const mainImageAlt = (imageData?.image as { alt?: string })?.alt;

//   const renderMainPortrait = (className: string) =>
//     showMainImage ? (
//       <SanityImage
//         source={imageData!.image}
//         alt={mainImageAlt}
//         className={className}
//         width={600}
//         height={800}
//       />
//     ) : null;

//   if (!imageData && !contentData && !blockData && !featureData) {
//     return (
//       <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-24 text-center text-neutral-500 font-['Inter']">
//         Kontent hali qo&apos;shilmagan. Adminkada «About Company» hujjatlarini yarating.
//       </div>
//     );
//   }

//   // sticky top = nav + yuqori bo'sh joy
//   const stickyTop = NAV_HEIGHT_PX + IMG_GAP;
//   // rasm balandligi = ekran - nav - yuqori gap - pastki gap
//   const stickyHeight = `calc(100vh - ${NAV_HEIGHT_PX + IMG_GAP * 2}px)`;

//   return (
//     <div className="w-full bg-white text-[#1B1D20]">
//       <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-16">
//         {/* Mobil rasm */}
//         {showMainImage && (
//           <div className="lg:hidden w-full rounded-lg overflow-hidden mb-8 h-[50vh] max-h-[420px]">
//             {renderMainPortrait('w-full h-full object-cover')}
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-[30px]">
//           {/* CHAP — scroll */}
//           <div className="flex flex-col flex-1 min-w-0 gap-16 md:gap-20">
//             <AboutCompanyContentBlock data={contentData} />
//             <AboutCompanyBlock data={blockData} />
//             <AboutCompanyFeature data={featureData} />
//           </div>

//           {/* O'NG — sticky, ekrandan katta bo'lmaydi */}
//           {showMainImage && (
//             <div
//               className="hidden lg:block shrink-0"
//               style={{ width: 'min(600px, 38vw)' }}
//             >
//               <div
//                 className="sticky overflow-hidden rounded-lg"
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

import { getImageUrl, hasSanityImage } from '../../sanity/client';
import AboutCompanyContentBlock from './AboutCompanyContentBlock';
import type { AboutCompanyContentData } from './AboutCompanyContentBlock';
import AboutCompanyBlock from './AboutCompanyBlock';
import type { AboutCompanyBlockData } from './AboutCompanyBlock';
import type { AboutCompanyFeatureData } from './AboutFeatures';
import AboutCompanyFeature from './AboutFeatures';

const NAV_HEIGHT_PX = 65;
const IMG_GAP = 30;

interface AboutCompanyImageData {
  image?: unknown;
}

function SanityImage({
  source,
  alt,
  className,
  width,
  height,
}: {
  source: unknown;
  alt?: string;
  className?: string;
  width: number;
  height: number;
}) {
  const url = getImageUrl(source, { width, height });
  if (!url) return null;
  return <img src={url} alt={alt || ''} className={className} />;
}

export default function AboutPage({
  imageData,
  contentData,
  blockData,
  featureData,
}: {
  imageData: AboutCompanyImageData | null;
  contentData: AboutCompanyContentData | null;
  blockData: AboutCompanyBlockData | null;
  featureData: AboutCompanyFeatureData | null;
}) {
  const showMainImage = hasSanityImage(imageData?.image);
  const mainImageAlt = (imageData?.image as { alt?: string })?.alt;

  const renderMainPortrait = (className: string) =>
    showMainImage ? (
      <SanityImage
        source={imageData!.image}
        alt={mainImageAlt}
        className={className}
        width={900}
        height={1200}
      />
    ) : null;

  if (!imageData && !contentData && !blockData && !featureData) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-24 text-center text-neutral-500 font-['Inter']">
        Kontent hali qo&apos;shilmagan. Adminkada «About Company» hujjatlarini yarating.
      </div>
    );
  }

  const stickyTop = NAV_HEIGHT_PX + IMG_GAP;
  const stickyHeight = `calc(100vh - ${NAV_HEIGHT_PX + IMG_GAP * 2}px)`;

  return (
    <div className="w-full bg-white text-[#1B1D20]">
      <div className="w-full px-4 pt-6 pb-16 md:px-6 lg:px-8">
        {/* Mobil rasm */}
        {showMainImage && (
          <div className="lg:hidden w-full rounded-lg overflow-hidden mb-8 h-[50vh] max-h-[420px]">
            {renderMainPortrait('w-full h-full object-cover')}
          </div>
        )}

        {/* 50% / 50%, o'rtada 30px */}
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* CHAP — ekran yarmi */}
          <div className="flex flex-col w-full min-w-0 gap-16 lg:w-1/2 md:gap-20">
            <AboutCompanyContentBlock data={contentData} />
            <AboutCompanyBlock data={blockData} />
            <AboutCompanyFeature data={featureData} />
          </div>

          {/* O'NG — ekran yarmi, full width sticky */}
          {showMainImage && (
            <div className="hidden w-1/2 lg:block shrink-0">
              <div
                className="sticky w-full overflow-hidden rounded-lg"
                style={{
                  top: stickyTop,
                  height: stickyHeight,
                  maxHeight: stickyHeight,
                }}
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