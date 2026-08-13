import React from 'react'
import { useLanguage } from '../../context/LanguageContext'

const Products: React.FC = () => {
  const { t } = useLanguage()
  return (
    <div className="py-12 px-4 bg-white font-inter">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange">
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
