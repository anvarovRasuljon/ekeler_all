import React, { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import SmsIco from "../../assets/sms.svg"
import Call from "../../assets/call.svg"
import LocationIcon from "../../assets/location.svg"
import imageUrl from "../../assets/Home_Contact_img.png"


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

const LOREM_20 =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.";

const ContactSection: React.FC<ContactSectionProps> = ({
  eyebrow = "Contact",
  shortDescription = "Get in touch with us",
  miniDescription = LOREM_20,
  twoColorMode = false,
  description = LOREM_20,
  longDescription,
  descriptionPart1,
  descriptionHighlight,
  descriptionPart2,
  phone = "+998 90 123 45 67",
  email = "info@ekeler.uz",
  mapText = "Tashkent, Uzbekistan",
}) => {

  const { t } = useLanguage();
  const eyebrowText = useMemo(() => (eyebrow ? t(eyebrow) : null), [t, eyebrow]);
  const shortText = useMemo(() => (shortDescription ? t(shortDescription) : null), [t, shortDescription]);
  const miniText = useMemo(() => (miniDescription ? t(miniDescription) : null), [t, miniDescription]);
  const part1Text = useMemo(() => (descriptionPart1 ? t(descriptionPart1) : null), [t, descriptionPart1]);
  const highlightText = useMemo(() => (descriptionHighlight ? t(descriptionHighlight) : null), [t, descriptionHighlight]);
  const part2Text = useMemo(() => (descriptionPart2 ? t(descriptionPart2) : null), [t, descriptionPart2]);
  const displayText = useMemo(() => (description || longDescription), [description, longDescription]);
  const mapTextValue = useMemo(() => (mapText ? t(mapText) : null), [t, mapText]);

  const displayDescription = twoColorMode
    ? (descriptionPart1 || descriptionHighlight || descriptionPart2 ? true : false)
    : (description || longDescription);

  if (!shortDescription && !displayDescription && !phone && !email) {
    return null;
  }


  return (
    <div
      id="contact"
      className="w-full bg-white"
    >
      {/* Main content */}
      {/* Responsive: mobilda 1 ustun + kichik padding, fiksatsiyalangan px kengliklar fluid qilindi */}
      <div className="mx-auto grid grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:px-12 md:py-20">
        {/* Left column - image */}
        {imageUrl && (
          <div
            className="overflow-hidden rounded-xl md:rounded-2xl"
          >
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
        <div className="flex h-full flex-col justify-between pb-6 md:pb-10">
          {/* Top block: eyebrow + title + mini description */}
          <div>
            {eyebrowText && (
              <div className="mb-6 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500">
                {eyebrowText}
              </div>
            )}

            {shortText && (
              <p className="w-full max-w-[400px] break-words font-manrope text-[26px] font-normal leading-[34px] text-black sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]">
                {shortText}
              </p>
            )}

            {miniText && (
              <p className="mt-4 w-full max-w-[500px] break-words font-inter text-[15px] font-normal leading-relaxed text-[#1B1D20] md:text-[18px] md:leading-[28px]">
                {miniText}
              </p>
            )}
          </div>

          {/* Bottom block: contact info + description */}
          <div className="mb-8">
            {twoColorMode ? (
              (descriptionPart1 || descriptionHighlight || descriptionPart2) && (
                <p className="mb-8 w-full max-w-[500px] break-words font-inter text-[18px] font-normal leading-relaxed md:text-[24px] md:leading-[32px]">
                  {part1Text && <span className="text-[#1B1D20]">{part1Text} </span>}
                  {highlightText && <span className="text-[#E88029]">{highlightText} </span>}
                  {part2Text && <span className="text-[#1B1D20]">{part2Text}</span>}
                </p>
              )
            ) : (
              displayDescription && (
                <p className="mb-8 w-full max-w-[500px] break-words font-inter text-[18px] font-normal leading-relaxed text-[#1B1D20] md:text-[24px] md:leading-[32px]">
                  {t(displayText)}
                </p>
              )
            )}
            <div className="mb-8 space-y-4">
               <div className="flex flex-wrap items-center gap-6">
                {phone && (
                  <a href={`tel:${phone}`} className="flex gap-4 items-center min-h-[44px] cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10 shrink-0">
                      <img src={Call} alt="" />
                    </div>
                    <span className="text-[15px] leading-[22px] font-normal text-[#1B1D20] font-inter">{phone}</span>
                  </a>
                )}

                {email && (
                  <a href={`mailto:${email}`} className="flex gap-4 items-center min-h-[44px] cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10 shrink-0">
                      <img src={SmsIco} alt="" />
                    </div>
                    <span className="text-[15px] leading-[22px] font-normal text-[#1B1D20] font-inter">{email}</span>
                  </a>
                )}
              </div>
            </div>
             {mapText && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(mapText)}`} target="_blank" rel="noopener noreferrer" className="flex gap-4 items-start min-h-[44px] cursor-pointer">
                  <div className="flex justify-center items-center w-10 h-10 shrink-0">
                    <img src={LocationIcon} alt="" />
                  </div>
                  <span className="w-full max-w-[240px] break-words font-inter text-[15px] font-normal leading-[22px] text-[#1B1D20]">{mapTextValue}</span>
                </a>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactSection);