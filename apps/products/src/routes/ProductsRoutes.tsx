import { Route, Routes } from 'react-router-dom'
import ProductsListPage from '../pages/ProductsListPage'
import CreateProductPage from '../pages/CreateProductPage'

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route index element={<ProductsListPage />} />

      <Route path="new" element={<CreateProductPage />} />
    </Routes>
  )
}
