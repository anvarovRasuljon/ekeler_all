import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';
import { Quote } from 'lucide-react';

function BlurredImg({
  src,
  alt,
  className,
  reveal = 'top-bottom',
}: {
  src: string;
  alt: string;
  className: string;
  reveal?: 'top-bottom' | 'bottom-top' | 'left-right' | 'right-left' | 'scale';
}) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
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
  }, []);

  const initialClip =
    reveal === 'bottom-top' ? 'inset(100% 0 0 0)' :
    reveal === 'left-right' ? 'inset(0 100% 0 0)' :
    reveal === 'right-left' ? 'inset(0 0 0 100%)' :
    reveal === 'scale' ? 'inset(0 0 0 0)' :
    'inset(0 0 100% 0)';

  return (
    <div ref={divRef} className="w-full h-full">
      <img
        src={src}
        alt={alt}
        className={`${className} transition-all duration-700 ${loaded ? 'blur-0 scale-100' : 'blur-[15px] scale-95'}`}
        style={{ opacity: loaded ? 1 : 0.6, clipPath: visible ? 'inset(0 0 0 0)' : initialClip }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

interface SectionBlockProps {
  label?: Record<string, string>;
  boldPrefix?: Record<string, string>;
  text?: Record<string, string>;
  quoteText?: Record<string, string>;
  images?: unknown[];
  imagePosition?: 'before' | 'after';
  index: number;
}

export default function SectionBlock({
  label,
  boldPrefix,
  text,
  quoteText,
  images = [],
  imagePosition = 'before',
  index,
}: SectionBlockProps) {
  const { t } = useLanguage();

  const validImages = images.filter(hasSanityImage);
  const hasTwo = validImages.length >= 2;
  const isReversed = index % 2 !== 0;

  const renderTwoImages = () => {
    const img1 = validImages[0];
    const img2 = validImages[1];
    const url1 = getImageUrl(img1, { width: 378, height: 302 });
    const url2 = getImageUrl(img2, { width: 252, height: 202 });
    if (!url1 && !url2) return null;

    return (
      <div className="flex flex-col sm:flex-row items-end sm:items-start gap-4 sm:gap-5 w-full max-w-[650px]">
        {url1 && (
          <div
            className={`w-full rounded-lg overflow-hidden shrink-0 ${
              isReversed ? 'sm:w-[252px] h-[202px]' : 'sm:w-[378px] h-[302px]'
            }`}
          >
            <BlurredImg
              src={url1}
              alt={(img1 as { alt?: string })?.alt || 'Section image 1'}
              className="w-full h-full object-cover"
              reveal="top-bottom"
            />
          </div>
        )}
        {url2 && (
          <div
            className={`w-full rounded-lg overflow-hidden shrink-0 ${
              isReversed ? 'sm:w-[378px] h-[302px]' : 'sm:w-[252px] h-[202px]'
            }`}
          >
            <BlurredImg
              src={url2}
              alt={(img2 as { alt?: string })?.alt || 'Section image 2'}
              reveal="bottom-top"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    );
  };

  const renderSingleImage = () => {
    const img = validImages[0];
    const url = getImageUrl(img, { width: 640, height: 320 });
    if (!url) return null;

    return (
      <div className="w-full max-w-[640px] h-[240px] md:h-[320px] rounded-lg overflow-hidden mx-auto md:mx-0">
        <BlurredImg
          src={url}
          alt={(img as { alt?: string })?.alt || 'Section image'}
          reveal="left-right"
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  const renderImages = () => {
    if (validImages.length === 0) return null;
    if (hasTwo) return renderTwoImages();
    return renderSingleImage();
  };

  const renderText = () => (
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 w-full max-w-[900px]">
      <div className="md:w-[150px] shrink-0">
        {label && (
          <h3 className="font-['Manrope'] font-normal text-[10px] leading-[18px] tracking-[0.08em] uppercase text-[#1B1D20]">
            {t(label)}
          </h3>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-6 min-w-0">
        {(boldPrefix || text) && (
          <p className="font-['Inter'] font-normal text-[14px] leading-[22px] text-neutral-500 whitespace-pre-line">
            {boldPrefix && (
              <span className="font-semibold text-[#1B1D20]">{t(boldPrefix)} </span>
            )}
            {t(text)}
          </p>
        )}

        {quoteText && t(quoteText) && (
          <div className="flex gap-4">
            <Quote className="text-[#1B1D20] shrink-0 fill-current rotate-180" size={24} />
            <p className="font-['Inter'] font-normal text-[14px] leading-[22px] text-[#1B1D20]">
              {t(quoteText)}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const imagesBlock = renderImages();
  const textBlock = renderText();

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {imagePosition === 'before' ? (
        <>
          {imagesBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imagesBlock}
        </>
      )}
    </div>
  );
}
