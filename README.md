# form-dicere

Aplicação Next.js para coletar respostas anônimas do questionário sobre o projeto Dicere, com área administrativa protegida e dashboard de resultados.

## Stack

- Next.js
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- Recharts
- Zod
- React Hook Form

## Setup

1. Instale as dependências:

```bash
npm install
```

2. Configure o banco local:

```bash
cp .env.example .env
```

3. Aplique as migrations:

```bash
npx prisma migrate dev
```

4. Rode o projeto:

```bash
npm run dev
```

## Rotas

- `/` formulário público
- `/admin` login administrativo
- `/admin/dashboard` dashboard protegido

## Deploy na Vercel

Conecte este repositório ao projeto da Vercel e configure `DATABASE_URL` com a
conexão de um PostgreSQL hospedado, acessível pela Vercel. A conexão de exemplo
com `localhost` funciona somente no ambiente local.

O `vercel.json` define o build como `npm run vercel-build`, que aplica as
migrations versionadas com `prisma migrate deploy`, gera o Prisma Client e
compila a aplicação. O hook `postinstall` também gera o cliente após instalar
as dependências, evitando um cliente desatualizado no cache da Vercel.

O Prisma roda dentro das funções da aplicação; não precisa de um deploy
separado. O banco PostgreSQL precisa estar hospedado e ter suas tabelas criadas
pelas migrations. Se uma migration falhar, o deploy é interrompido antes de
publicar a nova versão. Não utilize `prisma migrate reset` em produção.

Configure um banco separado para o ambiente Preview antes de habilitar
deploys de outras branches, pois esse fluxo também aplica migrations nele.

Erros ao salvar respostas são registrados nos logs da função
`/api/responses` na Vercel, mantendo a mensagem pública sem detalhes internos.

## Observações

As credenciais administrativas são hard coded apenas para demonstração acadêmica. O login não utiliza banco de usuários. Respostas dos participantes são anônimas.
