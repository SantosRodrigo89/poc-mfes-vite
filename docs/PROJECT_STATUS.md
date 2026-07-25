# Status do Projeto

## Objetivo da POC

Construir um laboratório para estudar arquitetura Front-End moderna, simulando a evolução de uma aplicação React monolítica para uma arquitetura baseada em Micro Frontends utilizando Module Federation.

O objetivo é aprender conceitos arquiteturais, boas práticas e trade-offs encontrados em aplicações reais.

---

# Stack

| Tecnologia | Estado |
|------------|--------|
| React + TypeScript + Vite | ✅ Configurado |
| pnpm Workspaces | ✅ Configurado |
| Tailwind CSS | ✅ Configurado |
| ESLint | ✅ Configurado |
| Prettier | ✅ Configurado |
| TanStack Query | ✅ Configurado |
| Zod | ✅ Configurado |
| React Hook Form | ⏳ Pendente |
| React Router | ⏳ Em andamento |
| Vitest + React Testing Library | ⏳ Pendente |
| Module Federation | ⏳ Em andamento |
| Micro Frontends | ⏳ Em andamento |

---

# Estrutura atual

```text
apps/
│
├── host/
│
├── products/
│
packages/
│
docs/
│
├── 01-foundation.md
├── 02-data-fetching-with-hooks.md
├── 03-react-query.md
├── PROJECT_STATUS.md
```

---

# Módulos concluídos

## ✅ Módulo 1 — Foundation

Concluído.

Aprendidos:

- Vite
- TypeScript
- pnpm
- ESLint
- Prettier
- Tailwind

---

## ✅ Módulo 2 — Data Fetching

Concluído.

Aprendidos:

- Arquitetura em camadas

```text
Page
↓

Hook

↓

Service

↓

API
```

Separação de responsabilidades.

---

## ✅ Módulo 3 — React Query

Concluído.

Conceitos estudados:

- QueryClient
- QueryClientProvider
- useQuery
- useMutation
- staleTime
- cache
- invalidateQueries
- request deduplication
- queryKey
- queryFn

Foram implementados:

- useProducts
- useCreateProduct

Mantendo o ProductService como responsável pela comunicação.

---

# Módulo em andamento

## 🚧 Módulo 4 — Micro Frontends

Conceitos estudados:

- Host
- Remote
- Module Federation
- remoteEntry.js
- Shared
- Runtime
- Singleton
- Autonomia entre squads
- Trade-offs
- Modular Monolith vs Micro Frontends

Analogia utilizada durante todo o estudo:

```text
Host = Shopping

Remote = Loja

remoteEntry.js = Vitrine da loja
```

---

# Estado atual

## Concluído

- Monorepo com pnpm Workspaces
- Estrutura apps/packages/docs
- Host criado
- Remote Products criado
- Domínio Product isolado
- Configuração inicial do Module Federation
- Remote gerando corretamente o remoteEntry.js

---

## Em andamento

Integração entre Host e Remote.

O objetivo imediato é fazer o Host consumir o Remote Products utilizando Module Federation.

---

# Próximos passos

1. Integrar Host ↔ Products.
2. Configurar React.lazy + Suspense.
3. Introduzir React Router.
4. Migrar definitivamente o domínio Product para o Remote.
5. Remover o código legado do Host.
6. Evoluir para múltiplos Remotes.

---

# Decisões arquiteturais

## Organização

```text
apps/
```

Aplicações executáveis.

```text
packages/
```

Bibliotecas compartilhadas.

Somente serão criadas quando existir reutilização real.

Não utilizar packages para:

- domínios;
- páginas;
- hooks de negócio;
- services de negócio.

---

## Estratégia de migração

A migração seguirá uma abordagem incremental.

Fluxo:

1. Transformar o projeto em monorepo.
2. Transformar a aplicação existente em Host.
3. Criar o primeiro Remote.
4. Validar Module Federation.
5. Migrar o domínio.
6. Remover o legado.

Nunca realizar duas migrações arquiteturais simultaneamente.

---

## Responsabilidades

### Host

Responsável por:

- Orquestração
- Providers globais
- Autenticação
- Layout
- Carregamento dos Remotes

### Remote

Responsável por:

- Implementação do domínio
- Regras de negócio
- Componentes específicos
- Hooks
- Services

---

# Conceitos aprendidos

Além dos conceitos anteriores, foram adicionados:

- Monorepo
- pnpm Workspaces
- Organização por domínios
- Module Federation
- Runtime loading
- remoteEntry.js
- Shared dependencies
- Singleton React
- Autonomia entre aplicações
- Estratégias de migração incremental

---

# Melhorias futuras

- Introduzir Design System compartilhado.
- Compartilhar tipos através de packages quando necessário.
- Adicionar novos Remotes (Orders, Cart).
- Compartilhar autenticação e cache global.
- Evoluir para cenários mais próximos de produção.

---

# Dúvidas pendentes

- Estratégia definitiva para compartilhamento de React Router entre Host e Remotes.
- Melhor estratégia para compartilhar cache do React Query entre aplicações.

---

# Lições aprendidas

- Micro Frontends são uma decisão organizacional antes de serem uma decisão tecnológica.
- Module Federation não elimina a necessidade de boa arquitetura.
- O Host deve conhecer apenas a API pública dos Remotes.
- Não abstrair código compartilhado antes de existir reutilização real.
- Migrações incrementais reduzem risco e refletem melhor projetos reais.