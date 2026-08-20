import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FadeImage from "../ui/FadeImage";
import { useLanguage } from "../../context/LanguageContext";

const BASE_URL = "https://api.ekeler.uz";
const PAGE_SIZE = 9;

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

const ProductGrid: React.FC = () => {
  const { t, language } = useLanguage()
  const [rawProducts, setRawProducts] = useState<any[]>([]);
  const products = useMemo(() => rawProducts.map(item => pickProduct(item, language)), [rawProducts, language]);
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
      const items: any[] = Array.isArray(data) ? data : data.content || data.data || [];
      setRawProducts(prev => targetPage === 0 ? items : [...prev, ...items]);
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
        <p className="text-center text-red-500">
          {t({ ru: 'Не удалось загрузить продукты:', uz: 'Mahsulotlarni yuklab bo‘lmadi:', eng: 'Failed to load products:' })} {error}
        </p>
      </section>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <section className="mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-6">
        <p className="text-center text-neutral-400">
          {t({ ru: 'Продукты не найдены.', uz: 'Mahsulotlar topilmadi.', eng: 'No products found.' })}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 pt-10 pb-10 sm:px-6 sm:pb-16 lg:pb-16 lg:pt-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-[10px]">
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
              className="block overflow-hidden relative w-full rounded-[8px] border transition-all duration-300 group border-neutral-200 hover:border-neutral-300 hover:shadow-lg"
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
                {/* Gradient overlay: always on mobile, hover on desktop */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#1B1D20]/80 via-[#1B1D20]/30 to-transparent opacity-100 transition-opacity duration-300 md:duration-700 md:opacity-0 md:group-hover:opacity-100" />
              </div>

              {/* Content: title doim, description hoverda */}
              <div className="absolute right-0 bottom-0 left-0 z-[2] flex flex-col gap-1 p-4 sm:p-5">
                <h3 className="break-words text-[clamp(16px,1rem+0.2vw,20px)] font-semibold leading-tight text-white drop-shadow-md">
                  {product.title}
                </h3>
                {product.short_description && (
                  <p className="break-words text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-snug text-white/85 drop-shadow-md line-clamp-2 max-h-[120px] overflow-hidden opacity-100 transition-all duration-300 md:duration-700 md:max-h-0 md:opacity-0 md:group-hover:max-h-[120px] md:group-hover:opacity-100">
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