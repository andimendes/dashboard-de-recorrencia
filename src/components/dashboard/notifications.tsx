"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Phone, Mail, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "urgent" | "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: string;
  actionType?: "call" | "email" | "visit";
  clientName?: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "urgent",
    title: "Cliente Atrasado",
    message: "Restaurante Popular não compra há 15 dias (ciclo semanal)",
    timestamp: "2024-01-15T10:30:00",
    actionType: "call",
    clientName: "Restaurante Popular",
    read: false
  },
  {
    id: "2",
    type: "warning",
    title: "Meta em Risco",
    message: "João Silva está 15% abaixo da meta mensal",
    timestamp: "2024-01-15T09:15:00",
    read: false
  },
  {
    id: "3",
    type: "info",
    title: "Novo Prospect",
    message: "Pizzaria Italiana adicionada ao funil de vendas",
    timestamp: "2024-01-15T08:45:00",
    read: true
  },
  {
    id: "4",
    type: "success",
    title: "Venda Fechada",
    message: "Supermercado Novo - R$ 40.000 fechados",
    timestamp: "2024-01-14T16:20:00",
    read: true
  },
  {
    id: "5",
    type: "urgent",
    title: "Tarefa Vencida",
    message: "Ligar para Lanchonete Central - venceu há 2 dias",
    timestamp: "2024-01-14T14:00:00",
    actionType: "call",
    clientName: "Lanchonete Central",
    read: false
  }
];

export function Notifications() {
  const [notificationList, setNotificationList] = useState(notifications);
  const { toast } = useToast();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "urgent": return "destructive";
      case "warning": return "secondary";
      case "success": return "default";
      default: return "outline";
    }
  };

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id));
  };

  const handleAction = (notification: Notification) => {
    if (notification.actionType === "call") {
      toast({
        title: "Ligação Iniciada",
        description: `Ligando para ${notification.clientName}...`,
      });
    } else if (notification.actionType === "email") {
      toast({
        title: "E-mail Aberto",
        description: `Abrindo e-mail para ${notification.clientName}...`,
      });
    }
    markAsRead(notification.id);
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notificações
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Alertas e atualizações importantes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notificationList.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Nenhuma notificação
            </p>
          ) : (
            notificationList.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border rounded-lg ${
                  !notification.read ? 'bg-muted/50 border-primary/20' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium truncate">
                          {notification.title}
                        </p>
                        <Badge variant={getNotificationBadge(notification.type) as any} className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {notification.actionType && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction(notification)}
                        className="h-6 px-2"
                      >
                        {notification.actionType === "call" && <Phone className="h-3 w-3" />}
                        {notification.actionType === "email" && <Mail className="h-3 w-3" />}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeNotification(notification.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {unreadCount > 0 && (
          <div className="pt-3 border-t mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNotificationList(prev => 
                prev.map(notif => ({ ...notif, read: true }))
              )}
              className="w-full"
            >
              Marcar todas como lidas
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}