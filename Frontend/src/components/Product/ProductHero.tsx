import React, { useMemo } from 'react';
import productHeroBg from '../../assets/product_hero.png';
import { useLanguage } from '../../context/LanguageContext';

const ProductHero: React.FC = () => {
  const { t } = useLanguage();

  const logoText: Record<string, string> | string = { ru: 'EKELER', uz: 'EKELER', eng: 'EKELER' };
  const bgImage = productHeroBg;

  const logo = useMemo(() => t(logoText), [t, logoText]);

  return (
    <div className="box-border overflow-hidden relative w-full h-screen">
      {/* Background image */}
      {bgImage ? (
        <img
          src={bgImage}
          alt="Product"
          className="absolute w-[calc(100%)] h-[calc(98.5%)] object-cover rounded-[8px]"
          loading="eager"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-[15px] bg-neutral-200 rounded-[8px]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Bottom animated text */}
      {logo && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[0%] w-[200%] flex justify-center pointer-events-none select-none z-0 overflow-hidden">
          <p
            /* Responsive: mobilda matn biroz kattaroq vw bilan balanslanadi */
            className="whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]"
          >
            {logo} — {logo} — {logo} — {logo} — {logo}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductHero);