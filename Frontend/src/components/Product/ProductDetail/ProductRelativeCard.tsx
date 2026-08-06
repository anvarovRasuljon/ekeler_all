import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://api.ekeler.uz";

interface ApiProduct {
  id: number;
  title: string;
  short_description: string;
  main_image: string;
}

function buildImageUrl(path: string): string {
  if (!path) return "";
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

const ProductCard: React.FC<ApiProduct> = ({ id, title, short_description, main_image }) => {
  return (
    <Link
      to={`/products/${id}`}
      className="group flex h-[clamp(300px,20rem+4vw,480px)] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#F1F1F1] bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-200 hover:shadow-xl sm:p-6 lg:p-8"
    >
      <img
        src={buildImageUrl(main_image)}
        alt={title}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="mb-6 h-[clamp(120px,8rem+2vw,220px)] w-full max-w-[220px] object-contain sm:h-[clamp(140px,9rem+2vw,180px)] lg:mb-8"
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
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/products?page=0&size=3`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const items: ApiProduct[] = Array.isArray(data) ? data : data.content || data.data || [];
        setProducts(items.slice(0, 3));
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
