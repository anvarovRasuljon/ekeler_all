import React from "react";

import Location from "../../assets/location.svg";
import { useLanguage } from "../../context/LanguageContext";
import SmsIco from "../../assets/sms.svg"
import Call from "../../assets/call.svg"
import { urlFor } from "../../sanity/client";

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

const ContactSection: React.FC<ContactSectionProps> = ({
  eyebrow,
  shortDescription,
  miniDescription,
  twoColorMode = false,
  description,
  longDescription,
  descriptionPart1,
  descriptionHighlight,
  descriptionPart2,
  phone,
  email,
  mapText,
  image,
}) => {

  const { t } = useLanguage();

  const displayDescription = twoColorMode
    ? (descriptionPart1 || descriptionHighlight || descriptionPart2 ? true : false)
    : (description || longDescription);

  if (!shortDescription && !displayDescription && !phone && !email) {
    return null;
  }

  const imageUrl = image ? urlFor(image).url() : "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1400&auto=format&fit=crop";

  return (
    <div className="w-full bg-white">
      {/* Main content */}
      <div className="grid grid-cols-1 gap-12 mx-auto md:grid-cols-2 md:px-12 md:py-20">
        {/* Left column - image */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt="Contact section"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-between pb-10 h-full">
          {/* Top block: eyebrow + title + mini description */}
          <div>
            {eyebrow && (
              <div className="mb-6 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 text-[10px] leading-[18px] font-normal font-inter uppercase tracking-wide text-[#1B1D20]">
                {t(eyebrow)}
              </div>
            )}

            {shortDescription && (
              <p className="text-[40px] leading-[48px] font-normal text-black font-manrope w-[400px]">
                {t(shortDescription)}
              </p>
            )}

            {miniDescription && (
              <p className="mt-4 text-[18px] leading-[28px] font-normal text-[#1B1D20] font-inter w-[500px]">
                {t(miniDescription)}
              </p>
            )}
          </div>

          {/* Bottom block: contact info + description */}
          <div className="mb-8">
            {twoColorMode ? (
              (descriptionPart1 || descriptionHighlight || descriptionPart2) && (
                <p className="mb-8 text-[24px] leading-[32px] font-normal font-inter w-[500px]">
                  {descriptionPart1 && <span className="text-[#1B1D20]">{t(descriptionPart1)} </span>}
                  {descriptionHighlight && <span className="text-[#E88029]">{t(descriptionHighlight)} </span>}
                  {descriptionPart2 && <span className="text-[#1B1D20]">{t(descriptionPart2)}</span>}
                </p>
              )
            ) : (
              displayDescription && (
                <p className="mb-8 text-[24px] leading-[32px] font-normal text-[#1B1D20] font-inter w-[500px]">
                  {t(displayDescription)}
                </p>
              )
            )}
            <div className="mb-8 space-y-4">
               <div className="flex flex-wrap items-center gap-[20px]">
                {phone && (
                  <a href={`tel:${phone}`} className="flex gap-3 items-center cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10">
                      <img src={Call} alt="" />
                    </div>
                    <span className="text-[14px] leading-[22px] font-normal text-[#1B1D20] font-inter">{phone}</span>
                  </a>
                )}
 
                {email && (
                  <a href={`mailto:${email}`} className="flex gap-3 items-center cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10">
                      <img src={SmsIco} alt="" />
                    </div>
                    <span className="text-[14px] leading-[22px] font-normal text-[#1B1D20] font-inter">{email}</span>
                  </a>
                )}
              </div>
            </div>
             {mapText && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(mapText)}`} target="_blank" rel="noopener noreferrer" className="flex gap-3 items-center cursor-pointer">
                  <div className="flex justify-center items-center w-10 h-10">
                    <img src={Location} alt="" />
                  </div>
                  <span className="text-[14px] leading-[22px] font-normal text-[#1B1D20] font-inter w-[200px]">{t(mapText)}</span>
                </a>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;