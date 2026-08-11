import React, { useState } from 'react';

type AnimatedImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function AnimatedImage({
  className,
  onLoad,
  style,
  ...props
}: AnimatedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      className={`${className || ''} transition-all duration-700 ${
        loaded ? 'blur-0 opacity-100' : 'blur-[15px] opacity-0'
      }`}
      style={{ ...style, clipPath: loaded ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)' }}
      onLoad={(e) => {
        setLoaded(true);
        if (onLoad) onLoad(e);
      }}
    />
  );
}
