import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';
import { Phone, Mail, MapPin } from 'lucide-react';

export interface AboutCompanyContentData {
  image?: unknown;
  title?: Record<string, string>;
  description?: Record<string, string>;
  descriptionHighlight?: Record<string, string>;
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
  priority = false,
  reveal = 'bottom-top',
}: {
  source: unknown;
  alt?: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
  reveal?: 'top-bottom' | 'bottom-top' | 'left-right' | 'right-left' | 'scale';
}) {
  const [loaded, setLoaded] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);
  const url = getImageUrl(source, { width, height });

  React.useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    if (priority) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  const initialClip =
    reveal === 'bottom-top' ? 'inset(100% 0 0 0)' :
    reveal === 'left-right' ? 'inset(0 100% 0 0)' :
    reveal === 'right-left' ? 'inset(0 0 0 100%)' :
    reveal === 'scale' ? 'inset(0 0 0 0)' :
    'inset(0 0 100% 0)';

  if (!url) return null;
  return (
    <div ref={divRef} className="w-full h-full">
      <img
        src={url}
        alt={alt || ''}
        className={`${className} transition-all duration-700 ${loaded ? 'blur-0 scale-100' : 'blur-[15px] scale-95'}`}
        style={{ opacity: loaded ? 1 : 0.6, clipPath: visible ? 'inset(0 0 0 0)' : initialClip }}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function HighlightedDescription({
  text,
  highlight,
  className,
}: {
  text: string;
  highlight: string;
  className: string;
}) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (index === -1) {
    return <p className={className}>{text}</p>;
  }
  const before = text.slice(0, index).trimEnd();
  const after = text.slice(index);
  return (
    <p className={className}>
      {before && <span className="text-[#1B1D20]">{before}</span>}
      {before && ' '}
      <span className="text-[#E88029]">{after}</span>
    </p>
  );
}

function AboutCompanyContentBlock({
  data,
  minHeight = 670,
  descriptionClassName = "font-['Inter'] font-normal text-[26px] leading-[34px] mb-[30px] sm:text-[20px] sm:leading-[20px] lg:text-[40px] lg:leading-[48px] text-[#1B1D20] max-w-[450px] whitespace-pre-line break-words",
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
              reveal="bottom-top"
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
              reveal="left-right"
            />
          </div>
        )}
      </div>

      {/* PASTDA: Description → Tel/Email → Location */}
      <div className="flex flex-col gap-5 items-start md:gap-6 w-[300px] sm:w-[400px] ">
        {data.description && (
          <HighlightedDescription
            text={t(data.description)}
            highlight={data.descriptionHighlight ? t(data.descriptionHighlight) : ''}
            className={descriptionClassName}
          />
        )}

        {(data.phone || data.email) && (
          <div
            className="flex flex-wrap items-center gap-4 md:gap-8 font-['Inter'] font-normal text-[14px] leading-[18px] text-[#1B1D20]"
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
            className="flex items-start gap-2 max-w-[250px] font-['Inter'] font-normal text-[14px] leading-[18px] text-[#1B1D20] mt-1"
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