import React from "react";
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

  return (
    <section
      // Responsive: mobilda vertikal stack, lg dan boshlab 3 ustunli gorizontal layout
      className="relative flex w-full flex-col items-center gap-8 overflow-hidden bg-white px-4 py-12 sm:px-6 lg:min-h-[540px] lg:flex-row lg:justify-between lg:gap-0 lg:px-8 lg:py-0 xl:px-8"
    >

      {/* Left image */}
      <div className="flex w-full max-w-[264px] flex-shrink-0 flex-col justify-start lg:h-full lg:w-[264px] lg:max-w-none">
        {leftImageUrl && (
          <img
            src={leftImageUrl}
            alt=""
            className="h-[132px] w-full max-w-full rounded-b-lg object-cover lg:w-[264px]"
            loading="eager"
            decoding="async"
          />
        )}
      </div>

      {/* Center content */}
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">
        <h2
          className="text-[16px] font-medium text-[#1B1D20] rounded-full border border-neutral-300 px-3 py-1.5 mb-6 max-w-[610px] break-words"
        >
          {t(title)}
        </h2>

        <p
          className="mb-8 max-w-[500px] break-words text-[26px] leading-[34px] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]"
        >
          <span className="text-[#1B1D20]">{t(descriptionPart1)}</span>
          {/* <span className="text-[#E88029]">{t(descriptionPart2)}</span> */}
        </p>

        <a
          href={buttonLink}
          className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] mt-2 cursor-pointer"
        >
          <span className="flex gap-6 items-center">
            {t(buttonText)}
            <ArrowUpRight
              size={18}
              className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 "
            />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-neutral-300 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#1B1D20]    group-hover:scale-x-100" />
          </div>
        </a>
      </div>

      {/* Right image */}
      <div className="flex w-full max-w-[264px] flex-shrink-0 flex-col justify-end lg:h-full lg:w-[264px] lg:max-w-none">
        {rightImageUrl && (
          <img
            src={rightImageUrl}
            alt=""
            className="h-[132px] w-full max-w-full rounded-t-lg object-cover lg:w-[264px]"
            loading="eager"
            decoding="async"
          />
        )}
      </div>
    </section>
  );
};

export default ProductAbout;