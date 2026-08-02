import React from 'react';
import { Skeleton, SkeletonBox, SkeletonText, SkeletonCircle } from './Skeleton';

const AboutPageSkeleton: React.FC = () => {
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

      {/* About Company Image + Content */}
      <section className="py-20 px-8">
        <div className="flex flex-col md:flex-row gap-12">
          <SkeletonBox className="w-full md:w-1/2 h-[500px] rounded-2xl" />
          <div className="w-full md:w-1/2 space-y-6">
            <Skeleton width="120px" height="14px" />
            <Skeleton width="100%" height="48px" rounded="8px" />
            <SkeletonText lines={4} />
            <div className="space-y-4 pt-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <SkeletonCircle />
                  <Skeleton width="200px" height="16px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Company Block */}
      <section className="py-20 px-8">
        <div className="grid grid-cols-2 gap-6 mb-12">
          <SkeletonBox className="w-full h-[300px] rounded-2xl" />
          <SkeletonBox className="w-full h-[300px] rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <Skeleton width="120px" height="14px" />
            <SkeletonText lines={3} />
          </div>
          <div className="space-y-4">
            <Skeleton width="120px" height="14px" />
            <SkeletonText lines={3} />
          </div>
        </div>
        <SkeletonText lines={5} className="max-w-4xl" />
      </section>

      {/* About Features */}
      <section className="py-20 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <SkeletonBox className="w-full h-[220px] rounded-2xl" />
              <Skeleton width="80%" height="24px" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8">
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <SkeletonBox className="absolute inset-0" />
          <div className="relative z-10 p-10">
            <SkeletonText lines={3} className="w-[600px]" />
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

export default AboutPageSkeleton;
