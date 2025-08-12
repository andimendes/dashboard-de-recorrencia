"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DateRange } from "react-day-picker";

interface PerformanceReportProps {
  dateRange?: DateRange;
  vendedor?: string;
}

const performanceData = [
  { vendedor: "João Silva", vendas: 125000, meta: 120000, conversao: 18.5, clientes: 45, chamadas: 156 },
  { vendedor: "Maria Santos", vendas: 98000, meta: 100000, conversao: 16.2, clientes: 38, chamadas: 142 },
  { vendedor: "Carlos Lima", vendas: 87000, meta: 90000, conversao: 14.8, clientes: 32, chamadas: 128 },
  { vendedor: "Ana Costa", vendas: 76000, meta: 80000, conversao: 13.1, clientes: 28, chamadas: 115 },
];

const monthlyPerformance = [
  { month: "Jul", joao: 18500, maria: 15200, carlos: 14100, ana: 12800 },
  { month: "Ago", joao: 19200, maria: 16800, carlos: 13900, ana: 13200 },
  { month: "Set", joao: 21000, maria: 17500, carlos: 15200, ana: 14100 },
  { month: "Out", joao: 20100, maria: 16200, carlos: 14800, ana: 13500 },
  { month: "Nov", joao: 22500, maria: 18100, carlos: 15800, ana: 14800 },
  { month: "Dez", joao: 23800, maria: 19200, carlos: 16500, ana: 15200 },
];

const kpiData = [
  { metric: "Ticket Médio", joao: 2850, maria: 2580, carlos: 2720, ana: 2710 },
  { metric: "Visitas/Mês", joao: 45, maria: 38, carlos: 35, ana: 32 },
  { metric: "Propostas Enviadas", joao: 28, maria: 24, carlos: 22, ana: 19 },
  { metric: "Taxa Fechamento", joao: 18.5, maria: 16.2, carlos: 14.8, ana: 13.1 },
];

export function PerformanceReport({ dateRange, vendedor }: PerformanceReportProps) {
  const filteredPerformanceData = vendedor && vendedor !== "all" 
    ? performanceData.filter(v => v.vendedor === vendedor)
    : performanceData;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Melhor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">João Silva</div>
            <p className="text-xs text-muted-foreground">104.2% da meta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Média de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.7%</div>
            <p className="text-xs text-muted-foreground">+1.2% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Visitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Propostas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93</div>
            <p className="text-xs text-muted-foreground">Em negociação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução de Performance</CardTitle>
          <CardDescription>Vendas por vendedor nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
              <Line type="monotone" dataKey="joao" stroke="#8884d8" name="João Silva" />
              <Line type="monotone" dataKey="maria" stroke="#82ca9d" name="Maria Santos" />
              <Line type="monotone" dataKey="carlos" stroke="#ffc658" name="Carlos Lima" />
              <Line type="monotone" dataKey="ana" stroke="#ff7300" name="Ana Costa" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ranking de Performance</CardTitle>
          <CardDescription>Comparativo de resultados por vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posição</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Meta</TableHead>
                <TableHead>% Meta</TableHead>
                <TableHead>Conversão</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPerformanceData.map((vendedor, index) => {
                const percentMeta = (vendedor.vendas / vendedor.meta) * 100;
                return (
                  <TableRow key={vendedor.vendedor}>
                    <TableCell>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{vendedor.vendedor}</TableCell>
                    <TableCell>R$ {vendedor.vendas.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>R$ {vendedor.meta.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={percentMeta >= 100 ? 'text-green-600' : 'text-red-600'}>
                        {percentMeta.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>{vendedor.conversao}%</TableCell>
                    <TableCell>{vendedor.clientes}</TableCell>
                    <TableCell>
                      <Badge variant={percentMeta >= 100 ? "default" : percentMeta >= 90 ? "secondary" : "destructive"}>
                        {percentMeta >= 100 ? "Acima da Meta" : percentMeta >= 90 ? "Próximo da Meta" : "Abaixo da Meta"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>KPIs Detalhados</CardTitle>
          <CardDescription>Métricas de performance por vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Métrica</TableHead>
                <TableHead>João Silva</TableHead>
                <TableHead>Maria Santos</TableHead>
                <TableHead>Carlos Lima</TableHead>
                <TableHead>Ana Costa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiData.map((kpi) => (
                <TableRow key={kpi.metric}>
                  <TableCell className="font-medium">{kpi.metric}</TableCell>
                  <TableCell>
                    {kpi.metric === "Ticket Médio" ? `R$ ${kpi.joao.toLocaleString('pt-BR')}` : 
                     kpi.metric === "Taxa Fechamento" ? `${kpi.joao}%` : kpi.joao}
                  </TableCell>
                  <TableCell>
                    {kpi.metric === "Ticket Médio" ? `R$ ${kpi.maria.toLocaleString('pt-BR')}` : 
                     kpi.metric === "Taxa Fechamento" ? `${kpi.maria}%` : kpi.maria}
                  </TableCell>
                  <TableCell>
                    {kpi.metric === "Ticket Médio" ? `R$ ${kpi.carlos.toLocaleString('pt-BR')}` : 
                     kpi.metric === "Taxa Fechamento" ? `${kpi.carlos}%` : kpi.carlos}
                  </TableCell>
                  <TableCell>
                    {kpi.metric === "Ticket Médio" ? `R$ ${kpi.ana.toLocaleString('pt-BR')}` : 
                     kpi.metric === "Taxa Fechamento" ? `${kpi.ana}%` : kpi.ana}
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