import { Route, Routes } from 'react-router-dom'
import ProductsListPage from '../pages/ProductsListPage'

export function ProductsRoutes() {
  return (
    <Routes>
      <Route index element={<ProductsListPage />} />
    </Routes>
  )
}