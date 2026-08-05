import React from "react";

import product1 from "../../../assets/productPage_first_img.png";
import product2 from "../../../assets/prochni_2.png";
import product3 from "../../../assets/prochni_3.png";

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Lorem Impus",
    subtitle: "impus",
    image: product1,
  },
  {
    id: 2,
    title: "Lorem Impus 2",
    subtitle: "dolor",
    image: product2,
  },
  {
    id: 3,
    title: "Lorem Impus 3",
    subtitle: "sit amet",
    image: product3,
  },
];

const ProductCard: React.FC<Product> = ({ title, subtitle, image }) => {
  return (
    // Responsive: mobilda balandlik, padding va radius kichraydi
    <div className="group flex h-[360px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#F1F1F1] bg-white p-5   hover:-translate-y-1.5 hover:border-gray-200 hover:shadow-xl sm:h-[420px] sm:p-6 lg:h-[480px] lg:p-8">
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="mb-6 aspect-square h-[150px] w-full max-w-[220px] object-contain sm:h-[180px] lg:mb-8 lg:h-[220px]"
      />
      <h3 className="mb-3 break-words text-center text-[22px] font-semibold leading-tight text-[#111827] sm:text-[28px] lg:mb-4 lg:text-[34px]">
        {title}
      </h3>
      <p className="break-words text-center text-base font-normal text-[#6B7280] sm:text-lg lg:text-xl">
        {subtitle}
      </p>
    </div>
  );
};

interface ProductRelativeCardProps {
  products?: Product[];
}

export const ProductRelativeCard: React.FC<ProductRelativeCardProps> = ({
  products = DEFAULT_PRODUCTS,
}) => {
  const cardList = React.useMemo(() => products, [products]);
  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {cardList.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export const ProductRelativeGrid = ProductRelativeCard;

export default React.memo(ProductRelativeCard);
