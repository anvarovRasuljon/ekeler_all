import React, { useRef, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const headingText = useMemo(() => t(heading), [t, heading]);
  const ctaLabel = useMemo(() => (ctaText ? t(ctaText) : null), [t, ctaText]);
  const navLabelText = useMemo(() => (navLabel ? t(navLabel) : null), [t, navLabel]);
  const socialLabelText = useMemo(() => (socialLabel ? t(socialLabel) : null), [t, socialLabel]);
  const contactLabelText = useMemo(() => (contactLabel ? t(contactLabel) : null), [t, contactLabel]);
  const addressText = useMemo(() => (address ? t(address) : null), [t, address]);
  const copyrightTextValue = useMemo(() => (copyrightText ? t(copyrightText) : null), [t, copyrightText]);
  const privacyText = useMemo(() => t({ ru: 'Политика конфиденциальности', uz: 'Maxfiylik siyosati', eng: 'Privacy policy' }), [t]);
  const termsText = useMemo(() => t({ ru: 'Условия использования', uz: 'Foydalanish shartlari', eng: 'Terms of use' }), [t]);

  const { riseVariants, containerVariants, columnVariants, itemVariants } = useMemo(() => ({
    riseVariants: {
      hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 60 },
      visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.7 } },
    },
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: reduced ? 0 : 0.75, delayChildren: reduced ? 0 : 0.2 },
      },
    },
    columnVariants: {
      hidden: { opacity: 0, y: reduced ? 0 : 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: reduced ? 0 : 0.25 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: reduced ? 0 : 20 },
      visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.5 } },
    },
  }), [reduced]);

  return (
    <motion.footer
      ref={ref}
      className="relative w-full"
      variants={riseVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background image */}
      {/* Responsive: fiksatsiyalangan 100vh o'rniga min-h — mobilda kontent kesilmaydi */}
      <div className="relative min-h-[100vh] w-full overflow-hidden">
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
          <motion.div
            className="mx-auto max-w-7xl rounded-[20px] bg-white px-5 py-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:px-6 sm:py-10 md:rounded-[28px] md:px-14 md:py-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
              {/* Heading + CTA */}
              {heading && (
                <motion.div variants={columnVariants}>
                  <motion.h2 variants={itemVariants} className="max-w-[320px] break-words text-[22px] leading-[30px] text-[#1B1D20] sm:text-[28px] sm:leading-[36px]">{headingText}</motion.h2>
                  {ctaText && ctaLink && (
                    <motion.a
                      variants={itemVariants}
                      href={ctaLink}
                      className="inline-flex items-center gap-1 mt-8 text-[15px] text-[#1B1D20] border-b border-[#1B1D20] pb-1 hover:text-[#E88029] hover:border-[#E88029] transition"
                    >
                      {ctaLabel}
                      <ArrowUpRight size={16} className="text-[#E88029]" />
                    </motion.a>
                  )}
                </motion.div>
              )}

              {/* Nav links */}
              {(navLinks || []).length > 0 && (
                <motion.div variants={columnVariants}>
                  {navLabelText && <motion.span variants={itemVariants} className="text-[13px] text-stone-400 block mb-5">{navLabelText}</motion.span>}
                  <ul className="space-y-4">
                    {(navLinks || []).map((link) => (
                      <li key={link.label?.ru || link.href}>
                        <motion.a
                          variants={itemVariants}
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {t(link.label)}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                          {link.external && <ArrowUpRight size={14} className="text-[#E88029]" />}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Social links */}
              {(socialLinks || []).length > 0 && (
                <motion.div variants={columnVariants}>
                  {socialLabelText && <motion.span variants={itemVariants} className="text-[13px] text-stone-400 block mb-5">{socialLabelText}</motion.span>}
                  <ul className="space-y-4">
                    {(socialLinks || []).map((link) => (
                      <li key={link.label?.ru || link.href}>
                        <motion.a
                          variants={itemVariants}
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {t(link.label)}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Contact info */}
              {(phone || email || address) && (
                <motion.div variants={columnVariants}>
                  {contactLabelText && <motion.span variants={itemVariants} className="text-[13px] text-stone-400 block mb-5">{contactLabelText}</motion.span>}
                  <ul className="space-y-4">
                    {phone && (
                      <li className="flex gap-3 items-center">
                        <span className="flex justify-center items-center w-9 h-9 rounded-full border border-stone-200 shrink-0">📞</span>
                        <motion.a variants={itemVariants} href={`tel:${phone.replace(/\s/g, "")}`} className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition">
                          {phone}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                        </motion.a>
                      </li>
                    )}
                    {email && (
                      <li className="flex gap-3 items-center">
                        <span className="flex justify-center items-center w-9 h-9 rounded-full border border-stone-200 shrink-0">📧</span>
                        <motion.a variants={itemVariants} href={`mailto:${email}`} className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition">
                          {email}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                        </motion.a>
                      </li>
                    )}
                    {address && (
                      <li className="flex gap-3 items-start">
                        <span className="flex justify-center items-center w-9 h-9 rounded-full border border-stone-200 shrink-0">📍</span>
                        <motion.span variants={itemVariants} className="group inline-flex items-center gap-1 text-[16px] text-[#1B1D20] max-w-[220px]">
                          {addressText}
                          <ArrowUpRight size={14} className="text-[#E88029] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                        </motion.span>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Divider */}
            <motion.hr variants={itemVariants} className="my-8 border-stone-100 sm:my-10" />

            {/* Bottom bar */}
            <motion.div variants={columnVariants} className="flex flex-col items-center justify-between gap-4 text-center text-[13px] text-stone-400 sm:text-[14px] md:flex-row md:text-left">
              {copyrightTextValue && <motion.span variants={itemVariants}>{copyrightTextValue}</motion.span>}
              {privacyPolicyLink && (
                <motion.a variants={itemVariants} href={privacyPolicyLink} className="underline underline-offset-2 hover:text-[#1B1D20] transition">
                  {privacyText}
                </motion.a>
              )}
              {termsOfUseLink && (
                <motion.a variants={itemVariants} href={termsOfUseLink} className="underline underline-offset-2 hover:text-[#1B1D20] transition">
                  {termsText}
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default React.memo(Footer);