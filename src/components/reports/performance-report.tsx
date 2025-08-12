"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { DateRange } from "react-day-picker";

interface PerformanceReportProps {
  dateRange: DateRange | undefined;
  vendedor: string;
}

export function PerformanceReport({ dateRange, vendedor }: PerformanceReportProps) {
  // Dados simulados
  const performanceData = [
    { month: "Jan", conversao: 15, visitas: 45, vendas: 7 },
    { month: "Fev", conversao: 18, visitas: 52, vendas: 9 },
    { month: "Mar", conversao: 22, visitas: 48, vendas: 11 },
    { month: "Abr", conversao: 25, visitas: 61, vendas: 15 },
    { month: "Mai", conversao: 20, visitas: 55, vendas: 11 },
    { month: "Jun", conversao: 28, visitas: 67, vendas: 19 },
  ];

  const vendedorData = [
    { vendedor: "João Silva", vendas: 85000, meta: 80000, conversao: 22 },
    { vendedor: "Maria Santos", vendas: 92000, meta: 85000, conversao: 28 },
    { vendedor: "Carlos Lima", vendas: 78000, meta: 80000, conversao: 19 },
    { vendedor: "Ana Costa", vendas: 73000, meta: 75000, conversao: 24 },
  ];

  return (
    <div className="space-y-4">
      {/* KPIs de Performance */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-muted-foreground">
              +3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitas Realizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">328</div>
            <p className="text-xs text-muted-foreground">
              +15 visitas este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45min</div>
            <p className="text-xs text-muted-foreground">
              Por visita comercial
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Realizados este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Evolução da Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Performance</CardTitle>
          <CardDescription>
            Taxa de conversão e número de visitas ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="conversao" stroke="#3b82f6" name="Taxa de Conversão (%)" />
              <Line type="monotone" dataKey="visitas" stroke="#10b981" name="Visitas" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance por Vendedor */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Vendedor</CardTitle>
          <CardDescription>
            Comparação de vendas vs meta por vendedor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendedorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendedor" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
              <Bar dataKey="vendas" fill="#3b82f6" name="Vendas" />
              <Bar dataKey="meta" fill="#e5e7eb" name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}