import React, { useMemo } from 'react'
import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import OptimizedImage from '../Image'

interface HeroProps {
  title?: any
  buttonText?: any
  phone?: string
  email?: string
  logoText?: any
  backgroundImage?: any
}

const Hero: React.FC<HeroProps> = ({
  title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
  buttonText = "Our Services",
  phone = "+998 90 123 45 67",
  email = "info@ekeler.uz",
  logoText = "EKELER",
  backgroundImage,
}) => {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const buttonHref = "/products"
  const phoneValue = useMemo(() => (phone ? t(phone) : undefined), [t, phone])
  const emailValue = useMemo(() => (email ? t(email) : undefined), [t, email])
  const logo = useMemo(() => (logoText ? t(logoText) : ''), [t, logoText])
  const words = useMemo(() => (title ? String(t(title) || '').split(' ').filter(Boolean) : []), [t, title])

  if (!title) {
    return null;
  }

  return (

    <div className="box-border overflow-hidden relative w-full h-screen bg-[#ffff]">
      {backgroundImage ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0.01 : 1, ease: "easeOut" }}
          className="absolute w-[calc(100%)] h-[calc(98.5%)] rounded-[8px]"
        >
          <OptimizedImage
            src={backgroundImage}
            alt="Hero background"
            width={1920}
            className="w-full h-full rounded-[8px]"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-[15px]" />
      )}

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b to-transparent from-black/50 via-black/10" />

      {/* Title + CTA — sits ON TOP of the image, top-left */}
      {/* Responsive: mobilda sarlavha keng bo'ladi va kontakt bloki tagida joylashadi */}
      <div className="absolute left-4 top-[12%] z-10 w-[calc(100%-2rem)] max-w-none sm:left-[4%] sm:top-[6%] sm:w-auto lg:max-w-[38%]">
        <h1 className="w-full max-w-[550px] break-words align-middle font-inter text-[26px] font-[400] leading-[34px] tracking-[0.02em] text-[#FFFFFF] sm:text-[34px] sm:leading-[42px] lg:h-[220px] lg:text-[50px] lg:leading-[55px]">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : index * 0.1, duration: reduced ? 0.01 : 0.5 }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <a href={buttonHref} className="group relative mt-6 inline-flex h-auto w-fit max-w-[560px] cursor-pointer flex-col items-start sm:mt-8 lg:h-[32px]">
          <span className="flex min-h-[44px] items-center gap-[20px] text-[15px] text-[#FFFFFF] lg:text-[1.05vw]">
            {t(buttonText)}
            <ArrowUpRight
              size={16}
              className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-[#9CA3AF] overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#FFFFFF] transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        </a>
      </div>

      {/* Contact info — top-right, on top of image */}
    <div className="absolute bottom-[18%] left-4 z-20 flex flex-col gap-[10px] sm:bottom-auto sm:left-auto sm:right-[4%] sm:top-[6%]">
  {phoneValue && (
    <a href={`tel:${phoneValue}`} className="flex items-center gap-[12px] cursor-pointer">
      <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-[#FFFFFF] bg-white/10 backdrop-blur-[12px] sm:h-[40px] sm:w-[40px]">
        <Phone size={12} className="text-[#FFFFFF]" strokeWidth={2} />
      </div>

      <p className="whitespace-nowrap text-[15px] font-normal leading-none text-[#FFFFFF] sm:text-[18px]">
        {phoneValue}
      </p>
    </a>
  )}

  {emailValue && (
    <a href={`mailto:${emailValue}`} className="flex items-center gap-[12px] cursor-pointer">
      <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-[#FFFFFF] bg-white/10 backdrop-blur-[12px] sm:h-[40px] sm:w-[40px]">
        <Mail size={12} className="text-[#FFFFFF]" strokeWidth={2} />
      </div>

      <p className="whitespace-nowrap text-[15px] font-normal leading-none text-[#FFFFFF] sm:text-[18px]">
        {emailValue}
      </p>
    </a>
  )}
</div>

      {/* Giant decorative wordmark, bleeding off both edges near the bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[200%] flex justify-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.p
          animate={reduced ? undefined : { x: [0, -1000] }}
          transition={reduced ? undefined : { duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[18vw] font-normal leading-none tracking-tight text-[#FFFFFF]/95 sm:text-[14vw] will-change-transform"
        >
          {logo}
        </motion.p>
      </div>
    </div>
  )
}

export default React.memo(Hero)