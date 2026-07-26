import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'

import HomePage from '../pages/HomePage'
import { MainLayout } from '../layouts/MainLayout'
import { ProductsRoutes } from '../federation'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="products/*"
            element={
              <Suspense fallback={<p>Carregando módulo Products...</p>}>
                <ProductsRoutes />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}