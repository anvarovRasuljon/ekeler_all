import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { getImageUrl } from "../../../sanity/client";

import "swiper/css";
import "swiper/css/pagination";

interface LocaleString {
  eng?: string;
  ru?: string;
  uz?: string;
  [key: string]: string | undefined;
}

export interface ProductDetailData {
  title: LocaleString;
  shortDescription?: LocaleString;
  sizes?: string[];
  material?: LocaleString;
  productCode?: string;
  specifications?: Array<{ label: LocaleString; value: LocaleString }>;
  image?: any;
  images?: any[];
}

interface ProductSpecificationsProps {
  data: ProductDetailData;
}

interface SpecItem {
  label: LocaleString | string;
  value: LocaleString | string;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ data }) => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(true);

  const images = data.images || [];

  const specs: SpecItem[] = useMemo(() => {
    if (data.specifications && data.specifications.length > 0) {
      return data.specifications.map((s) => ({ label: s.label, value: s.value }));
    }

    const base: SpecItem[] = [];
    if (data.sizes && data.sizes.length > 0) {
      base.push(...data.sizes.map((s) => ({ label: "Razmer", value: s })));
    }
    if (data.material) {
      base.push({ label: "Material", value: t(data.material) });
    }
    if (data.productCode) {
      base.push({ label: "Tovar kodi", value: data.productCode });
    }
    if (data.shortDescription) {
      base.push({ label: "Tavsif", value: t(data.shortDescription) });
    }

    const placeholders: SpecItem[] = Array.from({ length: 12 }).map((_, i) => ({
      label: `LOREM IMPUS ${i + 1}`,
      value: `Lorem ${i + 1}`,
    }));

    return base.length > 0 ? [...base, ...placeholders].slice(0, 12) : placeholders;
  }, [data, t]);

  if (!data.title) return null;

  return (
    <motion.section
      className="w-full bg-[#3F5D53] text-white"
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0.01 : 0.6 }}
    >
      {/* Responsive: mobilda kichik padding, spec grid 1 ustun bo'ladi */}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-start gap-8 px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:grid-cols-2 lg:gap-12">
        {/* LEFT: Accordion specs */}
        <motion.div
          className="flex flex-col"
          initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.1 }}
        >
          <motion.span
            className="self-start px-4 py-1.5 mb-6 text-xs font-medium tracking-wide text-white/80 uppercase border rounded-full border-white/40"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0.01 : 0.5 }}
          >
            Asosiy malumot
          </motion.span>

          <motion.h2
            className="mb-6 break-words text-2xl font-medium sm:text-3xl md:text-4xl lg:text-5xl"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0.01 : 0.5, delay: reduced ? 0 : 0.1 }}
          >
            Texnik parametrlar
          </motion.h2>

          <div className="mb-8 w-full border-t border-dashed border-white/30" />

          <div className="overflow-hidden rounded-2xl border border-white/20">
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              className="flex min-h-[44px] w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-white/5 sm:px-6 sm:py-5"
            >
              <span className="break-words text-lg font-medium sm:text-xl md:text-2xl">umumiy malumot</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>

            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 px-4 pb-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 sm:px-6 sm:pb-8">
                {specs.map((spec, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col"
                    initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: reduced ? 0.01 : 0.4, delay: reduced ? 0 : (0.2 + i * 0.05) }}
                  >
                    <span className="text-xs tracking-wider uppercase text-white/50">
                      {t(spec.label)}
                    </span>
                    <span className="break-words text-base font-normal text-white sm:text-lg">
                      {t(spec.value)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: Swiper gallery */}
        {images.length > 0 && (
          <motion.div
            className="rounded-2xl bg-[#C9B79C] p-4 sm:p-6 md:rounded-3xl md:p-8"
            initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.2 }}
          >
            <div className="rounded-xl bg-white p-3 sm:p-4 md:rounded-2xl md:p-6">
              <div className="w-full aspect-[4/3]">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  loop={images.length > 1}
                  speed={reduced ? 0 : 300}
                  grabCursor={true}
                  simulateTouch={true}
                  allowTouchMove={true}
                  observer={true}
                  observeParents={true}
                  resizeObserver={true}
                  spaceBetween={0}
                  slidesPerView={1}
                  className="w-full h-full rounded-2xl"
                >
                  {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={getImageUrl(img, { width: 900 }) || ""}
                        alt={img.alt || t(data.title)}
                        className="object-contain p-4 w-full h-full md:p-8"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default React.memo(ProductSpecifications);
