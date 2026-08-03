import React from "react";

const BlogPage: React.FC = () => {
  return (
    // Responsive: mobilda kichik padding va sarlavha
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="break-words font-inter text-[26px] font-normal leading-tight text-[#1B1D20] sm:text-[32px] md:text-[48px]">
          Blog
        </h1>
        <p className="mt-6 text-base font-inter text-neutral-500 md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default React.memo(BlogPage);
