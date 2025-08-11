"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Clock } from "lucide-react";

const kpis = [
  {
    title: "Faturamento Mensal",
    value: "R$ 485.230",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs. mês anterior"
  },
  {
    title: "Clientes Ativos",
    value: "142",
    change: "+3",
    trend: "up", 
    icon: Users,
    description: "compraram este mês"
  },
  {
    title: "Taxa de Recorrência",
    value: "87.3%",
    change: "-2.1%",
    trend: "down",
    icon: Target,
    description: "clientes no ciclo"
  },
  {
    title: "Ticket Médio",
    value: "R$ 3.418",
    change: "+8.2%",
    trend: "up",
    icon: TrendingUp,
    description: "por pedido"
  },
  {
    title: "Novos Clientes",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Users,
    description: "este mês"
  },
  {
    title: "PMP Médio",
    value: "28 dias",
    change: "-3 dias",
    trend: "up",
    icon: Clock,
    description: "prazo de pagamento"
  }
];

export function KPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {kpi.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>
                {kpi.change}
              </span>
              <span className="ml-1">{kpi.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}