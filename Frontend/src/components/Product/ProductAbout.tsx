import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import aboutLeft from "../../assets/prochni_3.png";
import aboutRight from "../../assets/prochni_4.png";
import { useLanguage } from "../../context/LanguageContext";

interface LocaleString {
  _type?: string;
  eng?: string;
  ru?: string;
  uz?: string;
  [key: string]: string | undefined;
}

const title: LocaleString = { ru: 'Наша продукция', uz: 'Bizning mahsulotlar', eng: 'Our Products' };
const descriptionPart1: LocaleString = { ru: 'Высококачественные материалы ', uz: 'Yuqori sifatli materiallar ', eng: 'High-quality materials ' };
const buttonText: LocaleString = { ru: 'Наши услуги', uz: 'Bizning xizmatlar', eng: 'Our Services' };
const buttonLink = "/contact";
const leftImageUrl = aboutLeft;
const rightImageUrl = aboutRight;

const ProductAbout: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yRight = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      // Responsive: mobilda vertikal stack, lg dan boshlab 3 ustunli gorizontal layout
      className="relative flex w-full flex-col items-center gap-8 overflow-hidden bg-white px-4 py-12 sm:px-6 lg:h-[540px] lg:flex-row lg:justify-between lg:gap-0 lg:px-8 lg:py-0 xl:px-[32px]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      
      {/* Left image */}
      <div className="flex w-full max-w-[264px] flex-shrink-0 flex-col justify-start lg:h-full lg:w-[264px] lg:max-w-none">
        {leftImageUrl && (
          <motion.img
            src={leftImageUrl}
            alt=""
            className="h-[132px] w-full max-w-full rounded-b-lg object-cover lg:w-[264px]"
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ y: yLeft }}
          />
        )}
      </div>

      {/* Center content */}
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">
        <motion.h2
          className="text-[16px] font-medium text-[#1B1D20] rounded-full border border-neutral-300 px-3 py-1.5 mb-6 max-w-[610px] break-words"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t(title)}
        </motion.h2>

        <motion.p
          className="mb-8 max-w-[500px] break-words text-[26px] leading-[34px] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-[#1B1D20]">{t(descriptionPart1)}</span>
          {/* <span className="text-[#E88029]">{t(descriptionPart2)}</span> */}
        </motion.p>

        <a
          href={buttonLink}
          className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] transition mt-2 cursor-pointer"
        >
          <span className="flex gap-6 items-center">
            {t(buttonText)}
            <ArrowUpRight
              size={18}
              className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-neutral-300 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#1B1D20] transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        </a>
      </div>

      {/* Right image */}
      <div className="flex w-full max-w-[264px] flex-shrink-0 flex-col justify-end lg:h-full lg:w-[264px] lg:max-w-none">
        {rightImageUrl && (
          <motion.img
            src={rightImageUrl}
            alt=""
            className="h-[132px] w-full max-w-full rounded-t-lg object-cover lg:w-[264px]"
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ y: yRight }}
          />
        )}
      </div>
    </motion.section>
  );
};

export default ProductAbout;