import React, { useMemo, useState } from "react";
import productHeroBg from "../../assets/BlogHero_bg.png";
import { useLanguage } from "../../context/LanguageContext";

const ServiceHero: React.FC = () => {
  const { t } = useLanguage();

  const logoText = {
    uz: "Tarmoqlar",
    ru: "Отрасли",
    eng: "Industries",
  };
  const altText = { uz: "Xizmat fon rasmi", ru: "Фоновое изображение отраслей", eng: "Industries background" };

  const logo = useMemo(() => t(logoText), [t, logoText]);
  const [loaded, setLoaded] = useState(false);

  return (
    // Responsive: mobilda minimal balandlik va kichikroq radius
    <section className="box-border overflow-hidden relative w-full h-[calc(60svh-66px)] lg:h-[calc(100svh-66px)] mb-[10px] lg:mb-0 transition-[clip-path,opacity] duration-[2000ms] ease-out rounded-[8px]">
      {/* Background */}
      <img
        src={productHeroBg}
        alt={t(altText)}
        className={`object-cover absolute inset-0 w-full h-full transition-all duration-700 ${
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-[15px]'
        }`}
      style={{ clipPath: loaded ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)' }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Animated Marquee */}
      <div className="overflow-hidden absolute inset-x-0 bottom-6 pointer-events-none select-none">
        <div
          className="flex w-max whitespace-nowrap will-change-transform animate-marquee"
        >
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="flex items-center shrink-0"
            >
              {[...Array(8)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="mx-8 text-[7vw] font-extralight leading-none text-white">
                    —
                  </span>

                  <span className="text-[18vw] sm:text-[14vw] font-extralight leading-[0.8] tracking-[-0.05em] text-white">
                    {logo}
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: marquee 120s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default React.memo(ServiceHero);