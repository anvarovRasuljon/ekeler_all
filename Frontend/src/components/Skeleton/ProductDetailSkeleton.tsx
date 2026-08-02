import React from 'react';
import { Skeleton, SkeletonBox, SkeletonText, SkeletonCircle } from './Skeleton';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Navigation */}
      <div className="sticky top-0 z-50 h-[65px] w-full bg-white flex items-center justify-between px-8">
        <div className="flex gap-6">
          <Skeleton width="80px" height="16px" />
          <Skeleton width="80px" height="16px" />
        </div>
        <SkeletonCircle width="40px" height="40px" />
        <div className="flex gap-6">
          <Skeleton width="80px" height="16px" />
          <Skeleton width="80px" height="16px" />
        </div>
      </div>

      <section className="py-20 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <SkeletonBox className="w-full h-[500px] rounded-2xl" />
          {/* Details */}
          <div className="space-y-6">
            <Skeleton width="120px" height="14px" />
            <Skeleton width="100%" height="48px" rounded="8px" />
            <SkeletonText lines={4} />
            <div className="space-y-3">
              <Skeleton width="60%" height="20px" />
              <Skeleton width="40%" height="20px" />
            </div>
            <div className="space-y-3 pt-4">
              <Skeleton width="80px" height="14px" />
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} width="80px" height="32px" rounded="16px" />
                ))}
              </div>
            </div>
            <Skeleton width="160px" height="48px" rounded="24px" className="mt-4" />
          </div>
        </div>
      </section>

      {/* Extra images / gallery */}
      <section className="py-20 px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBox key={i} className="w-full h-[200px] rounded-2xl" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailSkeleton;
