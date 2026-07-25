# Decisões Arquiteturais

## Migração incremental

Não moveremos todos os domínios de uma vez.

Fluxo:

1. Monorepo
2. Host
3. Remote
4. Module Federation
5. Migração do domínio

---

## Host

Responsável por:

- Providers
- Layout
- Autenticação
- Orquestração

---

## Remote

Cada domínio possui autonomia.

Exemplo:

Products

---

## Packages

Somente código compartilhado.

Não abstrair antes da necessidade.