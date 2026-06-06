import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { EditTaskDialog } from "../customComponents/EditTaskDialog";
import { getTRPC } from "../trpc/server";
import { RemoveTaskButton } from "../customComponents/RemoveTaskButton";
import { AddTaskDialog } from "../customComponents/AddTaskDialog"

// Desabilita cache estático: as tarefas vivem em memória e mudam a cada mutação.
export const dynamic = "force-dynamic";

// Server Component — busca os dados no servidor e renderiza HTML pronto.
// Ações interativas (adicionar/editar/remover) ficam em Client Components filhos.
export default async function Home() {
  // Caller tRPC no servidor: chama o router diretamente, sem HTTP interno.
  const trpc = await getTRPC();
  const tasks = await trpc.listTasks();
  console.log(
    "Tasks in Home:",
    tasks.map((t) => ({ id: t.id, titulo: t.titulo })),
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="font-bold text-2xl mb-4 mt-4">Lista de Tarefas</h1>
      <div className="w-lg">
        {tasks.map((task) => (
          <Item key={task.id} variant="outline" className="mb-2">
            <ItemContent>
              <ItemTitle>{task.titulo}</ItemTitle>
              <ItemDescription className="line-clamp-none whitespace-normal wrap-break-word">
                {task.descricao || "Sem descrição"}
              </ItemDescription>
              <ItemFooter>
                Criada em {task.dataCriacao.toLocaleDateString()}
              </ItemFooter>
            </ItemContent>
            <ItemActions>
              <RemoveTaskButton taskId={task.id}/>
              <EditTaskDialog
                taskId={task.id}
                initialTitulo={task.titulo}
                initialDescricao={task.descricao}
              />
            </ItemActions>
          </Item>
        ))}
        <AddTaskDialog/>
      </div>
    </div>
  );
}
