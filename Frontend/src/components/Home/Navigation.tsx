// import React from 'react'
// import { Link } from 'react-router-dom'
// import logo from '../../assets/logo.svg'
// import { Globe } from 'lucide-react'
// import { useLanguage } from '../../context/LanguageContext';
// import type { Language } from '../../context/LanguageContext'

// const navLinkClass =
//   'text-[#1B1D20] text-[14px] font-normal hover:text-[#E88029] transition-colors duration-400 py-[20px] px-[12px]'

// const Navigation: React.FC = () => {
//   const { language, setLanguage } = useLanguage()

//   return (
//     <nav className="h-[65px] w-full bg-white flex items-center justify-between px-[32px] box-border">
//       <ul className="flex gap-[32px] items-center list-none m-0 p-0">
//         <li>
//           <a href="/#products" className={navLinkClass}>
//             Products
//           </a>
//         </li>
//         <li>
//           <Link to="/about" className={navLinkClass}>
//             About Us
//           </Link>
//         </li>
//         <li>
//           <div className="flex items-center gap-2 py-[20px] px-[12px]">
//             <Globe size={16} className="text-[#E88029]" />
//             <select
//               value={language}
//               onChange={(e) => setLanguage(e.target.value as Language)}
//               className="text-[#1B1D20] text-[14px] font-normal bg-transparent border-none outline-none cursor-pointer"
//             >
//               <option value="ru">RU</option>
//               <option value="eng">EN</option>
//               <option value="uz">UZ</option>
//             </select>
//           </div>
//         </li>
//       </ul>

//       <Link to="/" className="flex items-center">
//         <img src={logo} alt="Ekeler Logo" className="h-[40px] w-auto" />
//       </Link>

//       <ul className="flex gap-[32px] items-center list-none m-0 p-0">
//         <li>
//           <a href="/#industries" className={navLinkClass}>
//             Industries
//           </a>
//         </li>
//         <li>
//           <a href="/#contact" className={navLinkClass}>
//             Contact
//           </a>
//         </li>
//       </ul>
//     </nav>
//   )
// }

// export default Navigation



import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { Globe } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../context/LanguageContext'

const navLinkClass =
  'text-[#1B1D20] text-[14px] font-normal hover:text-[#E88029] transition-colors duration-400 py-[20px] px-[12px]'

const labels = {
  ru: {
    products: 'Продукция',
    about: 'О нас',
    industries: 'Отрасли',
    contact: 'Контакты',
  },
  uz: {
    products: 'Mahsulotlar',
    about: 'Biz haqimizda',
    industries: 'Sanoatlar',
    contact: 'Aloqa',
  },
  eng: {
    products: 'Products',
    about: 'About Us',
    industries: 'Industries',
    contact: 'Contact',
  },
}

const Navigation: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const t = labels[language]

  return (
    <nav className="sticky top-0 left-0 z-50 h-[65px] w-full bg-white flex items-center justify-between px-[32px] box-border">
      <ul className="flex gap-[32px] items-center list-none m-0 p-0">
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
          <div className="flex items-center gap-2 py-[20px] px-[12px]">
            <Globe size={16} className="text-[#E88029]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="text-[#1B1D20] text-[14px] font-normal bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="ru">RU</option>
              <option value="eng">EN</option>
              <option value="uz">UZ</option>
            </select>
          </div>
        </li>
      </ul>

      <Link to="/" className="flex items-center">
        <img src={logo} alt="Ekeler Logo" className="h-[40px] w-auto" />
      </Link>

      <ul className="flex gap-[32px] items-center list-none m-0 p-0">
        <li>
          <a href="/#industries" className={navLinkClass}>
            {t.industries}
          </a>
        </li>
        <li>
          <a href="/#contact" className={navLinkClass}>
            {t.contact}
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation