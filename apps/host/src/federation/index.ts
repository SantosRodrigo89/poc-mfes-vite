import { lazy } from 'react'

export const ProductsRoutes = lazy(
  () => import('products/ProductsRoutes'),
)