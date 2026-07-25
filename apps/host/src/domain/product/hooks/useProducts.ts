import { useQuery } from '@tanstack/react-query'
import { productService } from '../product.service'

export function useProducts() {
  const query = useQuery({
    queryKey: ['products'], // Identificador único da consulta no cache.
    queryFn: productService.getProducts, // O React Query executará essa função quando necessário.
    select: (response) => response.products, // Seleciona apenas os dados da resposta. Só roda quando a query for bem sucedida
  })

  return query
}

// Se vários componentes precisarem dos mesmos dados, o React Query vai compartilhar 
// os dados em cache entre eles, evitando múltiplas requisições para a mesma informação.
