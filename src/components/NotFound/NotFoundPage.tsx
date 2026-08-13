import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import commentBg from "../../assets/Comment_bg.png";
import subtract from "../../assets/Subtract.svg";
import { useLanguage } from "../../context/LanguageContext";
import type { Language } from "../../context/LanguageContext";

const LABELS: Record<Language, { subtitle: string; link: string }> = {
  ru: { subtitle: "Страница не найдена", link: "На главную" },
  uz: { subtitle: "Sahifa topilmadi", link: "Asosiy sahifaga o'tish" },
  eng: { subtitle: "Page not found", link: "Back to home" },
};

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();
  const t = useMemo(() => LABELS[language], [language]);

  const MarqueeCode = React.memo(function MarqueeCode() {
    return (
      <span className="shrink-0 whitespace-nowrap font-['Inter'] text-[clamp(48px,15vw,212px)] font-normal leading-[1.08] tracking-[-0.04em] text-white/95 sm:whitespace-nowrap">
        4
        <img
          src={subtract}
          alt="0"
          className="inline-block h-[0.7em] w-[0.7em] mx-1 align-middle"
          loading="eager"
          decoding="async"
        />
        4 — 4
        <img
          src={subtract}
          alt="0"
          className="inline-block h-[0.7em] w-[0.7em] mx-1 align-middle"
          loading="eager"
          decoding="async"
        />
        4 — 4
        <img
          src={subtract}
          alt="0"
          className="inline-block h-[0.7em] w-[0.7em] mx-1 align-middle"
          loading="eager"
          decoding="async"
        />
        4 —
      </span>
    );
  });

  return (
    <main
      className="relative flex h-[calc(100dvh-65px)] w-full items-center justify-center overflow-hidden rounded-[8px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${commentBg})` }}
    >
      <div className="flex relative z-10 flex-col gap-6 items-center px-4 text-center text-white">
        <div className="mb-4 w-full overflow-hidden">
          <div className="flex w-max will-change-transform animate-marquee">
            <MarqueeCode />
            <MarqueeCode />
          </div>
        </div>

        <p
          className="font-['Inter'] text-lg font-normal text-white/80"
        >
          {t.subtitle}
        </p>

        <a
          href="/"
          className="group inline-flex flex-col items-center text-white hover:text-white/80 cursor-pointer transition-all duration-700 ease-out"
        >
          <span className="inline-flex items-center gap-2">
            <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
              <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                <p className="whitespace-nowrap text-base font-['Inter'] font-normal leading-[1.2em] text-white">
                  {t.link}
                </p>
                <p className="whitespace-nowrap text-base font-['Inter'] font-medium leading-[1.2em] text-white">
                  {t.link}
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:scale-110"
            />
          </span>
          <div className="relative mt-[8px] h-[1.5px] w-full overflow-hidden">
            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white/40 transition-colors duration-500 group-hover:bg-transparent" />
            <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
          </div>
        </a>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </main>
  );
};

export default React.memo(NotFoundPage);
