import ProductImage from '../ProductImage';
import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailGridProps {
  images: string[];
}

const ProductDetailGrid: React.FC<ProductDetailGridProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(Math.min(1, Math.max(0, images.length - 1)));
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

  const trackTransform = `translateX(-${activeIndex * (1000 + 24)}px)`;

  const handleSlideClick = (index: number) => {
    if (index === activeIndex) {
      setModalIndex(index);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="overflow-visible mx-auto max-w-[2000px] py-10 w-full sm:py-12 lg:py-16">
      <div className="relative mx-auto h-[650px] w-[1000px] overflow-visible">
        <div
          className="flex absolute top-0 left-0 gap-6 h-full transition-transform duration-300 ease-out w-fit"
          style={{ transform: trackTransform }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSlideClick(index)}
              className="relative h-full w-[1000px] shrink-0 cursor-pointer overflow-hidden"
              aria-label={`Gallery image ${index + 1}`}
            >
              <ProductImage
                src={image}
                alt={`Gallery image ${index + 1}`}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-80'
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
          className="flex absolute left-[-90px] top-1/2 z-10 justify-center items-center w-10 h-10 rounded-full shadow-md transition-colors -translate-y-1/2 bg-white/80 text-neutral-900 hover:bg-white"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex absolute right-[-90px] top-1/2 z-10 justify-center items-center w-10 h-10 rounded-full shadow-md transition-colors -translate-y-1/2 bg-white/80 text-neutral-900 hover:bg-white"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099]"
          onClick={closeModal}
        >
          <button
            className="flex absolute top-3 right-3 justify-center items-center p-2 w-11 h-11 text-white hover:text-gray-300 sm:right-4 sm:top-4"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <button
            className="flex absolute left-1 top-1/2 justify-center items-center p-2 w-11 h-11 text-white -translate-y-1/2 hover:text-gray-300 sm:left-4"
            onClick={modalPrev}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 sm:h-12 sm:w-12" />
          </button>

          <ProductImage
            src={displayIndex !== null ? images[displayIndex] : undefined}
            alt={displayIndex !== null ? `Gallery image ${displayIndex + 1}` : ""}
            className={`h-[800px] w-[1100px] max-h-[90vh] max-w-[95vw] rounded-xl object-contain transition-opacity duration-300 sm:rounded-2xl ${
              isFading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="eager"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="flex absolute right-1 top-1/2 justify-center items-center p-2 w-11 h-11 text-white -translate-y-1/2 hover:text-gray-300 sm:right-4"
            onClick={modalNext}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8 sm:h-12 sm:w-12" />
          </button>
        </div>
      )}
    </section>
  );
};

export default React.memo(ProductDetailGrid);
