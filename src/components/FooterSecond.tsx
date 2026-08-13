import React from "react";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import backgroundImageUrl from "../assets/Footer_second.png";
import { useLanguage } from "../context/LanguageContext";

export interface FooterLink {
  label?: Record<string, string> | string;
  href: string;
  external?: boolean;
}

const DEFAULT_NAV_LINKS: FooterLink[] = [
  { label: { ru: "Главная", uz: "Bosh sahifa", eng: "Home" }, href: "/" },
  { label: { ru: "О нас", uz: "Biz haqimizda", eng: "About" }, href: "/about" },
  { label: { ru: "Продукты", uz: "Mahsulotlar", eng: "Products" }, href: "/products" },
  { label: { ru: "Контакты", uz: "Aloqa", eng: "Contact" }, href: "/contact" },
];

const DEFAULT_SOCIAL_LINKS: FooterLink[] = [
  { label: { ru: "Instagram", uz: "Instagram", eng: "Instagram" }, href: "https://instagram.com", external: true },
  { label: { ru: "Telegram", uz: "Telegram", eng: "Telegram" }, href: "https://telegram.org", external: true },
  { label: { ru: "Facebook", uz: "Facebook", eng: "Facebook" }, href: "https://facebook.com", external: true },
];

const FooterSecond: React.FC = () => {
  const { t } = useLanguage();
  const safeNavLinks: FooterLink[] = DEFAULT_NAV_LINKS;
  const safeSocialLinks: FooterLink[] = DEFAULT_SOCIAL_LINKS;
  const backgroundImageAlt = "";

  const heading = { ru: "Давайте работать вместе", uz: "Birga ishlaymiz", eng: "Let's work together" };
  const ctaText = { ru: "Свяжитесь с нами", uz: "Aloqa", eng: "Contact us" };
  const ctaLink = "contact";
  const navLabel = { ru: "Навигация", uz: "Navigatsiya", eng: "Navigation" };
  const socialLabel = { ru: "Социальные сети", uz: "Ijtimoiy tarmoqlar", eng: "Social" };
  const contactLabel = { ru: "Контакты", uz: "Aloqa", eng: "Contact" };
  const phone = "+998 77 777-77-77";
  const email = "info@ekeler.uz";
  const address = { ru: "Ташкент, Узбекистан", uz: "Toshkent, O'zbekiston", eng: "Tashkent, Uzbekistan" };
  const copyrightText = { ru: "© 2026 Ekeler. Все права защищены.", uz: "© 2026 Ekeler. Barcha huquqlar himoyalangan.", eng: " 2026 Ekeler. All rights reserved." };
  const privacyPolicyLink = "/privacy-policy";
  const termsOfUseLink = "/terms-of-use";

  return (
    <footer
      className="relative w-full"
    >
      {/* Responsive: fiksatsiyalangan 100vh o'rniga min-h — mobilda kontent kesilmaydi */}
      <div className="relative min-h-[calc(100dvh-65px)] w-full overflow-hidden">
        <img
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          className="object-cover absolute inset-0 w-full h-full"
        />

        <div className="relative p-4 pt-6 md:p-8">
          <div
            className="mx-[15px] rounded-[8px] bg-white px-5 py-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:px-6 sm:py-10 md:rounded-[8px] md:px-14 md:py-12"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
              {/* Heading + CTA */}
              {heading && (
                <div>
                  <h2 className="max-w-[320px] break-words text-[22px] leading-[30px] text-[#1B1D20] sm:text-[28px] sm:leading-[36px]">
                    {t(heading)}
                  </h2>
                  {ctaText && ctaLink && (
                    <a
                      href={ctaLink}
                      className="group mt-6 inline-flex min-h-[44px] items-center gap-1 border-b border-[#ECECEC] pb-1 text-[15px] text-[#1B1D20] transition-colors duration-300 hover:border-[#E88029] hover:text-[#E88029] sm:mt-8"
                    >
                      {t(ctaText)}
                      <ArrowUpRight size={16} className="text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                    </a>
                  )}
                </div>
              )}

              {/* Nav links */}
              {safeNavLinks.length > 0 && (
                <div>
                  {navLabel && (
                    <span className="font-inter font-normal text-[12px] leading-[16px] tracking-[-0.02em] sm:font-inter sm:text-[14px] sm:leading-[22px] text-stone-400 block mb-5">{t(navLabel)}</span>
                  )}
                  <ul className="space-y-4">
                    {safeNavLinks.map((link: FooterLink, i: number) => (
                      <li key={link.href || String(i)}>
                        <a
                          href={link.href}
                          className="group font-inter font-normal text-[14px] leading-[24px] tracking-[-0.02em] sm:font-inter sm:text-[18px] sm:leading-[32px] align-middle inline-flex items-center gap-4 text-[#1B1D20] transition-colors duration-300 hover:text-[#E88029]"
                        >
                          {link.label ? t(link.label) : null}
                          <ArrowUpRight size={14} className="text-current opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                          {link.external && (
                            <ArrowUpRight size={14} className="text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social links */}
              {safeSocialLinks.length > 0 && (
                <div>
                  {socialLabel && (
                    <span className="font-inter font-normal text-[12px] leading-[16px] tracking-[-0.02em] sm:font-inter sm:text-[14px] sm:leading-[22px] text-stone-400 block mb-5">{t(socialLabel)}</span>
                  )}
                  <ul className="space-y-4">
                    {safeSocialLinks.map((link: FooterLink, i: number) => (
                      <li key={link.href || String(i)}>
                        <a
                          href={link.href}
                          className="group font-inter font-normal text-[14px] leading-[24px] tracking-[-0.02em] sm:font-inter sm:text-[18px] sm:leading-[32px] align-middle inline-flex items-center gap-4 text-[#1B1D20] transition-colors duration-300 hover:text-[#E88029]"
                        >
                          {link.label ? t(link.label) : null}
                          <ArrowUpRight size={14} className="text-current opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact */}
              {(phone || email || address) && (
                <div>
                  {contactLabel && (
                    <a href="/contact" className="font-inter font-normal text-[12px] leading-[16px] tracking-[-0.02em] sm:font-inter sm:text-[14px] sm:leading-[22px] text-[#1B1D20] inline-block mb-5 border-b border-[#ECECEC] pb-1 transition-colors duration-300 hover:text-[#E88029] hover:border-[#E88029]">{t(contactLabel)}</a>
                  )}
                  <ul className="space-y-4">
                    {phone && (
                      <li className="flex gap-3 items-center group">
                        <span className="flex justify-center items-center w-10 h-10 p-[13px] rounded-full border border-[#ECECEC] text-orange transition-colors duration-300 group-hover:border-orange shrink-0">
                          <Phone size={14} />
                        </span>
                        <a
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="group font-inter font-normal text-[14px] leading-[24px] tracking-[-0.02em] sm:font-inter sm:text-[18px] sm:leading-[32px] align-middle inline-flex items-center gap-4 text-[#1B1D20] transition-colors duration-300 hover:text-[#E88029]"
                        >
                          {phone}
                          <ArrowUpRight size={14} className="text-current opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                        </a>
                      </li>
                    )}
                    {email && (
                      <li className="flex gap-3 items-center group">
                        <span className="flex justify-center items-center w-10 h-10 p-[13px] rounded-full border border-[#ECECEC] text-orange transition-colors duration-300 group-hover:border-orange shrink-0">
                          <Mail size={14} />
                        </span>
                        <a
                          href={`mailto:${email}`}
                          className="group font-inter font-normal text-[14px] leading-[24px] tracking-[-0.02em] sm:font-inter sm:text-[18px] sm:leading-[32px] align-middle inline-flex items-center gap-4 text-[#1B1D20] transition-colors duration-300 hover:text-[#E88029]"
                        >
                          {email}
                          <ArrowUpRight size={14} className="text-current opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                        </a>
                      </li>
                    )}
                    {address && (
                      <li className="flex gap-3 items-center group">
                        <span className="flex justify-center items-center w-10 h-10 p-[13px] rounded-full border border-[#ECECEC] text-orange transition-colors duration-300 group-hover:border-orange shrink-0">
                          <MapPin size={14} />
                        </span>
                        <span className="group inline-flex max-w-[220px] items-center gap-1 break-words text-[15px] text-[#1B1D20] sm:text-[16px]">
                          {t(address)}
                          <ArrowUpRight size={14} className="text-current opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <hr className="my-8 border-stone-100 sm:my-10" />

            <div className="flex flex-col items-center justify-between gap-4 text-center text-[13px] text-stone-400 sm:text-[14px] md:flex-row md:text-left">
              {copyrightText && <span>{t(copyrightText)}</span>}
              {privacyPolicyLink && (
                <a
                  href={privacyPolicyLink}
                  className="underline underline-offset-2 text-[#1B1D20] transition-colors duration-300 hover:text-[#E88029]"
                >
                  {t({ ru: 'Политика конфиденциальности', uz: 'Maxfiylik siyosati', eng: 'Privacy policy' })}
                </a>
              )}
              {termsOfUseLink && (
                <a
                  href={termsOfUseLink}
                  className="underline underline-offset-2 text-[#1B1D20] transition-colors duration-300 hover:text-[#E88029]"
                >
                  {t({ ru: 'Условия использования', uz: 'Foydalanish shartlari', eng: 'Terms of use' })}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSecond;