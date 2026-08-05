import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import topImageUrl from "../../assets/home_about_first_img.png";
import bottomImageUrl from "../../assets/home_about_second_img.png";

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
  title = "ABOUT US",
  descriptionPart1 = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.",
  buttonText = "ABOUT US",
  // topImage: topImageData,
  // bottomImage: bottomImageData,
}) => {
  const { t } = useLanguage();
  const titleText = useMemo(() => (title ? t(title) : 'ABOUT US'), [t, title]);
  const descriptionText = useMemo(() => (descriptionPart1 ? t(descriptionPart1) : null), [t, descriptionPart1]);
  const buttonLabel = useMemo(() => (buttonText ? t(buttonText) : 'ABOUT US'), [t, buttonText]);

  return (
    <section
      // Responsive: mobilda vertikal stack, desktopda 3 ustunli gorizontal layout
      className="relative flex w-full flex-col items-center gap-8 overflow-hidden bg-white px-4 py-12 sm:px-6 lg:min-h-[640px] lg:flex-row lg:justify-between lg:gap-0 lg:py-0 lg:px-8 xl:px-8"
    >
      {/* Left image */}
      <div className="flex w-full max-w-[250px] flex-shrink-0 flex-col justify-start lg:h-full lg:w-[250px] lg:max-w-none">
        {topImageUrl && (
          <img
            src={topImageUrl}
            alt=""
            width={250}
            height={125}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-[125px] w-full max-w-full rounded-b-lg object-cover lg:w-[250px]"
          />
        )}
      </div>

      {/* Center text */}
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-0 text-center sm:px-6 lg:px-[32px]">
        <span
          className="mb-6 rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
        >
          {titleText}
        </span>

        <h2 className="mb-8 w-full max-w-[610px] break-words text-[26px] leading-[34px] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[50px]">
          {descriptionPart1 && (
            <span
              className="text-[#1B1D20]"
            >
              {descriptionText}{" "}
            </span>
          )}
        </h2>

        <a
          href="/about"
          className="group inline-flex flex-col items-center text-[16px] text-[#1B1D20] hover:text-[#E88029] mt-[28px] cursor-pointer"
        >
          <span className="inline-flex gap-6 items-center">
            {buttonLabel}
            <ArrowUpRight size={18} className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-neutral-300 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#1B1D20] group-hover:scale-x-100" />
          </div>
        </a>
      </div>

      {/* Right image */}
      <div className="flex w-full max-w-[250px] flex-shrink-0 flex-col justify-end lg:h-full lg:w-[250px] lg:max-w-none">
        {bottomImageUrl && (
          <img
            src={bottomImageUrl}
            alt=""
            width={250}
            height={125}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-[125px] w-full max-w-full rounded-t-lg object-cover lg:w-[250px]"
          />
        )}
      </div>
    </section>
  );
};

export default React.memo(AboutUs);
