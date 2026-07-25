# Módulo 3 — React Query

## Objetivo

Substituir a busca manual de dados (`useEffect` + `useState`) por uma solução especializada em gerenciamento de estado de servidor, utilizando TanStack Query.

---

# Problema

Antes do React Query, uma consulta normalmente era implementada assim:

```tsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function load() {
    try {
      const response = await productService.getProducts();
      setData(response.products);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  load();
}, []);
```

Esse padrão possui alguns problemas:

- Muito código repetitivo.
- Controle manual de loading.
- Controle manual de erros.
- Sem cache.
- Sem atualização automática.
- Requisições duplicadas.

---

# O que o React Query resolve

- Cache automático.
- Compartilhamento de dados entre componentes.
- Atualização automática.
- Gerenciamento de loading.
- Gerenciamento de erros.
- Refetch automático.
- Deduplicação de requisições.

---

# Arquitetura adotada

```
Page

↓

Custom Hook

↓

Product Service

↓

API
```

Cada camada possui apenas uma responsabilidade.

---

# QueryClient

O QueryClient é o responsável por gerenciar todo o cache da aplicação.

Foi criado no `main.tsx` e disponibilizado através do `QueryClientProvider`.

```
QueryClient

↓

QueryClientProvider

↓

Toda a aplicação
```

---

# useQuery

Utilizado para leitura de dados.

```ts
useQuery({
  queryKey: ['products'],
  queryFn: productService.getProducts,
})
```

---

# queryKey

Representa a identidade única da consulta.

Exemplos:

```ts
['products']

['products', id]

['products', category]

['products', page]
```

---

# queryFn

Recebe apenas uma referência da função.

```ts
queryFn: productService.getProducts
```

Não deve ser executada imediatamente.

```ts
queryFn: productService.getProducts()
```

---

# Cache

O React Query armazena automaticamente os resultados das consultas.

Quando outra parte da aplicação solicita a mesma query, o cache pode ser reutilizado.

---

# Fresh

Enquanto a consulta estiver Fresh, nenhuma nova requisição será realizada.

---

# Stale

Após o tempo definido em `staleTime`, a consulta continua no cache, porém passa a ser considerada potencialmente desatualizada.

O React Query pode atualizar esses dados em background.

---

# staleTime

Define quanto tempo uma consulta permanece Fresh.

Não representa o tempo de permanência no cache.

---

# Request Deduplication

Quando dois componentes utilizam a mesma query simultaneamente, apenas uma requisição HTTP é realizada.

Os demais componentes aguardam o resultado da primeira.

---

# select

Permite adaptar os dados antes de chegarem ao componente.

```ts
select: (response) => response.products
```

Isso reduz o acoplamento entre a UI e o contrato da API.

---

# useMutation

Responsável por operações que modificam o estado do servidor.

Exemplos:

- POST
- PUT
- PATCH
- DELETE

---

# invalidateQueries

Após uma mutation bem-sucedida, o React Query não sabe automaticamente quais consultas ficaram desatualizadas.

Por isso utilizamos:

```ts
queryClient.invalidateQueries({
  queryKey: ['products'],
})
```

Assim a lista é sincronizada automaticamente.

---

# Conceitos aprendidos

- Server State
- Query Client
- Query Provider
- Query
- Mutation
- Cache
- Fresh
- Stale
- Request Deduplication
- Query Key
- Query Function
- Select
- Invalidate Queries
- Separação de responsabilidades

---

# Decisões arquiteturais

- O ProductService continua responsável apenas pela comunicação com a API.
- Os Hooks encapsulam a interação com o React Query.
- A UI não conhece detalhes do backend.
- O Zod permanece como fonte da verdade para validação.
- As Mutations utilizam `invalidateQueries` para manter o cache sincronizado.

---

# Próximo módulo

Micro Frontends.