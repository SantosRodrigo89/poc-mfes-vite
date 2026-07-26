import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage' 
import { ProductsRoutes } from '../federation'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/products/*"
          element={
            <Suspense fallback={<p>Carregando Products...</p>}>
              <ProductsRoutes />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
