// Responsive refactor: desktopda 3 ustunli grid saqlanadi, mobilda esa
// animatsiyali burger menyu (3 chiziq -> X), slide-in panel, scroll lock va
// tashqariga/linkka bosganda avtomatik yopilish qo'shildi. Hech qanday link
// yoki funksiya olib tashlanmadi — faqat joylashuv moslashtirildi.
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { Globe } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../context/LanguageContext'
import { cn } from '../../lib/cn'

const navLinkClass =
  'relative block text-[#1B1D20] text-[14px] xl:text-[15px] font-normal transition-colors duration-300 hover:text-[#E88029] py-[10px] lg:py-[20px] px-0 lg:px-[10px] xl:px-[12px] after:absolute after:bottom-[8px] after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-[#E88029] after:transition-all after:duration-300 hover:after:w-full'

const mobileLinkClass =
  'flex min-h-[44px] w-full items-center text-[#1B1D20] text-[16px] font-normal hover:text-[#E88029]'

const labels = {
  ru: {
    products: 'Продукция',
    about: 'О нас',
    industries: 'Отрасли',
    contact: 'Контакты',
    blog:"Блог"
  },
  uz: {
    products: 'Mahsulotlar',
    about: 'Biz haqimizda',
    industries: 'Sanoatlar',
    contact: 'Aloqa',
    blog: 'Blog',
  },
  eng: {
    products: 'Products',
    about: 'About Us',
    industries: 'Industries',
    contact: 'Contact',
    blog:"Blog"  },
}

interface LanguageSelectProps {
  language: Language
  onChange: (language: Language) => void
  className?: string
}

// Responsive: til tanlagich desktop va mobil menyuda qayta ishlatiladi (DRY).
const LanguageSelect: React.FC<LanguageSelectProps> = ({ language, onChange, className }) => (
  <div className={cn('flex gap-2 items-center min-h-[44px]', className)}>
    <Globe size={16} className="text-[#E88029] shrink-0" />
    <select
      value={language}
      onChange={(e) => onChange(e.target.value as Language)}
      aria-label="Language"
      className="text-[#1B1D20] text-[14px] font-normal bg-transparent border-none outline-none cursor-pointer"
    >
      <option value="ru">RU</option>
      <option value="eng">EN</option>
      <option value="uz">UZ</option>
    </select>
  </div>
)

const Navigation: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const t = labels[language]
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Responsive: menyu ochiq bo'lganda body scroll bloklanadi.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // Responsive: tashqariga bosish va Escape bilan yopish (klaviatura qo'llab-quvvatlash).
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
    'absolute left-0 block h-[2px] w-full rounded-full bg-[#1B1D20]'

  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white">
      <div className="box-border flex h-[65px] w-full items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:px-8 xl:px-[32px]">
        {/* Desktop: chap ustun */}
        <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-start">
          <li>
            <a href="/products" className={navLinkClass}>
              {t.products}
            </a>
          </li>
          <li>
            <Link to="/about" className={navLinkClass}>
              {t.about}
            </Link>
          </li>
          <li>
            <LanguageSelect language={language} onChange={setLanguage} className="px-0 xl:px-[12px]" />
          </li>
        </ul>

        {/* Logo — mobilda chapda, desktopda markazda */}
        <Link to="/" onClick={close} className="flex items-center lg:justify-self-center">
          <img src={logo} alt="Ekeler Logo" className="h-[32px] w-auto sm:h-[36px] lg:h-[40px]" />
        </Link>

        {/* Desktop: o'ng ustun */}
        <ul className="hidden list-none items-center gap-[16px] p-0 m-0 lg:flex xl:gap-[32px] lg:justify-self-end">
          <li>
            <a href="/industries" className={navLinkClass}>
              {t.industries}
            </a>
          </li>
          <li>
            <a href="/blog" className={navLinkClass}>
              {t.blog}
            </a>
          </li>
          <li>
            <a href="/contact" className={navLinkClass}>
              {t.contact}
            </a>
          </li>
        </ul>

        {/* Mobil: burger tugmasi (3 chiziq -> X animatsiyasi) */}
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

      {/* Mobil: fon overlay */}
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={cn(
          'fixed inset-0 z-40 top-[65px] bg-black/40 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Mobil: slide-in panel */}
      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={cn(
          'fixed right-0 top-[65px] z-50 h-[calc(100dvh-65px)] w-[82%] max-w-[360px] overflow-y-auto border-l border-neutral-200 bg-white px-6 py-8 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <ul className="flex flex-col gap-2 p-0 m-0 list-none">
          <li>
            <a href="/products" onClick={close} className={mobileLinkClass}>
              {t.products}
            </a>
          </li>
          <li>
            <Link to="/about" onClick={close} className={mobileLinkClass}>
              {t.about}
            </Link>
          </li>
          <li>
            <a href="/industries" onClick={close} className={mobileLinkClass}>
              {t.industries}
            </a>
          </li>
          <li>
            <a href="/blog" onClick={close} className={mobileLinkClass}>
              {t.blog}
            </a>
          </li>
          <li>
            <a href="/contact" onClick={close} className={mobileLinkClass}>
              {t.contact}
            </a>
          </li>
          <li className="pt-4 mt-4 border-t border-neutral-200">
            <LanguageSelect language={language} onChange={setLanguage} />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default React.memo(Navigation)