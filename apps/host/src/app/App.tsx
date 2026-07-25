import { Suspense, lazy } from 'react'

const ProductsApp = lazy(() => import('products/App'))

export default function App() {
  return (
    <Suspense fallback={<p>Carregando Products...</p>}>
      <ProductsApp />
    </Suspense>
  )
}