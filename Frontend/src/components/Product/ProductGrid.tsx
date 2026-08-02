import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

interface LocaleString {
  eng?: string;
  ru?: string;
  uz?: string;
  [key: string]: string | undefined;
}

export interface ProductCardData {
  id: string;
  title: LocaleString;
  tags: LocaleString[];
  imageUrl: string;
  imageAlt?: string;
  detailSlug?: string;
}

interface ProductGridProps {
  items: ProductCardData[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ items }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  try {
    return (
      <section ref={sectionRef} className="w-full px-4 py-16 mx-auto max-w-[1500px] md:px-6 overflow-hidden">
        <div className="grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, index) => {
            const card = (
              <motion.div
                className="group relative w-full max-w-[450px] h-[420px] overflow-hidden rounded-2xl cursor-pointer flex items-center justify-center"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
              >
  <img
    src={item.imageUrl}
    alt={item.imageAlt || t(item.title) || ""}
    className="object-contain w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
    loading="eager"
    decoding="async"
  />
  <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 from-black/70 via-black/20 group-hover:opacity-100" />
  <div className="flex absolute right-6 bottom-6 left-6 flex-col gap-2 opacity-0 transition-all duration-500 ease-out translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
    <h3 className="text-2xl font-semibold text-white drop-shadow-md">
      {t(item.title)}
    </h3>
    {item.tags && item.tags.length > 0 && (
      <p className="text-sm leading-6 drop-shadow-md text-white/85">
        {item.tags.map((tag) => t(tag)).join(" • ")}
      </p>
    )}
  </div>
</motion.div>
            );

            return item.detailSlug ? (
              <Link to={`/products/${item.detailSlug}`} key={item.id}>
                {card}
              </Link>
            ) : (
              <div key={item.id}>{card}</div>
            );
          })}
        </div>
      </section>
    );
  } catch (e: any) {
    console.error("[DEBUG] ProductGrid render error:", e);
    return (
      <section className="w-full px-4 py-16 mx-auto max-w-[1500px] md:px-6 overflow-hidden">
        <p className="text-center text-red-500">ProductGrid xatosi: {String(e)}</p>
      </section>
    );
  }
};

export default ProductGrid;