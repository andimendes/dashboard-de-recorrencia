"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddTaskModal({ open, onClose }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    priority: "",
    client: "",
    vendedor: "",
    dueDate: undefined as Date | undefined,
    dueTime: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova tarefa:", formData);
    // Aqui seria implementada a lógica de criação da tarefa
    onClose();
    setFormData({
      title: "",
      description: "",
      type: "",
      priority: "",
      client: "",
      vendedor: "",
      dueDate: undefined,
      dueTime: ""
    });
  };

  const taskTypes = [
    { value: "call", label: "Ligação" },
    { value: "email", label: "E-mail" },
    { value: "visit", label: "Visita" },
    { value: "meeting", label: "Reunião" }
  ];

  const priorities = [
    { value: "urgent", label: "Urgente" },
    { value: "high", label: "Alta" },
    { value: "medium", label: "Média" },
    { value: "low", label: "Baixa" }
  ];

  const vendedores = [
    { value: "joao", label: "João Silva" },
    { value: "maria", label: "Maria Santos" },
    { value: "carlos", label: "Carlos Lima" },
    { value: "ana", label: "Ana Costa" }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>
            Crie uma nova tarefa ou compromisso
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Ligar para cliente..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva os detalhes da tarefa..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="client">Cliente *</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Nome do cliente"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade *</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar prioridade" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? (
                      format(formData.dueDate, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecionar data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => setFormData({ ...formData, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horário *</Label>
              <div className="relative">
                <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={formData.dueTime}
                  onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                  className="pl-8"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendedor">Vendedor *</Label>
              <Select value={formData.vendedor} onValueChange={(value) => setFormData({ ...formData, vendedor: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {vendedores.map((vendedor) => (
                    <SelectItem key={vendedor.value} value={vendedor.value}>
                      {vendedor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}