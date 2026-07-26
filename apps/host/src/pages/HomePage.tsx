import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">POC Micro Frontends</h1>

        <p className="mt-2 text-slate-600">
          Host responsável pela composição da aplicação.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Domínios disponíveis</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/products"
            className="rounded-lg border p-6 transition hover:bg-slate-100"
          >
            <h3 className="text-xl font-semibold">📦 Produtos</h3>

            <p className="mt-2 text-slate-600">
              Remote responsável pelo catálogo de produtos.
            </p>
          </Link>

          <div className="rounded-lg border p-6 opacity-50">
            <h3 className="text-xl font-semibold">🛒 Carrinho</h3>

            <p className="mt-2 text-slate-600">Em construção...</p>
          </div>

          <div className="rounded-lg border p-6 opacity-50">
            <h3 className="text-xl font-semibold">👤 Perfil</h3>

            <p className="mt-2 text-slate-600">Em construção...</p>
          </div>

          <div className="rounded-lg border p-6 opacity-50">
            <h3 className="text-xl font-semibold">📦 Pedidos</h3>

            <p className="mt-2 text-slate-600">Em construção...</p>
          </div>
        </div>
      </section>
    </main>
  )
}
