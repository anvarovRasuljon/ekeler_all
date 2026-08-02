import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { urlFor } from "../../sanity/client";


interface Product {
  name: string;
  description?: string;
  image?: any;
  slug?: string;
}

interface ProductsSectionProps {
  products?: Product[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="w-full mb-20 bg-white"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        {products.map((product, index) => (
          <a
            key={index}
            href={product.slug ? `/products/${product.slug}` : "#"}
            className="group relative flex flex-col items-start justify-between gap-6 py-8 border-b border-dashed border-neutral-200 last:border-b-0 md:flex-row md:items-center md:gap-10 md:py-10"
          >
            {/* Hover line */}
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-200 overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#D96C33] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>

            {/* Left: image + title */}
            <div className="flex flex-col items-start w-full gap-6 md:w-auto md:flex-row md:items-center md:gap-10">
              {product.image && (
                <motion.img
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  className="h-[150px] w-full flex-shrink-0 rounded-2xl object-cover md:w-[200px]"
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              )}

              <h3 className="font-inter text-[24px] font-medium leading-[32px] text-[#1B1D20]">
                {product.name}
              </h3>
            </div>

            {/* Right: description + icon */}
            <div className="flex items-center justify-between w-full gap-6 md:w-auto">
              {product.description && (
                <motion.p
                  className="w-full font-inter text-[16px] font-normal leading-[20px] text-neutral-500 md:w-[500px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                >
                  {product.description}
                </motion.p>
              )}

              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-colors duration-200 group-hover:border-[#D96C33]">
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
      </div>
    </motion.div>
  );
};

export default ProductsSection;