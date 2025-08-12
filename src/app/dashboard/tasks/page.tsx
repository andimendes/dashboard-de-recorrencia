"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckCircle, Clock, Plus, Phone, Mail, MapPin, AlertTriangle } from "lucide-react";
import { TaskCalendar } from "@/components/tasks/task-calendar";
import { TaskList } from "@/components/tasks/task-list";
import { AddTaskModal } from "@/components/tasks/add-task-modal";

const tasks = [
  {
    id: "1",
    title: "Ligar para Restaurante Popular",
    description: "Cliente atrasado 3 dias no ciclo de compra",
    type: "call" as const,
    priority: "high" as const,
    status: "pending" as const,
    dueDate: "2024-01-15",
    dueTime: "09:00",
    client: "Restaurante Popular",
    vendedor: "João Silva",
    createdAt: "2024-01-14"
  },
  {
    id: "2",
    title: "Enviar proposta para Lanchonete Express",
    description: "Enviar proposta comercial com desconto especial",
    type: "email" as const,
    priority: "medium" as const,
    status: "pending" as const,
    dueDate: "2024-01-15",
    dueTime: "14:00",
    client: "Lanchonete Express",
    vendedor: "Maria Santos",
    createdAt: "2024-01-13"
  },
  {
    id: "3",
    title: "Visita técnica - Pizzaria Família",
    description: "Apresentar novos produtos e negociar contrato",
    type: "visit" as const,
    priority: "high" as const,
    status: "completed" as const,
    dueDate: "2024-01-14",
    dueTime: "15:30",
    client: "Pizzaria Família",
    vendedor: "Carlos Lima",
    createdAt: "2024-01-12"
  },
  {
    id: "4",
    title: "Follow-up Mercado Bom Preço",
    description: "Verificar status da proposta enviada",
    type: "call" as const,
    priority: "medium" as const,
    status: "pending" as const,
    dueDate: "2024-01-16",
    dueTime: "10:30",
    client: "Mercado Bom Preço",
    vendedor: "Ana Costa",
    createdAt: "2024-01-14"
  },
  {
    id: "5",
    title: "Reunião de fechamento - Supermercado Novo",
    description: "Reunião final para assinatura do contrato",
    type: "meeting" as const,
    priority: "urgent" as const,
    status: "pending" as const,
    dueDate: "2024-01-16",
    dueTime: "16:00",
    client: "Supermercado Novo",
    vendedor: "João Silva",
    createdAt: "2024-01-15"
  }
];

export default function TasksPage() {
  const [selectedView, setSelectedView] = useState("list");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const pendingTasks = tasks.filter(t => t.status === "pending").length;
  const overdueTasks = tasks.filter(t => 
    t.status === "pending" && new Date(t.dueDate) < new Date()
  ).length;
  const todayTasks = tasks.filter(t => 
    t.dueDate === new Date().toISOString().split('T')[0]
  ).length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tarefas e Agenda</h2>
          <p className="text-muted-foreground">
            Gerencie suas atividades e compromissos
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      {/* KPIs de Tarefas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando execução
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Vencidas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{todayTasks}</div>
            <p className="text-xs text-muted-foreground">
              Para hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Finalizadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="completed">Concluídas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Prioridades</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <TaskList tasks={filteredTasks} />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <TaskCalendar tasks={filteredTasks} />
        </TabsContent>
      </Tabs>

      <AddTaskModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}