# Task Tracker

Aplicação web para gerenciar uma lista de tarefas, com título e descrição.

## Como funciona

O sistema é construído com **Next.js** (App Router) e **tRPC** para a camada de API.

- **Página principal** (`src/app/page.tsx`): Server Component que busca e exibe todas as tarefas.
- **API tRPC** (`src/trpc/routers/_app.ts`): expõe quatro operações — listar, adicionar, editar e remover tarefas. A validação dos dados é feita com Zod.
- **Persistência**: as tarefas ficam em memória (`src/db/dbMock.ts`), compartilhadas via `globalThis` durante a execução do servidor. Os dados são reiniciados ao reiniciar o processo.
- **Componentes de interface** (`src/customComponents/`): diálogos e botões (client components) que chamam a API tRPC e atualizam a página com `router.refresh()`.
- **UI**: componentes [shadcn/ui](https://ui.shadcn.com) sobre Radix UI e Tailwind CSS.

Fluxo resumido: a listagem é renderizada no servidor; ações do usuário (criar, editar, excluir) são enviadas ao endpoint `/api/trpc` e, após sucesso, a página é recarregada para refletir o estado atual.

## Pré-requisitos

- Node.js 20+
- npm, yarn, pnpm ou bun

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Outros comandos

| Comando        | Descrição                          |
|----------------|------------------------------------|
| `npm run build`| Gera a build de produção           |
| `npm run start`| Sobe o servidor em modo produção   |
| `npm run lint` | Executa o ESLint                   |
