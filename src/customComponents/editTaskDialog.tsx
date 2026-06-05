"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "../trpc/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TRPCClientError } from "@trpc/client"
import { toast } from "sonner"

export function EditTaskDialog({
    taskId,
    initialTitulo,
    initialDescricao
}: {
    taskId: number,
    initialTitulo: string,
    initialDescricao: string
}) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState(initialTitulo);
    const [descricao, setDescricao] = useState(initialDescricao);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            setTitulo(initialTitulo);
            setDescricao(initialDescricao);
        }
    };

    const atualizarTarefa = async (e: React.MouseEvent) => {
        e.preventDefault()

        try {
            await trpc.updateTask.mutate({
                id: taskId,
                titulo: titulo,
                descricao: descricao
            })

            router.refresh()
            setOpen(false) // Close the dialog
        }
        catch (e) {
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
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Editar tarefa</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Editar tarefa</DialogTitle>
                        <DialogDescription>
                            Faça alterações na tarefa abaixo:
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field className="mb-3">
                            <Label htmlFor="titulo-1">Título</Label>
                            <Input id="titulo-1" name="titulo" placeholder="Título da tarefa" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="descricao-1">Descrição</Label>
                            <Textarea id="descricao-1" name="descricao" placeholder="Descrição aqui..." value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" onClick={atualizarTarefa}>Salvar alterações</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
