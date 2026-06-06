"use client"

// Ação destrutiva isolada em componente próprio para manter page.tsx como Server Component.

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trpc } from "../trpc/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TRPCClientError } from "@trpc/client"
import { toast } from "sonner"

export function RemoveTaskButton({taskId}: {taskId: number}) {
  const router = useRouter()

  async function removeTask(){
    try{
      await trpc.deleteTask.mutate(taskId)
      router.refresh()
      toast("Tarefa removida com sucesso", { position: "top-center" })
    } catch (e){
      if (e instanceof TRPCClientError) {
        try {
            const errors = JSON.parse(e.message) as { message: string }[]
            toast(errors[0].message, { position: "top-center" })
        } catch {
            toast(e.message, { position: "top-center" })
        }
    } else console.log(e)
    }
  }

  return (
    <Button variant="destructive" size="icon" aria-label="Remove" onClick={removeTask}>
      <Trash2 />
    </Button>
  )
}