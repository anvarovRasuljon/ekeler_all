import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';
import { Phone, Mail, MapPin } from 'lucide-react';

export interface AboutCompanyContentData {
  image?: unknown;
  title?: Record<string, string>;
  description?: Record<string, string>;
  phone?: string;
  email?: string;
  location?: Record<string, string>;
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

function AboutCompanyContentBlock({
  data,
  minHeight = 670,
  descriptionClassName = "font-['Manrope'] font-normal text-[26px] leading-[34px] mb-[30px] sm:text-[20px] sm:leading-[20px] lg:text-[40px] lg:leading-[48px] text-[#1B1D20] max-w-[450px] whitespace-pre-line break-words",
}: {
  data: AboutCompanyContentData | null;
  minHeight?: number;
  descriptionClassName?: string;
}) {
  const { t } = useLanguage();

  if (!data) {
    return (
      <div className="text-neutral-500 font-['Inter'] text-sm">
        Kontent hali qo&apos;shilmagan.
      </div>
    );
  }

  const showImage = hasSanityImage(data.image);
  const imageAlt = (data.image as { alt?: string })?.alt;

  return (
    <div
      /* Responsive: minHeight faqat lg+ ekranlarda kerak, mobilda katta bo'sh joy qolmasin */
      className="flex w-full flex-col justify-between gap-10 max-lg:!min-h-0 lg:gap-0"
      style={{ minHeight }}
    >
      {/* TEPADA: Title + Image */}
      {/* <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        {data.title && (
          <h1
            className="mb-6 rounded-full w-fit border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t(data.title)}
          </h1>
        )}

        {showImage && (
          <div
            className="w-full sm:w-[500px] h-[200px] rounded-lg overflow-hidden shrink-0"
          >
            <SanityImage
              source={data.image}
              alt={imageAlt}
              className="object-cover w-full h-full"
              width={500}
              height={200}
            />
          </div>
        )}
      </div> */}
      <div className="flex flex-row gap-4 justify-between items-start sm:gap-6">
        {data.title && (
          <h1
            className="mb-6 rounded-full w-fit border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500 shrink-0"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t(data.title)}
          </h1>
        )}

        {showImage && (
          <div
            className="w-[150px] h-[120px] rounded-lg overflow-hidden shrink-0 sm:w-[500px] sm:h-[300px]"
          >
            <SanityImage
              source={data.image}
              alt={imageAlt}
              className="object-cover w-full h-full"
              width={500}
              height={200}
            />
          </div>
        )}
      </div>

      {/* PASTDA: Description → Tel/Email → Location */}
      <div className="flex flex-col gap-5 items-start md:gap-6 w-[300px] sm:w-[400px] ">
        {data.description && (
          <p
            className={descriptionClassName}
          >
            {t(data.description)}
          </p>
        )}

        {(data.phone || data.email) && (
          <div
            className="flex flex-wrap items-center gap-4 md:gap-8 font-['Manrope'] font-normal text-[14px] leading-[18px] text-[#1B1D20]"
          >
            {data.phone && (
              <a
                href={`tel:${data.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:text-[#E88029] shrink-0"
              >
                <Phone size={14} strokeWidth={1.5} />
                <span>{data.phone}</span>
              </a>
            )}

            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 hover:text-[#E88029] shrink-0"
              >
                <Mail size={14} strokeWidth={1.5} />
                <span>{data.email}</span>
              </a>
            )}
          </div>
        )}

        {data.location && (
          <div
            className="flex items-start gap-2 max-w-[250px] font-['Manrope'] font-normal text-[14px] leading-[18px] text-[#1B1D20] mt-1"
          >
            <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            <span className="whitespace-pre-line">
              {t(data.location)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(AboutCompanyContentBlock);