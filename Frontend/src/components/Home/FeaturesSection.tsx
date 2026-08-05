import React, { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import  leftImageUrl  from "../../assets/home_features_img.png";
import  rightImageUrl  from "../../assets/home_feature_secont_img.png";


interface FeaturesSectionProps {
  title?: any;
  description?: any;
  leftImage?: any;
  rightImage?: any;
}

const LOREM_20 =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.";

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title = "Features",
  description = LOREM_20,
}) => {
  const { t } = useLanguage();
  const titleText = useMemo(() => (title ? t(title) : null), [t, title]);
  const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);
  if (!title || !description) {
    return null;
  }

  return (
    <div
      // Responsive: mobilda balandlik kontentga qarab, lg dan boshlab minimum balandlik
      className="w-full bg-white lg:min-h-[380px]"
    >
      {/* Main content */}
      <div className="mx-auto flex h-full flex-col items-center gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-stretch md:px-12 md:py-0">
        <div className="flex w-full max-w-[264px] flex-shrink-0 flex-col justify-between md:h-full md:max-w-none md:w-[264px]">
          {leftImageUrl && (
            <img
              src={leftImageUrl}
              alt=""
              width={264}
              height={125}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-[125px] w-full max-w-full rounded-b-lg object-cover md:w-[264px]"
            />
          )}
        </div>

        {/* 2nd column - centered x and y */}
        <div className="flex flex-1 justify-center items-center">
          <div className="text-center">
            <h2
              className="mb-6 inline-block rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
            >
              {titleText}
            </h2>
            <p
              className="w-full max-w-[600px] break-words font-manrope text-[26px] font-normal leading-[34px] text-black sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]"
            >
              {descriptionText}
            </p>
          </div>
        </div>

        {/* 3rd column - image at right side, centered */}
        <div className="flex w-full flex-shrink-0 items-center justify-center md:w-auto">
          {rightImageUrl && (
            <img
              src={rightImageUrl}
              alt="Feature right"
              width={264}
              height={208}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-[180px] w-full max-w-[264px] rounded-2xl object-cover md:h-[208px] md:w-[264px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FeaturesSection);
