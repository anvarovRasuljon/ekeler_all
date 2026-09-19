import React, { useMemo, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

export interface ProductDetailData {
  title: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  images?: string[];
  customFields?: Array<{ label: string; value: string }>;
}

interface ProductSpecificationsProps {
  data: ProductDetailData;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ data }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  const [descExpanded, setDescExpanded] = useState(false);

  const badgeLabel = { ru: 'Основная информация', uz: 'Asosiy maʼlumot', eng: 'Key information' };
  const headingLabel = { ru: 'Технические параметры', uz: 'Texnik parametrlar', eng: 'Specifications' };

  const specs = useMemo(() => {
    return data.customFields || [];
  }, [data]);

  const descWords = useMemo(() => {
    if (!data.description) return [];
    return data.description.trim().split(/\s+/);
  }, [data.description]);

  if (!data.title) return null;

  return (
    <section className="w-full bg-[#3F5D53] text-white">
      <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20">
        {/* Accordion specs */}
        <div className="flex flex-col">
          <span className="self-start px-4 py-1.5 mb-6 text-xs font-medium tracking-wide text-white/80 uppercase border rounded-full border-white/40">
            {t(badgeLabel)}
          </span>

          <h2 className="mb-6 break-words text-[clamp(22px,1.5rem+0.5vw,48px)] font-medium">
            {t(headingLabel)}
          </h2>

          <div className="mb-8 w-full border-t border-dashed border-white/30" />

          <div className="overflow-hidden rounded-2xl border border-white/20">
            <button
              type="button"
              onClick={() => setIsOpen(v => !v)}
              aria-expanded={isOpen}
              className="group flex min-h-[44px] w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-300 hover:bg-white/5 sm:px-6 sm:py-5"
            >
              <span className="break-words text-[clamp(16px,1rem+0.2vw,24px)] font-medium">{t({ ru: 'Общая информация', uz: 'Umumiy maʼlumot', eng: 'General information' })}</span>
              <span className="flex justify-center items-center w-10 h-10 rounded-full border transition-all duration-300 shrink-0 border-white/40 group-hover:border-white/60 group-hover:bg-white/20">
                {isOpen ? <Minus size={20} className="transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" /> : <Plus size={20} className="transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />}
              </span>
            </button>

            {/* Smooth accordion with max-height transition */}
            <div
              className="transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isOpen ? "1000px" : "0px",
                opacity: isOpen ? 1 : 0,
                overflow: "hidden",
              }}
            >

              {(data.shortDescription || data.description) && (
                <div className="grid grid-cols-1 gap-y-5 px-4 pt-6 mb-6 sm:px-6">
                  {data.shortDescription && (
                    <p className="font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-white/80">
                      {data.shortDescription}
                    </p>
                  )}
                  {data.description && (
                    <div className="max-h-[180px] overflow-y-auto">
                      <p className="font-['Inter'] text-[16px] font-normal leading-[24px] tracking-[-0.02em] text-white">
                        {descWords.length > 12 && !descExpanded
                          ? descWords.slice(0, 12).join(' ')
                          : data.description}
                        {descWords.length > 12 && (
                          <button
                            type="button"
                            onClick={() => setDescExpanded(v => !v)}
                            className="ml-1 inline underline text-white/70 hover:text-white"
                          >
                            {descExpanded ? t({ ru: 'Свернуть', uz: 'Yopish', eng: 'Collapse' }) : '...'}
                          </button>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-rows-4 grid-flow-col auto-cols-fr justify-between gap-x-8 gap-y-5 px-4 pb-6 sm:px-6 sm:pb-8">
                {specs.map((spec, i) => (
                  <div key={i} className="flex min-w-[160px] flex-col">
                    <span className="text-xs tracking-wider uppercase text-white/50">
                      {spec.label}
                    </span>
                    <span className="break-words text-[clamp(14px,0.85rem+0.1vw,18px)] font-normal text-white">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProductSpecifications);
