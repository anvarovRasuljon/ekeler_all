import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import commentBg from "../../assets/Comment_bg.png";
import subtract from "../../assets/Subtract.svg";
import { useLanguage } from "../../context/LanguageContext";
import type { Language } from "../../context/LanguageContext";

const LABELS: Record<Language, { subtitle: string; link: string }> = {
  ru: { subtitle: "Страница не найдена", link: "На главную" },
  uz: { subtitle: "Saxifa topilmadi", link: "Asosiy saxifaga o'tish" },
  eng: { subtitle: "Page not found", link: "Back to home" },
};

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();
  const t = useMemo(() => LABELS[language], [language]);

  const MarqueeCode = React.memo(function MarqueeCode() {
    return (
      <span className="shrink-0 whitespace-nowrap font-['Manrope'] text-[clamp(48px,15vw,212px)] font-normal leading-[1.08] tracking-[-0.04em] text-white/95 sm:whitespace-nowrap">
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
          className="font-['Manrope'] text-lg font-normal text-white/80"
        >
          {t.subtitle}
        </p>

        <a
          href="/"
          className="group inline-flex items-center gap-2 border-b border-white pb-1 font-['Manrope'] text-base font-medium text-white hover:text-white/80"
        >
          {t.link}
          <ArrowUpRight
            size={18}
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
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
