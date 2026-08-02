import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl, hasSanityImage } from '../../sanity/client';
import { Quote } from 'lucide-react';

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
            <img
              src={url1}
              alt={(img1 as { alt?: string })?.alt || 'Section image 1'}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {url2 && (
          <div
            className={`w-full rounded-lg overflow-hidden shrink-0 ${
              isReversed ? 'sm:w-[378px] h-[302px]' : 'sm:w-[252px] h-[202px]'
            }`}
          >
            <img
              src={url2}
              alt={(img2 as { alt?: string })?.alt || 'Section image 2'}
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
        <img
          src={url}
          alt={(img as { alt?: string })?.alt || 'Section image'}
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
