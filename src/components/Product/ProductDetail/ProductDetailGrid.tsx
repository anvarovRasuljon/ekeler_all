import ProductImage from '../ProductImage';
import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailGridProps {
  images: string[];
}

const ProductDetailGrid: React.FC<ProductDetailGridProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const closeModal = () => setModalIndex(null);

  const [displayIndex, setDisplayIndex] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (modalIndex === null) {
      setDisplayIndex(null);
      setIsFading(false);
      return;
    }
    if (displayIndex === null) {
      setDisplayIndex(modalIndex);
      return;
    }
    if (modalIndex !== displayIndex) {
      setIsFading(true);
      const t = setTimeout(() => {
        setDisplayIndex(modalIndex);
        setIsFading(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [modalIndex, displayIndex]);

  const modalNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : prev
    );
  };

  const modalPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : prev
    );
  };

  const trackWidth = 60 * images.length;
  const slideWidth = 100 / images.length;
  const trackTransform = `translateX(calc(100% / (3 * ${images.length}) - ${activeIndex} * (100% / ${images.length})))`;

  const handleSlideClick = (index: number) => {
    if (index === activeIndex) {
      setModalIndex(index);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl">
        <div
          className="flex h-[260px] items-stretch transition-transform duration-300 ease-out sm:h-[340px] lg:h-[420px]"
          style={{ width: `${trackWidth}%`, transform: trackTransform }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSlideClick(index)}
              className="relative h-full shrink-0 cursor-pointer overflow-hidden"
              style={{ width: `${slideWidth}%` }}
              aria-label={`Gallery image ${index + 1}`}
            >
              <ProductImage
                src={image}
                alt={`Gallery image ${index + 1}`}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-60'
                }`}
                loading={index === activeIndex ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow-md transition-colors hover:bg-white"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow-md transition-colors hover:bg-white"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099]"
          onClick={closeModal}
        >
          <button
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center p-2 text-white hover:text-gray-300 sm:right-4 sm:top-4"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center p-2 text-white hover:text-gray-300 sm:left-4"
            onClick={modalPrev}
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8 sm:h-12 sm:w-12" />
          </button>

          <ProductImage
            src={displayIndex !== null ? images[displayIndex] : undefined}
            alt={displayIndex !== null ? `Gallery image ${displayIndex + 1}` : ""}
            className={`h-[70vh] max-h-[70vh] w-[70vh] max-w-[95vw] rounded-xl object-contain transition-opacity duration-300 sm:rounded-2xl ${
              isFading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="eager"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center p-2 text-white hover:text-gray-300 sm:right-4"
            onClick={modalNext}
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8 sm:h-12 sm:w-12" />
          </button>
        </div>
      )}
    </section>
  );
};

export default React.memo(ProductDetailGrid);
