import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "../../sanity/client";

interface LocaleString {
  _type?: string;
  eng?: string;
  ru?: string;
  uz?: string;
  [key: string]: string | undefined;
}

interface ProductAboutProps {
  title?: string | LocaleString;
  descriptionPart1?: string | LocaleString;
  descriptionPart2?: string | LocaleString;
  leftImage?: any;
  rightImage?: any;
  buttonText?: string | LocaleString;
  buttonLink?: string;
  t?: (value: any) => string;
}

const ProductAbout: React.FC<ProductAboutProps> = ({
  title = "Product Title",
  descriptionPart1 = "This is the first part of the description.",
  descriptionPart2 = " This is the second part with different color.",
  leftImage,
  rightImage,
  buttonText = "Our Services",
  buttonLink = "#services",
  t = (v) => (typeof v === "string" ? v : v?.eng || v?.uz || ""),
}) => {
  const leftImageUrl = leftImage ? urlFor(leftImage).url() : "";
  const rightImageUrl = rightImage ? urlFor(rightImage).url() : "";
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
      className="relative w-full h-[540px] bg-white overflow-hidden flex justify-between items-center px-[32px]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      
      {/* Left image */}
      <div className="w-[264px] h-full flex-shrink-0 flex flex-col justify-start">
        {leftImageUrl && (
          <motion.img
            src={leftImageUrl}
            alt=""
            className="w-[264px] h-[132px] object-cover rounded-b-lg"
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
      <div className="flex-1 min-w-0 flex flex-col items-center text-center px-[32px]">
        <motion.h2
          className="text-[16px] font-medium text-[#1B1D20] rounded-full border border-neutral-300 px-3 py-1.5 mb-6 max-w-[610px] break-words"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t(title)}
        </motion.h2>

        <motion.p
          className="text-[40px] leading-[48px] max-w-[500px] mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-[#1B1D20]">{t(descriptionPart1)}</span>
          <span className="text-[#E88029]">{t(descriptionPart2)}</span>
        </motion.p>

        <a
          href={buttonLink}
          className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] transition mt-2 cursor-pointer"
        >
          <span className="flex gap-6 items-center">
            {t(buttonText)}
            <ArrowRight
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
      <div className="w-[264px] h-full flex-shrink-0 flex flex-col justify-end">
        {rightImageUrl && (
          <motion.img
            src={rightImageUrl}
            alt=""
            className="w-[264px] h-[132px] object-cover rounded-t-lg"
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