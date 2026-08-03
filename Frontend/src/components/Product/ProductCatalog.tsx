import React, { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ctaLeft from "../../assets/ProductPage_ProductLeft.png";
import ctaRight from "../../assets/ProductPage_right.png";
import { useLanguage } from "../../context/LanguageContext";

interface LocaleString {
  ru?: string;
  en?: string;
  uz?: string;
  [key: string]: string | undefined;
}

const title: LocaleString = { ru: 'Продукция', uz: 'Mahsulotlar', eng: 'Products' };
const description: LocaleString = { ru: 'Лучшие решения для вашего бизнеса', uz: 'Biznesingiz uchun eng yaxshi yechimlar', eng: 'Best solutions for your business' };

const CatalogCtaSection: React.FC = () => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRight = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 275]);

  const titleText = useMemo(() => t(title), [t]);
  const descriptionText = useMemo(() => t(description), [t]);

  return (
    <motion.section
      ref={ref}
      // Responsive: mobilda kichikroq padding va dekorativ rasmlar
      className="relative w-full overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-24 md:pb-28 md:pt-32"
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={reduced ? undefined : (isInView ? { opacity: 1 } : { opacity: 0 })}
      transition={{ duration: reduced ? 0.01 : 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {ctaLeft && (
          <motion.img
            src={ctaLeft}
            alt=""
            className="absolute left-3 top-30 h-[110px] w-[110px] -translate-y-1/3 rounded-2xl object-cover shadow-sm sm:left-6 sm:h-[190px] sm:w-[190px] md:left-16 md:h-[260px] md:w-[260px]"
            loading="eager"
            decoding="async"
            initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            animate={reduced ? undefined : (isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 })}
            transition={{ duration: reduced ? 0.01 : 0.6, delay: 0.2 }}
            style={{ willChange: 'opacity, transform' }}
          />
        )}

        {ctaRight && (
          <motion.div
            className="absolute right-3 top-[-265px] h-[200px] w-[140px] overflow-hidden rounded-[8px] shadow-sm sm:right-6 sm:h-[350px] sm:w-[250px] md:right-16"
            style={{ y: yRight }}
            initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            animate={reduced ? undefined : (isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 })}
            transition={{ duration: reduced ? 0.01 : 0.6, delay: 0.4 }}
          >
            <img
              src={ctaRight}
              alt=""
              className="object-cover w-full h-full"
              style={{ willChange: 'transform' }}
            />
          </motion.div>
        )}

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-2 text-center sm:px-0">
          {title && (
            <motion.span
              className="mb-6 rounded-full border border-neutral-300 px-3 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {titleText}
            </motion.span>
          )}

          {description && (
            <motion.p
              className="mt-3 max-w-xl break-words text-[24px] leading-[32px] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {descriptionText}
            </motion.p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default React.memo(CatalogCtaSection);