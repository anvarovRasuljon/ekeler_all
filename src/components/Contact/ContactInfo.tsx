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
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* CHAP — kontakt ma'lumotlari */}
          <div className="flex flex-col ml-0 w-full min-w-0 lg:w-1/2 lg:ml-10">
            <AboutCompanyContentBlock data={DEFAULT_CONTENT_DATA} stacked descriptionClassName={DESCRIPTION_CLASS}>
              <div className="relative w-full h-[200px] mt-10 mb-6 overflow-hidden rounded-lg bg-neutral-100 sm:h-[270px] sm:w-[430px] lg:mt-0 lg:hidden">
                {!mapLoaded && (
                  <div className="flex absolute inset-0 z-10 justify-center items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
                  </div>
                )}
                <iframe
                  title="Office map"
                  src="https://yandex.uz/map-widget/v1/?ll=69.288163%2C41.294999&z=16&pt=69.288163%2C41.294999&theme=dark"
                  className={`block w-full h-full border-0 transition-opacity duration-500 ${
                    mapLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  onLoad={() => setMapLoaded(true)}
                />
              </div>
            </AboutCompanyContentBlock>
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
                src="https://yandex.uz/map-widget/v1/?ll=69.288163%2C41.294999&z=16&pt=69.288163%2C41.294999&theme=dark"
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
