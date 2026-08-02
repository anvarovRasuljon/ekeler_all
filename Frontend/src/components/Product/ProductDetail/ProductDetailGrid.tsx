import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "../../../sanity/client";


interface ProductDetailGridProps {
  images: any[];
}

const ProductDetailGrid: React.FC<ProductDetailGridProps> = ({ images }) => {
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

  return (
    <section className="w-full px-4 py-16 mx-auto max-w-[1500px] md:px-6">
      <div className="grid grid-cols-3 gap-6 justify-items-center">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative w-[450px] h-[420px] overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => setSelectedIndex(index)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={urlFor(image).width(600).url()}
              alt={image.alt || ""}
              className="object-cover absolute inset-0 w-full h-full transition-all duration-500 ease-out"
              loading="eager"
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
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 p-2 text-white -translate-y-1/2 hover:text-gray-300"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <ChevronLeft size={48} />
          </button>

          <img
            src={urlFor(selectedImage).width(1200).url()}
            alt={selectedImage.alt || ""}
            className="max-w-[90%] max-h-[90%] object-contain rounded-2xl"
            loading="eager"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 p-2 text-white -translate-y-1/2 hover:text-gray-300"
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductDetailGrid;
