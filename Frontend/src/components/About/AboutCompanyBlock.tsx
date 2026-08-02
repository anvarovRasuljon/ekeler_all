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
  return <img src={url} alt={alt || ''} className={className} />;
}

export default function AboutCompanyBlock({
  data,
}: {
  data: AboutCompanyBlockData | null;
}) {
  const { t } = useLanguage();

  if (!data) return null;

  const textClass =
    "font-['Inter'] font-normal text-[14px] leading-[22px] text-[#1B1D20]";

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      
      {/* —— 1-blok: katta + kichik rasm → title + description —— */}
      <div className="flex flex-col min-h-[500px] justify-between">
        
        {/* Rasmlar: 370×300 + 250×200 */}
        <div className="flex flex-col items-end gap-4 mb-15 sm:flex-row">
          {hasSanityImage(data.image370_1) && (
            <div className="w-full sm:w-[380px] h-[320px] rounded-[8px] overflow-hidden shrink-0">
              <SanityImage
                source={data.image370_1}
                alt={(data.image370_1 as { alt?: string })?.alt}
                className="object-cover w-full h-full"
                width={370}
                height={300}
              />
            </div>
          )}
          {hasSanityImage(data.image370_2) && (
            <div className="w-full sm:w-[270px] h-[200px] rounded-[8px] overflow-hidden shrink-0">
              <SanityImage
                source={data.image370_2}
                alt={(data.image370_2 as { alt?: string })?.alt}
                className="object-cover w-full h-full"
                width={250}
                height={200}
              />
            </div>
          )}
        </div>

        {/* Title (start) + Description (space-between) */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          {data.title1 && (
            <h2 className={`${textClass} `}>
              {t(data.title1)}
            </h2>
          )}
          {data.description1 && (
            <p className={`${textClass} max-w-[480px] whitespace-pre-line text-left`}>
              {t(data.description1)}
            </p>
          )}
        </div>
      </div>

      {/* —— 2-blok: kichik + katta rasm → title + description → mini descr —— */}
      <div className="flex flex-col min-h-[500px] justify-between">
        {/* Rasmlar: 250×200 + 370×300 */}
        <div className="flex flex-col items-end gap-4 mb-5 sm:flex-row">
          {hasSanityImage(data.image350_1) && (
            <div className="w-full sm:w-[270px] h-[200px] rounded-[8px] overflow-hidden shrink-0">
              <SanityImage
                source={data.image350_1}
                alt={(data.image350_1 as { alt?: string })?.alt}
                className="object-cover w-full h-full"
                width={250}
                height={200}
              />
            </div>
          )}
          {hasSanityImage(data.image350_2) && (
            <div className="w-full sm:w-[380px] h-[300px] rounded-[8px] overflow-hidden shrink-0">
              <SanityImage
                source={data.image350_2}
                alt={(data.image350_2 as { alt?: string })?.alt}
                className="object-cover w-full h-full"
                width={370}
                height={300}
              />
            </div>
          )}
        </div>

      <div className="flex flex-row items-start justify-between gap-4">
  {/* Chap: title */}
  {data.title2 && (
    <h2 className={`${textClass}  shrink-0`}>
      {t(data.title2)}
    </h2>
  )}

  {/* O'ng: 2 ta description — flex-col */}
  <div className="flex flex-col gap-5 max-w-[480px]">
    {data.description2 && (
      <p className={`${textClass} whitespace-pre-line text-start`}>
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
    <p className={`${textClass} whitespace-pre-line text-start`}>
      {t(data.bodyText)}
    </p>
  </div>
)}
  </div>
</div>

      </div>
    </div>
  );
}