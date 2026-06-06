"use client"

// Client Component: precisa de estado local (formulário) e eventos de clique.
// Após mutação, router.refresh() revalida o Server Component pai sem recarregar a página.

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
import { Plus } from "lucide-react"

export function AddTaskDialog() {
    const router = useRouter()
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [open, setOpen] = useState(false);

    // Limpa o formulário ao abrir, para não reaproveitar dados de uma submissão anterior.
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            setTitulo("");
            setDescricao("");
        }
    };


    const adicionarTarefa = async (e: React.MouseEvent) => {
        e.preventDefault()

        try {
            await trpc.addTask.mutate({
                titulo: titulo,
                descricao: descricao
            })

            router.refresh()
            setOpen(false)
        }
        catch (e) {
            // Erros de validação Zod chegam serializados na mensagem do TRPCClientError.
            // Não vi necessidade de revalidar o formulário no frontend visto que o Zod já o valida do lado do servidor
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
                    <Button variant="outline" className="mb-2">
                        <Plus/>
                        Adicionar tarefa
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Adicionar tarefa</DialogTitle>
                        <DialogDescription>
                            Faça alterações na tarefa abaixo:
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="titulo-1">Título</Label>
                            <Input id="titulo-1" name="titulo" placeholder="Título da tarefa" value={titulo} onChange={(e) => {setTitulo(e.target.value)}} />
                        </Field>
                        {titulo.trim().length === 0 ? <p className="text-sm text-destructive">O título da tarefa é obrigatório</p> : null}
                        <Field>
                            <Label htmlFor="descricao-1">Descrição</Label>
                            <Textarea id="descricao-1" name="descricao" placeholder="Descrição aqui..." value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={titulo.trim().length === 0} onClick={adicionarTarefa}>Salvar alterações</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
