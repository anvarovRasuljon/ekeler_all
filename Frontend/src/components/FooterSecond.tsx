import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import backgroundImageUrl from "../assets/Footer_second.png";
import { useLanguage } from "../context/LanguageContext";

const footerRise = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const footerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.75, delayChildren: 0.2 },
  },
};

const footerColumn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.25 },
  },
};

const footerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export interface FooterLink {
  label?: Record<string, string> | string;
  href: string;
  external?: boolean;
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

const FooterSecond: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const safeNavLinks: FooterLink[] = DEFAULT_NAV_LINKS;
  const safeSocialLinks: FooterLink[] = DEFAULT_SOCIAL_LINKS;
  const backgroundImageAlt = "";

  const heading = "Let's work together";
  const ctaText = "Contact us";
  const ctaLink = "contact";
  const navLabel = "Navigation";
  const socialLabel = "Social";
  const contactLabel = "Contact";
  const phone = "+998 90 123 45 67";
  const email = "info@ekeler.uz";
  const address = "Tashkent, Uzbekistan";
  const copyrightText = "© 2026 Ekeler. All rights reserved.";
  const privacyPolicyLink = "#";
  const termsOfUseLink = "#";

  return (
    <motion.footer
      ref={ref}
      className="relative w-full"
      variants={footerRise}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Responsive: fiksatsiyalangan 100vh o'rniga min-h — mobilda kontent kesilmaydi */}
      <div className="relative min-h-[100vh] w-full overflow-hidden">
        <img
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          className="object-cover absolute inset-0 w-full h-full"
        />

        <div className="relative p-4 pt-6 md:p-8">
          <motion.div
            className="mx-auto max-w-7xl rounded-[20px] bg-white px-5 py-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:px-6 sm:py-10 md:rounded-[28px] md:px-14 md:py-12"
            variants={footerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
              {/* Heading + CTA */}
              {heading && (
                <motion.div variants={footerColumn}>
                  <motion.h2 variants={footerItem} className="max-w-[320px] break-words text-[22px] leading-[30px] text-[#1B1D20] sm:text-[28px] sm:leading-[36px]">
                    {t(heading)}
                  </motion.h2>
                  {ctaText && ctaLink && (
                    <motion.a
                      variants={footerItem}
                      href={ctaLink}
                      className="mt-6 inline-flex min-h-[44px] items-center gap-1 border-b border-[#1B1D20] pb-1 text-[15px] text-[#1B1D20] transition hover:border-[#E88029] hover:text-[#E88029] sm:mt-8"
                    >
                      {t(ctaText)}
                      <ArrowUpRight size={16} className="text-[#E88029]" />
                    </motion.a>
                  )}
                </motion.div>
              )}

              {/* Nav links */}
              {safeNavLinks.length > 0 && (
                <motion.div variants={footerColumn}>
                  {navLabel && (
                    <motion.span variants={footerItem} className="text-[13px] text-stone-400 block mb-5">
                      {t(navLabel)}
                    </motion.span>
                  )}
                  <ul className="space-y-4">
                    {safeNavLinks.map((link: FooterLink, i: number) => (
                      <li key={link.href || String(i)}>
                        <motion.a
                          variants={footerItem}
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {link.label ? t(link.label) : null}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                          {link.external && (
                            <ArrowUpRight size={14} className="text-[#E88029]" />
                          )}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Social links */}
              {safeSocialLinks.length > 0 && (
                <motion.div variants={footerColumn}>
                  {socialLabel && (
                    <motion.span variants={footerItem} className="text-[13px] text-stone-400 block mb-5">
                      {t(socialLabel)}
                    </motion.span>
                  )}
                  <ul className="space-y-4">
                    {safeSocialLinks.map((link: FooterLink, i: number) => (
                      <li key={link.href || String(i)}>
                        <motion.a
                          variants={footerItem}
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {link.label ? t(link.label) : null}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Contact */}
              {(phone || email || address) && (
                <motion.div variants={footerColumn}>
                  {contactLabel && (
                    <motion.span variants={footerItem} className="text-[13px] text-stone-400 block mb-5">
                      {t(contactLabel)}
                    </motion.span>
                  )}
                  <ul className="space-y-4">
                    {phone && (
                      <li className="flex gap-3 items-center">
                        <span className="flex justify-center items-center w-9 h-9 rounded-full border border-stone-200 shrink-0">
                          📞
                        </span>
                        <motion.a
                          variants={footerItem}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {phone}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                        </motion.a>
                      </li>
                    )}
                    {email && (
                      <li className="flex gap-3 items-center">
                        <span className="flex justify-center items-center w-9 h-9 rounded-full border border-stone-200 shrink-0">
                          📧
                        </span>
                        <motion.a
                          variants={footerItem}
                          href={`mailto:${email}`}
                          className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {email}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                        </motion.a>
                      </li>
                    )}
                    {address && (
                      <li className="flex gap-3 items-start">
                        <span className="flex justify-center items-center w-9 h-9 rounded-full border border-stone-200 shrink-0">
                          📍
                        </span>
                        <motion.span variants={footerItem} className="group inline-flex max-w-[220px] items-center gap-1 break-words text-[15px] text-[#1B1D20] sm:text-[16px]">
                          {t(address)}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                        </motion.span>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </div>

            <motion.hr variants={footerItem} className="my-8 border-stone-100 sm:my-10" />

            <motion.div variants={footerColumn} className="flex flex-col items-center justify-between gap-4 text-center text-[13px] text-stone-400 sm:text-[14px] md:flex-row md:text-left">
              {copyrightText && <motion.span variants={footerItem}>{t(copyrightText)}</motion.span>}
              {privacyPolicyLink && (
                <motion.a
                  variants={footerItem}
                  href={privacyPolicyLink}
                  className="underline underline-offset-2 hover:text-[#1B1D20] transition"
                >
                  {t({ ru: 'Политика конфиденциальности', uz: 'Maxfiylik siyosati', eng: 'Privacy policy' })}
                </motion.a>
              )}
              {termsOfUseLink && (
                <motion.a
                  variants={footerItem}
                  href={termsOfUseLink}
                  className="underline underline-offset-2 hover:text-[#1B1D20] transition"
                >
                  {t({ ru: 'Условия использования', uz: 'Foydalanish shartlari', eng: 'Terms of use' })}
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterSecond;