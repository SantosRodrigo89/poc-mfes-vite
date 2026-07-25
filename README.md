# POC - Micro Frontends com Vite

Projeto criado para estudar arquitetura Front-End moderna com foco em:

- React
- React Query
- Module Federation
- Micro Frontends
- Design System
- Arquitetura Front-End

## Objetivo

Simular a migração incremental de uma aplicação React monolítica para uma arquitetura baseada em Micro Frontends utilizando Module Federation.

## Estrutura

```text
apps/
packages/
docs/
```

## Aplicações

### Host

Responsável por:

- Orquestração
- Providers globais
- Layout
- Autenticação
- Carregamento dos Remotes

### Products

Primeiro domínio extraído.

Representa um Remote independente.

## Documentação

Toda documentação encontra-se em:

```text
docs/
```