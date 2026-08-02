import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { urlFor } from "../../../sanity/client";

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 gap-12 items-start px-6 py-20 mx-auto max-w-[1500px] md:px-12 lg:grid-cols-2">
        {/* LEFT: Accordion specs */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.span
            className="self-start px-4 py-1.5 mb-6 text-xs font-medium tracking-wide text-white/80 uppercase border rounded-full border-white/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Asosiy malumot
          </motion.span>

          <motion.h2
            className="mb-6 text-4xl font-medium md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Texnik parametrlar
          </motion.h2>

          <div className="mb-8 w-full border-t border-dashed border-white/30" />

          <div className="overflow-hidden rounded-2xl border border-white/20">
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="flex justify-between items-center px-6 py-5 w-full text-left transition-colors hover:bg-white/5"
            >
              <span className="text-2xl font-medium">umumiy malumot</span>
              <span className="flex justify-center items-center w-10 h-10 rounded-full border border-white/40">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>

            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 px-6 pb-8">
                {specs.map((spec, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  >
                    <span className="text-xs tracking-wider uppercase text-white/50">
                      {t(spec.label)}
                    </span>
                    <span className="text-lg font-normal text-white">
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
            className="p-6 rounded-3xl bg-[#C9B79C] md:p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-4 bg-white rounded-2xl md:p-6">
              <div className="w-full aspect-[4/3]">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  loop={images.length > 1}
                  speed={600}
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
                        src={urlFor(img).width(900).url()}
                        alt={img.alt || t(data.title)}
                        className="object-contain p-4 w-full h-full md:p-8"
                        loading="eager"
                        decoding="async"
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

export default ProductSpecifications;
