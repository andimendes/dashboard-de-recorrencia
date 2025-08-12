"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const clientSegmentData = [
  { segment: "Score A", count: 45, faturamento: 1200000, color: "#8884d8" },
  { segment: "Score B", count: 78, faturamento: 980000, color: "#82ca9d" },
  { segment: "Score C", count: 124, faturamento: 610000, color: "#ffc658" },
];

const recurrenceData = [
  { frequencia: "Semanal", clientes: 89, faturamento: 1450000 },
  { frequencia: "Quinzenal", clientes: 67, faturamento: 890000 },
  { frequencia: "Mensal", clientes: 78, faturamento: 420000 },
  { frequencia: "Bimestral", clientes: 13, faturamento: 30000 },
];

const topClients = [
  { name: "Supermercado Central", score: "A", faturamento: 145000, ultimaCompra: "2024-01-15", status: "Ativo" },
  { name: "Restaurante Bella Vista", score: "A", faturamento: 128000, ultimaCompra: "2024-01-14", status: "Ativo" },
  { name: "Lanchonete do Parque", score: "B", faturamento: 89000, ultimaCompra: "2024-01-12", status: "Ativo" },
  { name: "Bar e Restaurante Oásis", score: "B", faturamento: 76000, ultimaCompra: "2024-01-10", status: "Ativo" },
  { name: "Mercadinho São José", score: "C", faturamento: 45000, ultimaCompra: "2024-01-08", status: "Risco" },
];

const clientsAtRisk = [
  { name: "Restaurante Popular", diasSemComprar: 15, ultimaCompra: "2023-12-28", faturamentoAnual: 34000 },
  { name: "Lanchonete Central", diasSemComprar: 22, ultimaCompra: "2023-12-21", faturamentoAnual: 28000 },
  { name: "Bar do João", diasSemComprar: 18, ultimaCompra: "2023-12-25", faturamentoAnual: 19000 },
];

export function ClientsReport() {
  const getScoreBadgeVariant = (score: string) => {
    switch (score) {
      case "A": return "default";
      case "B": return "secondary";
      case "C": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumo da Base de Clientes */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+8 novos este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">94.7% da base</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes em Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">Precisam atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Segmentação */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Segmentação por Score</CardTitle>
            <CardDescription>Distribuição da base de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientSegmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ segment, count }) => `${segment}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {clientSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequência de Compra</CardTitle>
            <CardDescription>Clientes por ciclo de compra</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recurrenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="frequencia" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clientes" fill="#8884d8" name="Clientes" />
              </BarChart>
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
                <TableHead>Score</TableHead>
                <TableHead>Faturamento</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topClients.map((client, index) => (
                <TableRow key={client.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getScoreBadgeVariant(client.score)}>
                      {client.score}
                    </Badge>
                  </TableCell>
                  <TableCell>R$ {client.faturamento.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>{new Date(client.ultimaCompra).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "Ativo" ? "default" : "destructive"}>
                      {client.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Clientes em Risco */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes em Risco</CardTitle>
          <CardDescription>Clientes que não compram há mais tempo que o esperado</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Dias sem Comprar</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Faturamento Anual</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsAtRisk.map((client) => (
                <TableRow key={client.name}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      {client.diasSemComprar} dias
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(client.ultimaCompra).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>R$ {client.faturamentoAnual.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      Contato Urgente
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}