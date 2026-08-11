import React, { useState } from 'react';

type ProductImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function ProductImage({
  className,
  onLoad,
  style,
  ...props
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      className={`${className || ''} transition-all duration-700 ${
        loaded ? 'blur-0 scale-100' : 'blur-[15px] scale-95'
      }`}
      style={{ ...style, opacity: loaded ? 1 : 0.6 }}
      onLoad={(e) => {
        setLoaded(true);
        if (onLoad) onLoad(e);
      }}
    />
  );
}
