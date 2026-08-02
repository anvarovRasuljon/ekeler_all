import React, { useState } from 'react';
import { urlFor } from '../sanity/client';

interface OptimizedImageProps {
  src: any;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = '',
  width = 800,
  height,
  className = '',
  priority = false,
  fallback,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src) {
    if (fallback) {
      return (
        <img
          src={fallback}
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading="eager"
          decoding="async"
        />
      );
    }
    return null;
  }

  const imageUrl = src?._type === 'image' || src?.asset
    ? urlFor(src).width(width).auto('format').url()
    : typeof src === 'string'
    ? src
    : '';

  const lqipUrl = src?.asset?.lqip || '';

  return (
    <div className={`overflow-hidden relative ${className}`} style={{ width: '100%', height: '100%' }}>
      {!loaded && lqipUrl && (
        <img
          src={lqipUrl}
          alt=""
          className="object-cover absolute inset-0 w-full h-full blur-sm scale-105"
          aria-hidden="true"
        />
      )}
      <img
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
      />
      {error && fallback && (
        <img
          src={fallback}
          alt={alt}
          className="object-cover absolute inset-0 w-full h-full"
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
