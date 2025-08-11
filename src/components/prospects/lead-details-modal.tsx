"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Calendar, User, Clock, MessageSquare, Target } from "lucide-react";

interface LeadDetailsModalProps {
  lead: any;
  open: boolean;
  onClose: () => void;
}

export function LeadDetailsModal({ lead, open, onClose }: LeadDetailsModalProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Novo": return "default";
      case "Contatado": return "secondary";
      case "Qualificado": return "outline";
      case "Perdido": return "destructive";
      default: return "outline";
    }
  };

  // Dados simulados de atividades
  const activities = [
    { date: "2024-01-14", type: "call", description: "Primeira ligação - cliente interessado", user: lead.vendedor },
    { date: "2024-01-12", type: "email",description: "Envio de material institucional", user: lead.vendedor },
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
            {lead.name}
            <Badge variant={getStatusBadgeVariant(lead.status)}>
              {lead.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Detalhes completos do lead
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="activities">Atividades</TabsTrigger>
            <TabsTrigger value="qualification">Qualificação</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações do Lead</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Vendedor: {lead.vendedor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Fonte: {lead.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Criado em: {new Date(lead.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Último contato: {lead.lastContact ? 
                        new Date(lead.lastContact).toLocaleDateString('pt-BR') : 
                        "Nunca"
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Atual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant={getStatusBadgeVariant(lead.status)} className="mt-1">
                      {lead.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Próxima Ação</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.status === "Novo" ? "Fazer primeiro contato" :
                       lead.status === "Contatado" ? "Follow-up" :
                       lead.status === "Qualificado" ? "Criar oportunidade" :
                       "Lead perdido"}
                    </p>
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
                    <p className="text-sm font-medium mb-1">Empresa</p>
                    <p className="text-sm text-muted-foreground">{lead.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Contato Principal</p>
                    <p className="text-sm text-muted-foreground">{lead.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Telefone</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lead.phone}</span>
                      <Button size="sm" variant="outline">Ligar</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">E-mail</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lead.email}</span>
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
                <CardDescription>Todas as interações com este lead</CardDescription>
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
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Adicionar Atividade
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qualification" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Observações e Qualificação</CardTitle>
                <CardDescription>Notas importantes sobre este lead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{lead.notes}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Qualificar Lead
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Criar Oportunidade
                    </Button>
                  </div>
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
            Editar Lead
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}