// import React from 'react';
// import { useLanguage } from '../../context/LanguageContext';
// import { getImageUrl, hasSanityImage } from '../../sanity/client';
// import { Phone, Mail, MapPin } from 'lucide-react';

// export interface AboutCompanyContentData {
//   image?: unknown;
//   title?: Record<string, string>;
//   description?: Record<string, string>;
//   descriptionHighlight?: Record<string, string>;
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
//   priority = false,
//   reveal = 'bottom-top',
// }: {
//   source: unknown;
//   alt?: string;
//   className?: string;
//   width: number;
//   height: number;
//   priority?: boolean;
//   reveal?: 'top-bottom' | 'bottom-top' | 'left-right' | 'right-left' | 'scale';
// }) {
//   const [loaded, setLoaded] = React.useState(false);
//   const [visible, setVisible] = React.useState(false);
//   const divRef = React.useRef<HTMLDivElement>(null);
//   const url = getImageUrl(source, { width, height });

//   React.useEffect(() => {
//     const el = divRef.current;
//     if (!el) return;
//     if (priority) {
//       setVisible(true);
//       return;
//     }
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.2 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [priority]);

//   const initialClip =
//     reveal === 'bottom-top' ? 'inset(100% 0 0 0)' :
//     reveal === 'left-right' ? 'inset(0 100% 0 0)' :
//     reveal === 'right-left' ? 'inset(0 0 0 100%)' :
//     reveal === 'scale' ? 'inset(0 0 0 0)' :
//     'inset(0 0 100% 0)';

//   if (!url) return null;
//   return (
//     <div ref={divRef} className="w-full h-full">
//       <img
//         src={url}
//         alt={alt || ''}
//         className={`${className} transition-all duration-700 ${loaded ? 'scale-100 blur-0' : 'scale-95 blur-[15px]'}`}
//         style={{ opacity: loaded ? 1 : 0.6, clipPath: visible ? 'inset(0 0 0 0)' : initialClip }}
//         width={width}
//         height={height}
//         loading={priority ? 'eager' : 'lazy'}
//         decoding="async"
//         fetchPriority={priority ? 'high' : 'low'}
//         onLoad={() => setLoaded(true)}
//       />
//     </div>
//   );
// }

// function HighlightedDescription({
//   text,
//   highlight,
//   className,
// }: {
//   text: string;
//   highlight: string;
//   className: string;
// }) {
//   const index = highlight ? text.indexOf(highlight) : -1;
//   if (index === -1) {
//     return <p className={className}>{text}</p>;
//   }
//   const before = text.slice(0, index).trimEnd();
//   const after = text.slice(index);
//   return (
//     <p className={className}>
//       {before && <span className="text-[#1B1D20]">{before}</span>}
//       {before && ' '}
//       <span className="text-[#E88029]">{after}</span>
//     </p>
//   );
// }

// function AboutCompanyContentBlock({
//   data,
//   minHeight = 'calc(100dvh - 100px)',
//   descriptionClassName = "font-['Inter'] font-normal text-[26px] leading-[34px] mb-[30px] sm:text-[20px] sm:leading-[20px] lg:text-[40px] lg:leading-[48px] text-[#1B1D20] max-w-[520px] whitespace-pre-line break-words px-4",
//   stacked = false,
//   children,
// }: {
//   data: AboutCompanyContentData | null;
//   minHeight?: number | string;
//   descriptionClassName?: string;
//   stacked?: boolean;
//   children?: React.ReactNode;
// }) {
//   const { t } = useLanguage();

//   if (!data) {
//     return (
//       <div className="text-neutral-500 font-['Inter'] text-sm">
//         {t({ ru: 'Контент пока не добавлен.', uz: 'Kontent hali qoʻshilmagan.', eng: 'Content not added yet.' })}
//       </div>
//     );
//   }

//   const showImage = hasSanityImage(data.image);
//   const imageAlt = (data.image as { alt?: string })?.alt;

//   return (
//     <div
//       /* Responsive: minHeight faqat lg+ ekranlarda kerak, mobilda katta bo'sh joy qolmasin */
//       className={stacked ? "flex flex-col gap-6 w-full" : "flex w-full flex-col justify-between gap-10 max-lg:!min-h-0 lg:gap-0"}
//       style={stacked ? undefined : { minHeight }}
//     >
//       <div className="flex flex-row items-start justify-between gap-4 sm:gap-6">
//         {data.title && (
//           <h1
//             className="mb-6 rounded-full w-fit border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500 shrink-0"
//             style={{ letterSpacing: '-0.02em' }}
//           >
//             {t(data.title)}
//           </h1>
//         )}

//         {showImage && (
//           <div
//             className="w-[200px] h-[100px] rounded-lg overflow-hidden shrink-0 sm:w-[500px] sm:h-[300px]"
//           >
//             <SanityImage
//               source={data.image}
//               alt={imageAlt}
//               className="object-cover w-full h-full"
//               width={500}
//               height={300}
//               reveal="left-right"
//             />
//           </div>
//         )}
//       </div>

//       {/* PASTDA: Description → Tel/Email → Location */}
//       <div className="flex flex-col gap-4 items-start md:gap-5 w-full sm:w-[480px]">
//         {data.description && (
//           <HighlightedDescription
//             text={t(data.description)}
//             highlight={data.descriptionHighlight ? t(data.descriptionHighlight) : ''}
//             className={descriptionClassName}
//           />
//         )}

//         {children}

//         {(data.phone || data.email) && (
//           <div
//             className="flex flex-wrap items-center gap-4 md:gap-8 font-['Inter'] font-normal text-[14px] leading-[18px] text-[#1B1D20]"
//           >
//             {data.phone && (
//               <a
//                 href={`tel:${data.phone.replace(/\s/g, '')}`}
//                 className="flex items-center gap-2 hover:text-[#E88029] shrink-0"
//               >
//                 <span className="inline-flex items-center justify-center rounded-full border border-[#ECECEC] p-[11px] lg:p-[14px]">
//                   <Phone strokeWidth={1.5} className="w-[9px] h-[9px] lg:w-3 lg:h-3" />
//                 </span>
//                 <span>{data.phone}</span>
//               </a>
//             )}

//             {data.email && (
//               <a
//                 href={`mailto:${data.email}`}
//                 className="flex items-center gap-2 hover:text-[#E88029] shrink-0"
//               >
//                 <span className="inline-flex items-center justify-center rounded-full border border-[#ECECEC] p-[11px] lg:p-[14px]">
//                   <Mail strokeWidth={1.5} className="w-[9px] h-[9px] lg:w-3 lg:h-3" />
//                 </span>
//                 <span>{data.email}</span>
//               </a>
//             )}
//           </div>
//         )}

//         {data.location && (
//           <div
//             className="flex items-center gap-2 max-w-[250px] font-['Inter'] font-normal text-[14px] leading-[18px] text-[#1B1D20]"
//           >
//             <span className="inline-flex items-center justify-center rounded-full border border-[#ECECEC] p-[11px] lg:p-[14px] shrink-0">
//               <MapPin strokeWidth={1.5} className="w-[9px] h-[9px] lg:w-3 lg:h-3" />
//             </span>
//             <span className="whitespace-pre-line">
//               {t(data.location)}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default React.memo(AboutCompanyContentBlock);


import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';
import { Phone, Mail, MapPin } from 'lucide-react';

export interface AboutCompanyContentData {
  image?: unknown;
  title?: Record<string, string>;
  description?: Record<string, string>;
  descriptionHighlight?: Record<string, string>;
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
  priority = false,
  reveal = 'bottom-top',
}: {
  source: unknown;
  alt?: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
  reveal?: 'top-bottom' | 'bottom-top' | 'left-right' | 'right-left' | 'scale';
}) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const url = getImageUrl(source, { width, height });

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    if (priority) {
      setVisible(true);
      return;
    }
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
  }, [priority]);

  const initialClip =
    reveal === 'bottom-top' ? 'inset(100% 0 0 0)' :
    reveal === 'left-right' ? 'inset(0 100% 0 0)' :
    reveal === 'right-left' ? 'inset(0 0 0 100%)' :
    reveal === 'scale' ? 'inset(0 0 0 0)' :
    'inset(0 0 100% 0)';

  if (!url) return null;
  return (
    <div ref={divRef} className="w-full h-full">
      <img
        src={url}
        alt={alt || ''}
        className={`${className} transition-all duration-700 ${loaded ? 'scale-100 blur-0' : 'scale-95 blur-[15px]'}`}
        style={{ opacity: loaded ? 1 : 0.6, clipPath: visible ? 'inset(0 0 0 0)' : initialClip }}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function HighlightedDescription({
  text,
  highlight,
  className,
}: {
  text: string;
  highlight: string;
  className: string;
}) {
  const sectionRef = useRef<HTMLParagraphElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const allWords = useMemo(() => {
    if (!text) return [] as { text: string; colored: boolean }[];
    const idx = highlight ? text.indexOf(highlight) : -1;
    if (idx === -1) {
      return text.trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: false }));
    }
    const before = text.slice(0, idx).trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: false }));
    const after = text.slice(idx).trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w, colored: true }));
    return [...before, ...after];
  }, [text, highlight]);

  return (
    <p ref={sectionRef} className={className}>
      {allWords.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: "0.28em" }}>
          <span
            className={`inline-block will-change-transform ${w.colored ? 'text-[#E88029]' : 'text-[#1B1D20]'}`}
            style={{
              opacity: inView ? 1 : 0,
              filter: inView ? "blur(0px)" : "blur(6px)",
              transform: inView ? "translateY(0%)" : "translateY(115%)",
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms, filter 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms`,
            }}
          >
            {w.text}
          </span>
        </span>
      ))}
    </p>
  );
}

function AboutCompanyContentBlock({
  data,
  minHeight = 'calc(100dvh - 100px)',
  descriptionClassName = "font-['Inter'] font-normal text-[26px] leading-[34px] mb-[30px] sm:text-[20px] sm:leading-[20px] lg:text-[40px] lg:leading-[48px] text-[#1B1D20] max-w-[520px] whitespace-pre-line break-words px-4",
  stacked = false,
  children,
}: {
  data: AboutCompanyContentData | null;
  minHeight?: number | string;
  descriptionClassName?: string;
  stacked?: boolean;
  children?: React.ReactNode;
}) {
  const { t } = useLanguage();

  if (!data) {
    return (
      <div className="text-neutral-500 font-['Inter'] text-sm">
        {t({ ru: 'Контент пока не добавлен.', uz: 'Kontent hali qoʻshilmagan.', eng: 'Content not added yet.' })}
      </div>
    );
  }

  const showImage = hasSanityImage(data.image);
  const imageAlt = (data.image as { alt?: string })?.alt;

  return (
    <div
      className={stacked ? "flex flex-col gap-6 w-full" : "flex w-full flex-col justify-between gap-10 max-lg:!min-h-0 lg:gap-0"}
      style={stacked ? undefined : { minHeight }}
    >
      <div className="flex flex-row items-start justify-between gap-4 sm:gap-6">
        {data.title && (
          <h1
            className="mb-6 rounded-full w-fit border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500 shrink-0"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t(data.title)}
          </h1>
        )}

        {showImage && (
          <div
            className="w-[200px] h-[100px] rounded-lg overflow-hidden shrink-0 sm:w-[500px] sm:h-[300px]"
          >
            <SanityImage
              source={data.image}
              alt={imageAlt}
              className="object-cover w-full h-full"
              width={500}
              height={300}
              reveal="left-right"
            />
          </div>
        )}
      </div>

      {/* PASTDA: Description → Tel/Email → Location */}
      <div className="flex flex-col gap-4 items-start md:gap-5 w-full sm:w-[480px]">
        {data.description && (
          <HighlightedDescription
            text={t(data.description)}
            highlight={data.descriptionHighlight ? t(data.descriptionHighlight) : ''}
            className={descriptionClassName}
          />
        )}

        {children}

        {(data.phone || data.email) && (
          <div
            className="flex flex-wrap items-center gap-4 md:gap-8 font-['Inter'] font-normal text-[14px] leading-[18px] text-[#1B1D20]"
          >
            {data.phone && (
              <a
                href={`tel:${data.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 group shrink-0"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-[#ECECEC] p-[11px] lg:p-[14px] text-neutral-400">
                  <Phone strokeWidth={1.5} className="w-[9px] h-[9px] lg:w-3 lg:h-3" />
                </span>
                <div className="relative overflow-hidden h-[1.5em] leading-[1.5em]">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                    <span className="block whitespace-nowrap text-[#1B1D20] transition-colors duration-300 group-hover:text-[#E88029]">
                      {data.phone}
                    </span>
                    <span className="block whitespace-nowrap text-[#E88029]">
                      {data.phone}
                    </span>
                  </div>
                </div>
              </a>
            )}

            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 group shrink-0"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-[#ECECEC] p-[11px] lg:p-[14px] text-neutral-400">
                  <Mail strokeWidth={1.5} className="w-[9px] h-[9px] lg:w-3 lg:h-3" />
                </span>
                <div className="relative overflow-hidden h-[1.5em] leading-[1.5em]">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                    <span className="block whitespace-nowrap text-[#1B1D20] transition-colors duration-300 group-hover:text-[#E88029]">
                      {data.email}
                    </span>
                    <span className="block whitespace-nowrap text-[#E88029]">
                      {data.email}
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>
        )}

        {data.location && (
          <div
            className="group flex items-center gap-2 max-w-[250px] font-['Inter'] font-normal text-[14px] leading-[18px] text-[#1B1D20] cursor-pointer"
          >
            <span className="inline-flex items-center justify-center rounded-full border border-[#ECECEC] p-[11px] lg:p-[14px] shrink-0 text-neutral-400">
              <MapPin strokeWidth={1.5} className="w-[9px] h-[9px] lg:w-3 lg:h-3" />
            </span>
            <div className="relative overflow-hidden h-[1.5em] leading-[1.5em]">
              <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                <span className="block whitespace-nowrap text-[#1B1D20] transition-colors duration-300 group-hover:text-[#E88029]">
                  {t(data.location)}
                </span>
                <span className="block whitespace-nowrap text-[#E88029]">
                  {t(data.location)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(AboutCompanyContentBlock);