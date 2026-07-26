import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateProduct } from '../hooks/useCreateProducts'
import {
  createProductSchema,
  type CreateProductDto,
} from '../schemas/create-product.schema'

export default function CreateProductPage() {
  const navigate = useNavigate()

  /**
   * A Mutation encapsula toda a comunicação com a API.
   *
   * A página não conhece:
   * - fetch
   * - axios
   * - productService
   * - invalidateQueries
   *
   * Ela apenas executa uma intenção:
   * "Criar um produto".
   */
  const { mutate, isPending } = useCreateProduct()

  /**
   * Simula um produto retornado pela API.
   *
   * Utilizado apenas para demonstrar a diferença entre
   * defaultValues e reset().
   *
   * Em produção esses dados normalmente viriam do React Query.
   */
  const fakeProduct: CreateProductDto = {
    title: 'iPhone 15',
    price: 5999,
    description: 'Smartphone Apple',
  }

  /**
   * useForm é responsável por gerenciar todo o ciclo de vida do formulário.
   *
   * O generic <CreateProductDto> permite que o TypeScript conheça
   * exatamente quais campos existem.
   *
   * Exemplo:
   *
   * ✅ register('title')
   * ❌ register('banana') // Erro de compilação
   *
   * O resolver conecta o React Hook Form ao Zod.
   * Assim reutilizamos o mesmo contrato utilizado pelo domínio,
   * mantendo uma única fonte da verdade para validação.
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductDto>({
    resolver: zodResolver(createProductSchema),

    /**
     * Utilize defaultValues quando os dados já existem
     * ANTES da criação do formulário.
     *
     * Exemplos:
     *
     * - SSR
     * - Clonagem de registros
     * - Wizard
     * - Navegação utilizando state
     *
     * defaultValues: fakeProduct,
     */
  })

  /**
   * Simula uma chamada assíncrona da API.
   *
   * O formulário já foi criado.
   *
   * Como o React Hook Form utiliza defaultValues apenas
   * durante a inicialização do formulário,
   * precisamos utilizar reset() para atualizar seus valores.
   *
   * Esse é exatamente o fluxo utilizado em telas de edição
   * quando os dados chegam através do React Query.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      reset(fakeProduct)
    }, 2000)

    return () => clearTimeout(timer)
  }, [reset])

  /**
   * handleSubmit executa automaticamente:
   *
   * Formulário
   *      ↓
   * Validação
   *      ↓
   * Zod
   *      ↓
   * onSubmit(data)
   *
   * O objeto "data" já chega validado e tipado.
   */
  const onSubmit = (data: CreateProductDto) => {
    mutate(data, {
      onSuccess: () => {
        /**
         * A Mutation foi concluída com sucesso.
         *
         * A invalidação do cache já acontece dentro
         * do Hook useCreateProduct().
         *
         * A responsabilidade da página é apenas decidir
         * o fluxo da interface.
         */
        navigate('/products')
      },
    })
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

        {/**
         * handleSubmit controla todo o fluxo do formulário.
         *
         * Não chamamos o Zod manualmente.
         * O React Hook Form executa a validação através do Resolver
         * antes de chamar o onSubmit.
         */}
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

              /**
               * register conecta automaticamente o campo
               * ao estado interno do React Hook Form.
               *
               * Não precisamos controlar:
               *
               * - value
               * - onChange
               * - onBlur
               * - useState
               */
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
                /**
                 * Todo input HTML retorna string.
                 *
                 * Mesmo utilizando:
                 *
                 * <input type="number" />
                 *
                 * o navegador retorna:
                 *
                 * "5999"
                 *
                 * valueAsNumber converte automaticamente
                 * para number, mantendo compatibilidade
                 * com o DTO e o schema do Zod.
                 */
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

              /**
               * textarea funciona exatamente da mesma forma
               * que um input tradicional.
               *
               * Enquanto o componente respeitar o contrato
               * esperado pelo React Hook Form,
               * basta utilizar register().
               *
               * Componentes como React Select,
               * Material UI Select ou DatePicker
               * normalmente exigem Controller.
               */
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