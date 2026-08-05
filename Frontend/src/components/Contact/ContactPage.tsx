import React, { useMemo } from "react";
import contactMainImage from "../../assets/contact_main_img.png";
import contactMiniImage from "../../assets/contact_mini_img.png";
import { useLanguage } from "../../context/LanguageContext";
import type { Language } from "../../context/LanguageContext";
import ContactForm from "./ContactForm";

const NAV_HEIGHT_PX = 65;
const IMG_GAP = 30;

const CONTENT: Record<Language, { eyebrow: string; title: string; highlight: string }> = {
  ru: {
    eyebrow: "КОНТАКТЫ",
    title: "Lorem impus\nLorem ipsum dolor ",
    highlight: "sit amet,\nconsectetur adipiscing elit",
  },
  uz: {
    eyebrow: "ALOQA",
    title: "Lorem impus\nLorem ipsum dolor ",
    highlight: "sit amet,\nconsectetur adipiscing elit",
  },
  eng: {
    eyebrow: "CONTACT",
    title: "Lorem impus\nLorem ipsum dolor ",
    highlight: "sit amet,\nconsectetur adipiscing elit",
  },
};

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const t = useMemo(() => CONTENT[language], [language]);
  const stickyTop = useMemo(() => NAV_HEIGHT_PX + IMG_GAP, []);
  const stickyHeight = useMemo(() => `calc(100vh - ${NAV_HEIGHT_PX + IMG_GAP * 2}px)`, []);

  return (
    <div className="w-full bg-white text-[#1B1D20]">
      <div className="px-4 pt-6 pb-16 w-full md:px-6 lg:px-8">
        {/* Mobil rasm */}
        <div className="mb-8 h-[50vh] max-h-[420px] w-full overflow-hidden rounded-lg lg:hidden">
          <img
            src={contactMainImage}
            alt="Contact"
            className="object-cover w-full h-full"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        {/* 50% / 50%, o'rtada 30px */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* CHAP — asosiy rasm */}
          <div className="hidden w-1/2 shrink-0 lg:block">
            <div
              className="overflow-hidden sticky w-full rounded-lg"
              style={{
                top: stickyTop,
                height: stickyHeight,
                maxHeight: stickyHeight,
              }}
            >
              <img
                src={contactMainImage}
                alt="Contact"
                className="block object-cover w-full h-full"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* O'NG — sarlavha + kichkina rasm + forma */}
          <div className="flex flex-col gap-16 w-full min-w-0 lg:w-1/2 md:gap-20">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <span className="w-fit rounded-full border border-neutral-300 px-4 py-1.5 font-['Inter'] text-xs font-medium tracking-wide text-neutral-500">
                  {t.eyebrow}
                </span>
                <img
                  src={contactMiniImage}
                  alt="Contact mini"
                  /* Responsive: mobilda pastroq balandlik, sm+ da original 500x200 */
                  className="h-[160px] w-full rounded-lg object-cover sm:h-[200px] sm:w-[500px]"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>

              <h2 className="max-w-[600px] whitespace-pre-line break-words font-['Manrope'] text-[26px] font-normal leading-[34px] text-[#1B1D20] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]">
                {t.title}
                <span className="text-[#E88029]">{t.highlight}</span>
              </h2>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactPage);
