import Image from "next/image";
import { tasks } from "../db/dbMock";
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

function showModal() {

}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="font-bold text-2xl mb-4">Lista de Tarefas</h1>
      <div className="w-200">
        {tasks.map((task) =>
          <Item key={task.id} variant="outline" className="mb-2">
            <ItemContent>
              <ItemTitle>{task.titulo}</ItemTitle>
              <ItemDescription>
                {task.descricao || "Sem descrição"}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm" onClick={showModal}>
                Action
              </Button>
            </ItemActions>
          </Item>
        )}
      </div>
    </div>
  );
}
