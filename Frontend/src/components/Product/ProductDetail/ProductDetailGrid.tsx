import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../../../sanity/client";

interface ProductDetailGridProps {
  images: any[];
}

const ProductDetailGrid: React.FC<ProductDetailGridProps> = ({ images }) => {
  const reduced = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex(null);
  };

  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : null;

  // Responsive: 1 -> 2 -> 3 ustun, kartalar kengligi fluid
  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative h-[260px] w-full max-w-[450px] cursor-pointer overflow-hidden rounded-xl sm:h-[340px] sm:rounded-2xl lg:h-[420px]"
            onClick={() => setSelectedIndex(index)}
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={reduced ? undefined : { scale: 1.03 }}
            transition={{ duration: reduced ? 0.01 : 0.5, delay: index * 0.1 }}
          >
            <img
              src={getImageUrl(image, { width: 600 }) || ""}
              alt={image.alt || ""}
              className="object-cover absolute inset-0 w-full h-full transition-all duration-500 ease-out"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 transition-all duration-500 bg-black/0 group-hover:bg-black/40" />
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center bg-black/90"
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
            onClick={handlePrev}
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8 sm:h-12 sm:w-12" />
          </button>

          <img
            src={getImageUrl(selectedImage, { width: 1200 }) || ""}
            alt={selectedImage.alt || ""}
            className="max-h-[80%] max-w-[80%] rounded-xl object-contain sm:max-h-[90%] sm:max-w-[90%] sm:rounded-2xl"
            loading="eager"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center p-2 text-white hover:text-gray-300 sm:right-4"
            onClick={handleNext}
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
