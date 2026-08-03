import React from 'react';
import { Skeleton, SkeletonBox, SkeletonText, SkeletonCircle } from './Skeleton';

const ProductsPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Product Hero */}
      <div className="relative w-full h-[60vh] overflow-hidden rounded-lg">
        <SkeletonBox className="absolute inset-0 w-full h-full" />
        <div className="absolute bottom-8 left-8 max-w-2xl z-10 space-y-4">
          <Skeleton width="200px" height="14px" />
          <Skeleton width="100%" height="60px" rounded="8px" />
          {/* Responsive: fiksatsiyalangan px o'rniga max-w */}
          <SkeletonText lines={2} className="w-full max-w-[400px]" />
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 flex h-[65px] w-full items-center justify-between bg-white px-4 sm:px-8">
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

      {/* Catalog CTA */}
      <section className="px-4 py-12 sm:px-8 sm:py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-4">
            <Skeleton width="120px" height="14px" />
            <Skeleton width="100%" height="40px" rounded="8px" />
            <SkeletonText lines={3} />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <SkeletonBox className="w-full h-[280px] rounded-2xl" />
            <SkeletonBox className="w-full h-[280px] rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-4 py-12 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <SkeletonBox className="w-full h-[280px] rounded-2xl" />
              <Skeleton width="80%" height="24px" />
              <div className="flex gap-2">
                <Skeleton width="60px" height="20px" rounded="10px" />
                <Skeleton width="60px" height="20px" rounded="10px" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product About */}
      <section className="px-4 py-12 sm:px-8 sm:py-20">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-4">
            <Skeleton width="60%" height="32px" />
            <Skeleton width="100%" height="80px" rounded="8px" />
            <Skeleton width="140px" height="40px" rounded="20px" />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <SkeletonBox className="w-full h-[240px] rounded-2xl" />
            <SkeletonBox className="w-full h-[240px] rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-12 sm:px-8 sm:py-20">
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <SkeletonBox className="absolute inset-0" />
          <div className="relative z-10 p-10">
            <SkeletonText lines={3} className="w-full max-w-[600px]" />
            <div className="flex items-center gap-4 mt-8">
              <SkeletonCircle width="60px" height="60px" />
              <div className="space-y-2">
                <Skeleton width="120px" height="18px" />
                <Skeleton width="80px" height="14px" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPageSkeleton;
