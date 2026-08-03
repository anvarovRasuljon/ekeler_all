import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

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
  descriptionClassName = "font-['Manrope'] font-normal text-[26px] leading-[34px] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px] text-[#1B1D20] max-w-[450px] whitespace-pre-line break-words",
}: {
  data: AboutCompanyContentData | null;
  minHeight?: number;
  descriptionClassName?: string;
}) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const { titleVariants, imageVariants, descVariants, contactItemVariants, locationVariants } = useMemo(() => ({
    titleVariants: {
      hidden: { opacity: 0, x: reduced ? 0 : -40 },
      visible: { opacity: 1, x: 0, transition: { duration: reduced ? 0.01 : 0.7 } },
    },
    imageVariants: {
      hidden: { opacity: 0, scale: reduced ? 1 : 0.92, x: reduced ? 0 : 40 },
      visible: { opacity: 1, scale: 1, x: 0, transition: { duration: reduced ? 0.01 : 0.8 } },
    },
    descVariants: {
      hidden: { opacity: 0, y: reduced ? 0 : 40 },
      visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.7 } },
    },
    contactItemVariants: {
      hidden: { opacity: 0, y: reduced ? 0 : 16 },
      visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.5 } },
    },
    locationVariants: {
      hidden: { opacity: 0, y: reduced ? 0 : 20 },
      visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.6 } },
    },
  }), [reduced]);

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
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        {data.title && (
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          className="mb-6 rounded-full w-fit border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t(data.title)}
          </motion.h1>
        )}

        {showImage && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="w-full sm:w-[500px] h-[200px] rounded-lg overflow-hidden shrink-0"
          >
            <SanityImage
              source={data.image}
              alt={imageAlt}
              className="object-cover w-full h-full"
              width={500}
              height={200}
            />
          </motion.div>
        )}
      </div>

      {/* PASTDA: Description → Tel/Email → Location */}
      <div className="flex flex-col gap-5 items-start md:gap-6">
        {data.description && (
          <motion.p
            variants={descVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className={descriptionClassName}
          >
            {t(data.description)}
          </motion.p>
        )}

        {(data.phone || data.email) && (
          <div
            className="flex flex-wrap items-center gap-4 md:gap-8 font-['Manrope'] font-normal text-[14px] leading-[18px] text-[#1B1D20]"
          >
            {data.phone && (
              <motion.a
                variants={contactItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                href={`tel:${data.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:text-[#E88029] transition shrink-0"
              >
                <Phone size={14} strokeWidth={1.5} />
                <span>{data.phone}</span>
              </motion.a>
            )}

            {data.email && (
              <motion.a
                variants={contactItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 hover:text-[#E88029] transition shrink-0"
              >
                <Mail size={14} strokeWidth={1.5} />
                <span>{data.email}</span>
              </motion.a>
            )}
          </div>
        )}

        {data.location && (
          <motion.div
            variants={locationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-start gap-2 max-w-[250px] font-['Manrope'] font-normal text-[14px] leading-[18px] text-[#1B1D20] mt-1"
          >
            <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            <span className="whitespace-pre-line">
              {t(data.location)}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default React.memo(AboutCompanyContentBlock);