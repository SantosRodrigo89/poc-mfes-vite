import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../tests/render'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import CreateProductPage from './CreateProductPage'

const mutateMock = vi.fn()

vi.mock('../hooks/useCreateProducts', () => ({
  useCreateProduct: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}))

describe('CreateProductPage', () => {
  it('deve renderizar o formulário', () => {
    renderWithProviders(<CreateProductPage />)

    expect(
      screen.getByRole('heading', {
        name: /novo produto/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /salvar produto/i,
      }),
    ).toBeInTheDocument()
  })

  it('deve exibir mensagens de validação ao enviar o formulário vazio', async () => {
    const user = userEvent.setup()

    renderWithProviders(<CreateProductPage />)

    // Antes do clique não existem erros
    expect(
      screen.queryByText(/título deve ter no mínimo 3 caracteres/i),
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: /salvar produto/i,
      }),
    )

    expect(
      await screen.findByText(/título deve ter no mínimo 3 caracteres/i),
    ).toBeInTheDocument()
  })

  it('deve chamar a mutation com os dados do formulário', async () => {
    const user = userEvent.setup()

    renderWithProviders(<CreateProductPage />)

    await user.type(screen.getByLabelText(/título/i), 'Notebook Dell')

    await user.type(screen.getByLabelText(/preço/i), '3500')

    await user.type(
      screen.getByLabelText(/descrição/i),
      'Notebook para desenvolvimento',
    )

    await user.click(
      screen.getByRole('button', {
        name: /salvar produto/i,
      }),
    )

    expect(mutateMock).toHaveBeenCalledTimes(1)

    expect(mutateMock.mock.calls[0][0]).toEqual({
      title: 'Notebook Dell',
      price: 3500,
      description: 'Notebook para desenvolvimento',
    })
  })
})
