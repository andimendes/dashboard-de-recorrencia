"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Mail, MapPin, Users, Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  type: "call" | "email" | "visit" | "meeting";
  priority: "urgent" | "high" | "medium" | "low";
  status: "pending" | "completed" | "cancelled";
  dueDate: string;
  dueTime: string;
  client: string;
  vendedor: string;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "visit": return <MapPin className="h-4 w-4" />;
      case "meeting": return <Users className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
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
      default: return "Normal";
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !completedTasks.includes(dueDate);
  };

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    if (completed) {
      setCompletedTasks([...completedTasks, taskId]);
    } else {
      setCompletedTasks(completedTasks.filter(id => id !== taskId));
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Prioridade: urgente > alta > média > baixa
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // Se mesma prioridade, ordenar por data
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Tarefas</CardTitle>
        <CardDescription>
          {tasks.length} tarefas encontradas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Tarefa</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id) || task.status === "completed";
              const overdue = isOverdue(task.dueDate);
              
              return (
                <TableRow key={task.id} className={isCompleted ? "opacity-60" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={(checked) => handleTaskComplete(task.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getTaskIcon(task.type)}
                        <span className={`font-medium ${isCompleted ? "line-through" : ""}`}>
                          {task.title}
                        </span>
                        {overdue && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getTypeLabel(task.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.client}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>
                      {getPriorityLabel(task.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {task.dueTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{task.vendedor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      {isCompleted && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}