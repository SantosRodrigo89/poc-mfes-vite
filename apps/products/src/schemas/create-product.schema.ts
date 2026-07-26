import z from 'zod'

export const createProductSchema = z.object({
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
  price: z.number().positive(),
  description: z.string(),
})

export type CreateProductDto = z.infer<typeof createProductSchema>;

export const createProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
})

export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;