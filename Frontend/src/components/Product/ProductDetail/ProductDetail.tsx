import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import { client, urlFor } from "../../../sanity/client";
import ProductSpecifications, { type ProductDetailData } from "./ProductSpecifications";
import ProductDetailGrid from "./ProductDetailGrid";

const PRODUCT_DETAIL_QUERY = `*[_type == "productDetail" && slug.current == $slug][0]{
  title,
  shortDescription,
  sizes,
  material,
  productCode,
  specifications,
  image,
  images
}`;

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [data, setData] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setNotFound(false);

    client
      .fetch(PRODUCT_DETAIL_QUERY, { slug })
      .then((result: ProductDetailData | null) => {
        if (!isMounted) return;
        if (!result) {
          setNotFound(true);
        } else {
          setData(result);
        }
      })
      .catch(() => {
        if (isMounted) setNotFound(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        Loading...
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        Mahsulot topilmadi
      </div>
    );
  }



  return (
    <>
    <motion.section
      ref={ref}
      className="w-full bg-[#f5f5f4] rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="grid items-center grid-cols-1 gap-10 px-8 py-20 mx-auto max-w-[1500px] md:grid-cols-2 md:px-16">
        {/* LEFT: TEXT */}
        <div className="flex flex-col gap-6">
          <motion.h1
            className="text-6xl font-medium leading-tight text-neutral-900 md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t(data.title)}
          </motion.h1>

          {data.shortDescription && (
            <motion.p
              className="text-sm text-neutral-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t(data.shortDescription)}
            </motion.p>
          )}

          {data.sizes && data.sizes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="mb-1 text-sm text-neutral-400">Razmerlar</p>
              <div className="flex gap-6 text-lg text-neutral-800">
                {data.sizes.map((size, i) => (
                  <span key={i}>{size}</span>
                ))}
              </div>
            </motion.div>
          )}

          {data.material && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="mb-1 text-sm text-neutral-400">Material</p>
              <p className="text-lg text-neutral-800">{t(data.material)}</p>
            </motion.div>
          )}

          {data.productCode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="mb-1 text-sm text-neutral-400">Tovar kodi</p>
              <p className="text-lg text-neutral-800">{data.productCode}</p>
            </motion.div>
          )}
        </div>

        {/* RIGHT: IMAGE */}
        <div className="flex justify-center items-center">
          {(data.images?.[0] || data.image) && (
            <motion.img
              src={urlFor(data.images?.[0] || data.image).width(900).url()}
              alt={data.images?.[0]?.alt || t(data.title) || ""}
              loading="eager"
              decoding="async"
              className="max-h-[600px] w-auto object-contain"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ y: yImg }}
            />
          )}
        </div>
      </div>
    </motion.section>

    <ProductDetailGrid images={data.images?.slice(1) || []} />
    <ProductSpecifications data={data} />

    </>
  );
};

export default ProductDetail;