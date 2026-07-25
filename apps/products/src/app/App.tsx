import { BrowserRouter } from 'react-router-dom'
import { ProductsRoutes } from '../routes/ProductsRoutes'

function App() {
  return (
    <BrowserRouter>
      <ProductsRoutes />
    </BrowserRouter>
  )
}

export default App
