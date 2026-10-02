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

## Observações

As credenciais administrativas são hard coded apenas para demonstração acadêmica. O login não utiliza banco de usuários. Respostas dos participantes são anônimas.
