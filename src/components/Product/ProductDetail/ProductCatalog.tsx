import ProductImage from '../ProductImage';
import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import inpus_left_img from "../../../assets/Inpus_left_img.png";
import inpus_right_img from "../../../assets/Inpus_right_img.png";
import { useLanguage } from "../../../context/LanguageContext";

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

const LOREM_20 = {
  ru: 'Каталог продукции Ekeler — современные решения из гофрокартона.',
  uz: 'Ekeler mahsulotlari katalogi — zamonaviy sota karton yechimlari.',
  eng: 'Ekeler product catalog — modern corrugated cardboard solutions.',
};

const ProductCatalog: React.FC<InpusSectionProps> = ({
  twoColorMode = true,
  badgeText = { ru: 'КАТАЛОГ', uz: 'KATALOG', eng: 'CATALOG' },
  description = LOREM_20,
  descriptionPart1 = LOREM_20,
  buttonText = { ru: 'Наши услуги', uz: 'Bizning xizmatlar', eng: 'Our Services' },
}) => {
  const { t } = useLanguage();
  const fallbackBadge = { ru: 'О НАС', uz: 'BIZ HAQIMIZDA', eng: 'ABOUT US' };

  const badgeLabel = useMemo(() => (badgeText ? t(badgeText) : t(fallbackBadge)), [t, badgeText]);
  const buttonLabel = useMemo(() => t(buttonText), [t, buttonText]);
  const descriptionText = useMemo(() => description ? t(description) : "", [t, description]);
  const descriptionPartText = useMemo(() => descriptionPart1 ? t(descriptionPart1) : "", [t, descriptionPart1]);

  return (
    <section
      // Responsive: mobilda balandlik avtomatik, dekorativ rasmlar kichraydi
      className="relative mx-auto flex w-full max-w-[1540px] items-center justify-between overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-0 lg:min-h-[540px] lg:px-8 xl:px-8"
    >

      {/* Left image */}
      <div
        className="absolute left-2 top-[-30px] hidden overflow-hidden shadow-sm sm:block sm:left-6 sm:top-[-30px] md:left-16 md:top-[-30px] h-[clamp(160px,10rem+2vw,250px)] w-[270px]"
      >
        <ProductImage
          src={inpus_left_img}
          alt=""
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Center text */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">

        <span
          className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
        >
          {badgeLabel}
        </span>

        <h2 className="mb-8 w-full max-w-[610px] break-words text-[26px] leading-[34px] text-[#1B1D20] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[50px]">
          {twoColorMode ? (
            <>
              {descriptionPart1 && (
                <span
                  className="text-[#1B1D20]"
                >
                  {descriptionPartText}{" "}
                </span>
              )}
            </>
          ) : (
            <span
              className="text-[#1B1D20]"
            >
              {descriptionText}
            </span>
          )}
        </h2>

        <Link
          to="/catalog"
          className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] mt-[28px] cursor-pointer transition-all duration-700 ease-out"
        >
          <span className="inline-flex gap-6 items-center">
            <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
              <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                <p className="whitespace-nowrap text-[16px] font-['Inter'] font-normal leading-[1.2em] text-[#1B1D20]">
                  {buttonLabel}
                </p>
                <p className="whitespace-nowrap text-[16px] font-['Inter'] font-medium leading-[1.2em] text-[#1B1D20]">
                  {buttonLabel}
                </p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-[#E88029] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:scale-110" />
          </span>
          <div className="relative mt-[8px] h-[1.5px] w-full overflow-hidden">
            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC]/40 transition-colors duration-500 group-hover:bg-transparent" />
            <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#1B1D20] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
          </div>
        </Link>

      </div>

      {/* Right image */}
      <div
        className="absolute right-2 bottom-[-30px] hidden overflow-hidden shadow-sm sm:block sm:right-6 sm:bottom-[-40px] md:right-16 md:bottom-[-50px] h-[clamp(160px,10rem+2vw,250px)] w-[270px]"
      >
        <ProductImage
          src={inpus_right_img}
          alt=""
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full"
        />
      </div>

    </section>
  );
};

export default React.memo(ProductCatalog);