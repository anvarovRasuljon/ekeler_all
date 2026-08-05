import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
// import bgFallback from "../../assets/hero.png";
// import { urlFor } from "../../sanity/client";
import { useLanguage } from "../../context/LanguageContext";
import backgroundImageUrl from "../../assets/Footer_bg_img.png"


export interface FooterLink {
  label: any; // localeString object { ru: string, uz: string, eng: string }
  href: string;
  external?: boolean;
}

interface FooterProps {
  backgroundImage?: any;
  backgroundImageAlt?: string;
  heading?: any; // localeText
  ctaText?: any; // localeString
  ctaLink?: string;
  navLabel?: any; // localeString
  navLinks?: FooterLink[];
  socialLabel?: any; // localeString
  socialLinks?: FooterLink[];
  contactLabel?: any; // localeString
  phone?: string;
  email?: string;
  address?: any; // localeText
  copyrightText?: any; // localeString
  privacyPolicyLink?: string;
  termsOfUseLink?: string;
}

const DEFAULT_NAV_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_SOCIAL_LINKS: FooterLink[] = [
  { label: "Instagram", href: "https://instagram.com", external: true },
  { label: "Telegram", href: "https://telegram.org", external: true },
  { label: "Facebook", href: "https://facebook.com", external: true },
];

const Footer: React.FC<FooterProps> = ({
  // backgroundImage,
  backgroundImageAlt = "",
  heading = "Let's work together",
  ctaText = "Contact us",
  ctaLink = "contact",
  navLabel = "Navigation",
  navLinks = DEFAULT_NAV_LINKS,
  socialLabel = "Social",
  socialLinks = DEFAULT_SOCIAL_LINKS,
  contactLabel = "Contact",
  phone = "+998 90 123 45 67",
  email = "info@ekeler.uz",
  address = "Tashkent, Uzbekistan",
  copyrightText = "© 2026 Ekeler. All rights reserved.",
  privacyPolicyLink = "#",
  termsOfUseLink = "#",
}) => {
  const { t } = useLanguage();

  const headingText = useMemo(() => t(heading), [t, heading]);
  const ctaLabel = useMemo(() => (ctaText ? t(ctaText) : null), [t, ctaText]);
  const navLabelText = useMemo(() => (navLabel ? t(navLabel) : null), [t, navLabel]);
  const socialLabelText = useMemo(() => (socialLabel ? t(socialLabel) : null), [t, socialLabel]);
  const contactLabelText = useMemo(() => (contactLabel ? t(contactLabel) : null), [t, contactLabel]);
  const addressText = useMemo(() => (address ? t(address) : null), [t, address]);
  const copyrightTextValue = useMemo(() => (copyrightText ? t(copyrightText) : null), [t, copyrightText]);
  const privacyText = useMemo(() => t({ ru: 'Политика конфиденциальности', uz: 'Maxfiylik siyosati', eng: 'Privacy policy' }), [t]);
  const termsText = useMemo(() => t({ ru: 'Условия использования', uz: 'Foydalanish shartlari', eng: 'Terms of use' }), [t]);


  return (
    <footer
      className="relative w-full"
    >
      {/* Background image */}
      {/* Responsive: fiksatsiyalangan 100vh o'rniga min-h — mobilda kontent kesilmaydi */}
      <div className="relative min-h-[80vh] w-full overflow-hidden sm:min-h-[90vh] lg:min-h-[100vh]">
        <img
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="object-cover absolute inset-0 w-full h-full"
        />

        {/* White card */}
        <div className="relative p-4 pt-6 md:p-8">
          <div
            className="mx-auto max-w-7xl rounded-[20px] bg-white px-5 py-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:px-6 sm:py-10 md:rounded-[28px] md:px-14 md:py-12"
                      >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
              {/* Heading + CTA */}
              {heading && (
                <div>
                  <h2 className="max-w-[320px] break-words text-[22px] leading-[30px] text-[#1B1D20] sm:text-[28px] sm:leading-[36px]">{headingText}</h2>
                  {ctaText && ctaLink && (
                    <a
                                           href={ctaLink}
                      className="inline-flex items-center gap-1 mt-8 text-[15px] text-[#1B1D20] border-b border-[#1B1D20] pb-1 hover:text-[#E88029] hover:border-[#E88029]"
                    >
                      {ctaLabel}
                      <ArrowUpRight size={16} className="text-[#E88029]" />
                    </a>
                  )}
                </div>
              )}

              {/* Nav links */}
              {(navLinks || []).length > 0 && (
                <div>
                  {navLabelText && <span className="text-[13px] text-stone-400 block mb-5">{navLabelText}</span>}
                  <ul className="space-y-4">
                    {(navLinks || []).map((link) => (
                      <li key={link.label?.ru || link.href}>
                        <a
                                                   href={link.href}
                          className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029]"
                        >
                          {t(link.label)}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1   group-hover:opacity-100 group-hover:translate-y-0" />
                          {link.external && <ArrowUpRight size={14} className="text-[#E88029]" />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social links */}
              {(socialLinks || []).length > 0 && (
                <div>
                  {socialLabelText && <span className="text-[13px] text-stone-400 block mb-5">{socialLabelText}</span>}
                  <ul className="space-y-4">
                    {(socialLinks || []).map((link) => (
                      <li key={link.label?.ru || link.href}>
                        <a
                                                   href={link.href}
                          className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029]"
                        >
                          {t(link.label)}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1   group-hover:opacity-100 group-hover:translate-y-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact info */}
              {(phone || email || address) && (
                <div>
                  {contactLabelText && <span className="text-[13px] text-stone-400 block mb-5">{contactLabelText}</span>}
                  <ul className="space-y-4">
                    {phone && (
                      <li className="flex gap-4 items-center">
                        <span className="flex justify-center items-center w-10 h-10 rounded-full border border-stone-200 shrink-0 text-base">📞</span>
                        <a href={`tel:${phone.replace(/\s/g, "")}`} className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029]">
                          {phone}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1   group-hover:opacity-100 group-hover:translate-y-0" />
                        </a>
                      </li>
                    )}
                    {email && (
                      <li className="flex gap-4 items-center">
                        <span className="flex justify-center items-center w-10 h-10 rounded-full border border-stone-200 shrink-0 text-base">📧</span>
                        <a href={`mailto:${email}`} className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029]">
                          {email}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1   group-hover:opacity-100 group-hover:translate-y-0" />
                        </a>
                      </li>
                    )}
                    {address && (
                      <li className="flex gap-4 items-start">
                        <span className="flex justify-center items-center w-10 h-10 rounded-full border border-stone-200 shrink-0 text-base">📍</span>
                        <span className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] max-w-[220px]">
                          {addressText}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1   group-hover:opacity-100 group-hover:translate-y-0" />
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Divider */}
            <hr className="my-8 border-stone-100 sm:my-10" />

            {/* Bottom bar */}
            <div className="flex flex-col items-center justify-between gap-4 text-center text-[13px] text-stone-400 sm:text-[14px] md:flex-row md:text-left">
              {copyrightTextValue && <span>{copyrightTextValue}</span>}
              {privacyPolicyLink && (
                <a href={privacyPolicyLink} className="underline underline-offset-2 hover:text-[#1B1D20]">
                  {privacyText}
                </a>
              )}
              {termsOfUseLink && (
                <a href={termsOfUseLink} className="underline underline-offset-2 hover:text-[#1B1D20]">
                  {termsText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);