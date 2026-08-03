import React from "react";
import CommentBg from "../../assets/Comment_bg.png";
import { CONTACT_ITEMS } from "./contact.data";
import { ContactCard } from "./ContactCard";

const TITLE_TEXT = "Biz bilan aloqaga chiqish:";
const SUBTITLE_TEXT = `Lorem Impus porum dor,
forem dorem quick,
lore puel duit`;

const ContactSection: React.FC = () => {
  return (
    <section
      className="overflow-hidden relative w-full h-auto bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${CommentBg})` }}
    >
      {/* Responsive: mobilda kichik padding va sarlavha, lg da original o'lchamlar */}
      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-0 lg:pt-32">
        <header className="flex flex-col items-center text-center">
          <h2 className="break-words text-[28px] font-light leading-tight text-white sm:text-[42px] lg:text-[72px]">
            {TITLE_TEXT}
          </h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/80 sm:text-base">
            {SUBTITLE_TEXT}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 justify-center gap-5 sm:gap-8 md:mt-16 lg:grid-cols-2">
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
