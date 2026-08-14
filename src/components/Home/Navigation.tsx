// // import AnimatedImage from './AnimatedImage';
// // // // Responsive refactor: desktopda 3 ustunli grid saqlanadi, mobilda esa
// // // // animatsiyali burger menyu (3 chiziq -> X), slide-in panel, scroll lock va
// // // // tashqariga/linkka bosganda avtomatik yopilish qo'shildi. Hech qanday link
// // // // yoki funksiya olib tashlanmadi — faqat joylashuv moslashtirildi.
// // // import React, { useEffect, useRef, useState } from 'react'
// // // import { Link } from 'react-router-dom'
// // // import logo from '../../assets/logo.svg'
// // // import { Globe } from 'lucide-react'
// // // import { useLanguage } from '../../context/LanguageContext';
// // // import type { Language } from '../../context/LanguageContext'
// // // import { cn } from '../../lib/cn'

// // // const navLinkClass =
// // //   'relative block text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal transition-colors duration-300 hover:text-[#E88029] py-[10px] lg:py-[20px] px-0 lg:px-[10px] xl:px-[12px] after:absolute after:bottom-[8px] after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-[#E88029] after:transition-all after:duration-300 hover:after:w-full'

// // // const mobileLinkClass =
// // //   'flex min-h-[44px] w-full items-center text-[#1B1D20] text-[16px] font-normal hover:text-[#E88029]'

// // // const labels = {
// // //   ru: {
// // //     products: 'Продукция',
// // //     about: 'О нас',
// // //     industries: 'Отрасли',
// // //     contact: 'Контакты',
// // //     blog:"Блог"
// // //   },
// // //   uz: {
// // //     products: 'Mahsulotlar',
// // //     about: 'Biz haqimizda',
// // //     industries: 'Sanoatlar',
// // //     contact: 'Aloqa',
// // //     blog: 'Blog',
// // //   },
// // //   eng: {
// // //     products: 'Products',
// // //     about: 'About Us',
// // //     industries: 'Industries',
// // //     contact: 'Contact',
// // //     blog:"Blog"  },
// // // }

// // // interface LanguageSelectProps {
// // //   language: Language
// // //   onChange: (language: Language) => void
// // //   className?: string
// // // }

// // // // Responsive: til tanlagich desktop va mobil menyuda qayta ishlatiladi (DRY).
// // // const LanguageSelect: React.FC<LanguageSelectProps> = ({ language, onChange, className }) => (
// // //   <div className={cn('flex gap-2 items-center min-h-[44px]', className)}>
// // //     <Globe size={16} className="text-[#E88029] shrink-0" />
// // //     <select
// // //       value={language}
// // //       onChange={(e) => onChange(e.target.value as Language)}
// // //       aria-label="Language"
// // //       className="text-[#1B1D20] text-[14px] font-normal bg-transparent border-none outline-none cursor-pointer"
// // //     >
// // //       <option value="ru">RU</option>
// // //       <option value="eng">EN</option>
// // //       <option value="uz">UZ</option>
// // //     </select>
// // //   </div>
// // // )

// // // const Navigation: React.FC = () => {
// // //   const { language, setLanguage } = useLanguage()
// // //   const t = labels[language]
// // //   const [isOpen, setIsOpen] = useState(false)
// // //   const panelRef = useRef<HTMLDivElement | null>(null)
// // //   const buttonRef = useRef<HTMLButtonElement | null>(null)

// // //   // Responsive: menyu ochiq bo'lganda body scroll bloklanadi.
// // //   useEffect(() => {
// // //     if (!isOpen) return
// // //     const previous = document.body.style.overflow
// // //     document.body.style.overflow = 'hidden'
// // //     return () => {
// // //       document.body.style.overflow = previous
// // //     }
// // //   }, [isOpen])

// // //   // Responsive: tashqariga bosish va Escape bilan yopish (klaviatura qo'llab-quvvatlash).
// // //   useEffect(() => {
// // //     if (!isOpen) return

// // //     const handlePointerDown = (event: MouseEvent | TouchEvent) => {
// // //       const target = event.target as Node
// // //       if (panelRef.current?.contains(target)) return
// // //       if (buttonRef.current?.contains(target)) return
// // //       setIsOpen(false)
// // //     }

// // //     const handleKeyDown = (event: KeyboardEvent) => {
// // //       if (event.key === 'Escape') {
// // //         setIsOpen(false)
// // //         buttonRef.current?.focus()
// // //       }
// // //     }

// // //     document.addEventListener('mousedown', handlePointerDown)
// // //     document.addEventListener('touchstart', handlePointerDown)
// // //     document.addEventListener('keydown', handleKeyDown)
// // //     return () => {
// // //       document.removeEventListener('mousedown', handlePointerDown)
// // //       document.removeEventListener('touchstart', handlePointerDown)
// // //       document.removeEventListener('keydown', handleKeyDown)
// // //     }
// // //   }, [isOpen])

// // //   const close = () => setIsOpen(false)

// // //   const burgerLine =
// // //     'absolute left-0 block h-[2px] w-full rounded-full bg-[#1B1D20]'

// // //   return (
// // //     <nav className="sticky top-0 left-0 z-50 w-full bg-white">
// // //       <div className="box-border flex h-[65px] w-full items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:px-8 xl:px-[clamp(32px,2rem+1vw,48px)]">
// // //         {/* Desktop: chap ustun */}
// // //         <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-start">
// // //           <li>
// // //             <a href="/products" className={navLinkClass}>
// // //               {t.products}
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <Link to="/about" className={navLinkClass}>
// // //               {t.about}
// // //             </Link>
// // //           </li>
// // //           <li>
// // //             <LanguageSelect language={language} onChange={setLanguage} className="px-0 xl:px-[12px]" />
// // //           </li>
// // //         </ul>

// // //         {/* Logo — mobilda chapda, desktopda markazda */}
// // //         <Link to="/" onClick={close} className="flex items-center lg:justify-self-center">
// // //           <AnimatedImage src={logo} alt="Ekeler Logo" className="h-[clamp(28px,1.75rem+0.3vw,40px)] w-auto" />
// // //         </Link>

// // //         {/* Desktop: o'ng ustun */}
// // //         <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-end">
// // //           <li>
// // //             <a href="/industries" className={navLinkClass}>
// // //               {t.industries}
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <a href="/blog" className={navLinkClass}>
// // //               {t.blog}
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <a href="/contact" className={navLinkClass}>
// // //               {t.contact}
// // //             </a>
// // //           </li>
// // //         </ul>

// // //         {/* Mobil: burger tugmasi (3 chiziq -> X animatsiyasi) */}
// // //         <button
// // //           ref={buttonRef}
// // //           type="button"
// // //           onClick={() => setIsOpen((prev) => !prev)}
// // //           aria-label={isOpen ? 'Close menu' : 'Open menu'}
// // //           aria-expanded={isOpen}
// // //           aria-controls="mobile-nav-panel"
// // //           className="relative flex h-[44px] w-[44px] items-center justify-center lg:hidden"
// // //         >
// // //           <span className="relative block h-[16px] w-[24px]">
// // //             <span
// // //               className={cn(burgerLine, isOpen ? 'rotate-45 top-[7px]' : 'top-0')}
// // //             />
// // //             <span
// // //               className={cn(burgerLine, 'top-[7px]', isOpen && 'opacity-0')}
// // //             />
// // //             <span
// // //               className={cn(burgerLine, isOpen ? '-rotate-45 top-[7px]' : 'top-[14px]')}
// // //             />
// // //           </span>
// // //         </button>
// // //       </div>

// // //       {/* Mobil: fon overlay */}
// // //       <div
// // //         aria-hidden={!isOpen}
// // //         onClick={close}
// // //         className={cn(
// // //           'fixed inset-0 z-40 top-[65px] bg-black/40 lg:hidden',
// // //           isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
// // //         )}
// // //       />

// // //       {/* Mobil: slide-in panel */}
// // //       <div
// // //         id="mobile-nav-panel"
// // //         ref={panelRef}
// // //         className={cn(
// // //           'fixed right-0 top-[65px] z-50 h-[calc(100dvh-65px)] w-[82%] max-w-[360px] overflow-y-auto border-l border-neutral-200 bg-white px-6 py-8 lg:hidden',
// // //           isOpen ? 'translate-x-0' : 'translate-x-full',
// // //         )}
// // //       >
// // //         <ul className="flex flex-col gap-2 p-0 m-0 list-none">
// // //           <li>
// // //             <a href="/products" onClick={close} className={mobileLinkClass}>
// // //               {t.products}
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <Link to="/about" onClick={close} className={mobileLinkClass}>
// // //               {t.about}
// // //             </Link>
// // //           </li>
// // //           <li>
// // //             <a href="/industries" onClick={close} className={mobileLinkClass}>
// // //               {t.industries}
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <a href="/blog" onClick={close} className={mobileLinkClass}>
// // //               {t.blog}
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <a href="/contact" onClick={close} className={mobileLinkClass}>
// // //               {t.contact}
// // //             </a>
// // //           </li>
// // //           <li className="pt-4 mt-4 border-t border-neutral-200">
// // //             <LanguageSelect language={language} onChange={setLanguage} />
// // //           </li>
// // //         </ul>
// // //       </div>
// // //     </nav>
// // //   )
// // // }

// // // export default React.memo(Navigation)


// // // Responsive refactor: desktopda 3 ustunli grid saqlanadi, mobilda esa
// // // animatsiyali burger menyu (3 chiziq -> X), slide-in panel, scroll lock va
// // // tashqariga/linkka bosganda avtomatik yopilish qo'shildi. Hech qanday link
// // // yoki funksiya olib tashlanmadi — faqat joylashuv moslashtirildi.
// // import React, { useEffect, useRef, useState } from 'react'
// // import { Link } from 'react-router-dom'
// // import logo from '../../assets/logo.svg'
// // import { Globe } from 'lucide-react'
// // import { useLanguage } from '../../context/LanguageContext';
// // import type { Language } from '../../context/LanguageContext'
// // import { cn } from '../../lib/cn'

// // const navLinkClass =
// //   'relative block text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal transition-colors duration-300 hover:text-[#E88029] py-[10px] lg:py-[20px] px-0 lg:px-[10px] xl:px-[12px] after:absolute after:bottom-[8px] after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-[#E88029] after:transition-all after:duration-300 hover:after:w-full'

// // const mobileLinkClass =
// //   'flex min-h-[44px] w-full items-center text-[#1B1D20] text-[16px] font-normal hover:text-[#E88029]'

// // const labels = {
// //   ru: {
// //     products: 'Продукция',
// //     about: 'О нас',
// //     contact: 'Контакты',
// //     service:"Услуги"
// //   },
// //   uz: {
// //     products: 'Mahsulotlar',
// //     about: 'Biz haqimizda',
// //     contact: 'Aloqa',
// //     service: 'Xizmatlar',
// //   },
// //   eng: {
// //     products: 'Products',
// //     about: 'About Us',
// //     contact: 'Contact',
// //     service:"Services"  },
// // }

// // interface LanguageSelectProps {
// //   language: Language
// //   onChange: (language: Language) => void
// //   className?: string
// // }

// // // Responsive: til tanlagich desktop va mobil menyuda qayta ishlatiladi (DRY).
// // const LanguageSelect: React.FC<LanguageSelectProps> = ({ language, onChange, className }) => (
// //   <div className={cn('flex gap-2 items-center min-h-[44px]', className)}>
// //     <Globe size={16} className="text-[#E88029] shrink-0" />
// //     <select
// //       value={language}
// //       onChange={(e) => onChange(e.target.value as Language)}
// //       aria-label="Language"
// //       className="text-[#1B1D20] text-[14px] font-normal bg-transparent border-none outline-none cursor-pointer"
// //     >
// //       <option value="ru">RU</option>
// //       <option value="eng">EN</option>
// //       <option value="uz">UZ</option>
// //     </select>
// //   </div>
// // )

// // const NAV_HEIGHT_PX = 65

// // interface NavigationProps {
// //   /** Mobilda nav `fixed` bo'lgani uchun oqimdan chiqadi va spacer kerak bo'ladi.
// //    *  Agar spacer'ni chaqiruvchi o'zi joylashtirsa (masalan Home'da Hero'dan
// //    *  OLDIN), buni `false` qilib bering. */
// //   showSpacer?: boolean
// // }

// // const Navigation: React.FC<NavigationProps> = ({ showSpacer = true }) => {
// //   const { language, setLanguage } = useLanguage()
// //   const t = labels[language]
// //   const [isOpen, setIsOpen] = useState(false)
// //   const panelRef = useRef<HTMLDivElement | null>(null)
// //   const buttonRef = useRef<HTMLButtonElement | null>(null)

// //   // Desktop: nav ekran tepasiga yetganda `fixed` bo'lib DOIM qotib turadi.
// //   // `position: sticky` bu yerda yaramaydi — u ota element (div.p-2) tugagach,
// //   // ya'ni Footer ko'ringanda yopishishdan chiqib ketadi.
// //   const [pinned, setPinned] = useState(false)
// //   const sentinelRef = useRef<HTMLDivElement | null>(null)

// //   useEffect(() => {
// //     const sentinel = sentinelRef.current
// //     if (!sentinel) return

// //     // Sentinel nav'ning oqimdagi asl joyi. U ekran tepasidan yuqoriga
// //     // chiqib ketsa — nav'ni pin qilamiz.
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         setPinned(!entry.isIntersecting && entry.boundingClientRect.top <= 0)
// //       },
// //       { threshold: 0 },
// //     )

// //     observer.observe(sentinel)
// //     return () => observer.disconnect()
// //   }, [])

// //   // Responsive: menyu ochiq bo'lganda body scroll bloklanadi.
// //   useEffect(() => {
// //     if (!isOpen) return
// //     const previous = document.body.style.overflow
// //     document.body.style.overflow = 'hidden'
// //     return () => {
// //       document.body.style.overflow = previous
// //     }
// //   }, [isOpen])

// //   // Responsive: tashqariga bosish va Escape bilan yopish (klaviatura qo'llab-quvvatlash).
// //   useEffect(() => {
// //     if (!isOpen) return

// //     const handlePointerDown = (event: MouseEvent | TouchEvent) => {
// //       const target = event.target as Node
// //       if (panelRef.current?.contains(target)) return
// //       if (buttonRef.current?.contains(target)) return
// //       setIsOpen(false)
// //     }

// //     const handleKeyDown = (event: KeyboardEvent) => {
// //       if (event.key === 'Escape') {
// //         setIsOpen(false)
// //         buttonRef.current?.focus()
// //       }
// //     }

// //     document.addEventListener('mousedown', handlePointerDown)
// //     document.addEventListener('touchstart', handlePointerDown)
// //     document.addEventListener('keydown', handleKeyDown)
// //     return () => {
// //       document.removeEventListener('mousedown', handlePointerDown)
// //       document.removeEventListener('touchstart', handlePointerDown)
// //       document.removeEventListener('keydown', handleKeyDown)
// //     }
// //   }, [isOpen])

// //   const close = () => setIsOpen(false)

// //   const burgerLine =
// //     'absolute left-0 block h-[2px] w-full rounded-full bg-[#1B1D20] transition-all duration-300 ease-out'

// //   return (
// //     <>
// //       {/* Sentinel — nav'ning oqimdagi asl o'rni (balandligi 0). */}
// //       <div ref={sentinelRef} aria-hidden="true" />

// //       {/* Mobil: doim `fixed` — DOM'da qayerda turishidan qat'i nazar ekran
// //           tepasida turadi (Home'da nav Hero'dan KEYIN keladi, lekin mobilda tepada).
// //           Desktop (lg+): boshida oqimda (`static`), tepaga yetgach `fixed` bo'lib
// //           DOIM qotib turadi — Footer'da ham chiqib ketmaydi. */}
// //       <nav
// //         className={cn(
// //           'fixed top-0 left-0 z-50 w-full border-b border-[#ECECEC] bg-white',
// //           pinned ? 'lg:fixed' : 'lg:static',
// //         )}
// //         style={{ height: NAV_HEIGHT_PX }}
// //       >
// //         <div className="box-border flex h-[65px] w-full items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:px-8 xl:px-[clamp(32px,2rem+1vw,48px)]">
// //           {/* Desktop: chap ustun */}
// //           <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-start">
// //             <li>
// //               <a href="/products" className={navLinkClass}>
// //                 {t.products}
// //               </a>
// //             </li>
// //             <li>
// //               <Link to="/about" className={navLinkClass}>
// //                 {t.about}
// //               </Link>
// //             </li>
// //             <li>
// //               <LanguageSelect language={language} onChange={setLanguage} className="px-0 xl:px-[12px]" />
// //             </li>
// //           </ul>

// //           {/* Logo — mobilda chapda, desktopda markazda */}
// //           <Link to="/" onClick={close} className="flex items-center lg:justify-self-center">
// //             <AnimatedImage src={logo} alt="Ekeler Logo" className="h-[clamp(28px,1.75rem+0.3vw,40px)] w-auto" />
// //           </Link>

// //           {/* Desktop: o'ng ustun */}
// //           <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-end">
// //             <li>
// //               <a href="/service" className={navLinkClass}>
// //                 {t.service}
// //               </a>
// //             </li>
// //             <li>
// //               <a href="/contact" className={navLinkClass}>
// //                 {t.contact}
// //               </a>
// //             </li>
// //           </ul>

// //           {/* Mobil: burger tugmasi (3 chiziq -> X animatsiyasi) */}
// //           <button
// //             ref={buttonRef}
// //             type="button"
// //             onClick={() => setIsOpen((prev) => !prev)}
// //             aria-label={isOpen ? 'Close menu' : 'Open menu'}
// //             aria-expanded={isOpen}
// //             aria-controls="mobile-nav-panel"
// //             className="relative flex h-[44px] w-[44px] items-center justify-center lg:hidden"
// //           >
// //             <span className="relative block h-[16px] w-[24px]">
// //               <span
// //                 className={cn(burgerLine, isOpen ? 'rotate-45 top-[7px]' : 'top-0')}
// //               />
// //               <span
// //                 className={cn(burgerLine, 'top-[7px]', isOpen && 'opacity-0')}
// //               />
// //               <span
// //                 className={cn(burgerLine, isOpen ? '-rotate-45 top-[7px]' : 'top-[14px]')}
// //               />
// //             </span>
// //           </button>
// //         </div>

// //         {/* Mobil: fon overlay */}
// //         <div
// //           aria-hidden={!isOpen}
// //           onClick={close}
// //           className={cn(
// //             'fixed inset-0 z-40 transition-opacity duration-500 top-[65px] bg-black/40 lg:hidden',
// //             isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
// //           )}
// //         />

// //         {/* Mobil: slide-in panel */}
// //         <div
// //           id="mobile-nav-panel"
// //           ref={panelRef}
// //           className={cn(
// //             'fixed right-0 top-[65px] z-50 h-[calc(100dvh-65px)] w-[82%] max-w-[360px] overflow-y-auto border-l border-neutral-200 bg-white px-6 py-8 transition-transform duration-500 ease-out lg:hidden',
// //             isOpen ? 'translate-x-0' : 'translate-x-full',
// //           )}
// //         >
// //           <ul className="flex flex-col gap-2 p-0 m-0 list-none">
// //             <li>
// //               <a href="/products" onClick={close} className={mobileLinkClass}>
// //                 {t.products}
// //               </a>
// //             </li>
// //             <li>
// //               <Link to="/about" onClick={close} className={mobileLinkClass}>
// //                 {t.about}
// //               </Link>
// //             </li>
// //             <li>
// //               <a href="/service" onClick={close} className={mobileLinkClass}>
// //                 {t.service}
// //               </a>
// //             </li>
// //             <li>
// //               <a href="/contact" onClick={close} className={mobileLinkClass}>
// //                 {t.contact}
// //               </a>
// //             </li>
// //             <li className="pt-4 mt-4 border-t border-neutral-200">
// //               <LanguageSelect language={language} onChange={setLanguage} />
// //             </li>
// //           </ul>
// //         </div>
// //       </nav>

// //       {/* Mobil spacer — nav mobilda `fixed` bo'lib oqimdan chiqadi. */}
// //       {showSpacer && (
// //         <div
// //           className="lg:hidden"
// //           style={{ height: NAV_HEIGHT_PX }}
// //           aria-hidden="true"
// //         />
// //       )}

// //       {/* Desktop placeholder — nav pin bo'lganda oqimdan chiqadi, shu sabab
// //           kontent 65px yuqoriga sakramasligi uchun o'sha joyni to'ldiramiz. */}
// //       <div
// //         className={cn('hidden', pinned && 'lg:block')}
// //         style={{ height: NAV_HEIGHT_PX }}
// //         aria-hidden="true"
// //       />
// //     </>
// //   )
// // }

// // export default React.memo(Navigation)

// import AnimatedImage from './AnimatedImage';
// import React, { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import logo from '../../assets/logo.svg'
// import { Globe } from 'lucide-react'
// import { useLanguage } from '../../context/LanguageContext';
// import type { Language } from '../../context/LanguageContext'
// import { cn } from '../../lib/cn'

// const navLinkClass =
//   'relative group block py-[10px] lg:py-[20px] px-0 lg:px-[10px] xl:px-[12px] cursor-pointer'

// const labels = {
//   ru: {
//     products: 'Продукция',
//     about: 'О нас',
//     contact: 'Контакты',
//     service:"Услуги"
//   },
//   uz: {
//     products: 'Mahsulotlar',
//     about: 'Biz haqimizda',
//     contact: 'Aloqa',
//     service: 'Xizmatlar',
//   },
//   eng: {
//     products: 'Products',
//     about: 'About Us',
//     contact: 'Contact',
//     service:"Services"  },
// }

// interface LanguageSelectProps {
//   language: Language
//   onChange: (language: Language) => void
//   className?: string
// }

// const LanguageSelect: React.FC<LanguageSelectProps> = ({ language, onChange, className }) => (
//   <div className={cn('flex gap-2 items-center min-h-[44px]', className)}>
//     <Globe size={16} className="text-[#E88029] shrink-0" />
//     <select
//       value={language}
//       onChange={(e) => onChange(e.target.value as Language)}
//       aria-label="Language"
//       className="text-[#1B1D20] text-[14px] font-normal bg-transparent border-none outline-none cursor-pointer"
//     >
//       <option value="ru">RU</option>
//       <option value="eng">EN</option>
//       <option value="uz">UZ</option>
//     </select>
//   </div>
// )

// const NAV_HEIGHT_PX = 65

// interface NavigationProps {
//   showSpacer?: boolean
// }

// const Navigation: React.FC<NavigationProps> = ({ showSpacer = true }) => {
//   const { language, setLanguage } = useLanguage()
//   const t = labels[language]
//   const [isOpen, setIsOpen] = useState(false)
//   const panelRef = useRef<HTMLDivElement | null>(null)
//   const buttonRef = useRef<HTMLButtonElement | null>(null)

//   const [pinned, setPinned] = useState(false)
//   const sentinelRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     const sentinel = sentinelRef.current
//     if (!sentinel) return

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setPinned(!entry.isIntersecting && entry.boundingClientRect.top <= 0)
//       },
//       { threshold: 0 },
//     )

//     observer.observe(sentinel)
//     return () => observer.disconnect()
//   }, [])

//   useEffect(() => {
//     if (!isOpen) return
//     const previous = document.body.style.overflow
//     document.body.style.overflow = 'hidden'
//     return () => {
//       document.body.style.overflow = previous
//     }
//   }, [isOpen])

//   useEffect(() => {
//     if (!isOpen) return

//     const handlePointerDown = (event: MouseEvent | TouchEvent) => {
//       const target = event.target as Node
//       if (panelRef.current?.contains(target)) return
//       if (buttonRef.current?.contains(target)) return
//       setIsOpen(false)
//     }

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         setIsOpen(false)
//         buttonRef.current?.focus()
//       }
//     }

//     document.addEventListener('mousedown', handlePointerDown)
//     document.addEventListener('touchstart', handlePointerDown)
//     document.addEventListener('keydown', handleKeyDown)
//     return () => {
//       document.removeEventListener('mousedown', handlePointerDown)
//       document.removeEventListener('touchstart', handlePointerDown)
//       document.removeEventListener('keydown', handleKeyDown)
//     }
//   }, [isOpen])

//   const close = () => setIsOpen(false)

//   const burgerLine =
//     'absolute left-0 block h-[2px] w-full rounded-full bg-[#1B1D20] transition-all duration-300 ease-out'

//   return (
//     <>
//       <div ref={sentinelRef} aria-hidden="true" />

//       <nav
//         className={cn(
//           'fixed top-0 left-0 z-50 w-full border-b border-[#ECECEC] bg-white',
//           pinned ? 'lg:fixed' : 'lg:static',
//         )}
//         style={{ height: NAV_HEIGHT_PX }}
//       >
//         <div className="box-border flex h-[65px] w-full items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:px-8 xl:px-[clamp(32px,2rem+1vw,48px)]">
//           {/* Desktop: chap ustun */}
//           <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-start">
//             <li>
//               <a href="/products" className={navLinkClass}>
//                 <div className="h-[1.3em] overflow-hidden">
//                   <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                     <span className="text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-[1.3em]">{t.products}</span>
//                     <span className="text-[#E88029] text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium leading-[1.3em]">{t.products}</span>
//                   </div>
//                 </div>
//                 <span className="absolute bottom-[4px] left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#E88029] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
//               </a>
//             </li>
//             <li>
//               <Link to="/about" className={navLinkClass}>
//                 <div className="h-[1.3em] overflow-hidden">
//                   <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                     <span className="text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-[1.3em]">{t.about}</span>
//                     <span className="text-[#E88029] text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium leading-[1.3em]">{t.about}</span>
//                   </div>
//                 </div>
//                 <span className="absolute bottom-[4px] left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#E88029] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
//               </Link>
//             </li>
//             <li>
//               <LanguageSelect language={language} onChange={setLanguage} className="px-0 xl:px-[12px]" />
//             </li>
//           </ul>

//           {/* Logo */}
//           <Link to="/" onClick={close} className="flex items-center lg:justify-self-center">
//             <AnimatedImage src={logo} alt="Ekeler Logo" className="h-[clamp(28px,1.75rem+0.3vw,40px)] w-auto" />
//           </Link>

//           {/* Desktop: o'ng ustun */}
//           <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-end">
//             <li>
//               <a href="/service" className={navLinkClass}>
//                 <div className="h-[1.3em] overflow-hidden">
//                   <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                     <span className="text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-[1.3em]">{t.service}</span>
//                     <span className="text-[#E88029] text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium leading-[1.3em]">{t.service}</span>
//                   </div>
//                 </div>
//                 <span className="absolute bottom-[4px] left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#E88029] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
//               </a>
//             </li>
//             <li>
//               <a href="/contact" className={navLinkClass}>
//                 <div className="h-[1.3em] overflow-hidden">
//                   <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                     <span className="text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-[1.3em]">{t.contact}</span>
//                     <span className="text-[#E88029] text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium leading-[1.3em]">{t.contact}</span>
//                   </div>
//                 </div>
//                 <span className="absolute bottom-[4px] left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#E88029] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
//               </a>
//             </li>
//           </ul>

//           {/* Mobil: burger tugmasi */}
//           <button
//             ref={buttonRef}
//             type="button"
//             onClick={() => setIsOpen((prev) => !prev)}
//             aria-label={isOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={isOpen}
//             aria-controls="mobile-nav-panel"
//             className="relative flex h-[44px] w-[44px] items-center justify-center lg:hidden"
//           >
//             <span className="relative block h-[16px] w-[24px]">
//               <span
//                 className={cn(burgerLine, isOpen ? 'rotate-45 top-[7px]' : 'top-0')}
//               />
//               <span
//                 className={cn(burgerLine, 'top-[7px]', isOpen && 'opacity-0')}
//               />
//               <span
//                 className={cn(burgerLine, isOpen ? '-rotate-45 top-[7px]' : 'top-[14px]')}
//               />
//             </span>
//           </button>
//         </div>

//         {/* Mobil: fon overlay */}
//         <div
//           aria-hidden={!isOpen}
//           onClick={close}
//           className={cn(
//             'fixed inset-0 z-40 transition-opacity duration-500 top-[65px] bg-black/40 lg:hidden',
//             isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
//           )}
//         />

//         {/* Mobil: slide-in panel */}
//         <div
//           id="mobile-nav-panel"
//           ref={panelRef}
//           className={cn(
//             'fixed right-0 top-[65px] z-50 h-[calc(100dvh-65px)] w-[82%] max-w-[360px] overflow-y-auto border-l border-neutral-200 bg-white px-6 py-8 transition-transform duration-500 ease-out lg:hidden',
//             isOpen ? 'translate-x-0' : 'translate-x-full',
//           )}
//         >
//           <ul className="flex flex-col gap-2 p-0 m-0 list-none">
//             <li>
//               <a href="/products" onClick={close} className="block overflow-hidden relative py-2 group">
//                 <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                   <span className="flex min-h-[32px] w-full items-center text-[#1B1D20] text-[16px] font-normal">{t.products}</span>
//                   <span className="flex min-h-[32px] w-full items-center text-[#E88029] text-[16px] font-medium">{t.products}</span>
//                 </div>
//               </a>
//             </li>
//             <li>
//               <Link to="/about" onClick={close} className="block overflow-hidden relative py-2 group">
//                 <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                   <span className="flex min-h-[32px] w-full items-center text-[#1B1D20] text-[16px] font-normal">{t.about}</span>
//                   <span className="flex min-h-[32px] w-full items-center text-[#E88029] text-[16px] font-medium">{t.about}</span>
//                 </div>
//               </Link>
//             </li>
//             <li>
//               <a href="/service" onClick={close} className="block overflow-hidden relative py-2 group">
//                 <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                   <span className="flex min-h-[32px] w-full items-center text-[#1B1D20] text-[16px] font-normal">{t.service}</span>
//                   <span className="flex min-h-[32px] w-full items-center text-[#E88029] text-[16px] font-medium">{t.service}</span>
//                 </div>
//               </a>
//             </li>
//             <li>
//               <a href="/contact" onClick={close} className="block overflow-hidden relative py-2 group">
//                 <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
//                   <span className="flex min-h-[32px] w-full items-center text-[#1B1D20] text-[16px] font-normal">{t.contact}</span>
//                   <span className="flex min-h-[32px] w-full items-center text-[#E88029] text-[16px] font-medium">{t.contact}</span>
//                 </div>
//               </a>
//             </li>
//             <li className="pt-4 mt-4 border-t border-neutral-200">
//               <LanguageSelect language={language} onChange={setLanguage} />
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {showSpacer && (
//         <div
//           className="lg:hidden"
//           style={{ height: NAV_HEIGHT_PX }}
//           aria-hidden="true"
//         />
//       )}

//       <div
//         className={cn('hidden', pinned && 'lg:block')}
//         style={{ height: NAV_HEIGHT_PX }}
//         aria-hidden="true"
//       />
//     </>
//   )
// }

// export default React.memo(Navigation)


import AnimatedImage from './AnimatedImage';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { Globe, ChevronDown, X, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../context/LanguageContext'
import { cn } from '../../lib/cn'

const navLinkClass =
  'relative group block py-[10px] lg:py-[20px] px-0 lg:px-[10px] xl:px-[12px] cursor-pointer'

const labels = {
  ru: {
    home: 'Главная',
    products: 'Продукция',
    about: 'О нас',
    industries: 'Отрасли',
    contact: 'Контакты',
    service: 'Услуги',
  },
  uz: {
    home: 'Bosh sahifa',
    products: 'Mahsulotlar',
    about: 'Biz haqimizda',
    industries: 'Tarmoqlar',
    contact: 'Kontaktlar',
    service: 'Xizmatlar',
  },
  eng: {
    home: 'Home',
    products: 'Products',
    about: 'About us',
    industries: 'Industries',
    contact: 'Contacts',
    service: 'Services',
  },
}

interface LanguageSelectProps {
  language: Language
  onChange: (language: Language) => void
  className?: string
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ language, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const options: { value: Language; label: string }[] = [
    { value: 'uz', label: 'UZ' },
    { value: 'ru', label: 'RU' },
    { value: 'eng', label: 'EN' },
  ];

  const selectedLabel = options.find((o) => o.value === language)?.label ?? language.toUpperCase();

 return (
  <div ref={containerRef} className={cn('relative flex min-h-[40px] items-center gap-1.5', className)}>
    <Globe size={15} className="shrink-0 text-[#E88029]" />

    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Language"
        aria-expanded={isOpen}
        className="flex items-center gap-1 bg-transparent p-0 font-['Inter'] text-[13px] leading-5 text-[#1B1D20] outline-none"
      >
        {selectedLabel}
        <ChevronDown
          size={12}
          className={cn(
            'text-[#1B1D20] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <div
        className={cn(
          'absolute right-0 top-full z-50 mt-1 w-[90px] overflow-hidden rounded-md border border-[#ECECEC] bg-white p-1 shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-all duration-200',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-1 opacity-0 pointer-events-none'
        )}
      >
        <ul>
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full rounded px-2 py-1 text-center font-["Inter"] text-[12px] leading-5 text-[#1B1D20] hover:bg-[#E88029]/10 hover:text-[#E88029]',
                  language === opt.value && 'text-[#E88029]'
                )}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
};

const NAV_HEIGHT_PX = 65

interface NavigationProps {
  showSpacer?: boolean
}

const Navigation: React.FC<NavigationProps> = ({ showSpacer = true }) => {
  const { language, setLanguage } = useLanguage()
  const t = labels[language]
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const [pinned, setPinned] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPinned(!entry.isIntersecting && entry.boundingClientRect.top <= 0)
      },
      { threshold: 0 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyTouchAction = document.body.style.touchAction
    const previousBodyOverscroll = (document.body.style as any).overscrollBehavior
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    ;(document.body.style as any).overscrollBehavior = 'none'
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.touchAction = previousBodyTouchAction
      ;(document.body.style as any).overscrollBehavior = previousBodyOverscroll
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target)) return
      if (buttonRef.current?.contains(target)) return
      setIsOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const close = () => setIsOpen(false)

  const burgerLine =
    'absolute left-0 block h-[2px] w-full rounded-full bg-[#1B1D20] transition-all duration-300 ease-out'

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />

      <nav
        className={cn(
          'fixed top-0 left-0 z-50 w-full border-b border-[#ECECEC] bg-white',
          pinned ? 'lg:fixed' : 'lg:static',
        )}
        style={{ height: NAV_HEIGHT_PX }}
      >
        <div className="box-border flex h-[65px] w-full items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:px-8 xl:px-[clamp(32px,2rem+1vw,48px)]">
          {/* Desktop: chap ustun */}
          <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-start">
            <li>
              <a href="/products" className={navLinkClass}>
                <div className="h-[1.3em] overflow-hidden">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                    <span className="text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-[1.3em]">{t.products}</span>
                    <span className="text-[#E88029] text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium leading-[1.3em]">{t.products}</span>
                  </div>
                </div>
                <span className="absolute bottom-[4px] left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#E88029] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
              </a>
            </li>
            <li>
              <Link to="/about" className={navLinkClass}>
                <div className="h-[1.3em] overflow-hidden">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                    <span className="text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-[1.3em]">{t.about}</span>
                    <span className="text-[#E88029] text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium leading-[1.3em]">{t.about}</span>
                  </div>
                </div>
                <span className="absolute bottom-[4px] left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#E88029] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
              </Link>
            </li>
            <li>
              <LanguageSelect language={language} onChange={setLanguage}  />
            </li>
          </ul>

          {/* Logo */}
          <Link to="/" onClick={close} className="flex items-center lg:justify-self-center">
            <AnimatedImage src={logo} alt="Ekeler Logo" className="h-[clamp(24px,1.5rem+0.3vw,34px)] w-auto" />
          </Link>

          {/* Desktop: o'ng ustun */}
          <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-end">
            <li>
              <a href="/service" className={navLinkClass}>
                <div className="h-[1.3em] overflow-hidden">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                    <span className="text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-[1.3em]">{t.industries}</span>
                    <span className="text-[#E88029] text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium leading-[1.3em]">{t.industries}</span>
                  </div>
                </div>
                <span className="absolute bottom-[4px] left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#E88029] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
              </a>
            </li>
            <li>
              <a href="/contact" className={navLinkClass}>
                <div className="h-[1.3em] overflow-hidden">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                    <span className="text-[#1B1D20] text-[clamp(13px,0.8rem+0.1vw,15px)] font-normal leading-[1.3em]">{t.contact}</span>
                    <span className="text-[#E88029] text-[clamp(13px,0.8rem+0.1vw,15px)] font-medium leading-[1.3em]">{t.contact}</span>
                  </div>
                </div>
                <span className="absolute bottom-[4px] left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#E88029] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
              </a>
            </li>
          </ul>

          {/* Mobil: burger tugmasi */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
            className="relative flex h-[44px] w-[44px] items-center justify-center lg:hidden"
          >
            <span className="relative block h-[16px] w-[24px]">
              <span
                className={cn(burgerLine, isOpen ? 'rotate-45 top-[7px]' : 'top-0')}
              />
              <span
                className={cn(burgerLine, 'top-[7px]', isOpen && 'opacity-0')}
              />
              <span
                className={cn(burgerLine, isOpen ? '-rotate-45 top-[7px]' : 'top-[14px]')}
              />
            </span>
          </button>
        </div>

        {/* Mobil: to'liq ekran menyu */}
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className={cn(
            'flex overflow-hidden fixed inset-0 z-50 flex-col bg-white transition-transform duration-500 ease-out h-[100dvh] lg:hidden',
            isOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Header: logo + X */}
          <div className="flex h-[65px] shrink-0 items-center justify-between px-6">
            <Link to="/" onClick={close} className="flex items-center">
              <AnimatedImage src={logo} alt="Ekeler Logo" className="h-[28px] w-auto" />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-[44px] w-[44px] items-center justify-center"
            >
              <X size={24} className="text-[#1B1D20]" />
            </button>
          </div>

          {/* Menyu */}
          <ul className="flex overflow-y-auto flex-col flex-1 gap-0 justify-start items-center m-0 list-none">
            <li className="w-full border-b border-neutral-200">
              <Link to="/" onClick={close} className="block py-3 text-center text-[#1B1D20] text-[18px] font-normal">
                {t.home}
              </Link>
            </li>
            <li className="w-full border-b border-neutral-200">
              <a href="/products" onClick={close} className="block py-3 text-center text-[#1B1D20] text-[18px] font-normal">
                {t.products}
              </a>
            </li>
            <li className="w-full border-b border-neutral-200">
              <Link to="/about" onClick={close} className="block py-3 text-center text-[#1B1D20] text-[18px] font-normal">
                {t.about}
              </Link>
            </li>
            <li className="w-full border-b border-neutral-200">
              <a href="/service" onClick={close} className="block py-3 text-center text-[#1B1D20] text-[18px] font-normal">
                {t.industries}
              </a>
            </li>
            <li className="w-full border-b border-neutral-200">
              <a href="/contact" onClick={close} className="block py-3 text-center text-[#1B1D20] text-[18px] font-normal">
                {t.contact}
              </a>
            </li>
          </ul>

          {/* Footer */}
          <div className="flex flex-col gap-2 items-center px-6 pt-2 pb-0 mb-8 shrink-0">
            <LanguageSelect language={language} onChange={setLanguage} />
            <a href="tel:+998908088789" className="flex items-center gap-3 text-[#1B1D20] text-[14px]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ECECEC]">
                <Phone size={16} />
              </span>
              +998 90 808-87-89
            </a>
            <a href="mailto:info@ekeler.uz" className="flex items-center gap-3 text-[#1B1D20] text-[14px]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ECECEC]">
                <Mail size={16} />
              </span>
              info@ekeler.uz
            </a>
            <p className="text-center text-[12px] text-[#6B7280]">
              {language === 'ru'
                ? '© 2026 Ekeler. Все права защищены.'
                : language === 'uz'
                  ? '© 2026 Ekeler. Barcha huquqlar himoyalangan.'
                  : '© 2026 Ekeler. All rights reserved.'}
            </p>
          </div>
        </div>
      </nav>

      {showSpacer && (
        <div
          className="lg:hidden"
          style={{ height: NAV_HEIGHT_PX }}
          aria-hidden="true"
        />
      )}

      <div
        className={cn('hidden', pinned && 'lg:block')}
        style={{ height: NAV_HEIGHT_PX }}
        aria-hidden="true"
      />
    </>
  )
}

export default React.memo(Navigation)