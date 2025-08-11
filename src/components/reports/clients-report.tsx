"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, PieChart, Cell } from "recharts";
import { Users, TrendingUp, DollarSign, Clock } from "lucide-react";

interface ClientsReportProps {
  dateRange: any;
  vendedor: string;
}

const clientsEvolution = [
  { month: "Jan", novos: 8, perdidos: 2, ativos: 142 },
  { month: "Fev", novos: 6, perdidos: 3, ativos: 145 },
  { month: "Mar", novos: 12, perdidos: 1, ativos: 156 },
  { month: "Abr", novos: 9, perdidos: 4, ativos: 161 },
  { month: "Mai", novos: 7, perdidos: 2, ativos: 166 },
  { month: "Jun", novos: 10, perdidos: 3, ativos: 173 },
];

const scoreDistribution = [
  { name: "Score A", value: 35, color: "#22c55e" },
  { name: "Score B", value: 45, color: "#eab308" },
  { name: "Score C", value: 20, color: "#ef4444" },
];

const topClients = [
  { name: "Supermercado Central", faturamento: 45000, score: "A", frequencia: "Semanal", pmp: 15 },
  { name: "Restaurante Bella Vista", faturamento: 38000, score: "A", frequencia: "Quinzenal", pmp: 21 },
  { name: "Lanchonete do Parque", faturamento: 22000, score: "B", frequencia: "Mensal", pmp: 30 },
  { name: "Bar e Restaurante Oásis", faturamento: 18500, score: "B", frequencia: "Quinzenal", pmp: 25 },
  { name: "Mercadinho São José", faturamento: 12000, score: "C", frequencia: "Mensal", pmp: 35 },
];

export function ClientsReport({ dateRange, vendedor }: ClientsReportProps) {
  const totalClientes = 173;
  const novosClientes = clientsEvolution.reduce((acc, item) => acc + item.novos, 0);
  const clientesPerdidos = clientsEvolution.reduce((acc, item) => acc + item.perdidos, 0);
  const retencaoRate = ((totalClientes - clientesPerdidos) / totalClientes * 100).toFixed(1);

  return (
    <div className="space-y-4">
      {/* KPIs de Clientes */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClientes}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+18.2%</span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{novosClientes}</div>
            <p className="text-xs text-muted-foreground">
              No período selecionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{retencaoRate}%</div>
            <p className="text-xs text-muted-foreground">
              Clientes mantidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 27.890</div>
            <p className="text-xs text-muted-foreground">
              Por cliente no período
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução da Base de Clientes</CardTitle>
            <CardDescription>Novos clientes, perdidos e base ativa</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientsEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="novos" fill="#22c55e" name="Novos" />
                <Bar dataKey="perdidos" fill="#ef4444" name="Perdidos" />
                <Bar dataKey="ativos" fill="#3b82f6" name="Ativos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Score</CardTitle>
            <CardDescription>Classificação dos clientes por potencial</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Top Clientes por Faturamento</CardTitle>
          <CardDescription>Maiores clientes do período</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Faturamento</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>PMP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topClients.map((client, index) => (
                <TableRow key={client.name}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>R$ {client.faturamento.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant={
                      client.score === "A" ? "default" : 
                      client.score === "B" ? "secondary" : "outline"
                    }>
                      {client.score}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.frequencia}</TableCell>
                  <TableCell>{client.pmp} dias</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}