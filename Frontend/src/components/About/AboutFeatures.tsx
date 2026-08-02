// import { useLanguage } from '../../context/LanguageContext';
// import { getImageUrl, hasSanityImage } from '../../sanity/client';

// export interface AboutCompanyFeatureData {
//   image?: unknown;
//   title?: Record<string, string>;
//   description?: Record<string, string>;
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

// export default function AboutCompanyFeature({
//   data,
// }: {
//   data: AboutCompanyFeatureData | null;
// }) {
//   const { t } = useLanguage();

//   if (!data) return null;

//   const showImage = hasSanityImage(data.image);
//   const imageAlt = (data.image as { alt?: string })?.alt;

//   return (
//     <div className="flex flex-col gap-6 md:gap-8">
//       {showImage && (
//         <div className="w-full max-w-[650px] h-[280px] md:h-[360px] rounded-lg overflow-hidden">
//           <SanityImage
//             source={data.image}
//             alt={imageAlt}
//             className="object-cover w-full h-full"
//             width={650}
//             height={360}
//           />
//         </div>
//       )}

//       {data.title && (
//         <h2 className="font-['Manrope'] font-normal text-[28px] md:text-[36px] leading-[1.25] text-[#1B1D20]">
//           {t(data.title)}
//         </h2>
//       )}

//       {data.description && (
//         <p className="font-['Inter'] text-[15px] md:text-[16px] leading-[1.7] text-[#1B1D20] max-w-[650px] whitespace-pre-line">
//           {t(data.description)}
//         </p>
//       )}
//     </div>
//   );
// }

import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';

export interface AboutCompanyFeatureData {
  image?: unknown;
  title?: Record<string, string>;
  description?: Record<string, string>;
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

export default function AboutCompanyFeature({
  data,
}: {
  data: AboutCompanyFeatureData | null;
}) {
  const { t } = useLanguage();

  if (!data) return null;

  const showImage = hasSanityImage(data.image);
  const imageAlt = (data.image as { alt?: string })?.alt;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {showImage && (
        <div className="w-full max-w-[650px] h-[280px] md:h-[360px] rounded-lg overflow-hidden">
          <SanityImage
            source={data.image}
            alt={imageAlt}
            className="object-cover w-full h-full"
            width={650}
            height={360}
          />
        </div>
      )}

      {/* Title + Description — yonma-yon */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {data.title && (
          <h2 className="font-['Manrope'] text-[14px]  leading-[1.25] text-[#1B1D20]  shrink-0">
            {t(data.title)}
          </h2>
        )}

        {data.description && (
          <p className="font-['Inter'] text-[14px]  leading-[1.7] text-[#1B1D20] max-w-[490px] whitespace-pre-line">
            {t(data.description)}
          </p>
        )}
      </div>
    </div>
  );
}