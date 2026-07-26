# FASE 06 — React Hook Form + Zod

> Status: ✅ Concluído

---

# Objetivo da fase

Aprender a construir formulários modernos utilizando **React Hook Form** integrado ao **Zod**, reutilizando os contratos definidos pelo domínio e mantendo a arquitetura construída nas fases anteriores.

Ao final desta fase o projeto passou a possuir:

- Formulários tipados.
- Validação declarativa.
- Integração com React Query.
- Reutilização do DTO do domínio.
- Menor quantidade de código.
- Melhor performance.

---

# O problema

Antes do React Hook Form era muito comum encontrarmos formulários assim:

```tsx
const [title, setTitle] = useState('')
const [price, setPrice] = useState(0)
const [description, setDescription] = useState('')

const [errors, setErrors] = useState({})
const [loading, setLoading] = useState(false)
```

Cada campo exigia:

- um useState;
- um onChange;
- validação manual;
- tratamento de erros;
- reset manual;
- submit manual.

Quanto maior o formulário, maior a quantidade de código repetido.

---

# Outro problema

Toda tecla digitada dispara uma atualização do estado.

```text
Usuário digita

↓

setState()

↓

Nova renderização

↓

Componente inteiro renderiza novamente
```

Em formulários grandes isso pode gerar perda de performance.

---

# Como o React Hook Form resolve isso?

Ao invés de controlar o valor de cada campo através do React, ele utiliza principalmente **Uncontrolled Components**.

Ou seja:

O navegador continua responsável pelo valor do input.

O React Hook Form apenas registra o campo e consulta seus valores quando necessário.

Resultado:

- menos renderizações;
- menos código;
- melhor performance.

---

# Arquitetura

Nossa arquitetura ficou assim:

```text
Form

↓

React Hook Form

↓

Resolver

↓

Zod

↓

Mutation

↓

Service

↓

API
```

Observe que o formulário não conhece o Service.

Ele conversa apenas com a Mutation.

A Mutation conversa com o Service.

O Service conversa com a API.

Mantemos exatamente a arquitetura definida nas fases anteriores.

---

# Single Source of Truth

Um dos objetivos desta fase foi reutilizar o mesmo schema em toda a aplicação.

```text
createProductSchema

├── React Hook Form

├── ProductService

└── Testes
```

Dessa forma existe apenas uma única regra de negócio.

Se amanhã a validação mudar:

```ts
title: z.string().min(5)
```

Toda aplicação passa a utilizar automaticamente a nova regra.

---

# React Hook Form + Zod

O React Hook Form não conhece o Zod.

Ele delega essa responsabilidade através de um Resolver.

```text
React Hook Form

↓

Resolver

↓

Zod
```

Esse desacoplamento permite utilizar qualquer biblioteca de validação.

Exemplos:

- Yup
- Joi
- Valibot
- Superstruct

Sem alterar o React Hook Form.

---

# useForm()

Responsável por criar o formulário.

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<CreateProductDto>({
  resolver: zodResolver(createProductSchema),
})
```

Observe dois pontos importantes.

## Generic

```tsx
<CreateProductDto>
```

O formulário passa a conhecer exatamente o formato esperado.

Isso impede erros como:

```tsx
register('banana')
```

O TypeScript acusa erro imediatamente.

---

## Resolver

```tsx
resolver: zodResolver(createProductSchema)
```

Toda validação passa pelo mesmo schema utilizado pelo domínio.

Não existe duplicação de regras.

---

# register()

Conecta automaticamente um campo ao formulário.

```tsx
<input {...register('title')} />
```

Sem React Hook Form normalmente faríamos:

```tsx
<input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
/>
```

Agora basta:

```tsx
<input {...register('title')} />
```

O React Hook Form faz toda a ligação automaticamente.

---

# handleSubmit()

Uma das APIs mais importantes.

Ela não executa apenas o submit.

Ela coordena todo o fluxo.

```text
Clique

↓

Validação

↓

Resolver

↓

Zod

↓

onSubmit(data)
```

Se existir algum erro:

```text
Clique

↓

Validação

↓

Erro

↓

errors
```

O onSubmit nunca será chamado.

---

# errors

As mensagens produzidas pelo Zod ficam disponíveis automaticamente.

```tsx
{
  errors.title && (
    <p>{errors.title.message}</p>
  )
}
```

Nenhuma validação manual foi necessária.

---

# valueAsNumber

Todo input HTML retorna uma string.

Mesmo:

```html
<input type="number" />
```

retorna:

```ts
"5999"
```

Nosso DTO espera:

```ts
number
```

Por isso utilizamos:

```tsx
register('price', {
    valueAsNumber: true,
})
```

O React Hook Form converte automaticamente.

---

# Integração com React Query

Nosso submit ficou extremamente simples.

```tsx
const onSubmit = (data: CreateProductDto) => {
    mutate(data)
}
```

Observe que a página não conhece:

- fetch
- axios
- Service
- invalidateQueries

Ela conhece apenas a Mutation.

Mais uma vez aplicamos o princípio da separação de responsabilidades.

---

# Fluxo completo

```text
Usuário

↓

Preenche formulário

↓

React Hook Form

↓

Zod

↓

Mutation

↓

ProductService

↓

API

↓

invalidateQueries

↓

Lista atualizada
```

---

# Por que validar no Form e no Service?

Essa foi uma discussão importante durante os estudos.

## Form

Objetivo:

- Melhor UX.
- Feedback imediato.
- Evitar chamadas desnecessárias.

## Service

Objetivo:

- Garantir o contrato.
- Nunca confiar na UI.
- Impedir envio de dados inválidos.

Resumo:

> O formulário valida para ajudar o usuário.

> O Service valida para proteger a aplicação.

# defaultValues

Uma das maiores dúvidas quando começamos a utilizar React Hook Form é entender quando utilizar **defaultValues** e quando utilizar **reset()**.

A diferença é simples:

> **defaultValues inicializa o formulário.**

> **reset() atualiza um formulário que já existe.**

---

# Quando utilizar defaultValues?

Sempre que os dados já existirem **antes da criação do formulário**.

Exemplo:

```tsx
const form = useForm<CreateProductDto>({
  resolver: zodResolver(createProductSchema),

  defaultValues: {
    title: 'Notebook',
    price: 5000,
    description: 'Dell XPS',
  },
})
```

O formulário nasce preenchido.

---

# Casos reais

## Clonagem

Imagine uma tela de produtos.

```
Produtos

Notebook Dell

[Duplicar]
```

Ao clicar em **Duplicar**, podemos abrir um novo formulário já preenchido.

```tsx
useForm({
    defaultValues: product
})
```

O usuário altera apenas alguns campos.

---

## Wizard

Cadastro dividido em etapas.

```
Etapa 1

Nome

CPF

↓

Próximo

↓

Etapa 2

Endereço

Cidade
```

Quando o usuário volta para a etapa anterior, utilizamos:

```tsx
defaultValues
```

para restaurar os dados digitados.

---

## SSR (Next.js)

O servidor já buscou o produto antes da página ser renderizada.

```tsx
export async function getServerSideProps() {

    const product = ...

}
```

Como os dados já existem antes do React criar o formulário:

```tsx
useForm({

    defaultValues: product

})
```

Não existe necessidade de reset().

---

# O erro mais comum

Muitos desenvolvedores fazem isto:

```tsx
const { data: product } = useProduct(id)

const form = useForm({

    defaultValues: product

})
```

Isso parece correto.

Mas não funciona.

---

# Por quê?

Vamos analisar o ciclo de vida.

Primeira renderização.

```ts
product = undefined
```

O React Hook Form cria o formulário.

```tsx
useForm({

    defaultValues: undefined

})
```

Alguns milissegundos depois.

```ts
product = {

    title: 'Notebook'

}
```

O componente renderiza novamente.

Mas o formulário já foi criado.

O React Hook Form NÃO observa mudanças em defaultValues.

Ele utiliza esse valor apenas durante a criação do formulário.

Por isso os campos continuam vazios.

---

# reset()

É justamente para isso que reset existe.

Imagine:

```tsx
const { data: product } = useProduct(id)
```

Quando a API responder.

```tsx
useEffect(() => {

    if(product){

        reset(product)

    }

}, [product])
```

Agora os campos são atualizados.

---

# Fluxo

```text
Página

↓

Formulário criado

↓

React Query

↓

Produto recebido

↓

reset(product)

↓

Campos preenchidos
```

Esse é o fluxo utilizado na maioria das telas de edição.

---

# Nosso experimento

Durante os estudos simulamos uma chamada da API.

```tsx
const fakeProduct = {

    title: 'iPhone 15',

    price: 5999,

    description: 'Smartphone Apple',

}
```

Depois:

```tsx
useEffect(() => {

    setTimeout(() => {

        reset(fakeProduct)

    }, 2000)

}, [])
```

Resultado:

```
Tela abre

↓

Campos vazios

↓

2 segundos

↓

Campos preenchidos
```

Foi exatamente esse experimento que demonstrou quando reset() deve ser utilizado.

---

# Regra prática

Pergunta:

Os dados já existem antes do formulário?

Sim.

↓

defaultValues

---

Os dados chegarão depois?

Sim.

↓

reset()

---

# watch()

watch permite observar alterações em um ou mais campos.

Exemplo:

```tsx
const price = watch('price')
```

Agora:

```tsx
<p>{price}</p>
```

Atualiza automaticamente conforme o usuário digita.

---

# Casos reais

## Preview

```
Título

Notebook

↓

Preview

Notebook
```

---

## Campos condicionais

```
Categoria

Notebook

↓

Mostrar Garantia
```

---

## Confirmação de senha

```
Senha

Confirmar senha
```

watch permite comparar os dois campos em tempo real.

---

# Controller

Até agora utilizamos apenas:

```tsx
register()
```

Porque os componentes HTML possuem o contrato esperado pelo React Hook Form.

Exemplos:

```tsx
<input />

<textarea />

<select />
```

Todos funcionam apenas com register.

---

# Quando utilizar Controller?

Quando o componente NÃO implementa esse contrato.

Exemplos.

Material UI.

```tsx
<TextField />
```

React Select.

```tsx
<Select />
```

DatePicker.

```tsx
<DatePicker />
```

Nesses casos utilizamos:

```tsx
<Controller

    control={control}

    name="category"

    render={({ field }) => (

        <ReactSelect

            {...field}

        />

    )}

 />
```

Controller funciona como uma ponte entre o React Hook Form e componentes controlados.

---

# register x Controller

| register | Controller |
|-----------|------------|
| input | Material UI |
| textarea | React Select |
| select | DatePicker |
| HTML padrão | Componentes externos |

Sempre prefira register quando possível.

---

# Erros comuns

## Duplicar Schemas

Errado.

```text
FormSchema

↓

ServiceSchema
```

Correto.

```text
createProductSchema

├── Form

├── Service

└── Testes
```

Existe apenas uma fonte da verdade.

---

## Validar apenas no formulário

Nunca.

O formulário melhora a experiência do usuário.

O Service protege a aplicação.

As duas validações possuem responsabilidades diferentes.

---

## Chamar o Service diretamente

Errado.

```tsx
onSubmit(){

    productService.create()

}
```

Correto.

```tsx
onSubmit(){

    mutate()

}
```

A página conhece apenas a Mutation.

---

## Utilizar useState para cada campo

Evite.

```tsx
const [title]...

const [price]...

const [description]...
```

O React Hook Form foi criado justamente para evitar esse padrão.

---

# Perguntas de entrevista

## O que o React Hook Form resolve?

Reduz código repetitivo, melhora a performance utilizando Uncontrolled Components e centraliza todo o gerenciamento do formulário.

---

## O que faz register?

Conecta automaticamente um campo HTML ao formulário.

---

## O que faz handleSubmit?

Executa o fluxo completo:

```
Submit

↓

Validação

↓

Resolver

↓

onSubmit
```

---

## O que é um Resolver?

Uma camada de adaptação entre o React Hook Form e a biblioteca de validação.

---

## Por que utilizar Zod?

Porque o mesmo schema pode ser reutilizado pelo formulário, Service e testes.

---

## Quando utilizar defaultValues?

Quando os dados já existem antes da criação do formulário.

---

## Quando utilizar reset?

Quando os dados chegam depois da criação do formulário.

---

## Quando utilizar Controller?

Quando o componente não pode ser registrado utilizando register().

---

## Por que utilizar valueAsNumber?

Porque todo input HTML retorna string.

---

# Checklist da fase

## React Hook Form

- [x] useForm
- [x] register
- [x] handleSubmit
- [x] errors
- [x] formState
- [x] valueAsNumber

---

## Zod

- [x] Resolver
- [x] Reutilização do Schema
- [x] DTO tipado

---

## APIs

- [x] defaultValues
- [x] reset
- [x] watch
- [x] Controller

---

## Integrações

- [x] React Query
- [x] Mutation
- [x] Service Layer

---

# Conclusão

Ao final desta fase, o projeto passou a utilizar um fluxo moderno para criação de formulários.

```text
Usuário

↓

React Hook Form

↓

Resolver

↓

Zod

↓

Mutation

↓

Service

↓

API
```

As principais decisões arquiteturais tomadas foram:

- reutilização do mesmo schema do domínio;
- separação entre UI e Service;
- utilização da Mutation como ponto de entrada para comunicação com a API;
- validação em duas camadas (Form + Service);
- utilização de reset() para dados assíncronos;
- utilização de defaultValues apenas para inicialização do formulário.

Com isso, a aplicação passou a possuir formulários tipados, performáticos, desacoplados e alinhados às boas práticas do ecossistema React moderno.