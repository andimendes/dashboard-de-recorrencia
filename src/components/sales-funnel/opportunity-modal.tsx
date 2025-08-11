"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Calendar, DollarSign, User, Clock, MessageSquare } from "lucide-react";

interface OpportunityModalProps {
  opportunity: any;
  open: boolean;
  onClose: () => void;
}

export function OpportunityModal({ opportunity, open, onClose }: OpportunityModalProps) {
  // Dados simulados de histórico
  const activities = [
    { date: "2024-01-10", type: "call", description: "Ligação inicial - cliente interessado", user: "João Silva" },
    { date: "2024-01-08", type: "email", description: "Envio de catálogo de produtos", user: "João Silva" },
    { date: "2024-01-05", type: "meeting", description: "Reunião presencial agendada", user: "João Silva" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "meeting": return <Calendar className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case "call": return "Ligação";
      case "email": return "E-mail";
      case "meeting": return "Reunião";
      default: return "Atividade";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {opportunity.name}
            <Badge variant="outline">R$ {opportunity.value.toLocaleString('pt-BR')}</Badge>
          </DialogTitle>
          <DialogDescription>
            Detalhes completos da oportunidade
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="activities">Atividades</TabsTrigger>
            <TabsTrigger value="notes">Observações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Comerciais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Valor: R$ {opportunity.value.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Vendedor: {opportunity.vendedor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Último contato: {new Date(opportunity.lastContact).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Próxima ação: {opportunity.nextAction}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status da Oportunidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Estágio Atual</p>
                    <Badge variant="outline" className="mt-1">
                      Prospects
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Probabilidade</p>
                    <p className="text-sm text-muted-foreground">25%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Data Estimada</p>
                    <p className="text-sm text-muted-foreground">Fevereiro 2024</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-1">Contato Principal</p>
                    <p className="text-sm text-muted-foreground">{opportunity.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Empresa</p>
                    <p className="text-sm text-muted-foreground">{opportunity.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Telefone</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{opportunity.phone}</span>
                      <Button size="sm" variant="outline">Ligar</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">E-mail</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{opportunity.email}</span>
                      <Button size="sm" variant="outline">Enviar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Histórico de Atividades</CardTitle>
                <CardDescription>Todas as interações com esta oportunidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{getActivityLabel(activity.type)}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">Por: {activity.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Atividade
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Observações</CardTitle>
                <CardDescription>Notas e informações importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{opportunity.notes}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Adicionar Nota
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            Editar Oportunidade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}