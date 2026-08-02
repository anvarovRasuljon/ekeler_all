// // import { useLanguage } from '../../context/LanguageContext';
// // import { getImageUrl, hasSanityImage } from '../../sanity/client';
// // import { Phone, Mail, MapPin } from 'lucide-react';

// // export interface AboutCompanyContentData {
// //   image?: unknown;
// //   title?: Record<string, string>;
// //   description?: Record<string, string>;
// //   phone?: string;
// //   email?: string;
// //   location?: Record<string, string>;
// // }

// // function SanityImage({
// //   source,
// //   alt,
// //   className,
// //   width,
// //   height,
// // }: {
// //   source: unknown;
// //   alt?: string;
// //   className?: string;
// //   width: number;
// //   height: number;
// // }) {
// //   const url = getImageUrl(source, { width, height });
// //   if (!url) return null;
// //   return <img src={url} alt={alt || ''} className={className} />;
// // }

// // export default function AboutCompanyContentBlock({
// //   data,
// // }: {
// //   data: AboutCompanyContentData | null;
// // }) {
// //   const { t } = useLanguage();

// //   if (!data) {
// //     return (
// //       <div className="text-neutral-500 font-['Inter'] text-sm">
// //         Kontent hali qo&apos;shilmagan.
// //       </div>
// //     );
// //   }

// //   const showImage = hasSanityImage(data.image);
// //   const imageAlt = (data.image as { alt?: string })?.alt;

// //   return (
// //     <div className="flex flex-col gap-8 md:gap-10">
// //       {/* Rasm */}
// //       {showImage && (
// //         <div className="w-full max-w-[519px] h-[180px] md:h-[220px] rounded-lg overflow-hidden">
// //           <SanityImage
// //             source={data.image}
// //             alt={imageAlt}
// //             className="object-cover w-full h-full"
// //             width={519}
// //             height={220}
// //           />
// //         </div>
// //       )}

// //       {/* Title */}
// //       {data.title && (
// //         <h1 className="font-['Manrope'] font-normal text-[32px] md:text-[40px] leading-[1.2] md:leading-[48px] text-[#1B1D20]">
// //           {t(data.title)}
// //         </h1>
// //       )}

// //       {/* Description */}
// //       {data.description && (
// //         <p className="font-['Inter'] text-[15px] md:text-[16px] leading-[1.7] text-[#1B1D20]/whitespace-pre-line">
// //           {t(data.description)}
// //         </p>
// //       )}

// //       {/* Contact */}
// //       <div className="flex flex-col md:flex-row md:flex-wrap md:items-start gap-4 md:gap-x-8 md:gap-y-3 font-['Inter'] text-[14px] leading-[22px] text-[#1B1D20]">
// //         {data.phone && (
// //           <a
// //             href={`tel:${data.phone.replace(/\s/g, '')}`}
// //             className="flex items-center gap-2 hover:text-[#E88029] transition shrink-0"
// //           >
// //             <Phone size={14} strokeWidth={1.5} />
// //             <span>{data.phone}</span>
// //           </a>
// //         )}

// //         {data.email && (
// //           <a
// //             href={`mailto:${data.email}`}
// //             className="flex items-center gap-2 hover:text-[#E88029] transition shrink-0"
// //           >
// //             <Mail size={14} strokeWidth={1.5} />
// //             <span>{data.email}</span>
// //           </a>
// //         )}

// //         {data.location && (
// //           <div className="flex items-start gap-2 md:max-w-[240px]">
// //             <MapPin size={14} strokeWidth={1.5} className="mt-1 shrink-0" />
// //             <span className="whitespace-pre-line text-[13px] leading-[20px]">
// //               {t(data.location)}
// //             </span>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import { useLanguage } from '../../context/LanguageContext';
// import { getImageUrl, hasSanityImage } from '../../sanity/client';
// import { Phone, Mail, MapPin } from 'lucide-react';

// export interface AboutCompanyContentData {
//   image?: unknown;
//   title?: Record<string, string>;
//   description?: Record<string, string>;
//   phone?: string;
//   email?: string;
//   location?: Record<string, string>;
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

// export default function AboutCompanyContentBlock({
//   data,
// }: {
//   data: AboutCompanyContentData | null;
// }) {
//   const { t } = useLanguage();

//   if (!data) {
//     return (
//       <div className="text-neutral-500 font-['Inter'] text-sm">
//         Kontent hali qo&apos;shilmagan.
//       </div>
//     );
//   }

//   const showImage = hasSanityImage(data.image);
//   const imageAlt = (data.image as { alt?: string })?.alt;

//   return (
//     <div className="flex flex-col gap-8 md:gap-10">
//       {/* Title + Image — yonma-yon, space-between, align-start */}
//       <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
//         {data.title && (
//           <h1 className="font-['Manrope'] font-normal text-[32px] md:text-[40px] leading-[1.2] md:leading-[48px] text-[#1B1D20] max-w-[360px]">
//             {t(data.title)}
//           </h1>
//         )}

//         {showImage && (
//           <div className="w-full sm:w-[500px] h-[200px] rounded-lg overflow-hidden shrink-0">
//             <SanityImage
//               source={data.image}
//               alt={imageAlt}
//               className="object-cover w-full h-full"
//               width={500}
//               height={200}
//             />
//           </div>
//         )}
//       </div>

//       {/* Pastki blok: description → phone/email → location */}
//       <div className="flex flex-col items-start gap-5 md:gap-6">
//         {data.description && (
//           <p className="font-['Inter'] text-[15px] md:text-[16px] leading-[1.7] text-[#1B1D20] whitespace-pre-line max-w-[640px]">
//             {t(data.description)}
//           </p>
//         )}

//         {/* Tel + Email — yonma-yon */}
//         {(data.phone || data.email) && (
//           <div className="flex flex-wrap items-center gap-4 md:gap-8 font-['Inter'] text-[14px] leading-[22px] text-[#1B1D20]">
//             {data.phone && (
//               <a
//                 href={`tel:${data.phone.replace(/\s/g, '')}`}
//                 className="flex items-center gap-2 hover:text-[#E88029] transition shrink-0"
//               >
//                 <Phone size={14} strokeWidth={1.5} />
//                 <span>{data.phone}</span>
//               </a>
//             )}

//             {data.email && (
//               <a
//                 href={`mailto:${data.email}`}
//                 className="flex items-center gap-2 hover:text-[#E88029] transition shrink-0"
//               >
//                 <Mail size={14} strokeWidth={1.5} />
//                 <span>{data.email}</span>
//               </a>
//             )}
//           </div>
//         )}

//         {/* Location — pastida */}
//         {data.location && (
//           <div className="flex items-start gap-2 max-w-[320px] font-['Inter'] text-[#1B1D20]">
//             <MapPin size={14} strokeWidth={1.5} className="mt-1 shrink-0" />
//             <span className="whitespace-pre-line text-[13px] leading-[20px]">
//               {t(data.location)}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';
import { Phone, Mail, MapPin } from 'lucide-react';

export interface AboutCompanyContentData {
  image?: unknown;
  title?: Record<string, string>;
  description?: Record<string, string>;
  phone?: string;
  email?: string;
  location?: Record<string, string>;
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

export default function AboutCompanyContentBlock({
  data,
}: {
  data: AboutCompanyContentData | null;
}) {
  const { t } = useLanguage();

  if (!data) {
    return (
      <div className="text-neutral-500 font-['Inter'] text-sm">
        Kontent hali qo&apos;shilmagan.
      </div>
    );
  }

  const showImage = hasSanityImage(data.image);
  const imageAlt = (data.image as { alt?: string })?.alt;

  return (
    <div
      className="flex flex-col justify-between w-full"
      style={{ minHeight: 670 }}
    >
      {/* TEPADA: Title + Image */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        {data.title && (
          <h1
            className="font-['Manrope'] font-normal text-[10px] leading-[18px] text-[#1B1D20] uppercase max-w-[360px]"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t(data.title)}
          </h1>
        )}

        {showImage && (
          <div className="w-full sm:w-[500px] h-[200px] rounded-lg overflow-hidden shrink-0">
            <SanityImage
              source={data.image}
              alt={imageAlt}
              className="object-cover w-full h-full"
              width={500}
              height={200}
            />
          </div>
        )}
      </div>

      {/* PASTDA: Description → Tel/Email → Location */}
      <div className="flex flex-col items-start gap-5 md:gap-6">
        {data.description && (
          <p className="font-['Manrope'] font-normal text-[40px] leading-[48px] text-[#1B1D20] max-w-[450px] whitespace-pre-line">
            {t(data.description)}
          </p>
        )}

        {(data.phone || data.email) && (
          <div className="flex flex-wrap items-center gap-4 md:gap-8 font-['Manrope'] font-normal text-[14px] leading-[18px] text-[#1B1D20]">
            {data.phone && (
              <a
                href={`tel:${data.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:text-[#E88029] transition shrink-0"
              >
                <Phone size={14} strokeWidth={1.5} />
                <span>{data.phone}</span>
              </a>
            )}

            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 hover:text-[#E88029] transition shrink-0"
              >
                <Mail size={14} strokeWidth={1.5} />
                <span>{data.email}</span>
              </a>
            )}
          </div>
        )}

        {data.location && (
          <div className="flex items-start gap-2 max-w-[250px] font-['Manrope'] font-normal text-[14px] leading-[18px] text-[#1B1D20] mt-1">
            <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            <span className="whitespace-pre-line">
              {t(data.location)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}