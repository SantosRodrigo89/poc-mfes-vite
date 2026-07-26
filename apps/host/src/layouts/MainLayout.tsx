import { Link, Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <h1 className="text-xl font-bold">
            POC Micro Frontends
          </h1>

          <nav className="flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/products">Produtos</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl p-4 text-sm text-slate-500">
          POC de estudos • Host
        </div>
      </footer>
    </div>
  )
}