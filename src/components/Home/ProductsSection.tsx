import AnimatedImage from './AnimatedImage';
import React from "react";
import yengillik_img from "../../assets/yengillik_img.png";
import yuqorimustahkamlik_img from "../../assets/yuqorimustahkamlik_img.png";
import qaytaishlash_img from "../../assets/qaytaishlash_img.png";
import mahalliy_img from "../../assets/mahalliy_img.png";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

interface Product {
  name: string;
  description?: string;
  image?: any;
  slug?: string;
}

interface ProductsSectionProps {
  products?: Product[];
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    name: "Yengillik",
    description: "Yog'ochga qaraganda bir necha barobar yengil — tashish va yuklash xarajatlarini kamaytiradi.",
    image: yengillik_img,
    slug: "yengillik",
  },
  {
    name: "Yuqori mustahkamlik",
    description: "Olti qirrali tuzilma bosim va yukni teng taqsimlaydi — og'irlikka nisbatan yog'ochdan qolishmaydi.",
    image: yuqorimustahkamlik_img,
    slug: "yuqori-mustahkamlik",
  },
  {
    name: "To'liq qayta ishlanadi",
    description: "100% qog'ozdan tayyorlangan, ekologik toza va qayta ishlash mumkin.",
    image: qaytaishlash_img,
    slug: "toliq-qayta-ishlanadi",
  },
  {
    name: "Mahalliy ishlab chiqarish",
    description: "Tezkor yetkazib berish, import kutish yo'q: standart buyurtma 2–3 kunda, individual buyurtma 7 kunda tayyor.",
    image: mahalliy_img,
    slug: "mahalliy-ishlab-chiqarish",
  },
];

const ProductsSection: React.FC<ProductsSectionProps> = ({ products = DEFAULT_PRODUCTS }) => {
  const displayProducts = products;
  const sectionReveal = useRevealOnScroll<HTMLDivElement>();

  const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : "translate3d(0,25px,0)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: "transform, opacity",
  });

  if (!displayProducts || displayProducts.length === 0) {
    return null;
  }

  return (
    <div ref={sectionReveal.ref} className="mx-auto mb-12 w-full max-w-[1540px] bg-white md:mb-20">
      <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-1 md:gap-0 md:px-0">
        {displayProducts.map((product, index) => {
          // Description matnini so'zlarga bo'lib chiqamiz
          const words = product.description ? product.description.split(' ') : [];

          return (
            <div
              key={product.slug || index}
              className="flex relative flex-col gap-3 justify-between items-start border-0 group md:flex-row md:items-center md:gap-10 md:border-b md:border-neutral-200 md:px-8 md:py-10 md:last:border-b-0 min-h-[44px]"
            >
              {/* Hover line: markazdan ikki chetga kengayadi */}
              <div className="absolute bottom-0 left-0 h-[1px] w-full bg-transparent overflow-hidden md:bg-neutral-200 pointer-events-none">
                <div className="absolute left-0 top-0 h-full w-full scale-x-0 bg-[#D96C33] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              </div>

              {/* Left: image + title */}
              <div className="flex flex-col items-start w-full gap-2 md:w-auto md:flex-row md:items-center md:gap-10">
                {product.image && (
                  <div style={revealStyle(sectionReveal.visible, index * 120)} className="relative h-[150px] w-full flex-shrink-0 md:h-[145px] md:w-[145px]">
                    <AnimatedImage
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={150}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="h-full w-full rounded-[5px] object-cover"
                    />
                    <div className="absolute inset-0 rounded-[5px] bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                    <h3 className="absolute bottom-0 left-0 p-2 w-full break-words font-inter text-[14px] font-medium leading-[20px] text-white md:hidden">
                      {index + 1}. {product.name}
                    </h3>
                  </div>
                )}

                {/* Desktop Title with Slide Hover Animation */}
                <div style={revealStyle(sectionReveal.visible, index * 120 + 100)} className="hidden md:block relative overflow-hidden h-[clamp(24px,1.5rem+0.3vw,32px)]">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                    <h3 className="break-words font-inter text-[15px] font-medium leading-[clamp(24px,1.5rem+0.3vw,32px)] text-[#1B1D20] md:text-[clamp(18px,1.1rem+0.3vw,24px)]">
                      {index + 1}. {product.name}
                    </h3>
                    <h3 className="break-words font-inter text-[15px] font-medium leading-[clamp(24px,1.5rem+0.3vw,32px)] text-[#D96C33] md:text-[clamp(18px,1.1rem+0.3vw,24px)]">
                      {index + 1}. {product.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right: description + icon */}
              <div className="flex items-center justify-between w-full gap-3 md:w-auto">
                {product.description && (
                  <p
                    style={revealStyle(sectionReveal.visible, index * 120 + 200)}
                    className="mb-2 w-full flex flex-wrap gap-x-[0.3em] break-words font-inter text-[13px] font-normal leading-[18px] text-neutral-500 md:mb-0 md:text-[clamp(13px,0.8rem+0.1vw,16px)] md:w-[450px] md:leading-[20px] overflow-hidden"
                  >
                    {words.map((word, wIdx) => (
                      <span key={wIdx} className="overflow-hidden inline-block py-0.5">
                        <span
                          className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{
                            opacity: sectionReveal.visible ? 1 : 0,
                            transform: sectionReveal.visible ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
                            transitionDelay: `${index * 120 + 250 + wIdx * 25}ms`,
                          }}
                        >
                          {word}
                        </span>
                      </span>
                    ))}
                  </p>
                )}

                <div style={revealStyle(sectionReveal.visible, index * 120 + 350)} className="items-center justify-center flex-shrink-0 hidden w-11 h-11 md:flex md:h-12 md:w-12">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ProductsSection);