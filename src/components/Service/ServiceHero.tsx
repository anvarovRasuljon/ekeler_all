import React, { useMemo } from "react";
import productHeroBg from "../../assets/BlogHero_bg.png";
import { useLanguage } from "../../context/LanguageContext";

const ServiceHero: React.FC = () => {
  const { t } = useLanguage();

  const logoText = {
    uz: "Tarmoqlar",
    ru: "Tarmoqlar",
    eng: "Tarmoqlar",
  };

  const logo = useMemo(() => t(logoText), [t, logoText]);

  return (
    // Responsive: mobilda minimal balandlik va kichikroq radius
    <section className="relative h-[35vh] min-h-[220px] w-full overflow-hidden rounded-xl sm:h-[45vh] sm:rounded-2xl">
      {/* Background */}
      <img
        src={productHeroBg}
        alt="Hero Background"
        className="object-cover absolute inset-0 w-full h-full"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Animated Marquee */}
      <div className="overflow-hidden absolute inset-x-0 bottom-6 pointer-events-none select-none">
        <div
          className="flex whitespace-nowrap"
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

                  <span className="text-[8vw] lg:text-[9vw] font-extralight leading-[0.8] tracking-[-0.05em] text-white">
                    {logo}
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServiceHero);