import {
  createProductResponseSchema,
  createProductSchema,
  type CreateProductDto,
  type CreateProductResponse,
} from '../schemas/create-product.schema'
import {
  productsResponseSchema,
  type ProductsResponse,
} from '../schemas/product.schema'

export const productService = {
  async getProducts(): Promise<ProductsResponse> {
    const response = await fetch('https://dummyjson.com/products')

    if (!response.ok) {
      throw new Error('Erro ao buscar produtos.')
    }

    const json = await response.json()

    return productsResponseSchema.parse(json)
  },

  async createProduct(data: CreateProductDto): Promise<CreateProductResponse> {
    const dto = createProductSchema.parse(data)
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(dto),
    })

    if (!response.ok) {
      throw new Error('Erro ao criar produto.')
    }

    const json = await response.json()

    return createProductResponseSchema.parse(json)
  },
}
