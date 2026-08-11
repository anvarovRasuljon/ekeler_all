import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FadeImage from "../ui/FadeImage";

const BASE_URL = "https://api.ekeler.uz";
const PAGE_SIZE = 9;

interface ApiProduct {
  id: number;
  title: string;
  short_description: string;
  description: string;
  main_image: string;
  custom_fields: string;
}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(async (targetPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/products?page=${targetPage}&size=${PAGE_SIZE}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items: ApiProduct[] = Array.isArray(data) ? data : data.content || data.data || [];
      setProducts(prev => targetPage === 0 ? items : [...prev, ...items]);
      setHasMore(items.length === PAGE_SIZE);
    } catch (err) {
      console.error("ProductGrid fetch error:", err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  useEffect(() => {
    if (!hasMore || loading) return;
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
  }, [hasMore, loading]);

  if (error && products.length === 0) {
    return (
      <section className="mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-6">
        <p className="text-center text-red-500">Mahsulotlarni yuklab bo'lmadi: {error}</p>
      </section>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <section className="mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-6">
        <p className="text-center text-neutral-400">Mahsulotlar topilmadi.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 pt-10 pb-10 sm:px-6 sm:pb-16 lg:pb-16 lg:pt-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {products.map((product) => {
          const imageUrl = product.main_image
            ? product.main_image.startsWith("http")
              ? product.main_image
              : `${BASE_URL}${product.main_image}`
            : "";

          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="block overflow-hidden relative w-full rounded-xl border transition-all duration-300 group border-neutral-200 hover:border-neutral-300 hover:shadow-lg sm:rounded-2xl"
            >
              {/* Image — full card width & height */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <FadeImage
                  src={imageUrl}
                  alt={product.title || ""}
                  className="w-full h-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 from-black/80 via-black/30 group-hover:opacity-100" />
              </div>

              {/* Hover content: title + short_description */}
              <div className="flex absolute right-0 bottom-0 left-0 flex-col gap-1 p-4 opacity-0 transition-all duration-300 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                <h3 className="break-words text-[clamp(16px,1rem+0.2vw,20px)] font-semibold leading-tight text-white drop-shadow-md">
                  {product.title}
                </h3>
                {product.short_description && (
                  <p className="break-words text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-snug text-white/85 drop-shadow-md line-clamp-2">
                    {product.short_description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Infinite scroll sentinel */}
      {hasMore && (
        <div ref={loadMoreRef} className="w-full h-10" />
      )}

      {loading && (
        <div className="flex justify-center mt-6">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-[#E88029]" />
        </div>
      )}
    </section>
  );
};

export default React.memo(ProductGrid);