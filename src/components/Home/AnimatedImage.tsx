import React, { useState } from 'react';

type AnimatedImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function AnimatedImage({
  className,
  onLoad,
  ...props
}: AnimatedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      className={`${className || ''} transition-opacity duration-700 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
      onLoad={(e) => {
        setLoaded(true);
        if (onLoad) onLoad(e);
      }}
    />
  );
}
