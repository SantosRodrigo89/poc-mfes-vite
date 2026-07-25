import { useEffect, useState } from 'react'
import type { Product } from '../schemas/product.schema'
import { productService } from '../product.service'

export function useProducts() {
  const [data, setData] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productService.getProducts()
        setData(response.products)
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        }
      } finally {
        setIsLoading(false)
      }
    }
    loadProducts()
  }, [])

  return { data, isLoading, error }
}

