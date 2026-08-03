import React, { useRef, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import inpus_left_img from "../../assets/Inpus_left_img.png";
import inpus_right_img from "../../assets/Inpus_right_img.png";
import { useLanguage } from "../../context/LanguageContext";

interface InpusSectionProps {
  twoColorMode?: boolean;
  badgeText?: any;
  description?: any;
  descriptionPart1?: any;
  descriptionHighlight?: any;
  descriptionPart2?: any;
  buttonText?: any;
  topImage?: any;
  bottomImage?: any;
}

const LOREM_20 = "Lorem Impus porum dor, forem dorem quick, lore puel duit ";

const InpusSection: React.FC<InpusSectionProps> = ({
  twoColorMode = true,
  badgeText = "INPUS",
  description = LOREM_20,
  descriptionPart1 = LOREM_20,
  buttonText = "Contact",
}) => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const badgeTextValue = useMemo(() => (badgeText ? t(badgeText) : 'ABOUT US'), [t, badgeText]);
  const descriptionPart1Text = useMemo(() => (descriptionPart1 ? t(descriptionPart1) : null), [t, descriptionPart1]);
  const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : null), [t, buttonText]);

  return (
    <motion.section
      ref={ref}
      // Responsive: mobilda balandlik kontentga qarab, dekorativ rasmlar kichrayadi
      className="relative flex w-full items-center justify-between overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-0 lg:h-[540px] lg:px-8 xl:px-[32px]"
      initial={{ opacity: 0, y: reduced ? 0 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 40 }}
      transition={{ duration: reduced ? 0.01 : 0.6 }}
    >

      {/* Left image */}
      <motion.div
        className="absolute left-2 top-[-165px] h-[150px] w-[110px] overflow-hidden rounded-[8px] shadow-sm sm:left-6 sm:h-[260px] sm:w-[250px] md:left-16"
        initial={{ opacity: 0, x: reduced ? 0 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reduced ? 0 : -40 }}
        transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.2 }}
      >
        <img
          src={inpus_left_img}
          alt=""
          width={250}
          height={260}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Center text */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">

        <motion.span
          className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 20 }}
          transition={{ duration: reduced ? 0.01 : 0.5 }}
        >
          {badgeTextValue}
        </motion.span>

        <h2 className="mb-8 w-full max-w-[610px] break-words text-[26px] leading-[34px] text-[#1B1D20] sm:text-[32px] sm:leading-[42px] lg:max-h-[240px] lg:text-[40px] lg:leading-[50px]">
          {twoColorMode ? (
            <>
              {descriptionPart1Text && (
                <motion.span
                  className="text-[#1B1D20]"
                  initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 20 }}
                  transition={{ duration: reduced ? 0.01 : 0.5, delay: reduced ? 0 : 0.1 }}
                >
                  {descriptionPart1Text}{" "}
                </motion.span>
              )}
            </>
          ) : (
            <motion.span
              className="text-[#1B1D20]"
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 20 }}
              transition={{ duration: reduced ? 0.01 : 0.5, delay: reduced ? 0 : 0.1 }}
            >
              {descriptionText}
            </motion.span>
          )}
        </h2>

        <Link
          to="/contact"
          className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] transition mt-[28px] cursor-pointer"
        >
          <span className="inline-flex gap-6 items-center">
            {buttonLabel}
            <ArrowUpRight size={18} className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-neutral-300 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#1B1D20] transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        </Link>

      </div>

      {/* Right image */}
      <motion.div
        className="absolute right-2 bottom-[-165px] h-[150px] w-[110px] overflow-hidden rounded-[8px] shadow-sm sm:right-6 sm:h-[250px] sm:w-[250px] md:right-16"
        initial={{ opacity: 0, x: reduced ? 0 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reduced ? 0 : 40 }}
        transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.3 }}
      >
        <img
          src={inpus_right_img}
          alt=""
          width={250}
          height={250}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="object-cover w-full h-full"
        />
      </motion.div>

    </motion.section>
  );
};

export default React.memo(InpusSection);