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
      className={`${className || ''} transition-all duration-700 ${
        loaded ? 'blur-0' : 'blur-[15px]'
      }`}
      onLoad={(e) => {
        setLoaded(true);
        if (onLoad) onLoad(e);
      }}
    />
  );
}
