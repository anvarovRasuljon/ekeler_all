// import React, { useMemo } from "react";
// import { useLanguage } from "../../context/LanguageContext";
// import SmsIco from "../../assets/sms.svg"
// import Call from "../../assets/call.svg"
// import LocationIcon from "../../assets/location.svg"
// import imageUrl from "../../assets/Home_Contact_img.png"


// interface ContactSectionProps {
//   eyebrow?: any;
//   shortDescription?: any;
//   miniDescription?: any;
//   twoColorMode?: boolean;
//   description?: any;
//   longDescription?: any;
//   descriptionPart1?: any;
//   descriptionHighlight?: any;
//   descriptionPart2?: any;
//   phone?: any;
//   email?: any;
//   mapText?: any;
//   image?: any;
// }

// const LOREM_10 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";
// const LOREm_15 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
// const ContactSection: React.FC<ContactSectionProps> = ({
//   eyebrow = "Biz haqimizda",
//   shortDescription = LOREM_10,
//   description = LOREm_15,
//   longDescription,
//   phone = "+998 90 123 45 67",
//   email = "info@ekeler.uz",
//   mapText = "Tashkent, Uzbekistan",
// }) => {

//   const { t } = useLanguage();
//   const eyebrowText = useMemo(() => (eyebrow ? t(eyebrow) : null), [t, eyebrow]);
//   const shortText = useMemo(() => (shortDescription ? t(shortDescription) : null), [t, shortDescription]);
//   const displayText = useMemo(() => (description || longDescription), [description, longDescription]);
//   const mapTextValue = useMemo(() => (mapText ? t(mapText) : null), [t, mapText]);

//   const displayDescription = description || longDescription;

//   const shortHighlight = 'adipiscing elit, sed do eiusmod tempor';
//   const { shortBefore, shortAfter } = useMemo(() => {
//     if (!shortText) return { shortBefore: '', shortAfter: '' };
//     const index = String(shortText).indexOf(shortHighlight);
//     if (index === -1) return { shortBefore: String(shortText), shortAfter: '' };
//     return {
//       shortBefore: String(shortText).slice(0, index),
//       shortAfter: String(shortText).slice(index),
//     };
//   }, [shortText]);

//   if (!shortDescription && !displayDescription && !phone && !email) {
//     return null;
//   }


//   return (
//     <div
//       id="contact"
//       className="w-full bg-white"
//     >
//       {/* Main content */}
//       {/* Responsive: mobilda 1 ustun + kichik padding, fiksatsiyalangan px kengliklar fluid qilindi */}
//       <div className="grid grid-cols-1 gap-8 px-4 py-12 mx-auto sm:px-6 md:grid-cols-2 md:gap-12 md:px-12 md:py-20">
//         {/* Left column - image */}
//         {imageUrl && (
//           <div
//             className="overflow-hidden rounded-xl md:rounded-2xl"
//           >
//             <img
//               src={imageUrl}
//               alt="Contact section"
//               width={600}
//               height={400}
//               loading="lazy"
//               decoding="async"
//               fetchPriority="low"
//               className="h-auto max-h-[380px] w-full object-cover md:max-h-none md:h-full"
//             />
//           </div>
//         )}

//         {/* Right column */}
//         <div className="flex flex-col justify-between pb-6 h-full md:pb-10">
//           {/* Top block: eyebrow + title + mini description */}
//           <div>
//             {eyebrowText && (
//               <div className="mb-6 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
//                 {eyebrowText}
//               </div>
//             )}

//             {shortText && (
//               <p className="w-full max-w-[400px] break-words font-manrope text-[clamp(24px,1.5rem+0.8vw,40px)] font-normal leading-[clamp(30px,2rem+1vw,48px)] text-black">
//                 {shortBefore && <span className="text-black">{shortBefore}</span>}
//                 {shortAfter && <span className="text-[#E88029]">{shortAfter}</span>}
//               </p>
//             )}

//           </div>

//           {/* Bottom block: contact info + description */}
//           <div className="mb-8">
//             {displayDescription && (
//               <p className="mb-8 w-full max-w-[500px] break-words font-inter text-[clamp(18px,1.1rem+0.3vw,24px)] font-normal leading-[clamp(26px,1.5rem+0.4vw,32px)] text-[#1B1D20]">
//                 {t(displayText)}
//               </p>
//             )}
//             <div className="mb-8 space-y-4">
//                <div className="flex flex-wrap gap-6 items-center">
//                 {phone && (
//                   <a href={`tel:${phone}`} className="flex gap-5 items-center min-h-[44px] cursor-pointer">
//                     <div className="flex justify-center items-center w-10 h-10 shrink-0">
//                       <img src={Call} alt="" />
//                     </div>
//                     <span className="font-inter align-middle text-[clamp(13px,0.8rem+0.1vw,14px)] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">{phone}</span>
//                   </a>
//                 )}

//                 {email && (
//                   <a href={`mailto:${email}`} className="flex gap-5 items-center min-h-[44px] cursor-pointer">
//                     <div className="flex justify-center items-center w-10 h-10 shrink-0">
//                       <img src={SmsIco} alt="" />
//                     </div>
//                     <span className="font-inter align-middle text-[clamp(13px,0.8rem+0.1vw,14px)] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">{email}</span>
//                   </a>
//                 )}
//               </div>
//             </div>
//              {mapText && (
//                 <a href={`https://maps.google.com/?q=${encodeURIComponent(mapText)}`} target="_blank" rel="noopener noreferrer" className="flex gap-5 items-center min-h-[44px] cursor-pointer">
//                   <div className="flex justify-center items-center w-10 h-10 shrink-0">
//                     <img src={LocationIcon} alt="" />
//                   </div>
//                   <span className="w-full max-w-[240px] break-words font-inter align-middle text-[clamp(13px,0.8rem+0.1vw,14px)] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">{mapTextValue}</span>
//                 </a>
//               )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(ContactSection);


import React, { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import SmsIco from "../../assets/sms.svg";
import Call from "../../assets/call.svg";
import LocationIcon from "../../assets/location.svg";
import imageUrl from "../../assets/Home_Contact_img.png";

interface ContactSectionProps {
  eyebrow?: any;
  shortDescription?: any;
  miniDescription?: any;
  twoColorMode?: boolean;
  description?: any;
  longDescription?: any;
  descriptionPart1?: any;
  descriptionHighlight?: any;
  descriptionPart2?: any;
  phone?: any;
  email?: any;
  mapText?: any;
  image?: any;
}

const LOREM_10 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";
const LOREm_15 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam";

const ContactSection: React.FC<ContactSectionProps> = ({
  eyebrow = "Biz haqimizda",
  shortDescription = LOREM_10,
  description = LOREm_15,
  longDescription,
  phone = "+998 90 123 45 67",
  email = "info@ekeler.uz",
  mapText = "Tashkent, Uzbekistan",
}) => {
  const { t } = useLanguage();
  const eyebrowText = useMemo(() => (eyebrow ? t(eyebrow) : null), [t, eyebrow]);
  const shortText = useMemo(() => (shortDescription ? t(shortDescription) : null), [t, shortDescription]);
  const displayText = useMemo(() => (description || longDescription), [description, longDescription]);
  const mapTextValue = useMemo(() => (mapText ? t(mapText) : null), [t, mapText]);

  const shortHighlight = "adipiscing elit, sed do eiusmod tempor";
  const { shortBefore, shortAfter } = useMemo(() => {
    if (!shortText) return { shortBefore: "", shortAfter: "" };
    const index = String(shortText).indexOf(shortHighlight);
    if (index === -1) return { shortBefore: String(shortText), shortAfter: "" };
    return {
      shortBefore: String(shortText).slice(0, index),
      shortAfter: String(shortText).slice(index),
    };
  }, [shortText]);

  if (!shortDescription && !displayText && !phone && !email) {
    return null;
  }

  return (
    <div id="contact" className="w-full bg-white">
  <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 md:gap-12">
    {/* Left column - image */}
        {imageUrl && (
          <div className="overflow-hidden rounded-xl md:rounded-2xl">
            <img
              src={imageUrl}
              alt="Contact section"
              width={600}
              height={400}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-auto max-h-[380px] w-full object-cover md:max-h-none md:h-full"
            />
          </div>
        )}

        {/* Right column */}
        <div className="flex flex-col justify-between pb-6 h-full md:pb-10">
          {/* Top block */}
          <div>
            {eyebrowText && (
              <div className="mb-5 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
                {eyebrowText}
              </div>
            )}

            {/* Title — mobile da img dagi kabi */}
            {shortText && (
              <p className="w-full max-w-[400px] break-words font-manrope font-normal text-[28px] leading-[36px] text-black md:text-[clamp(24px,1.5rem+0.8vw,40px)] md:leading-[clamp(30px,2rem+1vw,48px)]">
                {shortBefore && <span className="text-black">{shortBefore}</span>}
                {shortAfter && <span className="text-[#E88029]">{shortAfter}</span>}
              </p>
            )}
          </div>

          {/* Bottom block */}
          <div className="mt-8">
            {/* Description — mobile da kichikroq va soft rang */}
            {displayText && (
              <p className="mb-8 w-full max-w-[500px] break-words font-inter font-normal text-[15px] leading-[24px] text-[#6B7280] md:text-[clamp(18px,1.1rem+0.3vw,24px)] md:leading-[clamp(26px,1.5rem+0.4vw,32px)] md:text-[#1B1D20]">
                {t(displayText)}
              </p>
            )}

            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap gap-6 items-center">
                {phone && (
                  <a href={`tel:${phone}`} className="flex items-center gap-4 min-h-[44px] cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10 shrink-0">
                      <img src={Call} alt="" />
                    </div>
                    <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
                      {phone}
                    </span>
                  </a>
                )}

                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-4 min-h-[44px] cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10 shrink-0">
                      <img src={SmsIco} alt="" />
                    </div>
                    <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
                      {email}
                    </span>
                  </a>
                )}
              </div>
            </div>

            {mapText && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(String(mapTextValue || mapText))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 min-h-[44px] cursor-pointer"
              >
                <div className="flex justify-center items-center w-10 h-10 shrink-0">
                  <img src={LocationIcon} alt="" />
                </div>
                <span className="w-full max-w-[240px] break-words font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
                  {mapTextValue}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactSection);