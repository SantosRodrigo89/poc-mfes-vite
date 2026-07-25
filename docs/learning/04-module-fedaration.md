# Module Federation — Primeira Integração Host ↔ Remote

## Objetivo

Validar que o **Host** consegue carregar um **Remote** em tempo de execução utilizando **Module Federation**, sem compartilhar código em tempo de build.

Nesta etapa, **não houve migração do domínio**. O foco foi exclusivamente validar a infraestrutura.

---

# Contexto

Até este momento da POC existiam duas aplicações independentes:

```text
Host

Products
```

Após a integração, passamos a ter:

```text
           Host
             │
             │ import('products/App')
             ▼
      remoteEntry.js
             │
             ▼
      Products Remote
```

O Host deixa de conhecer a implementação do Products e passa a descobrir seus módulos apenas em tempo de execução.

---

# Analogia

Durante o estudo utilizamos a seguinte analogia:

```text
Host = Shopping

Remote = Loja

remoteEntry.js = Vitrine da Loja
```

Fluxo da comunicação:

```text
Shopping

↓

Olha a vitrine (remoteEntry.js)

↓

Descobre quais módulos existem

↓

Entra na loja

↓

Renderiza o componente remoto
```

---

# Implementação

## Remote

O Products expõe sua aplicação através do Module Federation.

```ts
federation({
  name: 'products',

  filename: 'remoteEntry.js',

  exposes: {
    './App': './src/app/App.tsx',
  },

  shared: [
    'react',
    'react-dom',
    '@tanstack/react-query',
  ],
})
```

---

## Host

O Host consome o Remote utilizando a configuração:

```ts
federation({
  name: 'host',

  remotes: {
    products: {
      type: 'module',
      name: 'products',
      entry: 'http://localhost:4173/remoteEntry.js',
    },
  },

  shared: [
    'react',
    'react-dom',
    '@tanstack/react-query',
  ],
})
```

---

## Carregamento

O carregamento é feito através de Lazy Loading.

```tsx
const ProductsApp = React.lazy(() => import('products/App'))
```

Utilizando Suspense:

```tsx
<Suspense fallback={<p>Carregando Products...</p>}>
  <ProductsApp />
</Suspense>
```

---

# Por que utilizar React.lazy?

O objetivo do Module Federation é carregar módulos apenas quando forem necessários.

Se utilizássemos:

```tsx
import ProductsApp from 'products/App'
```

o carregamento seria síncrono.

Com:

```tsx
React.lazy(() => import('products/App'))
```

o Host:

1. solicita o remoteEntry;
2. descobre onde está o módulo;
3. baixa apenas o chunk necessário;
4. renderiza o componente.

Esse comportamento representa exatamente o conceito de Runtime Loading.

---

# Shared

As seguintes dependências foram compartilhadas:

```text
react

react-dom

@tanstack/react-query
```

O objetivo é evitar múltiplas instâncias dessas bibliotecas.

Sem Shared, cada Remote poderia carregar sua própria versão do React, causando inconsistências e aumento do bundle.

---

# Problema encontrado

Durante a integração ocorreu o erro:

```text
Cannot use import statement outside a module
```

O erro acontecia porque o runtime tentava carregar o Remote como um script tradicional, enquanto o `remoteEntry.js` gerado pelo Vite é um **ES Module**.

Além disso, ao acessar:

```text
http://localhost:3001/remoteEntry.js
```

era retornado o HTML da aplicação em vez do JavaScript esperado, indicando que o servidor estava fazendo fallback para o `index.html`.

---

# Solução

Foi necessário declarar explicitamente o tipo do Remote:

```ts
remotes: {
  products: {
    type: 'module',
    name: 'products',
    entry: 'http://localhost:4173/remoteEntry.js',
  },
}
```

Também utilizamos o `vite preview` para validar a integração enquanto investigávamos o comportamento do `vite dev`.

Após essa configuração, o Host passou a carregar corretamente o Remote.

---

# Fluxo completo

```text
Host

↓

React.lazy()

↓

Module Federation Runtime

↓

remoteEntry.js

↓

Descobre o módulo App

↓

Baixa os chunks necessários

↓

Inicializa Shared

↓

Renderiza Products
```

---

# O que foi validado

Ao final desta etapa foi comprovado que:

- Host consegue localizar o Remote.
- remoteEntry.js é carregado corretamente.
- O Runtime do Module Federation inicializa o Remote.
- O módulo `products/App` é carregado dinamicamente.
- React.lazy funciona com Module Federation.
- Suspense trata o carregamento assíncrono.
- As dependências compartilhadas são inicializadas corretamente.
- A infraestrutura de Micro Frontends está operacional.

---

# O que ainda NÃO fizemos

Esta etapa não contemplou:

- React Router
- Comunicação entre Host e Remote
- Compartilhamento de componentes
- Compartilhamento de estado
- Eventos entre aplicações
- Migração definitiva do domínio Products

Todo o foco foi validar apenas a infraestrutura.

---

# Decisão arquitetural

Optamos por separar a evolução da POC em duas fases:

1. Validar a infraestrutura do Module Federation.
2. Migrar gradualmente o domínio Products.

Essa estratégia reduz a complexidade durante a implementação e facilita a identificação de problemas, pois separa questões de infraestrutura de regras de negócio.

Essa abordagem é semelhante à utilizada em migrações incrementais de aplicações monolíticas para arquiteturas baseadas em Micro Frontends.

---

# Próximos passos

Após validar a integração, o roadmap continua com:

```text
✅ Foundation

✅ React Query

✅ Host

✅ Remote

✅ Integração Host ↔ Remote

⬜ React Router

⬜ Migração do domínio Products

⬜ Remoção do legado

⬜ Comunicação entre Micro Frontends

⬜ Micro Frontends avançado
```

---

# Principais aprendizados

- Module Federation realiza carregamento em tempo de execução.
- `remoteEntry.js` funciona como catálogo dos módulos expostos pelo Remote.
- `React.lazy` é a forma ideal de consumir módulos remotos.
- Shared Dependencies evitam múltiplas instâncias do React.
- Separar infraestrutura da migração do domínio simplifica o processo de evolução.
- Validar primeiro a infraestrutura reduz significativamente o tempo de depuração em arquiteturas distribuídas.