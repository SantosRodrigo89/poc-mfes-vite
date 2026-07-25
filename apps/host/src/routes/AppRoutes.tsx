import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

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
