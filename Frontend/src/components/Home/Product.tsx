import React from 'react'
import { urlFor } from '../../sanity/client'

interface ProductProps {
  name: string
  description: string
  price: number
  image?: any
  category?: string
  inStock?: boolean
  featured?: boolean
}

const Product: React.FC<ProductProps> = ({
  name,
  description,
  price,
  image,
  category,
  inStock = true,
  featured = false
}) => {
  const imageUrl = image ? urlFor(image).url() : null

  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={name} 
          className="object-cover w-full h-48"
        />
      )}
      <div className="p-4">
        {category && (
          <span className="inline-block px-2 py-1 mb-2 text-xs text-purple-800 bg-purple-100 rounded-full">
            {category}
          </span>
        )}
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600">${price}</span>
          {!inStock && (
            <span className="text-sm font-medium text-red-500">Out of Stock</span>
          )}
        </div>
        {featured && (
          <span className="inline-block px-2 py-1 mt-2 text-xs text-yellow-800 bg-yellow-100 rounded">
            ⭐ Featured
          </span>
        )}
      </div>
    </div>
  )
}

export default Product
