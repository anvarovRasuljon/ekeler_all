import React, { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="group relative h-auto min-h-[190px] w-full rounded-[16px] border border-white/15 bg-white p-5 pb-20 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.01] hover:shadow-2xl sm:min-h-[220px] sm:p-6 lg:h-[248px] lg:rounded-[20px] lg:p-8 lg:pb-8">
        <a
          href={href}
          aria-label={title}
          className="flex h-full flex-col"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F1F1F]/20 bg-white transition-all duration-300 group-hover:scale-110 group-hover:border-[#E88029] group-hover:text-[#E88029]">
            <Icon size={ICON_SIZE} className="text-[#1F1F1F] transition-colors duration-300 group-hover:text-[#E88029]" />
          </div>

          <h3 className="mt-5 break-words text-[20px] font-normal text-[#1F1F1F] transition-colors duration-300 group-hover:text-[#E88029] sm:mt-6 sm:text-[28px] lg:text-[36px]">
            {title}
          </h3>
          <p className="mt-2 break-words text-base text-[#444] sm:text-lg lg:text-[22px]">{value}</p>

          <div
            className="absolute bottom-5 right-5 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#1F1F1F] text-[#1F1F1F] transition-all duration-500 group-hover:scale-110 group-hover:border-[#E88029] group-hover:bg-[#E88029] group-hover:text-white sm:bottom-6 sm:right-6 sm:h-[52px] sm:w-[52px] lg:bottom-8 lg:right-8"
            aria-hidden="true"
          >
            <ArrowUpRight size={ARROW_SIZE} className="transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
          </div>
        </a>
      </div>
    </div>
  );
};

export const ContactCard = React.memo(ContactCardBase);
