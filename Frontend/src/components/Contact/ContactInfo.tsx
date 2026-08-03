import React from "react";
import AboutCompanyContentBlock from "../About/AboutCompanyContentBlock";
import type { AboutCompanyContentData } from "../About/AboutCompanyContentBlock";

const NAV_HEIGHT_PX = 65;
const IMG_GAP = 30;
const MAP_HEIGHT = 380;
// Responsive: mobilda kichikroq, sm+ da original o'lcham
const DESCRIPTION_CLASS = "font-['Manrope'] font-normal text-[22px] leading-[30px] sm:text-[28px] sm:leading-[36px] text-[#1B1D20] max-w-[450px] whitespace-pre-line break-words";

const DEFAULT_CONTENT_DATA: AboutCompanyContentData = {
  title: { ru: "КОНТАКТЫ", uz: "KONTAKTLAR", eng: "CONTACTS" },
  description: {
    ru: "Ekeler — Lorem impus\nLorem ipsum dolor sit amet",
    uz: "Ekeler — Lorem impus\nLorem ipsum dolor sit amet",
    eng: "Ekeler — Lorem impus\nLorem ipsum dolor sit amet",
  },
  phone: "+998 77 777-77-77",
  email: "info@ekeler.uz",
  location: {
    ru: "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit",
    uz: "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit",
    eng: "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit",
  },
};

export const ContactInfo: React.FC = () => {
  const stickyTop = React.useMemo(() => NAV_HEIGHT_PX + IMG_GAP, []);

  return (
    <div className="w-full bg-white text-[#1B1D20]">
      <div className="px-4 pt-6 pb-16 w-full md:px-6 lg:px-8">
        {/* Mobil xarita */}
        {/* Responsive: mobilda xarita foydalanish uchun yetarli balandlikda */}
        <div className="mb-8 h-[240px] w-full overflow-hidden rounded-lg sm:h-[300px] lg:hidden">
          <iframe
            title="Office map"
            src="https://maps.google.com/maps?q=Tashkent&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="block w-full h-full border-0"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-[30px] lg:flex-row">
          {/* CHAP — kontakt ma'lumotlari */}
          <div className="flex flex-col w-full min-w-0 lg:w-1/2">
            <AboutCompanyContentBlock data={DEFAULT_CONTENT_DATA} minHeight={MAP_HEIGHT} descriptionClassName={DESCRIPTION_CLASS} />
          </div>

          {/* O'NG — xarita */}
          <div className="hidden w-1/2 shrink-0 lg:block">
            <div
              className="overflow-hidden sticky w-full rounded-lg"
              style={{
                top: stickyTop,
                height: MAP_HEIGHT,
                maxHeight: MAP_HEIGHT,
              }}
            >
              <iframe
                title="Office map"
                src="https://maps.google.com/maps?q=Tashkent&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="block w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactInfo);
