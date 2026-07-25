import ProductCounter from '../components/ui/ProductCounter'
import { useCreateProduct } from '../hooks/useCreateProducts';
import { useProducts } from '../hooks/useProducts'

const ProductsListPage = () => {
  const { data, isLoading, error } = useProducts()
  const { mutate } = useCreateProduct();

  if (isLoading) {
    return <p>Carregando produtos...</p>
  }

  if (error) {
    return <p>Erro ao carregar produtos: {error.message}</p>
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-slate-950">
      <ProductCounter />
      <section className="max-w-lg rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold">Catálogo de Produtos</h1>
        <ul className="mt-4 space-y-2">
          {data?.map((product: { id: number | string; title: string; thumbnail: string; category: string; description: string; price: number }) => (
            <li key={product.id} className="border-b py-2">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <img src={product.thumbnail} alt={product.title} className="text-sm text-slate-500" />
              <h3 className="text-sm text-slate-500">Categoria: {product.category}</h3>
              <p className="text-sm text-slate-600">{product.description}</p>
              <p className="text-sm font-medium text-slate-800">Preço: R$ {product.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default ProductsListPage
