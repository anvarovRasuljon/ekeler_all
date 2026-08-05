import React from 'react';
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

  if (!data) return null;

  const showImage = hasSanityImage(data.image);
  const imageAlt = (data.image as { alt?: string })?.alt;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {showImage && (
        <div
          className="w-full max-w-[650px] h-[280px] md:h-[360px] rounded-lg overflow-hidden"
        >
          <SanityImage
            source={data.image}
            alt={imageAlt}
            className="object-cover w-full h-full"
            width={650}
            height={360}
          />
        </div>
      )}

      {/* Title + Description — yonma-yon */}
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        {data.title && (
          <h2 className="mb-6 rounded-full w-fit border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"  >
            {t(data.title)}
          </h2>
        )}

        {data.description && (
          <p className="font-['Inter'] text-sm leading-relaxed text-[#1B1D20] max-w-[490px] sm:text-base whitespace-pre-line">
            {t(data.description)}
          </p>
        )}
      </div>
    </div>
  );
}

export default React.memo(AboutCompanyFeature);