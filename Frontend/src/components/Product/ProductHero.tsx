import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import productHeroBg from '../../assets/product_hero.png';
import { useLanguage } from '../../context/LanguageContext';

const ProductHero: React.FC = () => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const logoText: Record<string, string> | string = { ru: 'EKELER', uz: 'EKELER', eng: 'EKELER' };
  const bgImage = productHeroBg;

  const logo = useMemo(() => t(logoText), [t, logoText]);

  return (
    <div className="box-border overflow-hidden relative w-full h-screen">
      {/* Background image */}
      {bgImage ? (
        <motion.img
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.01 : 1, ease: 'easeOut' }}
          src={bgImage}
          alt="Product"
          className="absolute w-[calc(100%)] h-[calc(98.5%)] object-cover rounded-[8px]"
          loading="eager"
          decoding="async"
          style={{ willChange: 'opacity, transform' }}
        />
      ) : (
        <div className="absolute inset-[15px] bg-neutral-200 rounded-[8px]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Bottom animated text */}
      {logo && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[0%] w-[200%] flex justify-center pointer-events-none select-none z-0 overflow-hidden">
          <motion.p
            animate={{ x: reduced ? 0 : [0, -1000] }}
            transition={{ duration: reduced ? 0.01 : 20, repeat: 0, ease: 'linear' }}
            /* Responsive: mobilda matn biroz kattaroq vw bilan balanslanadi */
            className="whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]"
          >
            {logo} — {logo} — {logo} — {logo} — {logo}
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductHero);