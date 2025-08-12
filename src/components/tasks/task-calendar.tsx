"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Phone, Mail, MapPin, Users } from "lucide-react";

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

interface TaskCalendarProps {
  tasks: Task[];
}

export function TaskCalendar({ tasks }: TaskCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "visit": return <MapPin className="h-4 w-4" />;
      case "meeting": return <Users className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const tasksForSelectedDate = tasks.filter(task => task.dueDate === selectedDate);

  // Gerar dias do mês atual
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  
  // Dias vazios no início
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getTasksForDay = (day: number) => {
    const dateStr = formatDate(day);
    return tasks.filter(task => task.dueDate === dateStr);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Calendário */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Calendário de Tarefas</CardTitle>
          <CardDescription>
            {new Date(year, month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2 h-20"></div>;
              }
              
              const dateStr = formatDate(day);
              const dayTasks = getTasksForDay(day);
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === new Date().toISOString().split('T')[0];
              
              return (
                <Button
                  key={day}
                  variant={isSelected ? "default" : "ghost"}
                  className={`h-20 p-1 flex flex-col items-start justify-start relative ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedDate(dateStr)}
                >
                  <span className="text-sm font-medium">{day}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dayTasks.slice(0, 2).map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
                      />
                    ))}
                    {dayTasks.length > 2 && (
                      <span className="text-xs text-muted-foreground">+{dayTasks.length - 2}</span>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tarefas do dia selecionado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tarefas do Dia
          </CardTitle>
          <CardDescription>
            {new Date(selectedDate).toLocaleDateString('pt-BR')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasksForSelectedDate.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma tarefa para este dia
              </p>
            ) : (
              tasksForSelectedDate.map((task) => (
                <div key={task.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    {getTaskIcon(task.type)}
                    <span className="font-medium text-sm">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {task.dueTime}
                  </div>
                  <p className="text-xs text-muted-foreground">{task.client}</p>
                  <Badge variant="outline" className="text-xs">
                    {task.priority}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}