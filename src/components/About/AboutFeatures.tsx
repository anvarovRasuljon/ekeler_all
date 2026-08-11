import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';

export interface AboutCompanyFeatureData {
  image?: unknown;
  title?: Record<string, string>;
  description?: Record<string, string>;
  description_bottom?: Record<string, string>;

}

function SanityImage({
  source,
  alt,
  className,
  width,
  height,
  priority = false,
  reveal = 'right-left',
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
        className={`${className} transition-all duration-700 ${loaded ? 'scale-100 blur-0' : 'scale-95 blur-[15px]'}`}
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
            reveal="scale"
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

        {(data.description || data.description_bottom) && (
          <div className="flex flex-col max-w-[490px]">
            {data.description && (
              <p className="font-['Inter'] text-sm leading-relaxed text-[#1B1D20] sm:text-base whitespace-pre-line">
                {t(data.description)}
              </p>
            )}
            {data.description_bottom && (
              <p className="font-['Inter'] text-sm leading-relaxed text-[#1B1D20] mt-6 sm:text-base whitespace-pre-line">
                {t(data.description_bottom)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(AboutCompanyFeature);