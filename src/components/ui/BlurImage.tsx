import React, { useState, useRef, useEffect } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const BlurImage: React.FC<BlurImageProps> = ({ src, alt, className = "", width, height }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Scroll-ga kirganda parallax-fade uchun trigger
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0) scale(1)" : "translate3d(0,24px,0) scale(1.02)",
        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Skeleton/blur pulse — rasm hali yuklanmagan holat */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "linear-gradient(110deg, #f1f1f1 8%, #f8f8f8 18%, #f1f1f1 33%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s linear infinite",
            willChange: "background-position",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      )}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        onLoad={() => setLoaded(true)}
        className={`h-auto w-full object-cover  transition duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        style={{
          opacity: loaded ? 1 : 0.6,
          transform: loaded ? "scale(1)" : "scale(1.05)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />
    </div>
  );
};

export default BlurImage;
