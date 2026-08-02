import React from 'react'
import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
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
  title,
  buttonText,
  phone,
  email,
  logoText,
  backgroundImage,
}) => {
  const { t } = useLanguage()
  const buttonHref = "/products"
  const phoneValue = phone ? t(phone) : undefined
  const emailValue = email ? t(email) : undefined
  if (!title) {
    return null;
  }

  return (

    <div className="box-border overflow-hidden relative w-full h-screen bg-[#ffff]">
      {backgroundImage ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-[calc(100%)] h-[calc(98.5%)] rounded-[8px]"
        >
          <OptimizedImage
            src={backgroundImage}
            alt="Hero background"
            width={1920}
            className="w-full h-full rounded-[8px]"
            priority
          />
        </motion.div>
      ) : (
        <div className="absolute inset-[15px]" />
      )}

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b to-transparent from-black/50 via-black/10" />

      {/* Title + CTA — sits ON TOP of the image, top-left */}
      <div className="absolute top-[6%] left-[4%] max-w-[38%] z-10">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[#FFFFFF] text-[50px] leading-[55px] font-[400] w-[550px] h-[220px] tracking-[0.02em] font-inter align-middle"
        >
          {t(title).split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <a href={buttonHref} className="group mt-8 inline-flex flex-col items-start max-w-[560px] w-fit h-[32px] relative cursor-pointer">
          <span className="flex items-center gap-[20px] text-[#FFFFFF] text-[1.05vw]">
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
    <div className="absolute top-[6%] right-[4%] flex flex-col gap-[10px] z-20">
  {phoneValue && (
    <a href={`tel:${phoneValue}`} className="flex items-center gap-[12px] cursor-pointer">
      <div className="w-[40px] h-[40px] rounded-full border-[1.25px] border-[#FFFFFF] backdrop-blur-[12px] bg-white/10 flex items-center justify-center">
        <Phone size={12} className="text-[#FFFFFF]" strokeWidth={2} />
      </div>

      <p className="text-[#FFFFFF] text-[18px] font-normal leading-none whitespace-nowrap">
        {phoneValue}
      </p>
    </a>
  )}

  {emailValue && (
    <a href={`mailto:${emailValue}`} className="flex items-center gap-[12px] cursor-pointer">
      <div className="w-[40px] h-[40px] rounded-full border-[1.25px] border-[#FFFFFF] backdrop-blur-[12px] bg-white/10 flex items-center justify-center">
        <Mail size={12} className="text-[#FFFFFF]" strokeWidth={2} />
      </div>

      <p className="text-[#FFFFFF] text-[18px] font-normal leading-none whitespace-nowrap">
        {emailValue}
      </p>
    </a>
  )}
</div>

      {/* Giant decorative wordmark, bleeding off both edges near the bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[200%] flex justify-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.p
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[#FFFFFF]/95 font-normal leading-none text-[14vw] tracking-tight"
        >
         {t(logoText)}  — {t(logoText)} — {t(logoText)} — {t(logoText)} — {t(logoText)}
        </motion.p>
      </div>
    </div>
  )
}

export default Hero