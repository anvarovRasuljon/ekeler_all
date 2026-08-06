import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '16px',
  rounded = '4px',
}) => {
  return (
    <div
      className={`animate-pulse bg-neutral-200 ${className}`}
      style={{ width, height, borderRadius: rounded }}
    />
  );
};

export const SkeletonBox: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children }) => {
  return (
    <div className={`animate-pulse bg-neutral-200 ${className}`}>
      {children}
    </div>
  );
};

export const SkeletonCircle: React.FC<SkeletonProps> = ({
  width = '40px',
  height = '40px',
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-neutral-200 rounded-full ${className}`}
      style={{ width, height }}
    />
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  width?: string;
  className?: string;
}> = ({ lines = 1, width = '100%', className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={typeof width === 'string' ? width : `${width}%`}
          height="16px"
          className={i === lines - 1 && lines > 1 ? 'w-2/3' : ''}
        />
      ))}
    </div>
  );
};
