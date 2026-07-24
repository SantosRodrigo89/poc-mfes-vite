# Status do Projeto

## Objetivo da POC

Construir um laboratório pequeno de catálogo de produtos para estudar arquitetura React moderna com Vite, DummyJSON, TanStack Query, formulários, testes, acessibilidade, responsividade e Micro Frontends.

## Stack

| Tecnologia                     | Estado                  |
| ------------------------------ | ----------------------- |
| React + TypeScript + Vite      | Configurado             |
| pnpm                           | Configurado             |
| Tailwind CSS                   | Configurado             |
| ESLint                         | Configurado             |
| Prettier                       | Configurado             |
| Vitest + React Testing Library | Pendente                |
| React Router                   | Pendente                |
| TanStack Query                 | Pendente                |
| React Hook Form + Zod          | Pendente                |
| Context API                    | Pendente                |
| DummyJSON                      | Pendente                |
| Micro Frontends                | Pendente, último módulo |

## Estrutura atual

```text
docs/
  01-foundation.md
  PROJECT_STATUS.md
src/
  App.tsx
  index.css
  main.tsx
vite.config.ts
eslint.config.js
```

## Módulos concluídos

Nenhum módulo está concluído integralmente.

## Módulo em andamento

**Módulo 1 — Fundação.** Vite, TypeScript, Tailwind, ESLint e Prettier foram configurados e validados. Ainda faltam Vitest e React Testing Library.

## Próximo passo

Configurar Vitest e React Testing Library como infraestrutura de testes da POC.

## Conceitos aprendidos

- Diferença entre `dependencies` e `devDependencies`.
- Módulos ECMAScript com `type: module`.
- Vite como ferramenta de desenvolvimento e build.
- Tailwind como CSS gerado em build, sem runtime JavaScript.
- Lockfile e uso consistente de um único gerenciador de pacotes.
- ESLint como análise estática, separado da responsabilidade de formatação.
- Prettier como formatação determinística, integrado ao ESLint por `eslint-config-prettier`.

## Decisões arquiteturais

- pnpm será o único gerenciador de pacotes.
- React Router será usado para lista e detalhe de produto.
- Estado remoto será responsabilidade do TanStack Query.
- Context API ficará restrita a favoritos locais.
- Tailwind v4 será integrado pelo plugin oficial do Vite.
- Scripts Vite usam `--configLoader native` devido à interação do carregador padrão com binários nativos do Tailwind no Windows.

## Melhorias futuras

- Remover os assets e CSS restantes do template Vite quando a tela real for construída.
- Configurar validação de acessibilidade automatizada, se ela se mostrar útil após os testes básicos.
- Adicionar Micro Frontends somente após concluir a aplicação React única.

## Dúvidas pendentes

- Nenhuma no momento.

## Lições aprendidas

- Verificar compatibilidade do Node antes de instalar dependências evita falhas difíceis de diagnosticar.
- Erros em bindings nativos podem exigir reinstalação ou uma estratégia diferente de carregamento de configuração.
- Commits pequenos facilitam a revisão e a explicação das decisões durante uma entrevista.
