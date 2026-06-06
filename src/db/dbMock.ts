// Mock de banco em memória 

export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
}

// globalThis garante uma única instância do array entre hot reloads (dev)
// e entre imports do módulo no mesmo processo.
const globalForDb = globalThis as unknown as {
  tasks: Task[] | undefined;
};

if (!globalForDb.tasks) {
  globalForDb.tasks = [
    {
      id: 1,
      titulo: "Tarefa 1",
      descricao: "Descrição 1",
      dataCriacao: new Date(),
    },
    {
      id: 2,
      titulo: "Tarefa 2",
      descricao: "Descrição 2",
      dataCriacao: new Date(),
    },
    {
      id: 3,
      titulo: "Tarefa 3",
      descricao: "Descrição 3",
      dataCriacao: new Date(),
    },
  ];
}
export const tasks = globalForDb.tasks;
