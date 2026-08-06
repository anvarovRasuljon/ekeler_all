import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductSpecifications, { type ProductDetailData } from "./ProductSpecifications";
import ProductDetailGrid from "./ProductDetailGrid";

const BASE_URL = "https://api.ekeler.uz";

interface ApiProductDetail {
  id: number;
  title: string;
  short_description: string;
  description: string;
  main_image: string;
  images: string[];
  custom_fields: string;
  created_at: string;
  updated_at: string;
}

function parseCustomFields(raw: string): Record<string, string>[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === "object" && parsed !== null) {
      return Object.entries(parsed).map(([key, value]) => ({ label: key, value: String(value) }));
    }
    return [];
  } catch {
    return [];
  }
}

function buildImageUrl(path: string): string {
  if (!path) return "";
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ApiProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch(`${BASE_URL}/api/v1/products/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: ApiProductDetail) => setProduct(data))
      .catch(err => {
        console.error("ProductDetail fetch error:", err);
        setError(String(err));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const customFields = useMemo(() => parseCustomFields(product?.custom_fields || ""), [product]);
  const heroFields = useMemo(() => customFields.slice(0, 4), [customFields]);

  const data: ProductDetailData = useMemo(() => {
    if (!product) return {} as ProductDetailData;
    const allImages = [product.main_image, ...(product.images || [])].map(buildImageUrl);
    return {
      title: product.title,
      shortDescription: product.short_description,
      description: product.description,
      image: buildImageUrl(product.main_image),
      images: allImages,
      customFields: customFields.map(f => ({ label: f.label || f.key || "", value: f.value || "" })),
    };
  }, [product, customFields]);

  const galleryImages = useMemo(() => data.images?.slice(1) || [], [data]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-[#E88029]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-center text-red-500">{error ? `Xatolik: ${error}` : "Mahsulot topilmadi."}</p>
      </div>
    );
  }

  return (
    <>
      {/* HERO: main image + 4 custom_fields */}
      <section className="w-full bg-[#f5f5f4] rounded-2xl">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-10 md:px-16 md:py-20">
          {/* LEFT: title + custom_fields */}
          <div className="flex flex-col gap-6">
            <h1 className="break-words text-[clamp(28px,2rem+1vw,72px)] font-medium leading-tight text-neutral-900">
              {product.title}
            </h1>

            {product.short_description && (
              <p className="text-[clamp(14px,0.85rem+0.1vw,16px)] text-neutral-500">
                {product.short_description}
              </p>
            )}

            {heroFields.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {heroFields.map((field, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xs tracking-wider uppercase text-neutral-400">
                      {field.label || field.key || `Field ${i + 1}`}
                    </span>
                    <span className="break-words text-[clamp(15px,0.9rem+0.1vw,18px)] font-medium text-neutral-800">
                      {field.value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: main image */}
          <div className="flex justify-center items-center">
            {product.main_image && (
              <img
                src={buildImageUrl(product.main_image)}
                alt={product.title}
                loading="eager"
                decoding="async"
                className="h-auto max-h-[320px] w-full max-w-full rounded-xl object-cover sm:max-h-[440px] lg:max-h-[600px]"
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