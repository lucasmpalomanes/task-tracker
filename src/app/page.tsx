import { tasks } from "../db/dbMock";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { EditTaskDialog } from "../customComponents/editTaskDialog";
import { getTRPC } from "../trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const trpc = await getTRPC();
  const tasks = await trpc.listTasks();
  console.log("Tasks in Home:", tasks.map(t => ({ id: t.id, titulo: t.titulo })));

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="font-bold text-2xl mb-4">Lista de Tarefas</h1>
      <div className="w-96">
        {tasks.map((task) =>
          <Item key={task.id} variant="outline" className="mb-2">
            <ItemContent>
              <ItemTitle>{task.titulo}</ItemTitle>
              <ItemDescription>
                {task.descricao || "Sem descrição"}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <EditTaskDialog
                taskId={task.id}
                initialTitulo={task.titulo}
                initialDescricao={task.descricao}
              />
            </ItemActions>
          </Item>
        )}
      </div>
    </div>
  );
}
