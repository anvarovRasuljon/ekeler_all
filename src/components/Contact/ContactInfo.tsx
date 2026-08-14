import React from "react";
import { Loader2 } from "lucide-react";
import AboutCompanyContentBlock from "../About/AboutCompanyContentBlock";
import type { AboutCompanyContentData } from "../About/AboutCompanyContentBlock";

// Responsive: mobilda kichikroq, sm+ da original o'lcham
const DESCRIPTION_CLASS = "font-['Inter'] font-normal text-[22px] leading-[30px] sm:text-[28px] sm:leading-[36px] text-[#1B1D20] max-w-[450px] whitespace-pre-line break-words";

const DEFAULT_CONTENT_DATA: AboutCompanyContentData = {
  title: { ru: "КОНТАКТЫ", uz: "KONTAKTLAR", eng: "CONTACTS" },
  description: {
    ru: "Свяжитесь с Ekeler. Используйте контакты ниже для вопросов, заказов или запроса образцов.",
    uz: "Ekeler bilan bog'laning. Savol, buyurtma yoki namuna so'rash uchun quyidagi ma'lumotlardan foydalaning.",
    eng: "Get in touch with Ekeler. Use the details below for questions, orders, or sample requests.",
  },
  phone: "+998 90 808-87-89",
  email: "info@ekeler.uz",
  location: {
    ru: "А.Темур 53, Ташкент",
    uz: "Amir Temur 53, Toshkent",
    eng: "Amir Temur 53, Tashkent",
  },
};

export const ContactInfo: React.FC = () => {
  const [mapLoaded, setMapLoaded] = React.useState(false);

  return (
    <div className="w-full bg-white text-[#1B1D20]">
      <div className="px-4 pt-6 pb-16 w-full md:px-6 lg:px-8">
        {/* Mobil xarita */}
        {/* Responsive: mobilda xarita foydalanish uchun yetarli balandlikda */}
        <div className="relative mx-auto mb-8 h-[170px] w-[280px] overflow-hidden rounded-lg bg-neutral-100 sm:h-[270px] sm:w-[430px] lg:hidden">
          {!mapLoaded && (
            <div className="flex absolute inset-0 z-10 justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
          )}
          <iframe
            title="Office map"
            src="https://maps.google.com/maps?q=Amir Temur 53, Amir Temur 53, Tashkent&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className={`block w-full h-full border-0 transition-opacity duration-500 ${
              mapLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            onLoad={() => setMapLoaded(true)}
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* CHAP — kontakt ma'lumotlari */}
          <div className="flex flex-col ml-10 w-full min-w-0 lg:w-1/2">
            <AboutCompanyContentBlock data={DEFAULT_CONTENT_DATA} stacked descriptionClassName={DESCRIPTION_CLASS} />
          </div>

          {/* O'NG — xarita */}
          <div className="hidden w-1/2 shrink-0 lg:flex lg:flex-col lg:items-center lg:justify-end">
            <div
              className="overflow-hidden relative mx-auto h-[270px] w-[430px] rounded-lg bg-neutral-100"
            >
              {!mapLoaded && (
                <div className="flex absolute inset-0 z-10 justify-center items-center">
                  <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
                </div>
              )}
              <iframe
                title="Office map"
                src="https://maps.google.com/maps?q=Amir Temur 53, Amir Temur 53, Tashkent&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className={`block w-full h-full border-0 transition-opacity duration-500 ${
                  mapLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                onLoad={() => setMapLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactInfo);
