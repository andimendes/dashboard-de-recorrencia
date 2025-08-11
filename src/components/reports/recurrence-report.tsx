"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart } from "recharts";
import { Target, Clock, TrendingUp, AlertTriangle } from "lucide-react";

interface RecurrenceReportProps {
  dateRange: any;
  vendedor: string;
}

const recurrenceEvolution = [
  { month: "Jan", aderencia: 85.2, compraram: 120, esperados: 141 },
  { month: "Fev", aderencia: 82.1, compraram: 115, esperados: 140 },
  { month: "Mar", aderencia: 88.5, compraram: 135, esperados: 153 },
  { month: "Abr", aderencia: 86.3, compraram: 132, esperados: 153 },
  { month: "Mai", aderencia: 87.8, compraram: 138, esperados: 157 },
  { month: "Jun", aderencia: 89.1, compraram: 142, esperados: 159 },
];

const clientsByFrequency = [
  { frequencia: "Semanal", total: 45, aderencia: 91.2, atrasados: 4 },
  { frequencia: "Quinzenal", total: 68, aderencia: 88.5, atrasados: 8 },
  { frequencia: "Mensal", total: 52, aderencia: 85.7, atrasados: 7 },
  { frequencia: "Bimestral", total: 28, aderencia: 82.1, atrasados: 5 },
];

const riskClients = [
  { name: "Restaurante Popular", diasAtraso: 5, ultimaCompra: "2024-01-10", valorMedio: 2500, risco: "Alto" },
  { name: "Lanchonete Central", diasAtraso: 3, ultimaCompra: "2024-01-12", valorMedio: 1900, risco: "Médio" },
  { name: "Bar do João", diasAtraso: 2, ultimaCompra: "2024-01-13", valorMedio: 1600, risco: "Baixo" },
  { name: "Pizzaria Família", diasAtraso: 7, ultimaCompra: "2024-01-08", valorMedio: 3200, risco: "Alto" },
  { name: "Mercado Bom Preço", diasAtraso: 4, ultimaCompra: "2024-01-11", valorMedio: 2800, risco: "Médio" },
];

export function RecurrenceReport({ dateRange, vendedor }: RecurrenceReportProps) {
  const aderenciaMedia = recurrenceEvolution.reduce((acc, item) => acc + item.aderencia, 0) / recurrenceEvolution.length;
  const totalAtrasados = clientsByFrequency.reduce((acc, item) => acc + item.atrasados, 0);
  const totalClientes = clientsByFrequency.reduce((acc, item) => acc + item.total, 0);
  const riscoPerdaReceita = riskClients.reduce((acc, client) => acc + client.valorMedio, 0);

  return (
    <div className="space-y-4">
      {/* KPIs de Recorrência */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aderência</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aderenciaMedia.toFixed(1)}%</div>
            <Progress value={aderenciaMedia} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Atrasados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalAtrasados}</div>
            <p className="text-xs text-muted-foreground">
              {((totalAtrasados / totalClientes) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risco de Receita</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {riscoPerdaReceita.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              Valor em risco de perda
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendência</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+2.3%</div>
            <p className="text-xs text-muted-foreground">
              Melhoria vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução da Taxa de Aderência</CardTitle>
            <CardDescription>Percentual de clientes que compraram no ciclo esperado</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={recurrenceEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[75, 95]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="aderencia" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  name="Taxa de Aderência"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aderência por Frequência</CardTitle>
            <CardDescription>Performance por tipo de ciclo de compra</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientsByFrequency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="frequencia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Total Clientes" />
                <Bar dataKey="atrasados" fill="#ef4444" name="Atrasados" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Análise por Frequência */}
      <Card>
        <CardHeader>
          <CardTitle>Análise por Frequência de Compra</CardTitle>
          <CardDescription>Detalhamento da aderência por tipo de ciclo</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Frequência</TableHead>
                <TableHead>Total Clientes</TableHead>
                <TableHead>Taxa de Aderência</TableHead>
                <TableHead>Clientes Atrasados</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsByFrequency.map((freq) => (
                <TableRow key={freq.frequencia}>
                  <TableCell className="font-medium">{freq.frequencia}</TableCell>
                  <TableCell>{freq.total}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{freq.aderencia.toFixed(1)}%</div>
                      <Progress value={freq.aderencia} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{freq.atrasados}</TableCell>
                  <TableCell>
                    <Badge variant={
                      freq.aderencia >= 90 ? "default" : 
                      freq.aderencia >= 85 ? "secondary" : "destructive"
                    }>
                      {freq.aderencia >= 90 ? "Excelente" : 
                       freq.aderencia >= 85 ? "Bom" : "Atenção"}
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
          <CardTitle>Clientes em Risco de Perda</CardTitle>
          <CardDescription>Clientes com maior atraso no ciclo de compra</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Dias de Atraso</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Valor Médio</TableHead>
                <TableHead>Nível de Risco</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskClients.map((client) => (
                <TableRow key={client.name}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      +{client.diasAtraso} dias
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(client.ultimaCompra).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>R$ {client.valorMedio.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant={
                      client.risco === "Alto" ? "destructive" : 
                      client.risco === "Médio" ? "secondary" : "outline"
                    }>
                      {client.risco}
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