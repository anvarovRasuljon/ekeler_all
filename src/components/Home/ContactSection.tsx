import AnimatedImage from './AnimatedImage';
import React, { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import SmsIco from "../../assets/sms.svg";
import Call from "../../assets/call.svg";
import LocationIcon from "../../assets/location.svg";
import imageUrl from "../../assets/Home_Contact_img.png";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

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
  <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 md:gap-12">
    {/* Left column - image */}
        {imageUrl && (
          <div
            style={revealStyle(sectionReveal.visible, 0)}
            className="overflow-hidden rounded-xl md:rounded-2xl"
          >
            <AnimatedImage
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
              <div
                style={revealStyle(sectionReveal.visible, 0)}
                className="mb-5 inline-flex w-fit items-center rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
              >
                {eyebrowText}
              </div>
            )}

            {/* Title — mobile da img dagi kabi */}
            {shortText && (
              <p
                style={revealStyle(sectionReveal.visible, 120)}
                className="w-full max-w-[400px] break-words font-manrope font-normal text-[28px] leading-[36px] text-black md:text-[clamp(24px,1.5rem+0.8vw,40px)] md:leading-[clamp(30px,2rem+1vw,48px)]"
              >
                {shortBefore && <span className="text-black">{shortBefore}</span>}
                {shortAfter && <span className="text-[#E88029]">{shortAfter}</span>}
              </p>
            )}
          </div>

          {/* Bottom block */}
          <div className="mt-8">
            {/* Description — mobile da kichikroq va soft rang */}
            {displayText && (
              <p
                style={revealStyle(sectionReveal.visible, 220)}
                className="mb-8 w-full max-w-[500px] break-words font-inter font-normal text-[15px] leading-[24px] text-[#6B7280] md:text-[clamp(18px,1.1rem+0.3vw,24px)] md:leading-[clamp(26px,1.5rem+0.4vw,32px)] md:text-[#1B1D20]"
              >
                {t(displayText)}
              </p>
            )}

            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap gap-6 items-center">
                {phone && (
                  <a href={`tel:${phone}`} style={revealStyle(sectionReveal.visible, 320)} className="flex items-center gap-4 min-h-[44px] cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10 shrink-0">
                      <AnimatedImage src={Call} alt="" />
                    </div>
                    <span className="font-inter text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20]">
                      {phone}
                    </span>
                  </a>
                )}

                {email && (
                  <a href={`mailto:${email}`} style={revealStyle(sectionReveal.visible, 400)} className="flex items-center gap-4 min-h-[44px] cursor-pointer">
                    <div className="flex justify-center items-center w-10 h-10 shrink-0">
                      <AnimatedImage src={SmsIco} alt="" />
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
                style={revealStyle(sectionReveal.visible, 480)}
                className="flex items-center gap-4 min-h-[44px] cursor-pointer"
              >
                <div className="flex justify-center items-center w-10 h-10 shrink-0">
                  <AnimatedImage src={LocationIcon} alt="" />
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