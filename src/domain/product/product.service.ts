import { productsResponseSchema, type ProductsResponse } from "./product.schema";

export const productService = {
  async getProducts(): Promise<ProductsResponse> {
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) {
      throw new Error('Erro ao buscar produtos.');
    }

    const json = await response.json();

    return productsResponseSchema.parse(json);
  },
};