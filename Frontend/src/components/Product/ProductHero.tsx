import React from 'react';
import { motion } from 'framer-motion';
import { urlFor } from '../../sanity/client';
import { useLanguage } from '../../context/LanguageContext';

export interface ProductHeroData {
  title?: Record<string, string> | string;
  backgroundImage?: unknown;
  logoText?: Record<string, string> | string;
}

const ProductHero: React.FC<{ data: ProductHeroData | null }> = ({ data }) => {
  const { t } = useLanguage();

  if (!data) return null;

  const bgImage = data.backgroundImage
    ? urlFor(data.backgroundImage).width(1920).url()
    : null;

  const titleText = t(data);
  const logo = data.logoText ? t(data.logoText) : '';

  return (
    <div className="box-border relative w-full h-screen overflow-hidden">
      {/* Background image */}
      {bgImage ? (
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          src={bgImage}
          alt={(data.backgroundImage as { alt?: string })?.alt || 'Product'}
          className="absolute w-[calc(100%)] h-[calc(98.5%)] object-cover rounded-[8px]"
          loading="eager"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-[15px] bg-neutral-200 rounded-[8px]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Title — top-left */}
      <div className="absolute top-[6%] left-[4%] max-w-[50%] z-10">
     {titleText && (
  <motion.h1
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-[#FFFFFF] text-[50px] leading-[55px] font-[400] max-w-[550px] tracking-[0.02em] font-['Inter']"
  >
    {titleText.split(" ").map((word, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ))}
  </motion.h1>
)}
      </div>

      {/* Bottom animated text */}
      {logo && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[200%] flex justify-center pointer-events-none select-none z-0 overflow-hidden">
          <motion.p
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: 0, ease: 'linear' }}
className="whitespace-nowrap text-[#FFFFFF]/95 font-normal leading-normal text-[14vw] tracking-tight"          >
            {logo} — {logo} — {logo} — {logo} — {logo}
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default ProductHero;