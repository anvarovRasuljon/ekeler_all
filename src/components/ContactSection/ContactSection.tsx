import React from "react";
import CommentBg from "../../assets/Comment_bg.png";
import { useLanguage } from "../../context/LanguageContext";
import { CONTACT_ITEMS } from "./contact.data";
import { ContactCard } from "./ContactCard";

const TITLE_TEXT = {
  uz: "Biz bilan aloqaga chiqish:",
  ru: "Свяжитесь с нами:",
  eng: "Get in touch with us:",
};
const SUBTITLE_TEXT = {
  uz: `Loyihangiz uchun eng yaxshi yechimni birga topamiz.`,
  ru: `Вместе подберём лучшее решение для вашего проекта.`,
  eng: `Let's find the best solution for your project together.`,
};

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section
      className="overflow-hidden relative w-full h-auto bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${CommentBg})` }}
    >
      {/* Responsive: mobilda kichik padding va sarlavha, lg da original o'lchamlar */}
      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-0 lg:pt-32">
        <header className="flex flex-col items-center text-center">
          <h2 className="break-words text-[28px] font-light leading-tight text-white sm:text-[42px] lg:text-[72px]">
            {t(TITLE_TEXT)}
          </h2>
          <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-white/80 sm:text-base">
            {t(SUBTITLE_TEXT)}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 justify-center mt-10 sm:gap-8 md:mt-16 lg:grid-cols-2">
          {CONTACT_ITEMS.map((item) => (
            <ContactCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
export { ContactSection };
