"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DateRange } from "react-day-picker";

interface SalesReportProps {
  dateRange: DateRange | undefined;
  vendedor: string;
}

export function SalesReport({ dateRange, vendedor }: SalesReportProps) {
  // Dados simulados
  const salesData = [
    { month: "Jan", vendas: 45000, meta: 50000 },
    { month: "Fev", vendas: 52000, meta: 50000 },
    { month: "Mar", vendas: 48000, meta: 50000 },
    { month: "Abr", vendas: 61000, meta: 55000 },
    { month: "Mai", vendas: 55000, meta: 55000 },
    { month: "Jun", vendas: 67000, meta: 60000 },
  ];

  const productData = [
    { produto: "Massa de Pastel", vendas: 15000, percentual: 25 },
    { produto: "Massa de Lasanha", vendas: 12000, percentual: 20 },
    { produto: "Massa de Pizza", vendas: 18000, percentual: 30 },
    { produto: "Massa de Ravioli", vendas: 9000, percentual: 15 },
    { produto: "Outros", vendas: 6000, percentual: 10 },
  ];

  return (
    <div className="space-y-4">
      {/* KPIs de Vendas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 328.000</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Atingida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              R$ 5.000 para atingir 100%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.850</div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">115</div>
            <p className="text-xs text-muted-foreground">
              +8 pedidos este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Vendas vs Meta */}
      <Card>
        <CardHeader>
          <CardTitle>Vendas vs Meta</CardTitle>
          <CardDescription>
            Comparação entre vendas realizadas e metas estabelecidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
              <Bar dataKey="vendas" fill="#3b82f6" name="Vendas" />
              <Bar dataKey="meta" fill="#e5e7eb" name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vendas por Produto */}
      <Card>
        <CardHeader>
          <CardTitle>Vendas por Produto</CardTitle>
          <CardDescription>
            Distribuição das vendas por categoria de produto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.produto}</span>
                    <span className="text-sm text-muted-foreground">
                      R$ {item.vendas.toLocaleString('pt-BR')} ({item.percentual}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentual}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}