import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import  leftImageUrl  from "../../assets/home_features_img.png";
import  rightImageUrl  from "../../assets/home_feature_secont_img.png";


interface FeaturesSectionProps {
  title?: any;
  description?: any;
  leftImage?: any;
  rightImage?: any;
}

const LOREM_20 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title = "Features",
  description = LOREM_20,
}) => {
  const { t } = useLanguage();
  const titleText = useMemo(() => (title ? t(title) : null), [t, title]);
  const descriptionText = useMemo(() => (description ? t(description) : null), [t, description]);

  const highlightPart = 'adipiscing elit, sed do eiusmod tempor';
  const { descBefore, descAfter } = useMemo(() => {
    if (!descriptionText) return { descBefore: '', descAfter: '' };
    const index = String(descriptionText).indexOf(highlightPart);
    if (index === -1) return { descBefore: String(descriptionText), descAfter: '' };
    return {
      descBefore: String(descriptionText).slice(0, index),
      descAfter: String(descriptionText).slice(index),
    };
  }, [descriptionText]);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!title || !description) {
    return null;
  }

  return (
    <div
      ref={sectionRef}
      // Responsive: mobilda balandlik kontentga qarab, lg dan boshlab minimum balandlik
      className="w-full bg-white lg:min-h-[480px]"
    >
      {/* Main content */}
      <div className="grid grid-cols-1 gap-8 px-4 py-12 mx-auto h-full sm:px-6 md:grid-cols-2 md:gap-12 md:px-12 md:py-0">
        <div className="md:col-start-1 md:row-start-1 place-self-start flex w-full max-w-[264px] flex-shrink-0 flex-col justify-between md:max-w-none md:w-[264px]">
          {leftImageUrl && (
            <div className="h-[clamp(120px,8rem+2vw,155px)] w-full max-w-full overflow-hidden rounded-b-lg md:w-[264px]">
              <img
                src={leftImageUrl}
                alt=""
                width={264}
                height={125}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${
                  inView ? 'translate-y-0' : '-translate-y-full'
              }`}
              />
            </div>
          )}
        </div>

        {/* 2nd column - centered x and y */}
        <div className="flex justify-center items-center place-self-center w-full md:col-start-1 md:row-start-2">
          <div className="w-full max-w-[600px] text-center">
            <h2
              className="mb-6 inline-block rounded-full border border-neutral-300 px-4 py-1.5 font-inter text-xs font-medium tracking-wide text-neutral-500"
            >
              {titleText}
            </h2>
            <p
              className="w-full break-words font-manrope text-[clamp(24px,1.5rem+0.8vw,40px)] font-normal leading-[clamp(30px,2rem+1vw,48px)] text-black"
            >
              {descBefore && <span className="text-black">{descBefore}</span>}
              {descAfter && <span className="text-[#E88029]">{descAfter}</span>}
            </p>
          </div>
        </div>

        {/* 3rd column - image at right side, centered */}
        <div className="flex flex-shrink-0 justify-center items-center place-self-center w-full md:col-start-2 md:row-start-2 md:w-auto">
          {rightImageUrl && (
            <div className="h-[clamp(140px,9rem+2vw,208px)] w-full max-w-[264px] overflow-hidden rounded-2xl md:w-[264px]">
              <img
                src={rightImageUrl}
                alt="Feature right"
                width={264}
                height={208}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FeaturesSection);
