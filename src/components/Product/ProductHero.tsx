import React, { useMemo } from 'react';
import productHeroBg from '../../assets/product_hero.png';
import { useLanguage } from '../../context/LanguageContext';

const ProductHero: React.FC = () => {
  const { t } = useLanguage();

  const logoText: Record<string, string> | string = { ru: 'EKELER', uz: 'EKELER', eng: 'EKELER' };
  const bgImage = productHeroBg;

  const logo = useMemo(() => t(logoText), [t, logoText]);
  const marqueeSegment = useMemo(() => {
    if (!logo) return '';
    return Array(8).fill(logo).join(' — ') + ' —\u00A0';
  }, [logo]);

  return (
    <div className="box-border overflow-hidden relative w-full h-[calc((100dvh-81px)/2)] lg:h-[calc(100dvh-16px)] transition-[clip-path,opacity] duration-[1200ms] ease-out">
      {/* Background image */}
      {bgImage ? (
        <img
          src={bgImage}
          alt="Product"
          className="absolute w-full h-full object-cover rounded-[8px]"
          loading="eager"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-[15px] bg-neutral-200 rounded-[8px]" />
      )}

      {/* Bottom infinite marquee text */}
      {marqueeSegment && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
          <div className="flex w-max will-change-transform animate-marquee">
            <p className="shrink-0 whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]">
              {marqueeSegment}
            </p>
            <p className="shrink-0 whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]">
              {marqueeSegment}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default React.memo(ProductHero);