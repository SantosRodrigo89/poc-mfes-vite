import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateProduct } from '../hooks/useCreateProducts'
import {
  createProductSchema,
  type CreateProductDto,
} from '../schemas/create-product.schema'

export default function CreateProductPage() {
  const { mutate, isPending } = useCreateProduct()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductDto>({
    resolver: zodResolver(createProductSchema),
  })

  const onSubmit = (data: CreateProductDto) => {
    mutate(data)
  }

  return (
    <section className="mx-auto max-w-xl">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Novo Produto
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Preencha os dados abaixo para cadastrar um novo produto.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Título
            </label>

            <input
              id="title"
              type="text"
              placeholder="Ex: Notebook Dell XPS"
              {...register('title')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Preço
            </label>

            <input
              id="price"
              type="number"
              step="0.01"
              placeholder="0,00"
              {...register('price', {
                valueAsNumber: true,
              })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Descrição
            </label>

            <textarea
              id="description"
              rows={4}
              placeholder="Descreva o produto..."
              {...register('description')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </form>
      </div>
    </section>
  )
}