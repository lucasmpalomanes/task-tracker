import { publicProcedure, router } from "../init";
import { z } from "zod";
import { tasks } from "../../db/dbMock";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  addTask: publicProcedure
    .input(
      z.object({
        titulo: z
          .string()
          .min(1, "O título da tarefa é obrigatório"),
        descricao: z.string().optional(),
      }),
    )
    .mutation((opts) => {
      const newTask = {
        id: tasks.length + 1,
        titulo: opts.input.titulo,
        descricao: opts.input.descricao || "",
        dataCriacao: new Date(),
      };
      tasks.push(newTask);
      console.log(tasks);
      return { response: `Tarefa adicionada com sucesso` };
    }),
  listTasks: publicProcedure.query(() => {
    return tasks;
  }),
  updateTask: publicProcedure
    .input(
      z.object({
        id: z.number(),
        titulo: z
          .string()
          .min(1, "O título da tarefa é obrigatório"),
        descricao: z.string().optional(),
      }),
    )
    .mutation((opts) => {
      const task = tasks.find((t) => t.id === opts.input.id);
      if (!task) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tarefa não encontrada" });
      }
      task.titulo = opts.input.titulo;
      task.descricao = opts.input.descricao || "";
      console.log(tasks);
      return { response: `Tarefa atualizada com sucesso` };
    }),
  deleteTask: publicProcedure.input(z.number()).mutation((opts) => {
    tasks.splice(
      tasks.findIndex((task) => task.id === opts.input),
      1,
    );
    console.log(tasks);
    return { response: "Tarefa removida com sucesso" };
  }),
});

export type AppRouter = typeof appRouter;
