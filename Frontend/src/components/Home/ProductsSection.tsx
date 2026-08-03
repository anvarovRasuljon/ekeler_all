import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import prochni_1 from "../../assets/prochni_1.png";
import prochni_2 from "../../assets/prochni_2.png";
import prochni_3 from "../../assets/prochni_3.png";
import prochni_4 from "../../assets/prochni_4.png";


interface Product {
  name: string;
  description?: string;
  image?: any;
  slug?: string;
}

interface ProductsSectionProps {
  products?: Product[];
}

const LOREM_20 =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.";

const DEFAULT_PRODUCTS: Product[] = [
  { name: "Product One", description: LOREM_20, image: prochni_1, slug: "product-one" },
  { name: "Product Two", description: LOREM_20, image: prochni_2, slug: "product-two" },
  { name: "Product Three", description: LOREM_20, image: prochni_3, slug: "product-three" },
  { name: "Product Four", description: LOREM_20, image: prochni_4, slug: "product-four" },
];

const ProductsSection: React.FC<ProductsSectionProps> = ({ products = DEFAULT_PRODUCTS }) => {
  if (!products || products.length === 0) {
    return null;
  }

  const reduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="mb-12 w-full bg-white md:mb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0.01 : 0.6 }}
    >
      <div>
        {products.map((product, index) => (
          <a
            key={product.slug || index}
            href={product.slug ? `/products/${product.slug}` : "#"}
            // Responsive: mobilda vertikal stack va kichikroq padding
            className="flex relative flex-col gap-5 justify-between items-start px-4 py-6 border-b border-dashed group border-neutral-200 last:border-b-0 sm:px-6 sm:py-8 md:flex-row md:items-center md:gap-10 md:px-8 md:py-10"
          >
            {/* Hover line */}
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-200 overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#D96C33] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>

            {/* Left: image + title */}
            <div className="flex flex-col gap-6 items-start w-full md:w-auto md:flex-row md:items-center md:gap-10">
              {product.image && (
                <motion.img
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={150}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="h-[150px] w-full flex-shrink-0 rounded-2xl object-cover md:w-[200px] will-change-transform"
                  initial={{ opacity: 0, x: reduced ? 0 : -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reduced ? 0 : -40 }}
                  transition={{ duration: reduced ? 0.01 : 0.5, delay: reduced ? 0 : index * 0.1 }}
                />
              )}

              <h3 className="break-words font-inter text-[20px] font-medium leading-[28px] text-[#1B1D20] sm:text-[22px] md:text-[24px] md:leading-[32px]">
                {product.name}
              </h3>
            </div>

            {/* Right: description + icon */}
            <div className="flex gap-6 justify-between items-center w-full md:w-auto">
              {product.description && (
                <motion.p
                  className="w-full break-words font-inter text-[14px] font-normal leading-relaxed text-neutral-500 sm:text-[15px] md:w-[450px] md:text-[16px] md:leading-[20px]"
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 10 }}
                  transition={{ duration: reduced ? 0.01 : 0.4, delay: reduced ? 0 : 0.1 + index * 0.1 }}
                >
                  {product.description}
                </motion.p>
              )}

              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border-[#D96C33] md:h-12 md:w-12">
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

export default React.memo(ProductsSection);