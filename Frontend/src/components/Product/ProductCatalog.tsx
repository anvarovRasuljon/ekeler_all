import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { urlFor } from "../../sanity/client";

interface LocaleString {
  ru?: string;
  en?: string;
  uz?: string;
  [key: string]: string | undefined;
}

interface SanityImage {
  asset?: { _ref?: string; url?: string };
  [key: string]: any;
}

interface CatalogCtaSectionProps {
  title?: LocaleString;
  description?: LocaleString;
  leftImage?: SanityImage;
  rightImage?: SanityImage;
}

const CatalogCtaSection: React.FC<CatalogCtaSectionProps> = ({
  title,
  description,
  leftImage,
  rightImage,
}) => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  if (!title && !description) {
    return null;
  }

  return (
    <motion.section
      ref={ref}
      className="overflow-hidden relative pt-24 pb-20 w-full md:pb-28 md:pt-32"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 mx-auto max-w-7xl">
        {leftImage && (
          <motion.img
            src={urlFor(leftImage).url()}
            alt=""
            className="absolute left-6 top-30 h-[190px] w-[190px] -translate-y-1/3 rounded-2xl object-cover shadow-sm md:left-16 md:h-[260px] md:w-[260px]"
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        )}

        {rightImage && (
          <motion.img
            src={urlFor(rightImage).url()}
            alt=""
            className="absolute right-6 top-10 h-[110px] w-[190px] -translate-y-1/2 rounded-2xl object-cover shadow-sm md:right-16 md:h-[150px] md:w-[260px]"
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        )}

        <div className="flex flex-col items-center mx-auto max-w-3xl text-center">
          {title && (
            <motion.span
              className="mb-6 rounded-full border border-neutral-300 px-3 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t(title)}
            </motion.span>
          )}

          {description && (
            <motion.p
              className="max-w-xl mt-3 text-[40px] leading-[48px]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t(description)}
            </motion.p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default CatalogCtaSection;