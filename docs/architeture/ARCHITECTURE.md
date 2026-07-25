# Arquitetura

## Estrutura

```text
apps/
packages/
docs/
```

## apps

Aplicações executáveis.

Exemplo:

```text
host/
products/
orders/
```

Cada aplicação possui:

- package.json
- vite.config.ts
- src

## packages

Bibliotecas compartilhadas.

Somente recebem código quando houver reutilização real.

Nunca colocar:

- páginas
- domínios
- hooks de negócio
- services de negócio

## docs

Documentação da arquitetura.