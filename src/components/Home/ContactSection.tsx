// // import AnimatedImage from './AnimatedImage';
// // import React, { useMemo } from "react";
// // import { useLanguage } from "../../context/LanguageContext";
// // import { translations } from "../../locales/translations";
// // import SmsIco from "../../assets/sms.svg";
// // import Call from "../../assets/call.svg";
// // import LocationIcon from "../../assets/location.svg";
// // import imageUrl from "../../assets/Home_Contact_img.webp";
// // import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

// // interface ContactSectionProps {
// //   eyebrow?: any;
// //   shortDescription?: any;
// //   miniDescription?: any;
// //   twoColorMode?: boolean;
// //   description?: any;
// //   longDescription?: any;
// //   descriptionPart1?: any;
// //   shortDescriptionHighlight?: any;
// //   descriptionHighlight?: any;
// //   descriptionPart2?: any;
// //   phone?: any;
// //   email?: any;
// //   mapText?: any;
// //   image?: any;
// // }

// // const ContactSection: React.FC<ContactSectionProps> = ({
// //   eyebrow = translations.home.contactSection.eyebrow,
// //   shortDescription = translations.home.contactSection.shortDescription,
// //   shortDescriptionHighlight = translations.home.contactSection.shortDescriptionHighlight,
// //   description = translations.home.contactSection.description,
// //   longDescription,
// //   phone = "+998 90 808-87-89",
// //   email = "info@ekeler.uz",
// //   mapText = translations.home.contactSection.mapText,
// // }) => {
// //   const { t } = useLanguage();
// //   const eyebrowText = useMemo(() => (eyebrow ? t(eyebrow) : null), [t, eyebrow]);
// //   const shortText = useMemo(() => (shortDescription ? t(shortDescription) : null), [t, shortDescription]);
// //   const displayText = useMemo(() => (description || longDescription), [description, longDescription]);
// //   const mapTextValue = useMemo(() => (mapText ? t(mapText) : null), [t, mapText]);

// //   const shortHighlight = useMemo(() => (shortDescriptionHighlight ? String(t(shortDescriptionHighlight) || '') : ''), [t, shortDescriptionHighlight]);
// //   const { shortBefore, shortAfter } = useMemo(() => {
// //     if (!shortText) return { shortBefore: "", shortAfter: "" };
// //     const index = String(shortText).indexOf(shortHighlight);
// //     if (index === -1) return { shortBefore: String(shortText), shortAfter: "" };
// //     return {
// //       shortBefore: String(shortText).slice(0, index),
// //       shortAfter: String(shortText).slice(index),
// //     };
// //   }, [shortText, shortHighlight]);

// //   const sectionReveal = useRevealOnScroll<HTMLDivElement>();

// //   const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
// //     opacity: visible ? 1 : 0,
// //     transform: visible ? "translate3d(0,0,0)" : "translate3d(0,28px,0)",
// //     transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
// //     willChange: "transform, opacity",
// //     backfaceVisibility: "hidden",
// //     WebkitBackfaceVisibility: "hidden",
// //   });

// //   if (!shortDescription && !displayText && !phone && !email) {
// //     return null;
// //   }

// //   return (
// //     <div ref={sectionReveal.ref} id="contact" className="w-full bg-white">
// //   <div className="hidden border-t border-[#ECECEC] md:block md:mb-20" />
// //   <div className="grid grid-cols-1 gap-8 px-4 mx-auto max-w-[1540px] md:grid-cols-2 md:gap-12 md:px-6 lg:px-8">
// //     {/* Left column - image */}
// //         {imageUrl && (
// //           <div
// //             style={revealStyle(sectionReveal.visible, 0)}
// //             className="hidden overflow-hidden rounded-xl md:block md:rounded-2xl"
// //           >
// //             <AnimatedImage
// //               src={imageUrl}
// //               alt="Contact section"
// //               width={600}
// //               height={400}
// //               loading="lazy"
// //               decoding="async"
// //               fetchPriority="low"
// //               className="h-auto max-h-[700px] w-full rounded-xl object-cover md:max-h-[700px] md:rounded-2xl"
// //             />
// //           </div>
// //         )}

// //         {/* Right column */}
// //         <div className="flex flex-col justify-between h-full pb-2 md:pb-10">
// //           {/* Top block */}
// //           <div>
// //             {eyebrowText && (
// //               <div
// //                 style={revealStyle(sectionReveal.visible, 0)}
// //                 className="mb-5 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
// //               >
// //                 {eyebrowText}
// //               </div>
// //             )}

// //             {/* Title — mobile da img dagi kabi */}
// //             {shortText && (
// //               <p
// //                 style={revealStyle(sectionReveal.visible, 120)}
// //                 className="w-full max-w-[400px] break-words font-inter font-normal text-[28px] leading-[36px] text-black md:text-[clamp(24px,1.5rem+0.8vw,40px)] md:leading-[clamp(30px,2rem+1vw,48px)]"
// //               >
// //                 {shortBefore && <span className="text-black">{shortBefore}</span>}
// //                 {shortAfter && <span className="text-[#E88029]">{shortAfter}</span>}
// //               </p>
// //             )}
// //           </div>

// //           {/* Bottom block */}
// //           <div className="mt-2 md:mt-8">
// //             {/* Description — mobile da kichikroq va soft rang */}
// //             {displayText && (
// //               <p
// //                 style={revealStyle(sectionReveal.visible, 220)}
// //                 className="mb-3 w-full max-w-[500px] break-words font-inter font-normal text-[15px] leading-[24px] text-[#6B7280] md:mb-8 md:text-[clamp(18px,1.1rem+0.3vw,24px)] md:leading-[clamp(26px,1.5rem+0.4vw,32px)] md:text-[#1B1D20] "
// //               >
// //                 {t(displayText)}
// //               </p>
// //             )}

// //             <div className="mb-3 space-y-4 md:mb-6">
// //               <div className="flex flex-wrap items-center gap-6">
// //                 {phone && (
// //                   <a href={`tel:${phone}`} style={revealStyle(sectionReveal.visible, 320)} className="flex items-center gap-4 min-h-[44px] cursor-pointer">
// //                     <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
// //                       <AnimatedImage src={Call} alt="" />
// //                     </div>
// //                     <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
// //                       {phone}
// //                     </span>
// //                   </a>
// //                 )}

// //                 {email && (
// //                   <a href={`mailto:${email}`} style={revealStyle(sectionReveal.visible, 400)} className="flex items-center gap-4 min-h-[44px] cursor-pointer">
// //                     <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
// //                       <AnimatedImage src={SmsIco} alt="" />
// //                     </div>
// //                     <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
// //                       {email}
// //                     </span>
// //                   </a>
// //                 )}
// //               </div>
// //             </div>

// //             {mapText && (
// //               <a
// //                 href={`https://maps.google.com/?q=${encodeURIComponent(String(mapTextValue || mapText))}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 style={revealStyle(sectionReveal.visible, 480)}
// //                 className="flex items-center gap-4 min-h-[44px] cursor-pointer"
// //               >
// //                 <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
// //                   <AnimatedImage src={LocationIcon} alt="" />
// //                 </div>
// //                 <span className="w-full max-w-[240px] break-words font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
// //                   {mapTextValue}
// //                 </span>
// //               </a>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //   <div className="hidden border-b border-[#ECECEC] md:block mt-6 md:mt-20" />
// //     </div>
// //   );
// // };

// // export default React.memo(ContactSection);


// import AnimatedImage from './AnimatedImage';
// import React, { useMemo } from "react";
// import { useLanguage } from "../../context/LanguageContext";
// import { translations } from "../../locales/translations";
// import SmsIco from "../../assets/sms.svg";
// import Call from "../../assets/call.svg";
// import LocationIcon from "../../assets/location.svg";
// import imageUrl from "../../assets/Home_Contact_img.webp";
// import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

// interface ContactSectionProps {
//   eyebrow?: any;
//   shortDescription?: any;
//   miniDescription?: any;
//   twoColorMode?: boolean;
//   description?: any;
//   longDescription?: any;
//   descriptionPart1?: any;
//   shortDescriptionHighlight?: any;
//   descriptionHighlight?: any;
//   descriptionPart2?: any;
//   phone?: any;
//   email?: any;
//   mapText?: any;
//   image?: any;
// }

// const ContactSection: React.FC<ContactSectionProps> = ({
//   eyebrow = translations.home.contactSection.eyebrow,
//   shortDescription = translations.home.contactSection.shortDescription,
//   shortDescriptionHighlight = translations.home.contactSection.shortDescriptionHighlight,
//   description = translations.home.contactSection.description,
//   longDescription,
//   phone = "+998 90 808-87-89",
//   email = "info@ekeler.uz",
//   mapText = translations.home.contactSection.mapText,
// }) => {
//   const { t } = useLanguage();
//   const eyebrowText = useMemo(() => (eyebrow ? t(eyebrow) : null), [t, eyebrow]);
//   const shortText = useMemo(() => (shortDescription ? t(shortDescription) : null), [t, shortDescription]);
//   const displayText = useMemo(() => (description || longDescription), [description, longDescription]);
//   const mapTextValue = useMemo(() => (mapText ? t(mapText) : null), [t, mapText]);

//   // displayText matnini so'zlarga bo'lib olamiz
//   const translatedDisplayText = useMemo(() => (displayText ? String(t(displayText) || '') : ''), [t, displayText]);
//   const displayWords = useMemo(() => translatedDisplayText.split(' '), [translatedDisplayText]);

//   const shortHighlight = useMemo(() => (shortDescriptionHighlight ? String(t(shortDescriptionHighlight) || '') : ''), [t, shortDescriptionHighlight]);
//   const { shortBefore, shortAfter } = useMemo(() => {
//     if (!shortText) return { shortBefore: "", shortAfter: "" };
//     const index = String(shortText).indexOf(shortHighlight);
//     if (index === -1) return { shortBefore: String(shortText), shortAfter: "" };
//     return {
//       shortBefore: String(shortText).slice(0, index),
//       shortAfter: String(shortText).slice(index),
//     };
//   }, [shortText, shortHighlight]);

//   const sectionReveal = useRevealOnScroll<HTMLDivElement>();

//   const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
//     opacity: visible ? 1 : 0,
//     transform: visible ? "translate3d(0,0,0)" : "translate3d(0,28px,0)",
//     transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
//     willChange: "transform, opacity",
//     backfaceVisibility: "hidden",
//     WebkitBackfaceVisibility: "hidden",
//   });

//   if (!shortDescription && !displayText && !phone && !email) {
//     return null;
//   }

//   return (
//     <div ref={sectionReveal.ref} id="contact" className="w-full bg-white">
//       <div className="hidden border-t border-[#ECECEC] md:block md:mb-20" />
//       <div className="grid grid-cols-1 gap-8 px-4 mx-auto max-w-[1540px] md:grid-cols-2 md:gap-12 md:px-6 lg:px-8">
//         {/* Left column - image */}
//         {imageUrl && (
//           <div
//             style={revealStyle(sectionReveal.visible, 0)}
//             className="hidden overflow-hidden rounded-xl md:block md:rounded-2xl"
//           >
//             <AnimatedImage
//               src={imageUrl}
//               alt="Contact section"
//               width={600}
//               height={400}
//               loading="lazy"
//               decoding="async"
//               fetchPriority="low"
//               className="h-auto max-h-[700px] w-full rounded-xl object-cover md:max-h-[700px] md:rounded-2xl"
//             />
//           </div>
//         )}

//         {/* Right column */}
//         <div className="flex flex-col justify-between h-full pb-2 md:pb-10">
//           {/* Top block */}
//           <div>
//             {eyebrowText && (
//               <div
//                 style={revealStyle(sectionReveal.visible, 0)}
//                 className="mb-5 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
//               >
//                 {eyebrowText}
//               </div>
//             )}

//             {/* Title */}
//             {shortText && (
//               <p
//                 style={revealStyle(sectionReveal.visible, 120)}
//                 className="w-full max-w-[400px] break-words font-inter font-normal text-[28px] leading-[36px] text-black md:text-[clamp(24px,1.5rem+0.8vw,40px)] md:leading-[clamp(30px,2rem+1vw,48px)]"
//               >
//                 {shortBefore && <span className="text-black">{shortBefore}</span>}
//                 {shortAfter && <span className="text-[#E88029]">{shortAfter}</span>}
//               </p>
//             )}
//           </div>

//           {/* Bottom block */}
//           <div className="mt-2 md:mt-8">
//             {/* Description — so'zma-so'z animatsiya */}
//             {displayText && (
//               <p
//                 className="mb-3 w-full max-w-[500px] flex flex-wrap gap-x-[0.3em] font-inter font-normal text-[15px] leading-[24px] text-[#6B7280] md:mb-8 md:text-[clamp(18px,1.1rem+0.3vw,24px)] md:leading-[clamp(26px,1.5rem+0.4vw,32px)] md:text-[#1B1D20] overflow-hidden"
//               >
//                 {displayWords.map((word, index) => (
//                   <span key={index} className="overflow-hidden inline-block py-0.5">
//                     <span 
//                       className="inline-block animate-word-reveal"
//                       style={{
//                         animationPlayState: sectionReveal.visible ? 'running' : 'paused',
//                         animationDelay: `${220 + index * 40}ms`,
//                       }}
//                     >
//                       {word}
//                     </span>
//                   </span>
//                 ))}
//               </p>
//             )}

//             <div className="mb-3 space-y-4 md:mb-6">
//               <div className="flex flex-wrap items-center gap-6">
//                 {phone && (
//                   <a href={`tel:${phone}`} style={revealStyle(sectionReveal.visible, 320)} className="flex items-center gap-4 min-h-[44px] cursor-pointer">
//                     <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
//                       <AnimatedImage src={Call} alt="" />
//                     </div>
//                     <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
//                       {phone}
//                     </span>
//                   </a>
//                 )}

//                 {email && (
//                   <a href={`mailto:${email}`} style={revealStyle(sectionReveal.visible, 400)} className="flex items-center gap-4 min-h-[44px] cursor-pointer">
//                     <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
//                       <AnimatedImage src={SmsIco} alt="" />
//                     </div>
//                     <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
//                       {email}
//                     </span>
//                   </a>
//                 )}
//               </div>
//             </div>

//             {mapText && (
//               <a
//                 href={`https://maps.google.com/?q=${encodeURIComponent(String(mapTextValue || mapText))}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={revealStyle(sectionReveal.visible, 480)}
//                 className="flex items-center gap-4 min-h-[44px] cursor-pointer"
//               >
//                 <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
//                   <AnimatedImage src={LocationIcon} alt="" />
//                 </div>
//                 <span className="w-full max-w-[240px] break-words font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
//                   {mapTextValue}
//                 </span>
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="hidden border-b border-[#ECECEC] md:block mt-6 md:mt-20" />
//     </div>
//   );
// };

// export default React.memo(ContactSection);


import AnimatedImage from './AnimatedImage';
import React, { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translations";
import SmsIco from "../../assets/sms.svg";
import Call from "../../assets/call.svg";
import LocationIcon from "../../assets/location.svg";
import imageUrl from "../../assets/Home_Contact_img.webp";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

interface ContactSectionProps {
  eyebrow?: any;
  shortDescription?: any;
  miniDescription?: any;
  twoColorMode?: boolean;
  description?: any;
  longDescription?: any;
  descriptionPart1?: any;
  shortDescriptionHighlight?: any;
  descriptionHighlight?: any;
  descriptionPart2?: any;
  phone?: any;
  email?: any;
  mapText?: any;
  image?: any;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  eyebrow = translations.home.contactSection.eyebrow,
  shortDescription = translations.home.contactSection.shortDescription,
  shortDescriptionHighlight = translations.home.contactSection.shortDescriptionHighlight,
  description = translations.home.contactSection.description,
  longDescription,
  phone = "+998 90 808-87-89",
  email = "info@ekeler.uz",
  mapText = translations.home.contactSection.mapText,
}) => {
  const { t } = useLanguage();
  const eyebrowText = useMemo(() => (eyebrow ? t(eyebrow) : null), [t, eyebrow]);
  const shortText = useMemo(() => (shortDescription ? t(shortDescription) : null), [t, shortDescription]);
  const displayText = useMemo(() => (description || longDescription), [description, longDescription]);
  const mapTextValue = useMemo(() => (mapText ? t(mapText) : null), [t, mapText]);

  // displayText matnini so'zlarga bo'lib olamiz
  const translatedDisplayText = useMemo(() => (displayText ? String(t(displayText) || '') : ''), [t, displayText]);
  const displayWords = useMemo(() => translatedDisplayText.split(' '), [translatedDisplayText]);

  const shortHighlight = useMemo(() => (shortDescriptionHighlight ? String(t(shortDescriptionHighlight) || '') : ''), [t, shortDescriptionHighlight]);
  const { shortBefore, shortAfter } = useMemo(() => {
    if (!shortText) return { shortBefore: "", shortAfter: "" };
    const index = String(shortText).indexOf(shortHighlight);
    if (index === -1) return { shortBefore: String(shortText), shortAfter: "" };
    return {
      shortBefore: String(shortText).slice(0, index),
      shortAfter: String(shortText).slice(index),
    };
  }, [shortText, shortHighlight]);

  const sectionReveal = useRevealOnScroll<HTMLDivElement>();

  const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : "translate3d(0,28px,0)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  });

  if (!shortDescription && !displayText && !phone && !email) {
    return null;
  }

  return (
    <div ref={sectionReveal.ref} id="contact" className="w-full bg-white">
      <div className="hidden border-t border-[#ECECEC] md:block md:mb-20" />
      <div className="grid grid-cols-1 gap-8 px-4 mx-auto max-w-[1540px] md:grid-cols-2 md:gap-12 md:px-6 lg:px-8">
        {/* Left column - image */}
        {imageUrl && (
          <div
            style={revealStyle(sectionReveal.visible, 0)}
            className="hidden overflow-hidden rounded-xl md:block md:rounded-2xl"
          >
            <AnimatedImage
              src={imageUrl}
              alt="Contact section"
              width={600}
              height={400}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-auto max-h-[700px] w-full rounded-xl object-cover md:max-h-[700px] md:rounded-2xl"
            />
          </div>
        )}

        {/* Right column */}
        <div className="flex flex-col justify-between h-full pb-2 md:pb-10">
          {/* Top block */}
          <div>
            {eyebrowText && (
              <div
                style={revealStyle(sectionReveal.visible, 0)}
                className="mb-5 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
              >
                {eyebrowText}
              </div>
            )}

            {/* Title */}
            {shortText && (
              <p
                style={revealStyle(sectionReveal.visible, 120)}
                className="w-full max-w-[400px] break-words font-inter font-normal text-[28px] leading-[36px] text-black md:text-[clamp(24px,1.5rem+0.8vw,40px)] md:leading-[clamp(30px,2rem+1vw,48px)]"
              >
                {shortBefore && <span className="text-black">{shortBefore}</span>}
                {shortAfter && <span className="text-[#E88029]">{shortAfter}</span>}
              </p>
            )}
          </div>

          {/* Bottom block */}
          <div className="mt-2 md:mt-8">
            {/* Description — so'zma-so'z animatsiya */}
            {displayText && (
              <p
                className="mb-3 w-full max-w-[500px] flex flex-wrap gap-x-[0.3em] font-inter font-normal text-[15px] leading-[24px] text-[#6B7280] md:mb-8 md:text-[clamp(18px,1.1rem+0.3vw,24px)] md:leading-[clamp(26px,1.5rem+0.4vw,32px)] md:text-[#1B1D20] overflow-hidden"
              >
                {displayWords.map((word, index) => (
                  <span key={index} className="overflow-hidden inline-block py-0.5">
                    <span 
                      className="inline-block animate-word-reveal"
                      style={{
                        animationPlayState: sectionReveal.visible ? 'running' : 'paused',
                        animationDelay: `${220 + index * 40}ms`,
                      }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </p>
            )}

            <div className="mb-3 space-y-4 md:mb-6">
              <div className="flex flex-wrap items-center gap-6">
                {phone && (
                  <a href={`tel:${phone}`} style={revealStyle(sectionReveal.visible, 320)} className="group flex items-center gap-4 min-h-[44px] cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
                      <AnimatedImage src={Call} alt="" />
                    </div>
                    {/* Text Slide Hover Animation */}
                    <div className="relative overflow-hidden h-[22px]">
                      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[22px]">
                        <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
                          {phone}
                        </span>
                        <span className="font-inter text-[14px] font-medium leading-[22px] tracking-[-0.02em] text-[#E88029]">
                          {phone}
                        </span>
                      </div>
                    </div>
                  </a>
                )}

                {email && (
                  <a href={`mailto:${email}`} style={revealStyle(sectionReveal.visible, 400)} className="group flex items-center gap-4 min-h-[44px] cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
                      <AnimatedImage src={SmsIco} alt="" />
                    </div>
                    {/* Text Slide Hover Animation */}
                    <div className="relative overflow-hidden h-[22px]">
                      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[22px]">
                        <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
                          {email}
                        </span>
                        <span className="font-inter text-[14px] font-medium leading-[22px] tracking-[-0.02em] text-[#E88029]">
                          {email}
                        </span>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {mapText && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(String(mapTextValue || mapText))}`}
                target="_blank"
                rel="noopener noreferrer"
                style={revealStyle(sectionReveal.visible, 480)}
                className="group flex items-center gap-4 min-h-[44px] cursor-pointer"
              >
                <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-full border border-[#ECECEC]">
                  <AnimatedImage src={LocationIcon} alt="" />
                </div>
                {/* Text Slide Hover Animation */}
                <div className="relative overflow-hidden h-[22px] w-full max-w-[240px]">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[22px]">
                    <span className="whitespace-nowrap font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
                      {mapTextValue}
                    </span>
                    <span className="whitespace-nowrap font-inter text-[14px] font-medium leading-[22px] tracking-[-0.02em] text-[#E88029]">
                      {mapTextValue}
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="hidden border-b border-[#ECECEC] md:block mt-6 md:mt-20" />
    </div>
  );
};

export default React.memo(ContactSection);