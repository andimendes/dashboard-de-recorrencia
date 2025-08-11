"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Phone, Mail, Calendar } from "lucide-react";

const funnelStages = [
  {
    name: "Prospects",
    count: 24,
    color: "bg-blue-500",
    opportunities: [
      { name: "Restaurante Novo Sabor", value: "R$ 15.000", contact: "Ana Silva", phone: "(16) 99999-1234" },
      { name: "Lanchonete Express", value: "R$ 8.500", contact: "Carlos Santos", phone: "(16) 99999-5678" }
    ]
  },
  {
    name: "Primeiro Contato",
    count: 12,
    color: "bg-yellow-500",
    opportunities: [
      { name: "Pizzaria Família", value: "R$ 12.000", contact: "Roberto Lima", phone: "(16) 99999-9012" },
      { name: "Bar e Grill", value: "R$ 20.000", contact: "Fernanda Costa", phone: "(16) 99999-3456" }
    ]
  },
  {
    name: "Proposta Enviada",
    count: 8,
    color: "bg-orange-500",
    opportunities: [
      { name: "Mercado Bom Preço", value: "R$ 25.000", contact: "João Oliveira", phone: "(16) 99999-7890" }
    ]
  },
  {
    name: "Negociação",
    count: 5,
    color: "bg-purple-500",
    opportunities: [
      { name: "Restaurante Gourmet", value: "R$ 35.000", contact: "Marina Alves", phone: "(16) 99999-2468" }
    ]
  },
  {
    name: "Fechamento",
    count: 3,
    color: "bg-green-500",
    opportunities: [
      { name: "Supermercado Novo", value: "R$ 40.000", contact: "Pedro Souza", phone: "(16) 99999-1357" }
    ]
  }
];

export function SalesFunnel() {
  return (
    <div className="space-y-4">
      {/* Visão Geral do Funil */}
      <Card>
        <CardHeader>
          <CardTitle>Funil de Vendas - Novos Clientes</CardTitle>
          <CardDescription>
            Pipeline de oportunidades em andamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-4">
            {funnelStages.map((stage, index) => (
              <div key={stage.name} className="flex-1 text-center">
                <div className={`${stage.color} text-white p-4 rounded-lg mb-2`}>
                  <div className="text-2xl font-bold">{stage.count}</div>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {funnelStages.map((stage) => (
          <Card key={stage.name}>
            <CardHeader>
              <CardTitle className="text-lg">{stage.name}</CardTitle>
              <CardDescription>
                {stage.count} oportunidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.opportunities.map((opportunity, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{opportunity.name}</p>
                    <Badge variant="outline">{opportunity.value}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Contato: {opportunity.contact}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {opportunity.phone}
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
                  Nenhuma oportunidade neste estágio
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}