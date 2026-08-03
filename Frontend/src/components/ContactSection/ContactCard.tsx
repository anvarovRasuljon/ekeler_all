import React from "react";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import type { ContactItem } from "./contact.data";

const ICON_SIZE = 20;
const ARROW_SIZE = 24;

const ContactCardBase: React.FC<ContactItem> = ({
  title,
  value,
  icon,
  href,
}) => {
  const Icon = icon === "phone" ? Phone : Mail;

  return (
    // Responsive: mobilda padding va shrift kichrayadi, o'q tugmasi matn bilan to'qnashmaydi
    <div className="group relative h-auto min-h-[190px] w-full rounded-[16px] border border-white/15 bg-white p-5 pb-20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:min-h-[220px] sm:p-6 lg:h-[248px] lg:rounded-[20px] lg:p-8 lg:pb-8">
      <a
        href={href}
        aria-label={title}
        className="flex h-full flex-col"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-white">
          <Icon size={ICON_SIZE} className="text-[#1F1F1F]" />
        </div>

        <h3 className="mt-5 break-words text-[20px] font-normal text-[#1F1F1F] sm:mt-6 sm:text-[28px] lg:text-[36px]">
          {title}
        </h3>
        <p className="mt-2 break-words text-base text-[#444] sm:text-lg lg:text-[22px]">{value}</p>

        <div
          className="absolute bottom-5 right-5 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#1F1F1F] text-[#1F1F1F] transition-all duration-300 group-hover:rotate-12 group-hover:bg-black group-hover:text-white sm:bottom-6 sm:right-6 sm:h-[52px] sm:w-[52px] lg:bottom-8 lg:right-8"
          aria-hidden="true"
        >
          <ArrowUpRight size={ARROW_SIZE} />
        </div>
      </a>
    </div>
  );
};

export const ContactCard = React.memo(ContactCardBase);
