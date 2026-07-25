import { useEffect, useState } from 'react'
import type { Product } from '../domain/product/product.schema'
import { productService } from '../domain/product/product.service'

export function useProducts() {
  const [data, setData] = useState<Product[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const response = await productService.getProducts()
      setData(response.products)
    }

    loadProducts()
  }, [])

  return data
}

// Se essa fosse uma tarefa de um desenvolvedor júnior no meu time, eu faria exatamente uma pergunta no PR:

// Por que existe um Hook entre a página e o Service?

// Se ele respondesse:

// "Porque o Hook encapsula a lógica de obtenção dos dados e adapta o Service para o React, permitindo trocar a implementação (fetch, React Query, etc.) sem alterar a UI."