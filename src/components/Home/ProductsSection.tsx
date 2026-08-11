import AnimatedImage from './AnimatedImage';
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Product {
  name: string;
  description?: string;
  image?: any;
  slug?: string;
}

interface ProductsSectionProps {
  products?: Product[];
}

const BASE_URL = "https://api.ekeler.uz";
const PAGE_SIZE = 5;

const mapProduct = (item: any): Product => ({
  name: item.title,
  description: item.short_description,
  image: item.main_image ? `${BASE_URL}${item.main_image}` : undefined,
  slug: String(item.id),
});

const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(async (targetPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/products?page=${targetPage}&size=${PAGE_SIZE}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.content || data.data || [];
      const mapped = items.map(mapProduct);
      setApiProducts(prev => (targetPage === 0 ? mapped : [...prev, ...mapped]));
      setHasMore(items.length === PAGE_SIZE);
    } catch (err) {
      console.error("ProductsSection fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (products) return;
    fetchProducts(page);
  }, [products, page, fetchProducts]);

  useEffect(() => {
    if (products || !hasMore || loading) return;
    const node = loadMoreRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(p => p + 1);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [products, hasMore, loading]);

  const displayProducts = products || apiProducts;

  if (!displayProducts || displayProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 w-full bg-white md:mb-20">
      <div>
        {displayProducts.map((product, index) => (
          <a
            key={product.slug || index}
            href={product.slug ? `/products/${product.slug}` : "#"}
            className="flex relative flex-col gap-5 justify-between items-start border-b border-dashed group border-neutral-200 last:border-b-0 sm:px-6 sm:py-8 md:flex-row md:items-center md:gap-10 md:px-8 md:py-10 min-h-[44px]"
          >
            {/* Hover line */}
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-200 overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#D96C33] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>

            {/* Left: image + title */}
            <div className="flex flex-col gap-6 items-start w-full md:w-auto md:flex-row md:items-center md:gap-10">
              {product.image && (
                <AnimatedImage
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={150}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="h-[200px] w-full flex-shrink-0 rounded-2xl object-cover md:w-[200px]"
                />
              )}

              <h3 className="break-words font-inter text-[clamp(18px,1.1rem+0.3vw,24px)] font-medium leading-[clamp(24px,1.5rem+0.3vw,32px)] text-[#1B1D20]">
                {product.name}
              </h3>
            </div>

            {/* Right: description + icon */}
            <div className="flex gap-6 justify-between items-center w-full md:w-auto">
              {product.description && (
                <p
                  className="mb-5 w-full break-words font-inter text-[clamp(13px,0.8rem+0.1vw,16px)] font-normal leading-relaxed text-neutral-500 md:mb-0 md:w-[450px] md:leading-[20px]"
                >
                  {product.description}
                </p>
              )}

              <div className="flex flex-shrink-0 justify-center items-center w-11 h-11 md:h-12 md:w-12">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D96C33"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </a>
        ))}
        {!products && <div ref={loadMoreRef} className="w-full h-8" />}
      </div>
    </div>
  );
};

export default React.memo(ProductsSection);