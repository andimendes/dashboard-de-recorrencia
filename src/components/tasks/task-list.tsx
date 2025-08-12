"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { type Task } from "@/lib/supabase";

interface TaskListProps {
  tasks?: Task[];
}

export function TaskList({ tasks: propTasks }: TaskListProps) {
  const { tasks: hookTasks, loading, completeTask, deleteTask } = useTasks();
  const tasks = propTasks || hookTasks;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "visit": return <MapPin className="h-4 w-4" />;
      case "meeting": return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTaskTypeLabel = (type: string) => {
    switch (type) {
      case "call": return "Ligação";
      case "email": return "E-mail";
      case "visit": return "Visita";
      case "meeting": return "Reunião";
      default: return "Tarefa";
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent": return "Urgente";
      case "high": return "Alta";
      case "medium": return "Média";
      case "low": return "Baixa";
      default: return priority;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "cancelled": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return status === "pending" && new Date(dueDate) < new Date();
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(taskId);
    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
      }
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Carregando tarefas...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">N enhuma tarefa encontrada</p>
          </CardContent>
        </Card>
      ) : (
        tasks.map((task) => (
          <Card key={task.id} className={`${isOverdue(task.due_date, task.status) ? 'border-red-200 bg-red-50' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getTaskIcon(task.type)}
                  <div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{getTaskTypeLabel(task.type)}</span>
                      {task.client_name && (
                        <>
                          <span>•</span>
                          <span>{task.client_name}</span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  <Badge variant={getPriorityBadgeVariant(task.priority) as any}>
                    {getPriorityLabel(task.priority)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {task.description && (
                <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(task.due_date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {task.due_time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{task.due_time}</span>
                    </div>
                  )}
                  <span>Vendedor: {task.vendedor}</span>
                  {isOverdue(task.due_date, task.status) && (
                    <Badge variant="destructive" className="text-xs">
                      Atrasada
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {task.status === "pending" && (
                    <Button 
                      size="sm" 
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      Concluir
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}