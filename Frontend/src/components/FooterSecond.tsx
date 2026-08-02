import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import bgFallback from "../assets/hero.png";
import { urlFor } from "../sanity/client";
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

export interface FooterSecondProps {
  backgroundImage?: {
    alt?: string;
    asset?: {
      url?: string;
      _ref?: string;
      _id?: string;
    };
    [key: string]: unknown;
  } | null;
  heading?: Record<string, string> | string | null;
  ctaText?: Record<string, string> | string | null;
  ctaLink?: string | null;
  navLabel?: Record<string, string> | string | null;
  navLinks?: FooterLink[] | null;
  socialLabel?: Record<string, string> | string | null;
  socialLinks?: FooterLink[] | null;
  contactLabel?: Record<string, string> | string | null;
  phone?: string | null;
  email?: string | null;
  address?: Record<string, string> | string | null;
  copyrightText?: Record<string, string> | string | null;
  privacyPolicyLink?: string | null;
  termsOfUseLink?: string | null;
}

const FooterSecond: React.FC<FooterSecondProps> = ({
  backgroundImage,
  heading,
  ctaText,
  ctaLink,
  navLabel,
  navLinks,
  socialLabel,
  socialLinks,
  contactLabel,
  phone,
  email,
  address,
  copyrightText,
  privacyPolicyLink,
  termsOfUseLink,
}) => {
  const { t } = useLanguage();
  const safeNavLinks: FooterLink[] = navLinks ?? [];
  const safeSocialLinks: FooterLink[] = socialLinks ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  let backgroundImageUrl: string = bgFallback;
  let backgroundImageAlt = "";

  if (backgroundImage) {
    try {
      backgroundImageUrl = urlFor(backgroundImage).width(1920).url();
    } catch {
      if (backgroundImage.asset?.url) {
        backgroundImageUrl = backgroundImage.asset.url;
      }
    }
    backgroundImageAlt = backgroundImage.alt || "";
  }

  return (
    <motion.footer
      ref={ref}
      className="relative w-full"
      variants={footerRise}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="relative h-[100vh] w-full overflow-hidden">
        <img
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          className="absolute inset-0 object-cover w-full h-full"
        />

        <div className="relative p-4 pt-6 md:p-8">
          <motion.div
            className="mx-auto max-w-7xl rounded-[28px] bg-white px-6 py-10 shadow-[0_10px_40px_rgba(0,0,0,0.12)] md:px-14 md:py-12"
            variants={footerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
              {/* Heading + CTA */}
              {heading && (
                <motion.div variants={footerColumn}>
                  <motion.h2 variants={footerItem} className="text-[28px] leading-[36px] text-[#1B1D20] max-w-[320px]">
                    {t(heading)}
                  </motion.h2>
                  {ctaText && ctaLink && (
                    <motion.a
                      variants={footerItem}
                      href={ctaLink}
                      className="inline-flex items-center gap-1 mt-8 text-[15px] text-[#1B1D20] border-b border-[#1B1D20] pb-1 hover:text-[#E88029] hover:border-[#E88029] transition"
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
                          className="inline-flex items-center gap-1 text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {link.label ? t(link.label) : null}
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
                          className="text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {link.label ? t(link.label) : null}
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
                      <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center border rounded-full w-9 h-9 border-stone-200 shrink-0">
                          📞
                        </span>
                        <motion.a
                          variants={footerItem}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {phone}
                        </motion.a>
                      </li>
                    )}
                    {email && (
                      <li className="flex items-center gap-3">
                        <span className="flex items-center justify-center border rounded-full w-9 h-9 border-stone-200 shrink-0">
                          📧
                        </span>
                        <motion.a
                          variants={footerItem}
                          href={`mailto:${email}`}
                          className="text-[16px] text-[#1B1D20] hover:text-[#E88029] transition"
                        >
                          {email}
                        </motion.a>
                      </li>
                    )}
                    {address && (
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center border rounded-full w-9 h-9 border-stone-200 shrink-0">
                          📍
                        </span>
                        <motion.span variants={footerItem} className="text-[16px] text-[#1B1D20] max-w-[220px]">
                          {t(address)}
                        </motion.span>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </div>

            <motion.hr variants={footerItem} className="my-10 border-stone-100" />

            <motion.div variants={footerColumn} className="flex flex-col items-center justify-between gap-4 text-[14px] text-stone-400 md:flex-row">
              {copyrightText && <motion.span variants={footerItem}>{t(copyrightText)}</motion.span>}
              {privacyPolicyLink && (
                <motion.a
                  variants={footerItem}
                  href={privacyPolicyLink}
                  className="underline underline-offset-2 hover:text-[#1B1D20] transition"
                >
                  privacy policy
                </motion.a>
              )}
              {termsOfUseLink && (
                <motion.a
                  variants={footerItem}
                  href={termsOfUseLink}
                  className="underline underline-offset-2 hover:text-[#1B1D20] transition"
                >
                  terms of use
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