import React from 'react';
import { Skeleton, SkeletonBox, SkeletonText, SkeletonCircle } from './Skeleton';

const HomePageSkeleton: React.FC = () => {
  return (
    <div className="p-2 min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="overflow-hidden relative w-full h-screen rounded-lg">
        <SkeletonBox className="absolute inset-0 w-full h-full" />
        <div className="absolute top-[6%] left-[4%] max-w-[38%] z-10 space-y-6">
          <SkeletonText lines={4} className="w-[500px]" />
          <Skeleton width="120px" height="20px" />
        </div>
      </div>

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

      {/* About Us */}
      <section className="px-8 py-20">
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="flex-1 space-y-4">
            <Skeleton width="120px" height="14px" />
            <Skeleton width="100%" height="50px" rounded="8px" />
            <Skeleton width="80%" height="50px" rounded="8px" />
            <Skeleton width="140px" height="40px" rounded="20px" />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            <SkeletonBox className="w-full h-[260px] rounded-lg" />
            <SkeletonBox className="w-full h-[260px] rounded-lg" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton width="80px" height="48px" />
              <Skeleton width="100%" height="24px" />
              <Skeleton width="80%" height="16px" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-8 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <SkeletonBox className="w-full h-[300px] rounded-2xl" />
          <div className="space-y-6">
            <Skeleton width="60%" height="20px" />
            <SkeletonText lines={3} />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <SkeletonCircle />
                  <Skeleton width="200px" height="16px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-20">
        <div className="grid grid-cols-3 gap-6">
          <SkeletonBox className="w-full h-[350px] rounded-2xl" />
          <div className="flex flex-col justify-center space-y-6">
            <Skeleton width="100%" height="28px" />
            <SkeletonText lines={4} />
          </div>
          <SkeletonBox className="w-full h-[350px] rounded-2xl" />
        </div>
      </section>

      {/* Products */}
      <section className="px-8 py-20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-6 items-center">
            <SkeletonBox className="w-[240px] h-[140px] rounded-2xl" />
            <Skeleton width="160px" height="28px" />
          </div>
          <div className="flex gap-4 items-center">
            <SkeletonText lines={2} className="w-[300px]" />
            <SkeletonCircle width="20px" height="20px" className="text-neutral-200" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20">
        <Skeleton width="100px" height="14px" />
        <Skeleton width="70%" height="60px" rounded="8px" />
        <div className="grid grid-cols-2 gap-6 mt-8">
          <SkeletonBox className="w-full h-[300px] rounded-2xl" />
          <SkeletonBox className="w-full h-[300px] rounded-2xl" />
        </div>
      </section>

      {/* Industrial Gallery */}
      <section className="px-8 py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBox key={i} className="w-full h-[260px] rounded-2xl" />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 py-20">
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <SkeletonBox className="absolute inset-0" />
          <div className="relative z-10 p-10">
            <SkeletonText lines={3} className="w-[600px]" />
            <div className="flex gap-4 items-center mt-8">
              <SkeletonCircle width="60px" height="60px" />
              <div className="space-y-2">
                <Skeleton width="120px" height="18px" />
                <Skeleton width="80px" height="14px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full h-[80vh] mt-20">
        <SkeletonBox className="absolute inset-0" />
        <div className="absolute bottom-0 p-8 w-full h-1/2 backdrop-blur-sm bg-white/80">
          <div className="grid grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton width="100%" height="24px" />
                <SkeletonText lines={3} />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePageSkeleton;
