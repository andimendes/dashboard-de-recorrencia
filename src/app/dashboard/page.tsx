"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, DollarSign, Target, TrendingUp, Calendar, Phone, Mail, MapPin } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useClients } from "@/hooks/use-clients";
import { useSales } from "@/hooks/use-sales";
import { AddTaskModal } from "@/components/tasks/add-task-modal";
import { AddClientModal } from "@/components/clients/add-client-modal";
import { AddSaleModal } from "@/components/sales/add-sale-modal";
import { TaskCalendar } from "@/components/tasks/task-calendar";

export default function Dashboard() {
  const { tasks, loading: tasksLoading, completeTask } = useTasks();
  const { clients, loading: clientsLoading } = useClients();
  const { sales, loading: salesLoading } = useSales();
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);

  // Calcular métricas
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const activeClients = clients.filter(client => client.status === 'active').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  // Tarefas de hoje
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.due_date === today);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "visit": return <MapPin className="h-4 w-4" />;
      case "meeting": return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do seu sistema de vendas
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowTaskModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
          <Button onClick={() => setShowClientModal(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
          <Button onClick={() => setShowSaleModal(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Nova Venda
          </Button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {sales.length} vendas registradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">
              {clients.length} clientes totais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} concluídas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.length > 0 ? Math.round((sales.length / clients.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Vendas por cliente
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tarefas de Hoje */}
        <Card>
          <CardHeader>
            <CardTitle>Tarefas de Hoje</CardTitle>
            <CardDescription>
              {todayTasks.length} tarefas agendadas para hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayTasks.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Nenhuma tarefa agendada para hoje
                </p>
              ) : (
                todayTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTaskIcon(task.type)}
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {task.client_name && `${task.client_name} • `}
                          {task.due_time || 'Sem horário definido'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === 'urgent' ? 'Urgente' : 
                         task.priority === 'high' ? 'Alta' :
                         task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                      {task.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => completeTask(task.id)}
                        >
                          Concluir
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vendas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>
              Últimas {Math.min(sales.length, 5)} vendas registradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sales.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Nenhuma venda registrada
                </p>
              ) : (
                sales.slice(0, 5).map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{sale.client_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.vendedor} • {new Date(sale.sale_date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        R$ {sale.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'}>
                        {sale.status === 'completed' ? 'Concluída' : 
                         sale.status === 'pending' ? 'Pendente' : 'Cancelada'}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendário de Tarefas */}
      <TaskCalendar tasks={tasks} />

      {/* Modais */}
      <AddTaskModal open={showTaskModal} onClose={() => setShowTaskModal(false)} />
      <AddClientModal open={showClientModal} onClose={() => setShowClientModal(false)} />
      <AddSaleModal open={showSaleModal} onClose={() => setShowSaleModal(false)} />
    </div>
  );
}