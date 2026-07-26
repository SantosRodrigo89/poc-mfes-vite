# FASE 08 — Testes

## Objetivo

Compreender os diferentes níveis de testes em aplicações React modernas, entendendo quando utilizar cada estratégia, quais problemas cada uma resolve e como manter uma suíte de testes sustentável.

O foco desta fase não foi decorar APIs do Vitest ou da React Testing Library, mas entender o raciocínio por trás da construção de bons testes.

---

# Stack

- Vitest
- React Testing Library
- user-event
- jest-dom
- React Hook Form
- Zod

---

# Conceitos estudados

## Pirâmide de Testes

Estudamos a pirâmide de testes e quando utilizar cada nível.

```text
             E2E
        Fluxo completo

-----------------------------

 Integração / Componentes

-----------------------------

       Unitários
```

Cada camada possui uma responsabilidade diferente.

### Testes Unitários

Objetivo:

- validar funções;
- validar regras de negócio;
- validar schemas;
- validar utilitários.

Características:

- rápidos;
- isolados;
- sem React;
- sem navegador.

Exemplo:

```text
createProductSchema
```

---

### Testes de Componentes

Objetivo:

Validar o comportamento de um componente React isoladamente.

Exemplos:

- renderização;
- interação do usuário;
- validações;
- chamadas de callbacks.

Dependências externas devem ser mockadas.

---

### Testes de Integração

Objetivo:

Validar a comunicação entre múltiplas camadas.

Exemplo:

```text
Página

↓

Hook

↓

React Query
```

ou

```text
Hook

↓

Service
```

---

### Testes E2E

Objetivo:

Validar o comportamento do sistema completo exatamente como um usuário faria.

Fluxo:

```text
Browser

↓

Host

↓

Remote

↓

React Router

↓

React Query

↓

API

↓

Resultado
```

Este tipo de teste é responsável por encontrar problemas que não aparecem em testes unitários, como:

- Remote indisponível;
- problemas de deploy;
- erros de roteamento;
- falhas de integração entre aplicações.

---

# TDD

Foi estudado o conceito de Test Driven Development.

Aprendizados:

- pensar primeiro no comportamento;
- definir regras antes da implementação;
- utilizar os testes como ferramenta de design da API.

O objetivo do TDD não é apenas escrever o teste primeiro.

Seu principal benefício é forçar a definição do comportamento esperado antes da implementação.

---

# Vitest

Responsabilidade:

Executar os testes.

Foi estudado:

- describe()
- it()
- expect()
- vi.fn()
- vi.mock()

Também foi configurado:

- jsdom
- setup.ts
- scripts de execução

Scripts:

```bash
pnpm test

pnpm test:watch

pnpm test:coverage
```

---

# React Testing Library

Foi estudada a filosofia da biblioteca.

O foco é testar a aplicação como um usuário, evitando testar detalhes internos da implementação.

Principais APIs utilizadas:

```ts
render()

screen

userEvent
```

---

## Queries

### getBy

Utilizado quando o elemento já deve existir.

Exemplo:

```ts
screen.getByRole(...)
```

---

### queryBy

Utilizado quando o elemento não deve existir.

Exemplo:

```ts
expect(
    screen.queryByText(...)
).not.toBeInTheDocument()
```

---

### findBy

Utilizado quando o elemento aparecerá após alguma operação assíncrona.

Exemplo:

```ts
await screen.findByText(...)
```

---

# userEvent

Foi estudado o uso do userEvent em vez do fireEvent.

Motivo:

O userEvent simula melhor o comportamento real do usuário, disparando toda a sequência de eventos do navegador.

Exemplos:

```ts
await user.click(...)

await user.type(...)
```

---

# Providers nos testes

Foi criado um helper:

```text
renderWithProviders()
```

Responsabilidade:

Centralizar todos os providers necessários para os componentes.

Inicialmente:

```text
BrowserRouter
```

Depois evoluiu para:

```text
BrowserRouter

↓

QueryClientProvider
```

Esta abordagem evita repetição e facilita a manutenção dos testes.

---

# Mocks

Foi estudado o uso de mocks para isolar responsabilidades.

Utilizamos:

```ts
vi.fn()

vi.mock()
```

Objetivo:

Substituir dependências externas por implementações controladas.

Exemplo:

```text
Página

↓

Hook (Mock)

↓

mutate()
```

Sem necessidade de utilizar:

- API;
- React Query;
- Services reais.

---

# Testes escritos

## Schema

Foram implementados testes para:

- aceitar produto válido;
- rejeitar título inválido.

Objetivo:

Validar regras de negócio do schema.

---

## Página

Foram implementados testes para:

- renderizar formulário;
- exibir mensagens de validação;
- chamar a mutation com o DTO correto.

---

# Princípios aprendidos

## Testar comportamento

Evitar testar implementação.

Pergunta principal:

> O usuário percebe este comportamento?

---

## Responsabilidade

Cada teste deve possuir uma única responsabilidade.

Exemplo:

A página deve validar apenas que chama corretamente a mutation.

O hook deve validar React Query.

O service deve validar comunicação com a API.

---

## Contrato entre camadas

Foi utilizado:

```ts
toHaveBeenCalledWith(...)
```

para validar o contrato entre Página e Hook.

Mais importante do que verificar se uma função foi chamada é garantir que ela recebeu os dados corretos.

---

## Testes são documentação

Os nomes dos testes devem explicar claramente o comportamento esperado.

Exemplo:

```text
deve aceitar um produto válido

deve rejeitar um título com menos de 3 caracteres
```

---

## Testar decisões da aplicação

Aprendizado importante:

Não devemos testar bibliotecas.

Exemplo:

Não faz sentido testar se o Zod sabe validar `string()`.

Faz sentido testar regras definidas pela aplicação, como:

```ts
.min(3)
```

---

## Testes independentes

Cada teste deve poder ser executado isoladamente.

Por este motivo:

- cada teste possui seu próprio QueryClient;
- mocks são reiniciados;
- não existe dependência entre execuções.

---

# Relação com a arquitetura

Foi observado que uma boa arquitetura facilita a escrita dos testes.

Como o projeto está organizado em camadas:

```text
Página

↓

Hook

↓

Service

↓

API
```

Foi possível testar cada responsabilidade isoladamente.

A separação realizada anteriormente durante a fase de arquitetura tornou os testes muito mais simples de escrever.

---

# Próxima fase

## Testes End-to-End

Será estudado:

- Playwright;
- testes ponta a ponta;
- automação do navegador;
- testes sobre o Host consumindo os Remotes;
- validação do fluxo completo da aplicação.

Fluxo esperado:

```text
Host

↓

Products Remote

↓

Formulário

↓

Mutation

↓

API

↓

Resultado
```

Neste momento completaremos toda a pirâmide de testes da aplicação.