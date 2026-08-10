import React, { useEffect, useRef, useState } from "react";

interface FadeImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "eager" | "lazy";
  onClick?: () => void;
}

const FadeImage: React.FC<FadeImageProps> = ({
  src,
  alt,
  className = "",
  imgClassName = "h-full w-full object-cover",
  loading = "lazy",
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      onClick={onClick}
      className={`relative overflow-hidden ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform, opacity",
      }}
    >
      {/* Skeleton — blur o'rniga oddiy neutral pulse */}
      <div
        className="absolute inset-0 -z-10 animate-pulse bg-neutral-200"
        style={{
          opacity: loaded ? 0 : 1,
          transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={imgClassName}
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? undefined : "scale(1.03)",
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
};

export default FadeImage;
