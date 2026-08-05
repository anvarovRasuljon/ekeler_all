import React, { useState, useMemo, useCallback } from 'react';
import { urlFor } from '../sanity/client';

interface OptimizedImageProps {
  src: any;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = '',
  width = 800,
  height,
  className = '',
  fallback,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

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

  const imageUrl = useMemo(() => {
    if (src?._type === 'image' || src?.asset) {
      return urlFor(src).width(width).auto('format').url();
    }
    return typeof src === 'string' ? src : '';
  }, [src, width]);

  const lqipUrl = useMemo(() => src?.asset?.lqip || '', [src]);

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
        className={`w-full h-full object-cover   ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        decoding="async"
        onLoad={onLoad}
        onError={onError}
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

export default React.memo(OptimizedImage);
