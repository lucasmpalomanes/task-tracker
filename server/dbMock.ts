export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
}

export const tasks: Task[] = [
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
