import React from "react";
import Navigation from "../Home/Navigation";
import Footer from "../Home/Footer";

interface LegalPageProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  updated?: React.ReactNode;
  children: React.ReactNode;
}

const LegalPage: React.FC<LegalPageProps> = ({ eyebrow, title, updated, children }) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navigation showSpacer={true} />
      <main className="mx-auto max-w-[760px] px-4 sm:px-6 py-16 md:py-24">
        {eyebrow && (
          <p className="mb-4 block w-fit mx-auto border border-[#ECECEC] rounded-[8px] px-3 py-1 text-center text-[12px] font-normal uppercase tracking-[0.1em] text-stone-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mb-4 text-center text-[clamp(28px,1.75rem+1.5vw,48px)] font-normal leading-tight text-[#1B1D20]">
          {title}
        </h1>
        {updated && (
          <p className="font-inter text-[16px] leading-[20px] tracking-[-0.02em] text-center text-stone-400 border-b border-dashed border-[#1B1D20]/40 mt-[60px] mb-[60px] pb-4 align-middle">{updated}</p>
        )}
        <div className="space-y-10 text-left text-stone-500">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
