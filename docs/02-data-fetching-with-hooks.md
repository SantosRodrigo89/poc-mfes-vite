# Módulo 2 — Data Fetching com Hooks

## Objetivo

Implementar um fluxo completo de obtenção de dados utilizando React puro antes da introdução do TanStack Query.

O objetivo deste módulo não foi criar a solução definitiva, mas compreender os problemas que bibliotecas como React Query resolvem.

---

# Arquitetura construída

```
ProductsListPage
        │
        ▼
useProducts
        │
        ▼
productService
        │
        ▼
DummyJSON API
```

Cada camada possui uma responsabilidade específica.

---

# Camadas

## Product Service

Responsável exclusivamente por comunicação com APIs.

Responsabilidades:

- realizar requisições HTTP;
- validar respostas utilizando Zod;
- lançar erros caso a API retorne um contrato inválido.

Não possui dependência do React.

Exemplo:

```ts
const response = await fetch(...)

const json = await response.json()

return productsResponseSchema.parse(json)
```

---

## useProducts

Responsável por adaptar o Service para o React.

Responsabilidades:

- controlar estado;
- controlar loading;
- controlar erros;
- iniciar o carregamento dos dados.

Não conhece detalhes da interface.

Retorna apenas:

```ts
{
    data,
    isLoading,
    error
}
```

---

## ProductsListPage

Responsável apenas pela apresentação.

Decide como renderizar:

- Loading
- Erro
- Lista de produtos

Não conhece API.

Não conhece fetch.

Não conhece Zod.

---

# Fluxo completo

```
Página

↓

useProducts

↓

productService

↓

DummyJSON

↓

Zod valida

↓

Hook recebe dados

↓

Página renderiza
```

---

# Zod como fonte da verdade

Neste projeto o Schema é a fonte da verdade.

```
productSchema

↓

z.infer

↓

TypeScript
```

Ao invés de manter interfaces e schemas sincronizados manualmente, os tipos são inferidos automaticamente.

Exemplo:

```ts
export type Product = z.infer<typeof productSchema>
```

Benefícios:

- elimina duplicação;
- reduz inconsistências;
- mantém validação em runtime.

---

# Responsabilidades

## Product Service

✅ Buscar dados

✅ Validar contrato

❌ Não conhece React

---

## Hook

✅ Conhece React

✅ Controla estado

✅ Encapsula lógica

❌ Não conhece apresentação

---

## Página

✅ Renderiza interface

✅ Decide o que mostrar

❌ Não realiza requisições

---

# Conceitos aprendidos

## Hooks adaptam regras de negócio ao React

O Service é independente do framework.

O Hook é a ponte entre React e o Service.

```
React

↓

Hook

↓

Service
```

---

## useEffect

Buscas de dados são efeitos colaterais.

Por isso utilizamos:

```ts
useEffect(() => {

}, [])
```

Nunca utilizamos:

```ts
useEffect(async () => {})
```

Pois o callback do useEffect deve retornar apenas:

- void
- função de limpeza (cleanup)

---

## try / catch / finally

Estrutura utilizada:

```ts
try {

} catch {

} finally {

}
```

O `finally` garante que o loading será finalizado independentemente do resultado da requisição.

---

## Error

O estado de erro foi definido como:

```ts
Error | null
```

Ao invés de string.

Motivos:

- preserva stack;
- preserva message;
- facilita logs;
- segue o tipo padrão do JavaScript.

---

## API do Hook

Foi escolhido retornar um objeto.

```ts
return {
    data,
    isLoading,
    error
}
```

Ao invés de:

```ts
return [
    data,
    isLoading,
    error
]
```

Motivos:

- parâmetros nomeados;
- melhor legibilidade;
- evolução sem quebra de API.

---

# Problemas encontrados

Mesmo funcionando corretamente, a implementação apresenta limitações importantes.

## Não existe cache

Toda navegação dispara nova requisição.

---

## Não existe compartilhamento de dados

Dois componentes utilizando o mesmo Hook realizam duas chamadas HTTP.

---

## Muito código repetitivo

Todo Hook precisa implementar:

- useState
- useEffect
- loading
- error
- try/catch
- finally

---

## Não existe invalidação automática

Caso um produto seja alterado, precisamos atualizar os dados manualmente.

---

## Não existe refetch automático

Mudanças de foco da janela ou reconexão da internet não atualizam os dados.

---

# Por que este módulo existe?

Antes de utilizar o TanStack Query é importante compreender o problema.

Após construir este Hook manualmente, fica evidente que boa parte do código não representa regra de negócio, mas infraestrutura.

É justamente essa infraestrutura que será substituída pelo TanStack Query no próximo módulo.

---

# Próximo módulo

## TanStack Query

Objetivos:

- QueryClient
- QueryClientProvider
- useQuery
- queryKey
- cache
- staleTime
- invalidação automática
- deduplicação de requisições

Ao final da próxima etapa, grande parte do código do Hook será removida, mantendo a mesma API para os componentes consumidores.