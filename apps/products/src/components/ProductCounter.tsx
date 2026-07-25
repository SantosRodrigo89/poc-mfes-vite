import { useProducts } from "../hooks/useProducts"

const ProductCounter = () => {
  const { data } = useProducts()

  return <p>Total de produtos: {data?.length}</p>
}

export default ProductCounter
