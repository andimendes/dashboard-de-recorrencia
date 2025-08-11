"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Phone, Mail, Calendar, DollarSign, TrendingUp, Target, Users } from "lucide-react";
import { OpportunityModal } from "@/components/sales-funnel/opportunity-modal";
import { AddOpportunityModal } from "@/components/sales-funnel/add-opportunity-modal";

const funnelStages = [
  {
    id: "prospects",
    name: "Prospects",
    color: "bg-blue-500",
    opportunities: [
      { 
        id: "1",
        name: "Restaurante Novo Sabor", 
        value: 15000, 
        contact: "Ana Silva", 
        phone: "(16) 99999-1234",
        email: "ana@novosabor.com",
        vendedor: "João Silva",
        lastContact: "2024-01-10",
        nextAction: "Enviar proposta",
        notes: "Interessado em massa de pizza e lasanha"
      },
      { 
        id: "2",
        name: "Lanchonete Express", 
        value: 8500, 
        contact: "Carlos Santos", 
        phone: "(16) 99999-5678",
        email: "carlos@express.com",
        vendedor: "Maria Santos",
        lastContact: "2024-01-12",
        nextAction: "Agendar visita",
        notes: "Foco em massa de pastel"
      }
    ]
  },
  {
    id: "first-contact",
    name: "Primeiro Contato",
    color: "bg-yellow-500",
    opportunities: [
      { 
        id: "3",
        name: "Pizzaria Família", 
        value: 12000, 
        contact: "Roberto Lima", 
        phone: "(16) 99999-9012",
        email: "roberto@familia.com",
        vendedor: "Carlos Lima",
        lastContact: "2024-01-08",
        nextAction: "Follow-up por telefone",
        notes: "Aguardando aprovação do sócio"
      },
      { 
        id: "4",
        name: "Bar e Grill", 
        value: 20000, 
        contact: "Fernanda Costa", 
        phone: "(16) 99999-3456",
        email: "fernanda@bargrill.com",
        vendedor: "João Silva",
        lastContact: "2024-01-09",
        nextAction: "Enviar amostras",
        notes: "Interessado em todos os produtos"
      }
    ]
  },
  {
    id: "proposal-sent",
    name: "Proposta Enviada",
    color: "bg-orange-500",
    opportunities: [
      { 
        id: "5",
        name: "Mercado Bom Preço", 
        value: 25000, 
        contact: "João Oliveira", 
        phone: "(16) 99999-7890",
        email: "joao@bompreco.com",
        vendedor: "Maria Santos",
        lastContact: "2024-01-05",
        nextAction: "Aguardar retorno",
        notes: "Proposta enviada com desconto especial"
      }
    ]
  },
  {
    id: "negotiation",
    name: "Negociação",
    color: "bg-purple-500",
    opportunities: [
      { 
        id: "6",
        name: "Restaurante Gourmet", 
        value: 35000, 
        contact: "Marina Alves", 
        phone: "(16) 99999-2468",
        email: "marina@gourmet.com",
        vendedor: "Carlos Lima",
        lastContact: "2024-01-07",
        nextAction: "Reunião de fechamento",
        notes: "Negociando prazo de pagamento"
      }
    ]
  },
  {
    id: "closing",
    name: "Fechamento",
    color: "bg-green-500",
    opportunities: [
      { 
        id: "7",
        name: "Supermercado Novo", 
        value: 40000, 
        contact: "Pedro Souza", 
        phone: "(16) 99999-1357",
        email: "pedro@supernovo.com",
        vendedor: "João Silva",
        lastContact: "2024-01-06",
        nextAction: "Assinar contrato",
        notes: "Pronto para fechamento"
      }
    ]
  }
];

export default function SalesFunnelPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const totalOpportunities = funnelStages.reduce((acc, stage) => acc + stage.opportunities.length, 0);
  const totalValue = funnelStages.reduce((acc, stage) => 
    acc + stage.opportunities.reduce((stageAcc, opp) => stageAcc + opp.value, 0), 0
  );
  const conversionRate = funnelStages[0].opportunities.length > 0 ? 
    ((funnelStages[4].opportunities.length / funnelStages[0].opportunities.length) * 100).toFixed(1) : "0";

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Funil de Vendas</h2>
          <p className="text-muted-foreground">
            Pipeline de oportunidades e novos clientes
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Oportunidade
        </Button>
      </div>

      {/* KPIs do Funil */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Oportunidades</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOpportunities}</div>
            <p className="text-xs text-muted-foreground">
              No pipeline ativo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalValue.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              Potencial de receita
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Prospects → Fechamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalOpportunities > 0 ? (totalValue / totalOpportunities).toLocaleString('pt-BR') : '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              Por oportunidade
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Visão Kanban</TabsTrigger>
          <TabsTrigger value="list">Lista Detalhada</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          {/* Visão Geral do Funil */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline de Vendas</CardTitle>
              <CardDescription>
                Fluxo visual das oportunidades em andamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-4 mb-6">
                {funnelStages.map((stage, index) => (
                  <div key={stage.id} className="flex-1 text-center">
                    <div className={`${stage.color} text-white p-4 rounded-lg mb-2`}>
                      <div className="text-2xl font-bold">{stage.opportunities.length}</div>
                      <div className="text-sm opacity-90">{stage.name}</div>
                    </div>
                    {index < funnelStages.length - 1 && (
                      <div className="hidden md:block text-gray-400 text-xl">→</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detalhes por Estágio */}
          <div className="grid gap-4 lg:grid-cols-5">
            {funnelStages.map((stage) => (
              <Card key={stage.id} className="h-fit">
                <CardHeader>
                  <CardTitle className="text-lg">{stage.name}</CardTitle>
                  <CardDescription>
                    {stage.opportunities.length} oportunidade{stage.opportunities.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stage.opportunities.map((opportunity) => (
                    <div key={opportunity.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                         onClick={() => setSelectedOpportunity(opportunity)}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{opportunity.name}</p>
                        <Badge variant="outline">R$ {opportunity.value.toLocaleString('pt-BR')}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Contato: {opportunity.contact}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        Vendedor: {opportunity.vendedor}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Próxima ação: {opportunity.nextAction}
                      </p>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="h-3 w-3 mr-1" />
                          Ligar
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {stage.opportunities.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhuma oportunidade
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todas as Oportunidades</CardTitle>
              <CardDescription>
                Lista completa com detalhes de cada oportunidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelStages.map((stage) => (
                  <div key={stage.id}>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                      {stage.name} ({stage.opportunities.length})
                    </h3>
                    <div className="space-y-2 ml-5">
                      {stage.opportunities.map((opportunity) => (
                        <div key={opportunity.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{opportunity.name}</h4>
                            <Badge variant="outline">R$ {opportunity.value.toLocaleString('pt-BR')}</Badge>
                          </div>
                          <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground">
                            <div>Contato: {opportunity.contact}</div>
                            <div>Vendedor: {opportunity.vendedor}</div>
                            <div>Último contato: {new Date(opportunity.lastContact).toLocaleDateString('pt-BR')}</div>
                          </div>
                          <p className="text-sm mt-2">{opportunity.notes}</p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" onClick={() => setSelectedOpportunity(opportunity)}>
                              <Eye className="h-3 w-3 mr-1" />
                              Detalhes
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="h-3 w-3 mr-1" />
                              Ligar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-3 w-3 mr-1" />
                              E-mail
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversão por Estágio</CardTitle>
                <CardDescription>Taxa de conversão entre os estágios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funnelStages.map((stage, index) => {
                    const nextStage = funnelStages[index + 1];
                    const conversionRate = nextStage ? 
                      ((nextStage.opportunities.length / Math.max(stage.opportunities.length, 1)) * 100).toFixed(1) : 
                      "100";
                    
                    return (
                      <div key={stage.id} className="flex items-center justify-between">
                        <span className="text-sm">{stage.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{stage.opportunities.length}</span>
                          {nextStage && (
                            <>
                              <span className="text-xs text-muted-foreground">→</span>
                              <span className="text-xs text-green-600">{conversionRate}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance por Vendedor</CardTitle>
                <CardDescription>Oportunidades por vendedor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["João Silva", "Maria Santos", "Carlos Lima"].map((vendedor) => {
                    const opportunities = funnelStages.flatMap(stage => stage.opportunities)
                      .filter(opp => opp.vendedor === vendedor);
                    const totalValue = opportunities.reduce((acc, opp) => acc + opp.value, 0);
                    
                    return (
                      <div key={vendedor} className="flex items-center justify-between">
                        <span className="text-sm">{vendedor}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">{opportunities.length} oportunidades</div>
                          <div className="text-xs text-muted-foreground">
                            R$ {totalValue.toLocaleString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modais */}
      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          open={!!selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}

      <AddOpportunityModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}