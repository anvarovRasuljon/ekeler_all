import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { urlFor } from "../../sanity/client";
import { useLanguage } from "../../context/LanguageContext";


interface FeaturesSectionProps {
  title?: any;
  description?: any;
  leftImage?: any;
  rightImage?: any;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title,
  description,
  leftImage,
  rightImage,
}) => {
  const { t } = useLanguage();
  if (!title || !description) {
    return null;
  }

  const leftImageUrl = leftImage ? urlFor(leftImage).url() : "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1400&auto=format&fit=crop";
  const rightImageUrl = rightImage ? urlFor(rightImage).url() : "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1400&auto=format&fit=crop";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yRight = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      className="w-full bg-white h-[380px]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main content */}
      <div className="flex flex-col gap-8 mx-auto h-full md:flex-row md:px-12">
        <div className="w-[264px] h-full flex-shrink-0 flex flex-col justify-start">
          <motion.img
            src={leftImageUrl}
            alt=""
            loading="eager"
            decoding="async"
            className="w-[264px] h-[132px] object-cover rounded-b-lg"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ y: yLeft }}
          />
        </div>

        {/* 2nd column - centered x and y */}
        <div className="flex flex-1 justify-center items-center">
          <div className="text-center">
            <motion.h2
              className="mb-6 text-[10px] leading-[18px] font-normal text-neutral-800 font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t(title)}
            </motion.h2>
            <motion.p
              className="text-[40px] leading-[48px] font-normal text-black font-manrope w-[600px]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t(description)}
            </motion.p>
          </div>
        </div>

        {/* 3rd column - image at right side, centered */}
        <div className="flex flex-shrink-0 justify-center items-center">
          <motion.img
            src={rightImageUrl}
            alt="Feature right"
            loading="eager"
            decoding="async"
            className="object-cover rounded-2xl"
            style={{ width: '208px', height: '208px', y: yRight }}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
