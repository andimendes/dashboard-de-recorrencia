"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { DateRange } from "react-day-picker";

interface RecurrenceReportProps {
  dateRange: DateRange | undefined;
  vendedor: string;
}

export function RecurrenceReport({ dateRange, vendedor }: RecurrenceReportProps) {
  // Dados simulados
  const recurrenceData = [
    { month: "Jan", recorrentes: 78, novos: 12, perdidos: 5 },
    { month: "Fev", recorrentes: 82, novos: 15, perdidos: 3 },
    { month: "Mar", recorrentes: 85, novos: 8, perdidos: 7 },
    { month: "Abr", recorrentes: 88, novos: 18, perdidos: 4 },
    { month: "Mai", recorrentes: 91, novos: 12, perdidos: 6 },
    { month: "Jun", recorrentes: 94, novos: 22, perdidos: 2 },
  ];

  const frequencyData = [
    { frequencia: "Semanal", clientes: 35, percentual: 37 },
    { frequencia: "Quinzenal", clientes: 28, percentual: 30 },
    { frequencia: "Mensal", clientes: 22, percentual: 23 },
    { frequencia: "Bimestral", clientes: 10, percentual: 10 },
  ];

  return (
    <div className="space-y-4">
      {/* KPIs de Recorrência */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Recorrência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Recorrentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94</div>
            <p className="text-xs text-muted-foreground">
              De 100 clientes ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 dias</div>
            <p className="text-xs text-muted-foreground">
              Entre pedidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Recorrente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 242k</div>
            <p className="text-xs text-muted-foreground">
              74% do faturamento total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Evolução da Recorrência */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Recorrência</CardTitle>
          <CardDescription>
            Acompanhamento de clientes recorrentes, novos e perdidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recurrenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="recorrentes" stroke="#3b82f6" name="Clientes Recorrentes" />
              <Line type="monotone" dataKey="novos" stroke="#10b981" name="Novos Clientes" />
              <Line type="monotone" dataKey="perdidos" stroke="#ef4444" name="Clientes Perdidos" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribuição por Frequência */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Frequência de Compra</CardTitle>
          <CardDescription>
            Como os clientes estão distribuídos por frequência de pedidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {frequencyData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.frequencia}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.clientes} clientes ({item.percentual}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentual}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}