import React from 'react'
import { useLanguage } from '../../context/LanguageContext'

const Products: React.FC = () => {
  const { t } = useLanguage()
  return (
    <div className="px-4 py-12 bg-white font-inter">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-orange">
          {t({ ru: 'Наши достижения', uz: 'Bizning yutuqlar', eng: 'Our achievements' })}
        </h2>
        <p className="text-center text-dark">
          {t({ ru: 'Нет доступных продуктов', uz: 'Mahsulotlar mavjud emas', eng: 'No products available' })}
        </p>
      </div>
    </div>
  )
}

export default Products
