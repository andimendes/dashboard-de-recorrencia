"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { DateRange } from "react-day-picker";

interface ClientsReportProps {
  dateRange: DateRange | undefined;
  vendedor: string;
}

export function ClientsReport({ dateRange, vendedor }: ClientsReportProps) {
  // Dados simulados
  const scoreData = [
    { name: "Score A", value: 45, color: "#22c55e" },
    { name: "Score B", value: 35, color: "#eab308" },
    { name: "Score C", value: 20, color: "#ef4444" },
  ];

  const acquisitionData = [
    { month: "Jan", novos: 5, perdidos: 2 },
    { month: "Fev", novos: 8, perdidos: 1 },
    { month: "Mar", novos: 6, perdidos: 3 },
    { month: "Abr", novos: 12, perdidos: 2 },
    { month: "Mai", novos: 9, perdidos: 4 },
    { month: "Jun", novos: 15, perdidos: 1 },
  ];

  return (
    <div className="space-y-4">
      {/* KPIs de Clientes */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              +8 novos clientes este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
            <p className="text-xs text-muted-foreground">
              77% do total de clientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.580</div>
            <p className="text-xs text-muted-foreground">
              Por cliente por mês
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Distribuição por Score */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Score</CardTitle>
            <CardDescription>
              Classificação dos clientes por score de qualidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Aquisição de Clientes */}
        <Card>
          <CardHeader>
            <CardTitle>Aquisição de Clientes</CardTitle>
            <CardDescription>
              Novos clientes vs clientes perdidos por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={acquisitionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="novos" fill="#22c55e" name="Novos Clientes" />
                <Bar dataKey="perdidos" fill="#ef4444" name="Clientes Perdidos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}