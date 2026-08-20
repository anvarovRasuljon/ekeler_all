// import React, { useMemo, useState } from 'react'
// import { Phone, Mail, ArrowUpRight } from 'lucide-react'
// import { useLanguage } from '../../context/LanguageContext'
// import { translations } from '../../locales/translations'
// import OptimizedImage from '../Image'

// interface HeroProps {
//   title?: any
//   buttonText?: any
//   phone?: string
//   email?: string
//   logoText?: any
//   backgroundImage?: any
// }

// const Hero: React.FC<HeroProps> = ({
//   title = translations.home.hero.title,
//   buttonText = translations.home.hero.buttonText,
//   phone = "+998 90 808-87-89",
//   email = "info@ekeler.uz",
//   logoText = "Ekeler",
//   backgroundImage,
// }) => {
//   const [imageLoaded, setImageLoaded] = useState(!backgroundImage || (typeof window !== 'undefined' && window.innerWidth < 1024))
//   const { t } = useLanguage()
//   const buttonHref = "/products"
//   const phoneValue = useMemo(() => (phone ? t(phone) : undefined), [t, phone])
//   const emailValue = useMemo(() => (email ? t(email) : undefined), [t, email])
//   const logo = useMemo(() => (logoText ? t(logoText) : ''), [t, logoText])
//   const marqueeSegment = useMemo(() => {
//     if (!logo) return '';
//     return Array(8).fill(logo).join(' — ') + ' —\u00A0';
//   }, [logo])

//   if (!title) {
//     return null
//   }

//   return (
//     <div
//       className="box-border overflow-hidden relative z-0 w-full h-[calc(100svh-81px)] lg:h-[calc(100svh-73px)] transition-[clip-path,opacity] duration-[2000ms] ease-out"
//       style={{
//         clipPath: imageLoaded ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
//         opacity: imageLoaded ? 1 : 0,
//       }}
//     >
//       {backgroundImage ? (
//         <>
//           {/* Image + overlay: absolute so they scroll naturally with the page */}
//           <div className="absolute inset-0 rounded-[8px]">
//             <OptimizedImage
//               src={backgroundImage}
//               alt="Hero background"
//               width={1920}
//               className="w-full h-full rounded-[8px]"
//               onLoad={() => setImageLoaded(true)}
//             />
//           </div>
//           <div className="absolute inset-0 z-[1] rounded-[8px] bg-[#0000002E]" />
//         </>
//       ) : (
//         <div className="absolute inset-[15px]" />
//       )}

//       {/* Title + CTA — sits ON TOP of the image, top-left */}
//       <div className="absolute left-4 top-[4%] z-10 w-[calc(100%-2rem)] max-w-[500px] sm:left-[4%] sm:top-[6%] lg:max-w-[600px]">
//         <h1
//           className="w-full break-words font-inter text-[#FFFFFF]"
//           style={{
//             fontSize: 'clamp(28px, 1.5rem + 1.5vw, 40px)',
//             lineHeight: 'clamp(36px, 2rem + 1.2vw, 48px)',
//             letterSpacing: '-0.02em',
//           }}
//         >
//           {useMemo(() => {
//             const text = String(t(title) || '')
//             const words = text.split(/\s+/).filter(Boolean)
//             return words.map((word, i) => (
//               <span
//                 key={`${word}-${i}`}
//                 className="inline-block overflow-hidden mr-2 align-bottom"
//                 aria-hidden={false}
//               >
//                 <span
//                   className="inline-block word-anim"
//                   style={{
//                     display: 'inline-block',
//                     transform: 'translate3d(0,24px,0) rotate(8deg)',
//                     opacity: 0,
//                     animation: `wordIn 800ms cubic-bezier(0.22,1,0.36,1) forwards`,
//                     animationDelay: `${i * 60}ms`,
//                     willChange: 'transform, opacity',
//                   }}
//                 >
//                   {word}
//                 </span>
//               </span>
//             ))
//           }, [t, title])}
//         </h1>

//         <a
//           href={buttonHref}
//           className="group relative mt-[clamp(16px,1rem+1vw,32px)] inline-flex h-auto min-h-[44px] w-fit max-w-[560px] cursor-pointer flex-col items-start"
//         >
//           <span className="flex min-h-[44px] items-center gap-[20px] font-['Inter'] text-[clamp(14px,0.85rem+0.2vw,17px)] text-[#FFFFFF]">
//             {t(buttonText)}
//             <ArrowUpRight
//               size={16}
//               className="text-[#E88029] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45"
//             />
//           </span>
//           <div className="relative mt-[8px] h-[1px] w-full bg-[#ECECEC] overflow-hidden">
//             <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#FFFFFF] transition-transform duration-300 group-hover:scale-x-100" />
//           </div>
//         </a>
//       </div>

//       {/* Contact info — top-right, on top of image */}
//       <div className="absolute bottom-[16%] left-4 z-20 flex flex-col gap-[12px] sm:bottom-auto sm:left-auto sm:right-[4%] sm:top-[6%]">
//         {phoneValue && (
//           <a href={`tel:${phoneValue}`} className="contact-item group relative flex items-center gap-[14px] pb-2 cursor-pointer">
//             <div className="contact-icon flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-white/40 bg-white/10 backdrop-blur-[12px] transition-all duration-500 ease-out sm:h-[44px] sm:w-[44px]">
//               <Phone size={16} className="text-[#FFFFFF] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
//             </div>
            
//             {/* Premium Text Hover Animation (White to White sliding) */}
//             <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
//               <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                 <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,18px)] font-['Inter'] font-normal leading-[1.2em] text-[#FFFFFF]">
//                   {phoneValue}
//                 </p>
//                 <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,18px)] font-['Inter'] font-medium leading-[1.2em] text-[#FFFFFF]">
//                   {phoneValue}
//                 </p>
//               </div>
//             </div>

//             {/* Premium Animated Bottom Borders */}
//             <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC]/40 transition-colors duration-500 group-hover:bg-transparent" />
//             <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
//           </a>
//         )}

//         {emailValue && (
//           <a href={`mailto:${emailValue}`} className="contact-item group relative flex items-center gap-[14px] pb-2 cursor-pointer">
//             <div className="contact-icon flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-white/40 bg-white/10 backdrop-blur-[12px] transition-all duration-500 ease-out sm:h-[44px] sm:w-[44px]">
//               <Mail size={16} className="text-[#FFFFFF] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
//             </div>
            
//             {/* Premium Text Hover Animation (White to White sliding) */}
//             <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
//               <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                 <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,18px)] font-['Inter'] font-normal leading-[1.2em] text-[#FFFFFF]">
//                   {emailValue}
//                 </p>
//                 <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,18px)] font-['Inter'] font-medium leading-[1.2em] text-[#FFFFFF]">
//                   {emailValue}
//                 </p>
//               </div>
//             </div>

//             {/* Premium Animated Bottom Borders */}
//             <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC]/40 transition-colors duration-500 group-hover:bg-transparent" />
//             <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
//           </a>
//         )}
//       </div>

//       {/* Bottom infinite marquee text — right to left, seamless loop */}
//       {marqueeSegment && (
//         <div className="overflow-hidden absolute bottom-0 left-0 z-[2] w-full pointer-events-none select-none">
//           <div className="flex w-max will-change-transform animate-marquee">
//             <p className="shrink-0 whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]">
//               {marqueeSegment}
//             </p>
//             <p className="shrink-0 whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]">
//               {marqueeSegment}
//             </p>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-marquee {
//           will-change: transform;
//           backface-visibility: hidden;
//           -webkit-backface-visibility: hidden;
//           animation: marquee 80s linear infinite;
//         }

//         /* Title word entrance animation */
//         @keyframes wordIn {
//           0% {
//             transform: translate3d(0,24px,0) rotate(8deg);
//             opacity: 0;
//           }
//           60% {
//             transform: translate3d(0,-6px,0) rotate(-2deg);
//             opacity: 1;
//           }
//           100% {
//             transform: translate3d(0,0,0) rotate(0);
//             opacity: 1;
//           }
//         }

//         /* Improve subpixel rendering and hint the browser for GPU compositing */
//         .word-anim {
//           backface-visibility: hidden;
//           -webkit-font-smoothing: antialiased;
//           will-change: transform, opacity;
//           transform-origin: 50% 50%;
//         }

//         .contact-item:hover .contact-icon {
//           border-color: rgba(255, 255, 255, 1);
//           background-color: rgba(255, 255, 255, 0.2);
//           box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
//         }
//       `}</style>
//     </div>
//   )
// }

// export default React.memo(Hero)


import React, { useMemo, useState } from 'react'
import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../locales/translations'

interface HeroProps {
  title?: any
  buttonText?: any
  phone?: string
  email?: string
  logoText?: any
  backgroundImage?: any
}

const Hero: React.FC<HeroProps> = ({
  title = translations.home.hero.title,
  buttonText = translations.home.hero.buttonText,
  phone = "+998 90 808-87-89",
  email = "info@ekeler.uz",
  logoText = "Ekeler",
  backgroundImage,
}) => {
  const [imageLoaded, setImageLoaded] = useState(!backgroundImage || (typeof window !== 'undefined' && window.innerWidth < 1024))
  const { t } = useLanguage()
  const buttonHref = "/products"
  const phoneValue = useMemo(() => (phone ? t(phone) : undefined), [t, phone])
  const emailValue = useMemo(() => (email ? t(email) : undefined), [t, email])
  const logo = useMemo(() => (logoText ? t(logoText) : ''), [t, logoText])
  const marqueeSegment = useMemo(() => {
    if (!logo) return '';
    return Array(8).fill(logo).join(' — ') + ' —\u00A0';
  }, [logo])

  if (!title) {
    return null
  }

  return (
    <div
      className="box-border overflow-hidden relative z-0 w-full h-[calc(100svh-81px)] lg:h-[calc(100svh-73px)] transition-[clip-path,opacity] duration-[2000ms] ease-out"
      style={{
        clipPath: imageLoaded ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        opacity: imageLoaded ? 1 : 0,
      }}
    >
      {backgroundImage ? (
        <>
          <div className="absolute inset-0 rounded-[8px]">
            <img
              src={backgroundImage}
              alt="Hero background"
              width={1920}
              className="w-full h-full rounded-[8px] object-cover"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="absolute inset-0 z-[1] rounded-[8px] bg-[#0000002E]" />
        </>
      ) : (
        <div className="absolute inset-[15px]" />
      )}

      {/* Title + CTA */}
      <div className="absolute left-4 top-[4%] z-10 w-[calc(100%-2rem)] max-w-[500px] sm:left-[4%] sm:top-[6%] lg:max-w-[600px]">
        <h1
          className="w-full break-words font-inter text-[#FFFFFF]"
          style={{
            fontSize: 'clamp(28px, 1.5rem + 1.5vw, 40px)',
            lineHeight: 'clamp(36px, 2rem + 1.2vw, 48px)',
            letterSpacing: '-0.02em',
          }}
        >
          {useMemo(() => {
            const text = String(t(title) || '')
            const words = text.split(/\s+/).filter(Boolean)
            return words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden mr-2 align-bottom"
                aria-hidden={false}
              >
                <span
                  className="inline-block word-anim"
                  style={{
                    display: 'inline-block',
                    transform: 'translate3d(0,24px,0) rotate(8deg)',
                    opacity: 0,
                    animation: `wordIn 800ms cubic-bezier(0.22,1,0.36,1) forwards`,
                    animationDelay: `${i * 60}ms`,
                    willChange: 'transform, opacity',
                  }}
                >
                  {word}
                </span>
              </span>
            ))
          }, [t, title])}
        </h1>

        {/* Products Button — Matn sirpanishi va bottom border animatsiyasi qo'shildi, iconka esa o'z holatida */}
        <a
          href={buttonHref}
          className="contact-item group relative mt-[clamp(16px,1rem+1vw,32px)] inline-flex h-auto min-h-[44px] w-fit max-w-[560px] cursor-pointer flex-col items-start pb-2"
        >
          <span className="flex min-h-[44px] items-center gap-[20px] font-['Inter'] text-[clamp(14px,0.85rem+0.2vw,17px)] text-[#FFFFFF]">
            <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
              <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                <span className="whitespace-nowrap font-normal leading-[1.2em]">{t(buttonText)}</span>
                <span className="whitespace-nowrap font-medium leading-[1.2em]">{t(buttonText)}</span>
              </div>
            </div>

            <ArrowUpRight
              size={16}
              className="text-[#E88029] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45"
            />
          </span>

          <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC]/40 transition-colors duration-500 group-hover:bg-transparent" />
          <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
        </a>
      </div>

      {/* Contact info */}
      <div className="absolute bottom-[16%] left-4 z-20 flex flex-col gap-[12px] sm:bottom-auto sm:left-auto sm:right-[4%] sm:top-[6%]">
        {phoneValue && (
          <a href={`tel:${phoneValue}`} className="contact-item group relative flex items-center gap-[14px] pb-2 cursor-pointer">
            <div className="contact-icon flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-white/40 bg-white/10 backdrop-blur-[12px] transition-all duration-500 ease-out sm:h-[44px] sm:w-[44px]">
              <Phone size={16} className="text-[#FFFFFF] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
            </div>
            
            <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
              <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,18px)] font-['Inter'] font-normal leading-[1.2em] text-[#FFFFFF]">
                  {phoneValue}
                </p>
                <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,18px)] font-['Inter'] font-medium leading-[1.2em] text-[#FFFFFF]">
                  {phoneValue}
                </p>
              </div>
            </div>

            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC]/40 transition-colors duration-500 group-hover:bg-transparent" />
            <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          </a>
        )}

        {emailValue && (
          <a href={`mailto:${emailValue}`} className="contact-item group relative flex items-center gap-[14px] pb-2 cursor-pointer">
            <div className="contact-icon flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-white/40 bg-white/10 backdrop-blur-[12px] transition-all duration-500 ease-out sm:h-[44px] sm:w-[44px]">
              <Mail size={16} className="text-[#FFFFFF] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
            </div>
            
            <div className="contact-text-wrapper relative overflow-hidden h-[1.2em]">
              <div className="contact-text-inner flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,18px)] font-['Inter'] font-normal leading-[1.2em] text-[#FFFFFF]">
                  {emailValue}
                </p>
                <p className="whitespace-nowrap text-[clamp(14px,0.85rem+0.2vw,18px)] font-['Inter'] font-medium leading-[1.2em] text-[#FFFFFF]">
                  {emailValue}
                </p>
              </div>
            </div>

            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ECECEC]/40 transition-colors duration-500 group-hover:bg-transparent" />
            <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          </a>
        )}
      </div>

      {/* Bottom infinite marquee text */}
      {marqueeSegment && (
        <div className="overflow-hidden absolute bottom-0 left-0 z-[2] w-full pointer-events-none select-none">
          <div className="flex w-max will-change-transform animate-marquee">
            <p className="shrink-0 whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]">
              {marqueeSegment}
            </p>
            <p className="shrink-0 whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]">
              {marqueeSegment}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: marquee 80s linear infinite;
        }

        @keyframes wordIn {
          0% {
            transform: translate3d(0,24px,0) rotate(8deg);
            opacity: 0;
          }
          60% {
            transform: translate3d(0,-6px,0) rotate(-2deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(0,0,0) rotate(0);
            opacity: 1;
          }
        }

        .word-anim {
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          will-change: transform, opacity;
          transform-origin: 50% 50%;
        }

        .contact-item:hover .contact-icon {
          border-color: rgba(255, 255, 255, 1);
          background-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </div>
  )
}

export default React.memo(Hero)