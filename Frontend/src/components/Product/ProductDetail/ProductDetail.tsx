import React, { useMemo } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import productMain from "../../../assets/productPage_first_img.png";
import ProductSpecifications, { type ProductDetailData } from "./ProductSpecifications";
import ProductDetailGrid from "./ProductDetailGrid";

const DEFAULT_DATA: ProductDetailData = {
  title: { ru: "Продукт 1", uz: "Mahsulot 1", eng: "Product 1" },
  shortDescription: {
    ru: "Высококачественный материал для различных отраслей.",
    uz: "Turli sohalarda ishlatiladigan yuqori sifatli material.",
    eng: "High-quality material for various industries.",
  },
  sizes: ["1200×2400", "600×1200"],
  material: {
    ru: "МДФ",
    uz: "MDF",
    eng: "MDF",
  },
  productCode: "PRD-001",
  image: productMain,
  images: [],
};

const ProductDetail: React.FC = () => {
  const { t } = useLanguage();
  const data = DEFAULT_DATA;

  const titleText = useMemo(() => t(data.title), [t, data.title]);
  const shortDescriptionText = useMemo(() => data.shortDescription ? t(data.shortDescription) : "", [t, data.shortDescription]);
  const materialText = useMemo(() => data.material ? t(data.material) : "", [t, data.material]);
  const galleryImages = useMemo(() => data.images?.slice(1) || [], [data.images]);

  return (
    <>
    <section
      className="w-full bg-[#f5f5f4] rounded-2xl"
    >
      {/* Responsive: mobilda 1 ustun, kichik padding va kichikroq sarlavha */}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-10 md:px-16 md:py-20">
        {/* LEFT: TEXT */}
        <div className="flex flex-col gap-6">
          <h1
            className="break-words text-3xl font-medium leading-tight text-neutral-900 sm:text-4xl md:text-6xl lg:text-7xl"
          >
            {titleText}
          </h1>

          {data.shortDescription && (
            <p
              className="text-sm text-neutral-400"
            >
              {shortDescriptionText}
            </p>
          )}

          {data.sizes && data.sizes.length > 0 && (
            <div>
              <p className="mb-1 text-sm text-neutral-400">Razmerlar</p>
              <div className="flex flex-wrap gap-4 text-base text-neutral-800 sm:gap-6 sm:text-lg">
                {data.sizes.map((size, i) => (
                  <span key={i}>{size}</span>
                ))}
              </div>
            </div>
          )}

          {data.material && (
            <div>
              <p className="mb-1 text-sm text-neutral-400">Material</p>
              <p className="break-words text-base text-neutral-800 sm:text-lg">{materialText}</p>
            </div>
          )}

          {data.productCode && (
            <div>
              <p className="mb-1 text-sm text-neutral-400">Tovar kodi</p>
              <p className="break-words text-base text-neutral-800 sm:text-lg">{data.productCode}</p>
            </div>
          )}
        </div>

        {/* RIGHT: IMAGE */}
        <div className="flex justify-center items-center">
          {data.image && (
            <img
              src={data.image}
              alt={titleText}
              loading="eager"
              decoding="async"
              className="h-auto max-h-[320px] w-full max-w-full object-contain sm:max-h-[440px] lg:max-h-[600px] lg:w-auto"
            />
          )}
        </div>
      </div>
    </section>

    <ProductDetailGrid images={galleryImages} />
    <ProductSpecifications data={data} />

    </>
  );
};

export default React.memo(ProductDetail);