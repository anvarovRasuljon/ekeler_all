import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import FadeImage from "../../ui/FadeImage";
import ProductSpecifications, { type ProductDetailData } from "./ProductSpecifications";
import ProductDetailGrid from "./ProductDetailGrid";
import { useLanguage } from "../../../context/LanguageContext";

const BASE_URL = "https://api.ekeler.uz";

function getSuffix(lang: string) {
  return lang === 'eng' ? 'en' : lang;
}

interface ApiProductDetail {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  short_description_uz: string;
  short_description_ru: string;
  short_description_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  main_image: string;
  images: string[];
  custom_fields: unknown;
  created_at: string;
  updated_at: string;
}

function pickDetail(product: ApiProductDetail | null, lang: string) {
  if (!product) return null;
  const suffix = getSuffix(lang);
  return {
    ...product,
    title: product[`title_${suffix}`] || product.title_uz || '',
    short_description: product[`short_description_${suffix}`] || product.short_description_uz || '',
    description: product[`description_${suffix}`] || product.description_uz || '',
  };
}

function normalizeCustomFields(raw: unknown): any {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      const cleaned = raw
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/([{,]\s*)([A-Za-z0-9_ ]+?)\s*:/g, '$1"$2":');
      return JSON.parse(cleaned);
    } catch {
      return null;
    }
  }
  return raw;
}

function parseCustomFields(raw: unknown, lang: string): Record<string, string>[] {
  const parsed = normalizeCustomFields(raw);
  if (!parsed) return [];

  if (Array.isArray(parsed)) {
    return parsed
      .filter((item): item is Record<string, string> => item && typeof item === 'object')
      .map(item => ({ label: String(item.label || item.key || ''), value: String(item.value || '') }));
  }

  if (typeof parsed === 'object' && parsed !== null) {
    const suffix = getSuffix(lang);
    const localized = (parsed as Record<string, any>)[suffix];

    if (localized && typeof localized === 'object' && !Array.isArray(localized)) {
      return Object.entries(localized).map(([key, value]) => ({
        label: key.trim(),
        value: typeof value === 'object' ? JSON.stringify(value) : String(value),
      }));
    }

    if (localized !== undefined && (localized === null || typeof localized !== 'object')) {
      return [{ label: '', value: String(localized) }];
    }
  }

  return [];
}

function buildImageUrl(path: string): string {
  if (!path) return "";
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<ApiProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const errorLabel = { ru: 'Ошибка:', uz: 'Xatolik:', eng: 'Error:' };
  const notFoundLabel = { ru: 'Продукт не найден.', uz: 'Mahsulot topilmadi.', eng: 'Product not found.' };
  const fieldLabel = { ru: 'Поле', uz: 'Maydon', eng: 'Field' };

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

  const p = useMemo(() => pickDetail(product, language), [product, language]);
  const customFields = useMemo(() => parseCustomFields(p?.custom_fields || "", language), [p, language]);
  const heroFields = customFields;

  const data: ProductDetailData = useMemo(() => {
    if (!p) return {} as ProductDetailData;
    const allImages = [p.main_image, ...(p.images || [])].map(buildImageUrl);
    return {
      title: p.title,
      shortDescription: p.short_description,
      description: p.description,
      image: buildImageUrl(p.main_image),
      images: allImages,
      customFields: customFields.map(f => ({ label: f.label || f.key || "", value: f.value || "" })),
    };
  }, [p, customFields]);

  const galleryImages = useMemo(() => data.images?.slice(1) || [], [data]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-[#E88029]" />
      </div>
    );
  }

  if (error || !p) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-center text-red-500">{error ? `${t(errorLabel)} ${error}` : t(notFoundLabel)}</p>
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
              {p.title}
            </h1>

            {p.short_description && (
              <p className="text-[clamp(14px,0.85rem+0.1vw,16px)] text-neutral-500">
                {p.short_description}
              </p>
            )}

            {heroFields.length > 0 && (
              <div className="grid grid-rows-4 grid-flow-col auto-cols-min gap-y-5 gap-x-12">
                {heroFields.map((field, i) => (
                  <div key={i} className="flex min-w-[200px] flex-col">
                    <span className="font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.02em] align-middle text-neutral-400">
                      {field.label || field.key || `${t(fieldLabel)} ${i + 1}`}
                    </span>
                    <span className="break-words font-['Inter'] text-[16px] font-normal leading-[24px] tracking-[-0.02em] align-middle text-[#1B1D20]">
                      {field.value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: main image */}
          <div className="flex justify-center items-center">
            {p.main_image && (
              <FadeImage
                src={buildImageUrl(p.main_image)}
                alt={p.title}
                loading="eager"
                className="w-full max-w-full"
                imgClassName="h-auto max-h-[320px] w-full max-w-full rounded-xl object-cover sm:max-h-[440px] lg:max-h-[600px]"
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