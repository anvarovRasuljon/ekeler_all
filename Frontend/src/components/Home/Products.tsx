import React, { useState, useEffect } from 'react'
import Product from './Product'
import { client } from '../../sanity/client'

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "product"] | order(name asc)
        `)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  return (
    <div className="py-12 px-4 bg-white font-manrope">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange">Наши достижения</h2>
        {products.length === 0 ? (
          <p className="text-center text-dark">No products available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
