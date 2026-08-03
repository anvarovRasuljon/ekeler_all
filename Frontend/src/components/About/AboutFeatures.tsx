import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';

export interface AboutCompanyFeatureData {
  image?: unknown;
  title?: Record<string, string>;
  description?: Record<string, string>;
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

function AboutCompanyFeature({
  data,
}: {
  data: AboutCompanyFeatureData | null;
}) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  if (!data) return null;

  const showImage = hasSanityImage(data.image);
  const imageAlt = (data.image as { alt?: string })?.alt;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {showImage && (
        <motion.div
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0.01 : 0.6 }}
          className="w-full max-w-[650px] h-[280px] md:h-[360px] rounded-lg overflow-hidden"
        >
          <SanityImage
            source={data.image}
            alt={imageAlt}
            className="object-cover w-full h-full"
            width={650}
            height={360}
          />
        </motion.div>
      )}

      {/* Title + Description — yonma-yon */}
      <motion.div
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.01 : 0.5, delay: reduced ? 0 : 0.15 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        {data.title && (
          <h2 className="mb-6 rounded-full w-fit border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"  >
            {t(data.title)}
          </h2>
        )}

        {data.description && (
          <p className="font-['Inter'] text-[14px]  leading-[1.7] text-[#1B1D20] max-w-[490px] whitespace-pre-line">
            {t(data.description)}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default React.memo(AboutCompanyFeature);