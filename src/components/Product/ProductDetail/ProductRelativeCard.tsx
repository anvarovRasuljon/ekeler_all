import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FadeImage from "../../ui/FadeImage";
import { useLanguage } from "../../../context/LanguageContext";

const BASE_URL = "https://api.ekeler.uz";

function getSuffix(lang: string) {
  return lang === 'eng' ? 'en' : lang;
}

function pickProduct(product: any, lang: string): { id: number; title: string; short_description: string; main_image: string } {
  const suffix = getSuffix(lang);
  return {
    id: product.id,
    title: product[`title_${suffix}`] || product.title || product.title_uz || '',
    short_description: product[`short_description_${suffix}`] || product.short_description || product.short_description_uz || '',
    main_image: product.main_image || '',
  };
}

function buildImageUrl(path: string): string {
  if (!path) return "";
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

const ProductCard: React.FC<ReturnType<typeof pickProduct>> = ({ id, title, short_description, main_image }) => {
  return (
    <Link
      to={`/products/${id}`}
      className="group flex h-[clamp(300px,20rem+4vw,480px)] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#F1F1F1] bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-200 hover:shadow-xl sm:p-6 lg:p-8"
    >
      <FadeImage
        src={buildImageUrl(main_image)}
        alt={title}
        loading="lazy"
        className="mb-6 h-[clamp(120px,8rem+2vw,220px)] w-full max-w-[220px] sm:h-[clamp(140px,9rem+2vw,180px)] lg:mb-8"
        imgClassName="h-full w-full object-contain"
      />
      <h3 className="mb-3 break-words text-center text-[clamp(18px,1.1rem+0.3vw,34px)] font-semibold leading-tight text-[#111827]">
        {title}
      </h3>
      <p className="break-words text-center text-[clamp(14px,0.85rem+0.1vw,20px)] font-normal text-[#6B7280]">
        {short_description}
      </p>
    </Link>
  );
};

const ProductRelativeCard: React.FC = () => {
  const { language } = useLanguage();
  const [rawProducts, setRawProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const products = useMemo(() => rawProducts.map(item => pickProduct(item, language)), [rawProducts, language]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/products?page=0&size=3`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const items: any[] = Array.isArray(data) ? data : data.content || data.data || [];
        setRawProducts(items.slice(0, 3));
      })
      .catch(err => console.error("ProductRelativeCard fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-[#E88029]" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export const ProductRelativeGrid = ProductRelativeCard;
export { ProductRelativeCard };

export default React.memo(ProductRelativeCard);
