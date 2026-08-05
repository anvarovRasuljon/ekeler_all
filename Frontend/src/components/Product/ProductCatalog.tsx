import React, { useMemo } from "react";
import ctaLeft from "../../assets/ProductPage_ProductLeft.png";
import ctaRight from "../../assets/ProductPage_right.png";
import { useLanguage } from "../../context/LanguageContext";

interface LocaleString {
  ru?: string;
  en?: string;
  uz?: string;
  [key: string]: string | undefined;
}

const title: LocaleString = { ru: 'Продукция', uz: 'Mahsulotlar', eng: 'Products' };
const description: LocaleString = { ru: 'Лучшие решения для вашего бизнеса', uz: 'Biznesingiz uchun eng yaxshi yechimlar', eng: 'Best solutions for your business' };

const CatalogCtaSection: React.FC = () => {
  const { t } = useLanguage();

  const titleText = useMemo(() => t(title), [t]);
  const descriptionText = useMemo(() => t(description), [t]);

  return (
    <section
      // Responsive: mobilda kichikroq padding va dekorativ rasmlar
      className="relative w-full overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-24 md:pb-28 md:pt-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {ctaLeft && (
          <img
            src={ctaLeft}
            alt=""
            className="absolute left-3 top-30 h-[110px] w-[110px] -translate-y-1/3 rounded-2xl object-cover shadow-sm sm:left-6 sm:h-[190px] sm:w-[190px] md:left-16 md:h-[260px] md:w-[260px]"
            loading="eager"
            decoding="async"
          />
        )}

        {ctaRight && (
          <div
            className="absolute right-3 top-[-265px] h-[200px] w-[140px] overflow-hidden rounded-[8px] shadow-sm sm:right-6 sm:h-[350px] sm:w-[250px] md:right-16"
          >
            <img
              src={ctaRight}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-2 text-center sm:px-0">
          {title && (
            <span
              className="mb-6 rounded-full border border-neutral-300 px-3 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
            >
              {titleText}
            </span>
          )}

          {description && (
            <p
              className="mt-3 max-w-xl break-words text-[24px] leading-[32px] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]"
            >
              {descriptionText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(CatalogCtaSection);