import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';

export interface AboutCompanyBlockData {
  title1?: Record<string, string>;
  description1?: Record<string, string>;
  title2?: Record<string, string>;
  description2?: Record<string, string>;
  bodyText?: Record<string, string>;
  image370_1?: unknown;
  image370_2?: unknown;
  image350_1?: unknown;
  image350_2?: unknown;
}

function SanityImage({
  source,
  alt,
  className,
  width,
  height,
}: {
  source: unknown;
  alt?: string;
  className?: string;
  width: number;
  height: number;
}) {
  const url = getImageUrl(source, { width, height });
  if (!url) return null;
  return (
    <img
      src={url}
      alt={alt || ''}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
    />
  );
}

function AboutCompanyBlock({
  data,
}: {
  data: AboutCompanyBlockData | null;
}) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  if (!data) return null;

  const textClass =
    "font-['Inter'] font-normal text-[14px] leading-[22px] text-[#1B1D20]";

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      
      {/* —— 1-blok: katta + kichik rasm → title + description —— */}
      {/* Responsive: mobilda majburiy min-height yo'q, matn bloklari ustma-ust joylashadi */}
      <div className="flex flex-col justify-between gap-8 lg:min-h-[500px] lg:gap-0">
        
        {/* Rasmlar: 370×300 + 250×200 */}
        <div className="flex flex-col gap-4 items-end mb-15 sm:flex-row">
          {hasSanityImage(data.image370_1) && (
            <motion.div
              initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduced ? 0.01 : 0.6 }}
              className="w-full sm:w-[380px] h-[320px] rounded-[8px] overflow-hidden shrink-0"
            >
              <SanityImage
                source={data.image370_1}
                alt={(data.image370_1 as { alt?: string })?.alt}
                className="object-cover w-full h-full"
                width={370}
                height={300}
              />
            </motion.div>
          )}
          {hasSanityImage(data.image370_2) && (
            <motion.div
              initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.15 }}
              className="w-full sm:w-[270px] h-[200px] rounded-[8px] overflow-hidden shrink-0"
            >
              <SanityImage
                source={data.image370_2}
                alt={(data.image370_2 as { alt?: string })?.alt}
                className="object-cover w-full h-full"
                width={250}
                height={200}
              />
            </motion.div>
          )}
        </div>

        {/* Title (start) + Description (space-between) */}
        <motion.div
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0.01 : 0.5 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row"
        >
          {data.title1 && (
            <h2 className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 w-fit font-inter text-xs font-medium tracking-wide text-neutral-500" >
              {t(data.title1)}
            </h2>
          )}
          {data.description1 && (
            <p className={`text-left whitespace-pre-line ${textClass} max-w-[480px]`}>
              {t(data.description1)}
            </p>
          )}
        </motion.div>
      </div>

      {/* —— 2-blok: kichik + katta rasm → title + description → mini descr —— */}
      <div className="flex flex-col justify-between gap-8 lg:min-h-[500px] lg:gap-0">
        {/* Rasmlar: 250×200 + 370×300 */}
        <div className="flex flex-col gap-4 items-end mb-5 sm:flex-row">
          {hasSanityImage(data.image350_1) && (
            <motion.div
              initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduced ? 0.01 : 0.6 }}
              className="w-full sm:w-[270px] h-[200px] rounded-[8px] overflow-hidden shrink-0"
            >
              <SanityImage
                source={data.image350_1}
                alt={(data.image350_1 as { alt?: string })?.alt}
                className="object-cover w-full h-full"
                width={250}
                height={200}
              />
            </motion.div>
          )}
          {hasSanityImage(data.image350_2) && (
            <motion.div
              initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.15 }}
              className="w-full sm:w-[380px] h-[300px] rounded-[8px] overflow-hidden shrink-0"
            >
              <SanityImage
                source={data.image350_2}
                alt={(data.image350_2 as { alt?: string })?.alt}
                className="object-cover w-full h-full"
                width={370}
                height={300}
              />
            </motion.div>
          )}
        </div>

      <motion.div
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.01 : 0.5 }}
        className="flex flex-col items-start justify-between gap-4 sm:flex-row"
      >
  {/* Chap: title */}
  {data.title2 && (
    <h2  className="mb-6 rounded-full w-fit border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500" >
      {t(data.title2)}
    </h2>
  )}

  {/* O'ng: 2 ta description — flex-col */}
  <div className="flex w-full max-w-[480px] flex-col gap-5">
    {data.description2 && (
      <p className={`whitespace-pre-line ${textClass} text-start`}>
        {t(data.description2)}
      </p>
    )}
   {data.bodyText && (
  <div className="flex items-start">
    <span className="w-[15px] h-[15px] p-[10px] box-content shrink-0 flex items-center justify-center">
      <svg
        width="15"
        height="15"
        viewBox="0 0 "
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#E88029]"
      >
        <path
          d="M3.5 6.5C3.5 4.5 5 3 7 3V5C6 5 5.5 5.7 5.5 6.5V7.5H7.5V12H3.5V6.5Z"
          fill="currentColor"
        />
        <path
          d="M9.5 6.5C9.5 4.5 11 3 13 3V5C12 5 11.5 5.7 11.5 6.5V7.5H13.5V12H9.5V6.5Z"
          fill="currentColor"
        />
      </svg>
    </span>
    <p className={`whitespace-pre-line ${textClass} text-start`}>
      {t(data.bodyText)}
    </p>
  </div>
)}
  </div>
</motion.div>

      </div>
    </div>
  );
}

export default React.memo(AboutCompanyBlock);