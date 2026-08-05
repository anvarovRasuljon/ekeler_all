import React, { useMemo, useState } from 'react'
import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import OptimizedImage from '../Image'
import FoldText from '../FoldText'
import TextLoop from '../TextLoop'

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
  buttonText = "Bizning Mahsulotlar",
  phone = "+998 90 123 45 67",
  email = "info@ekeler.uz",
  logoText = "Ekeler",
  backgroundImage,
}) => {
  const [imageLoaded, setImageLoaded] = useState(!backgroundImage)
  const { t } = useLanguage()
  const buttonHref = "/products"
  const phoneValue = useMemo(() => (phone ? t(phone) : undefined), [t, phone])
  const emailValue = useMemo(() => (email ? t(email) : undefined), [t, email])
  const logo = useMemo(() => (logoText ? t(logoText) : ''), [t, logoText])

  if (!title) {
    return null;
  }

  return (

    <div
      className="box-border overflow-hidden relative w-full h-screen transition-[clip-path,opacity] duration-[1200ms] ease-out"
      style={{
        clipPath: imageLoaded ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        opacity: imageLoaded ? 1 : 0,
      }}
    >
      {backgroundImage ? (
        <div
          className="absolute w-[calc(100%)] h-[calc(98.5%)] rounded-[8px]"
        >
          <OptimizedImage
            src={backgroundImage}
            alt="Hero background"
            width={1920}
            className="w-full h-full rounded-[8px]"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      ) : (
        <div className="absolute inset-[15px]" />
      )}

      {/* Dark overlay for text contrast */}

      {/* Title + CTA — sits ON TOP of the image, top-left */}
      <div className="absolute left-4 top-[12%] z-10 w-[calc(100%-2rem)] max-w-[500px] sm:left-[4%] sm:top-[6%]">
        <h1 className="w-full break-words font-inter text-[#FFFFFF]">
          <FoldText
            text={String(t(title) || '')}
            splitBy="word"
            hinge="bottom"
            trigger="mount"
            duration={2}
            stagger={0.045}
            ease="power3.out"
            perspective={500}
            creaseShading={0.55}
            color="#FFFFFF"
            fontSize="46px"
            fontWeight={400}
            style={{ lineHeight: '50px', letterSpacing: '-0.02em' }}
          />
        </h1>

        <a href={buttonHref} className="group relative mt-6 inline-flex h-auto min-h-[44px] w-fit max-w-[560px] cursor-pointer flex-col items-start sm:mt-8">
          <span className="flex min-h-[44px] items-center gap-[20px] text-[15px] text-[#FFFFFF] lg:text-[1.05vw]">
            {t(buttonText)}
            <ArrowUpRight
              size={16}
              className="text-[#E88029] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          <div className="relative mt-[8px] h-[1px] w-full bg-[#9CA3AF] overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#FFFFFF] group-hover:scale-x-100" />
          </div>
        </a>
      </div>

      {/* Contact info — top-right, on top of image */}
    <div className="absolute bottom-[16%] left-4 z-20 flex flex-col gap-[12px] sm:bottom-auto sm:left-auto sm:right-[4%] sm:top-[6%]">
  {phoneValue && (
    <a href={`tel:${phoneValue}`} className="flex items-center gap-[14px] cursor-pointer">
      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-[#FFFFFF] bg-white/10 backdrop-blur-[12px] sm:h-[44px] sm:w-[44px]">
        <Phone size={16} className="text-[#FFFFFF]" strokeWidth={2} />
      </div>

      <p className="whitespace-nowrap text-[16px] font-normal leading-none text-[#FFFFFF] sm:text-[18px]">
        {phoneValue}
      </p>
    </a>
  )}

  {emailValue && (
    <a href={`mailto:${emailValue}`} className="flex items-center gap-[14px] cursor-pointer">
      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-[#FFFFFF] bg-white/10 backdrop-blur-[12px] sm:h-[44px] sm:w-[44px]">
        <Mail size={16} className="text-[#FFFFFF]" strokeWidth={2} />
      </div>

      <p className="whitespace-nowrap text-[16px] font-normal leading-none text-[#FFFFFF] sm:text-[18px]">
        {emailValue}
      </p>
    </a>
  )}
</div>

      {/* Giant decorative wordmark, bleeding off both edges near the bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[15%] h-[280px] w-[200%] pointer-events-none select-none z-0 overflow-hidden">
        <TextLoop
          text={String(logo || 'Ekeler')}
          path="M -320 480 L 1520 480"
          speed={35}
          direction="reverse"
          separator="-"
          fontSize={90}
          fontWeight={400}
          letterSpacing={2.5}
          uppercase={false}
          color="#ffffff"
          ribbon={false}
          ribbonWidth={0}
          pauseOnHover={false}
          className="!absolute bottom-0 w-full"
        />
      </div>
    </div>
  )
}

export default React.memo(Hero)