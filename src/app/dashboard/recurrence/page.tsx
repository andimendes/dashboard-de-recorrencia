"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, AlertTriangle, Phone, Mail, Calendar, Plus } from "lucide-react";
import { TaskModal } from "@/components/recurrence/task-modal";

const recurrenceData = {
  compraram: [
    { 
      id: "1",
      name: "Supermercado Central", 
      lastOrder: "Hoje", 
      value: 3500,
      vendedor: "João Silva",
      cycle: "Semanal"
    },
    { 
      id: "2",
      name: "Restaurante Bella Vista", 
      lastOrder: "Ontem", 
      value: 4200,
      vendedor: "Maria Santos",
      cycle: "Quinzenal"
    },
    { 
      id: "3",
      name: "Bar Oásis", 
      lastOrder: "2 dias", 
      value: 2800,
      vendedor: "Carlos Lima",
      cycle: "Semanal"
    }
  ],
  aComprar: [
    { 
      id: "4",
      name: "Lanchonete do Parque", 
      daysLeft: 2, 
      cycle: "Semanal",
      vendedor: "João Silva",
      lastValue: 2200
    },
    { 
      id: "5",
      name: "Mercadinho São José", 
      daysLeft: 1, 
      cycle: "Quinzenal",
      vendedor: "Maria Santos",
      lastValue: 1800
    },
    { 
      id: "6",
      name: "Pizzaria Italiana", 
      daysLeft: 3, 
      cycle: "Semanal",
      vendedor: "Carlos Lima",
      lastValue: 3200
    }
  ],
  atrasados: [
    { 
      id: "7",
      name: "Restaurante Popular", 
      daysLate: 3, 
      cycle: "Semanal", 
      vendedor: "João Silva",
      lastValue: 2500,
      phone: "(16) 99999-1234"
    },
    { 
      id: "8",
      name: "Lanchonete Central", 
      daysLate: 5, 
      cycle: "Quinzenal", 
      vendedor: "Maria Santos",
      lastValue: 1900,
      phone: "(16) 99999-5678"
    },
    { 
      id: "9",
      name: "Bar do João", 
      daysLate: 2, 
      cycle: "Semanal", 
      vendedor: "Carlos Lima",
      lastValue: 1600,
      phone: "(16) 99999-9012"
    }
  ]
};

export default function RecurrencePage() {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const handleCreateTask = (client: any, type: "call" | "email" | "visit") => {
    setSelectedTask({ client, type });
    setShowTaskModal(true);
  };

  const totalClients = recurrenceData.compraram.length + recurrenceData.aComprar.length + recurrenceData.atrasados.length;
  const adherenceRate = ((recurrenceData.compraram.length / totalClients) * 100).toFixed(1);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Acompanhamento de Recorrência</h2>
          <p className="text-muted-foreground">
            Monitoramento proativo dos ciclos de compra
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            Taxa de Aderência: {adherenceRate}%
          </Badge>
        </div>
      </div>

      {/* Resumo Geral */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compraram no Ciclo</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{recurrenceData.compraram.length}</div>
            <p className="text-xs text-muted-foreground">
              Clientes em dia com o ciclo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Comprar</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{recurrenceData.aComprar.length}</div>
            <p className="text-xs text-muted-foreground">
              Próximos do vencimento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{recurrenceData.atrasados.length}</div>
            <p className="text-xs text-muted-foreground">
              Precisam de atenção urgente
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Visão Kanban</TabsTrigger>
          <TabsTrigger value="actions">Ações Pendentes</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Compraram no Ciclo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Compraram no Ciclo
                </CardTitle>
                <CardDescription>
                  {recurrenceData.compraram.length} clientes em dia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recurrenceData.compraram.map((client) => (
                  <div key={client.id} className="p-3 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{client.name}</p>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        ✓ OK
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Último pedido: {client.lastOrder}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      Valor: R$ {client.value.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Vendedor: {client.vendedor}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* A Comprar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  A Comprar
                </CardTitle>
                <CardDescription>
                  {recurrenceData.aComprar.length} clientes próximos do ciclo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recurrenceData.aComprar.map((client) => (
                  <div key={client.id} className="p-3 border rounded-lg bg-yellow-50 border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{client.name}</p>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                        {client.daysLeft}d
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Ciclo: {client.cycle}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      Último valor: R$ {client.lastValue.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Vendedor: {client.vendedor}
                    </p>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleCreateTask(client, "call")}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Ligar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleCreateTask(client, "email")}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        E-mail
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Atenção (Atrasados) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Atenção (Atrasados)
                </CardTitle>
                <CardDescription>
                  {recurrenceData.atrasados.length} clientes precisam de contato
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recurrenceData.atrasados.map((client) => (
                  <div key={client.id} className="p-3 border rounded-lg border-red-200 bg-red-50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{client.name}</p>
                      <Badge variant="destructive">
                        +{client.daysLate}d
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Ciclo: {client.cycle}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      Último valor: R$ {client.lastValue.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Vendedor: {client.vendedor}
                    </p>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleCreateTask(client, "call")}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Ligar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleCreateTask(client, "visit")}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Visita
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ações Pendentes</CardTitle>
              <CardDescription>
                Tarefas criadas para acompanhamento dos clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma ação pendente no momento</p>
                <p className="text-sm">As tarefas criadas aparecerão aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Tarefas */}
      <TaskModal
        open={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        task={selectedTask}
      />
    </div>
  );
}