"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle, Phone } from "lucide-react";

const recurrenceData = {
  compraram: [
    { name: "Supermercado Central", lastOrder: "Hoje", status: "ok" },
    { name: "Restaurante Bella Vista", lastOrder: "Ontem", status: "ok" },
    { name: "Bar Oásis", lastOrder: "2 dias", status: "ok" }
  ],
  aComprar: [
    { name: "Lanchonete do Parque", daysLeft: 2, cycle: "Semanal" },
    { name: "Mercadinho São José", daysLeft: 1, cycle: "Quinzenal" },
    { name: "Pizzaria Italiana", daysLeft: 3, cycle: "Semanal" }
  ],
  atrasados: [
    { name: "Restaurante Popular", daysLate: 3, cycle: "Semanal", vendedor: "João Silva" },
    { name: "Lanchonete Central", daysLate: 5, cycle: "Quinzenal", vendedor: "Maria Santos" },
    { name: "Bar do João", daysLate: 2, cycle: "Semanal", vendedor: "Carlos Lima" }
  ]
};

export function RecurrenceOverview() {
  return (
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
          {recurrenceData.compraram.map((client, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">{client.name}</p>
                <p className="text-xs text-muted-foreground">Último pedido: {client.lastOrder}</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                ✓ OK
              </Badge>
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
          {recurrenceData.aComprar.map((client, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">{client.name}</p>
                <p className="text-xs text-muted-foreground">Ciclo: {client.cycle}</p>
              </div>
              <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                {client.daysLeft}d
              </Badge>
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
          {recurrenceData.atrasados.map((client, index) => (
            <div key={index} className="p-3 border rounded-lg border-red-200 bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm">{client.name}</p>
                <Badge variant="destructive">
                  +{client.daysLate}d
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Vendedor: {client.vendedor}
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Phone className="h-3 w-3 mr-1" />
                Entrar em Contato
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}