import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../domain/product/product.service'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productService.createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'], // Invalida a query de produtos para que seja refetchada
      })
    },
  })
}
