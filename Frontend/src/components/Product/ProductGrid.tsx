import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import prochni_1 from "../../assets/productPage_first_img.png";
import prochni_2 from "../../assets/prochni_2.png";
import prochni_3 from "../../assets/prochni_3.png";
import prochni_4 from "../../assets/prochni_4.png";

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

const DEFAULT_ITEMS: ProductCardData[] = [
  {
    id: "1",
    title: { ru: "Продукт 1", uz: "Mahsulot 1", eng: "Product 1" },
    tags: [{ ru: "Тег", uz: "Teg", eng: "Tag" }],
    imageUrl: prochni_1,
    imageAlt: "Product 1",
    detailSlug: "product-1",
  },
  {
    id: "2",
    title: { ru: "Продукт 2", uz: "Mahsulot 2", eng: "Product 2" },
    tags: [{ ru: "Тег 2", uz: "Teg 2", eng: "Tag 2" }],
    imageUrl: prochni_2,
    imageAlt: "Product 2",
    detailSlug: "product-2",
  },
  {
    id: "3",
    title: { ru: "Продукт 3", uz: "Mahsulot 3", eng: "Product 3" },
    tags: [{ ru: "Тег 3", uz: "Teg 3", eng: "Tag 3" }],
    imageUrl: prochni_3,
    imageAlt: "Product 3",
    detailSlug: "product-3",
  },
  {
    id: "4",
    title: { ru: "Продукт 4", uz: "Mahsulot 4", eng: "Product 4" },
    tags: [{ ru: "Тег 4", uz: "Teg 4", eng: "Tag 4" }],
    imageUrl: prochni_4,
    imageAlt: "Product 4",
    detailSlug: "product-4",
  },
];

const ProductGrid: React.FC = () => {
  const { t } = useLanguage();
  const items = useMemo(() => DEFAULT_ITEMS, []);

  try {
    // Responsive: 1 -> 2 -> 3 ustun, kartalar balandligi ekranga moslashadi
    return (
      <section className="mx-auto w-full max-w-[1500px] overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {items.map((item) => {
            const card = (
              <div
                className="group relative flex h-[280px] w-full max-w-[450px] cursor-pointer items-center justify-center overflow-hidden rounded-xl sm:h-[340px] sm:rounded-2xl lg:h-[420px]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || t(item.title) || ""}
                  className="object-contain w-full h-full    group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0   from-black/70 via-black/20 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 flex translate-y-0 flex-col gap-2 opacity-100    sm:bottom-6 sm:left-6 sm:right-6 md:translate-y-2 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="break-words text-lg font-semibold text-white drop-shadow-md sm:text-xl lg:text-2xl">
                    {t(item.title)}
                  </h3>
                  {item.tags && item.tags.length > 0 && (
                    <p className="break-words text-xs leading-5 text-white/85 drop-shadow-md sm:text-sm sm:leading-6">
                      {item.tags.map((tag) => t(tag)).join(" • ")}
                    </p>
                  )}
                </div>
              </div>
            );

            return item.detailSlug ? (
              <Link to={`/products/${item.detailSlug}`} key={item.id} className="w-full max-w-[450px]">
                {card}
              </Link>
            ) : (
              <div key={item.id} className="w-full max-w-[450px]">{card}</div>
            );
          })}
        </div>
      </section>
    );
  } catch (e: any) {
    console.error("[DEBUG] ProductGrid render error:", e);
    return (
      <section className="mx-auto w-full max-w-[1500px] overflow-hidden px-4 py-10 sm:px-6 lg:py-16">
        <p className="text-center text-red-500">ProductGrid xatosi: {String(e)}</p>
      </section>
    );
  }
};

export default React.memo(ProductGrid);