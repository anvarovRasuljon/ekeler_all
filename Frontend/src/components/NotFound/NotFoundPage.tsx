import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import commentBg from "../../assets/Comment_bg.png";
import subtract from "../../assets/Subtract.svg";
import { useLanguage } from "../../context/LanguageContext";
import type { Language } from "../../context/LanguageContext";

const DURATION = 0.5;

const LABELS: Record<Language, { subtitle: string; link: string }> = {
  ru: { subtitle: "Страница не найдена", link: "На главную" },
  uz: { subtitle: "Saxifa topilmadi", link: "Asosiy saxifaga o'tish" },
  eng: { subtitle: "Page not found", link: "Back to home" },
};

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const t = useMemo(() => LABELS[language], [language]);

  return (
    <main
      className="relative flex h-[97vh] w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${commentBg})` }}
    >
      <div className="flex relative z-10 flex-col gap-6 items-center px-4 text-center text-white">
        <motion.h1
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.01 : DURATION }}
          /* Responsive: clamp orqali 375px dan 1440px gacha muvozanatli o'lcham */
          className="break-words text-center font-['Manrope'] text-[clamp(48px,15vw,212px)] font-normal leading-[1.08] tracking-[-0.04em] text-white sm:whitespace-nowrap"
        >
          4
          <motion.img
            src={subtract}
            alt="0"
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.1, duration: reduced ? 0.01 : DURATION }}
            className="inline-block h-[0.7em] w-[0.7em] align-middle"
            loading="eager"
            decoding="async"
          />
          4 — 4
          <motion.img
            src={subtract}
            alt="0"
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.2, duration: reduced ? 0.01 : DURATION }}
            className="inline-block h-[0.7em] w-[0.7em] align-middle"
            loading="eager"
            decoding="async"
          />
          4 — 4
          <motion.img
            src={subtract}
            alt="0"
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.3, duration: reduced ? 0.01 : DURATION }}
            className="inline-block h-[0.7em] w-[0.7em] align-middle"
            loading="eager"
            decoding="async"
          />
          4
        </motion.h1>

        <motion.p
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.4, duration: reduced ? 0.01 : DURATION }}
          className="font-['Manrope'] text-lg font-normal text-white/80"
        >
          {t.subtitle}
        </motion.p>

        <motion.a
          href="/"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.5, duration: reduced ? 0.01 : DURATION }}
          className="group inline-flex items-center gap-2 border-b border-white pb-1 font-['Manrope'] text-base font-medium text-white transition hover:text-white/80"
        >
          {t.link}
          <ArrowUpRight
            size={18}
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.a>
      </div>
    </main>
  );
};

export default React.memo(NotFoundPage);
