import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "../../sanity/client";
import { useLanguage } from "../../context/LanguageContext";
// import topImage from "../../assets/hero.png";
// import bottomImage from "../../assets/hero.png";

interface AboutUsProps {
  title?: any;
  descriptionPart1?: any;
  descriptionHighlight?: any;
  descriptionPart2?: any;
  buttonText?: any;
  topImage?: any;
  bottomImage?: any;
}

const AboutUs: React.FC<AboutUsProps> = ({
  title,
  descriptionPart1,
  descriptionHighlight,
  descriptionPart2,
  buttonText = "Our Services",
  topImage: topImageData,
  bottomImage: bottomImageData,
}) => {
  const { t } = useLanguage();
  const imageParams = { w: 250, h: 125, fit: 'crop' };
  const topImageUrl = topImageData ? urlFor(topImageData).width(imageParams.w).height(imageParams.h).fit('crop').url() : "";
  const bottomImageUrl = bottomImageData ? urlFor(bottomImageData).width(imageParams.w).height(imageParams.h).fit('crop').url() : "";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-[640px] bg-white overflow-hidden flex justify-between items-center px-[32px]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left image */}
      <div className="w-[250px] h-full flex-shrink-0 flex flex-col justify-start">
        {topImageUrl && (
          <motion.img
            src={topImageUrl}
            alt=""
            width={250}
            height={125}
            loading="eager"
            decoding="async"
            className="w-[250px] h-[125px] object-cover rounded-b-lg"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ y: yLeft }}
          />
        )}
      </div>

      {/* Center text */}
      <div className="flex-1 min-w-0 flex flex-col items-center text-center px-[32px]">
        <motion.span
          className="uppercase tracking-[4px] text-[12px] text-[#1B1D20] mb-5 block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {title ? t(title) : 'ABOUT US'}
        </motion.span>

        <h2 className="text-[40px] leading-[50px] mb-8 break-words max-h-[240px] w-[610px]">
          {descriptionPart1 && (
            <motion.span
              className="text-[#1B1D20]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t(descriptionPart1)}{" "}
            </motion.span>
          )}
          {descriptionHighlight && (
            <motion.span
              className="text-[#E88029]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t(descriptionHighlight)}{" "}
            </motion.span>
          )}
          {descriptionPart2 && (
            <motion.span
              className="text-[#1B1D20]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t(descriptionPart2)}
            </motion.span>
          )}
        </h2>

        <a
          href="#services"
          className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] transition mt-[28px] cursor-pointer"
        >
          <span className="inline-flex items-center gap-6">
            {t(buttonText)}
            <ArrowRight size={18} className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-neutral-300 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#1B1D20] transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        </a>
      </div>

      {/* Right image */}
      <div className="w-[250px] h-full flex-shrink-0 flex flex-col justify-end">
        {bottomImageUrl && (
          <motion.img
            src={bottomImageUrl}
            alt=""
            width={250}
            height={125}
            loading="eager"
            decoding="async"
            className="w-[250px] h-[125px] object-cover rounded-t-lg"
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

export default AboutUs;
