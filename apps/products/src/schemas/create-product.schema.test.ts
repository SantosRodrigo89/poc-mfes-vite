import { describe, expect, it } from 'vitest'

import { createProductSchema } from './create-product.schema'

describe('createProductSchema', () => {
  it('deve aceitar um produto válido', () => {
    const product = {
      title: 'Notebook Dell',
      price: 3500,
      description: 'Notebook para desenvolvimento',
    }

    const result = createProductSchema.safeParse(product)

    expect(result.success).toBe(true)
  })

  it('deve rejeitar um título com menos de 3 caracteres', () => {
    const product = {
      title: 'AB',
      price: 3500,
      description: 'Notebook para desenvolvimento',
    }

    const result = createProductSchema.safeParse(product)

    expect(result.success).toBe(false)
  })
})
