# Módulo 5 — React Router e Arquitetura de Navegação

## Objetivo

Evoluir a integração entre Host e Remote utilizando React Router, separando claramente as responsabilidades de navegação entre as aplicações.

O objetivo deste módulo não foi apenas aprender React Router, mas construir uma arquitetura de navegação escalável para Micro Frontends.

---

# Problema

Na integração inicial do Module Federation o Host carregava diretamente a aplicação Products.

```text
Host

↓

ProductsApp
```

Esse modelo funciona, porém cria um acoplamento inadequado.

O Host passa a conhecer uma aplicação inteira, quando deveria conhecer apenas um contrato.

---

# Nova arquitetura

Durante este módulo alteramos o contrato entre Host e Remote.

Antes:

```text
Host

↓

ProductsApp
```

Depois:

```text
Host

↓

ProductsRoutes
```

O Host deixa de consumir uma aplicação inteira e passa a consumir apenas as rotas do domínio Products.

---

# Separação de responsabilidades

Chegamos à seguinte definição.

## Host

Responsável por:

- BrowserRouter
- Navegação principal
- Layout compartilhado
- Providers compartilhados
- Carregamento dos Remotes

---

## Remote

Responsável por:

- Rotas do domínio
- Páginas
- Hooks
- Services
- React Query
- Regras de negócio

Cada domínio passa a ser dono da própria navegação interna.

---

# ProductsRoutes

Foi criada uma camada específica para expor as rotas do domínio.

```text
ProductsRoutes

↓

ProductsListPage
```

O Remote deixa de expor:

```text
App
```

e passa a expor:

```text
ProductsRoutes
```

Essa mudança torna o contrato mais semântico e desacoplado.

---

# BrowserRouter

O BrowserRouter permanece exclusivamente no Host.

Ele representa a aplicação completa.

Os Remotes não possuem BrowserRouter próprio quando carregados pelo Host.

Quando executados isoladamente (Standalone), cada Remote continua utilizando seu próprio BrowserRouter.

---

# Rotas Aninhadas

A rota principal passou a ser:

```text
/products/*
```

O caractere `*` indica que todas as sub-rotas pertencem ao domínio Products.

Exemplos:

```text
/products

/products/new

/products/:id
```

O Host não conhece essas páginas.

Ele apenas encaminha a navegação para o Remote.

---

# React.lazy

Os Remotes passaram a ser carregados utilizando:

```tsx
const ProductsRoutes = lazy(() =>
    import('products/ProductsRoutes')
)
```

O objetivo é realizar carregamento sob demanda (Lazy Loading).

O código do Remote somente é baixado quando necessário.

---

# Suspense

Como o carregamento é assíncrono, utilizamos:

```tsx
<Suspense fallback={<Loading />}>
    <ProductsRoutes />
</Suspense>
```

Enquanto o bundle remoto é carregado, o usuário recebe um feedback visual.

---

# MainLayout

Foi criado um Layout compartilhado no Host.

Estrutura:

```text
MainLayout

├── Header

├── Outlet

└── Footer
```

O Layout permanece fixo durante toda a navegação.

Apenas o conteúdo central é alterado.

---

# Outlet

O Outlet representa o ponto onde as rotas filhas serão renderizadas.

Fluxo:

```text
BrowserRouter

↓

Routes

↓

MainLayout

↓

Outlet

↓

Página atual
```

O Layout não conhece nenhuma página.

Quem decide qual componente será renderizado é o React Router.

---

# Rotas Relativas

Com a introdução do MainLayout passamos a utilizar rotas relativas.

Exemplo:

Antes:

```tsx
<Route path="/products/*" />
```

Depois:

```tsx
<Route path="products/*" />
```

As rotas passaram a ser filhas do MainLayout.

---

# Organização do Host

Foi criada uma camada específica para centralizar os Remotes.

```text
host/

src/

federation/

products.ts

index.ts
```

Essa camada desacopla a configuração do Module Federation das definições de rotas.

---

# Tipagem dos Remotes

Mantivemos um arquivo específico para declarar módulos federados.

```text
types/

module-federation.d.ts
```

Ao invés de utilizar:

```text
vite-env.d.ts
```

Essa decisão deixa explícito que essas declarações pertencem à arquitetura de Module Federation e não ao Vite.

---

# Fluxo completo

```text
Usuário

↓

BrowserRouter (Host)

↓

Routes

↓

MainLayout

↓

Outlet

↓

React.lazy()

↓

Module Federation

↓

ProductsRoutes

↓

ProductsListPage
```

---

# Decisões arquiteturais

Durante esta fase definimos que:

- O Host conhece apenas contratos.
- O Remote conhece apenas seu domínio.
- O BrowserRouter pertence ao Host.
- O MainLayout pertence ao Host.
- O React Query permanece dentro do domínio.
- O Layout nunca conhece páginas específicas.
- As páginas nunca conhecem o Layout.

---

# Principais conceitos aprendidos

- BrowserRouter
- Routes
- Route
- Outlet
- Rotas aninhadas
- Rotas relativas
- React.lazy
- Suspense
- MainLayout
- ProductsRoutes
- Contrato entre Host e Remote
- Separação de responsabilidades
- Organização da navegação em Micro Frontends

---

# Lições aprendidas

- O Host deve orquestrar a aplicação, não implementar regras de negócio.
- Um Remote deve expor contratos e não aplicações completas.
- O Layout é responsável pela estrutura visual da aplicação.
- O Outlet desacopla Layout e páginas.
- Lazy Loading reduz o carregamento inicial da aplicação.
- A navegação entre Host e Remote pode ocorrer de forma transparente para o usuário.
- A arquitetura torna-se mais escalável quando cada domínio é responsável apenas pelo próprio contexto.

---

# Próximo módulo

Forms com React Hook Form + Zod.

Neste módulo aprenderemos a construir formulários modernos entendendo primeiro os problemas do gerenciamento manual de estado e, em seguida, como React Hook Form e Zod resolvem esses problemas de forma integrada.