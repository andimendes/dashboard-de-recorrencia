"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const recurrenceTrend = [
  { month: "Jul", taxa: 89.2, clientesAtivos: 234, clientesEsperados: 262 },
  { month: "Ago", taxa: 87.8, clientesAtivos: 231, clientesEsperados: 263 },
  { month: "Set", taxa: 91.1, clientesAtivos: 239, clientesEsperados: 262 },
  { month: "Out", taxa: 88.5, clientesAtivos: 232, clientesEsperados: 262 },
  { month: "Nov", taxa: 87.3, clientesAtivos: 229, clientesEsperados: 262 },
  { month: "Dez", taxa: 89.7, clientesAtivos: 235, clientesEsperados: 262 },
];

const cycleAnalysis = [
  { ciclo: "Semanal", esperados: 89, compraram: 82, atrasados: 7, taxa: 92.1 },
  { ciclo: "Quinzenal", esperados: 67, compraram: 58, atrasados: 9, taxa: 86.6 },
  { ciclo: "Mensal", esperados: 78, compraram: 65, atrasados: 13, taxa: 83.3 },
  { ciclo: "Bimestral", esperados: 13, compraram: 11, atrasados: 2, taxa: 84.6 },
];

const vendedorRecurrence = [
  { vendedor: "João Silva", clientes: 65, compraram: 59, taxa: 90.8, atrasados: 6 },
  { vendedor: "Maria Santos", clientes: 58, compraram: 51, taxa: 87.9, atrasados: 7 },
  { vendedor: "Carlos Lima", clientes: 52, compraram: 44, taxa: 84.6, atrasados: 8 },
  { vendedor: "Ana Costa", clientes: 47, compraram: 40, taxa: 85.1, atrasados: 7 },
];

const clientsAtRisk = [
  { name: "Restaurante Popular", vendedor: "João Silva", diasAtraso: 15, cicloEsperado: "Semanal", ultimaCompra: "2023-12-28" },
  { name: "Lanchonete Central", vendedor: "Maria Santos", diasAtraso: 22, cicloEsperado: "Quinzenal", ultimaCompra: "2023-12-21" },
  { name: "Bar do João", vendedor: "Carlos Lima", diasAtraso: 18, cicloEsperado: "Semanal", ultimaCompra: "2023-12-25" },
  { name: "Pizzaria Italiana", vendedor: "Ana Costa", diasAtraso: 35, cicloEsperado: "Mensal", ultimaCompra: "2023-12-08" },
  { name: "Mercado Bom Preço", vendedor: "João Silva", diasAtraso: 12, cicloEsperado: "Semanal", ultimaCompra: "2024-01-01" },
];

export function RecurrenceReport() {
  return (
    <div className="space-y-6">
      {/* Resumo de Recorrência */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Recorrência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-muted-foreground">-2.1% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes no Ciclo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">229</div>
            <p className="text-xs text-muted-foreground">de 262 esperados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Atrasados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33</div>
            <p className="text-xs text-muted-foreground">Precisam contato</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risco de Perda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Clientes críticos</p>
          </CardContent>
        </Card>
      </div>

      {/* Evolução da Taxa de Recorrência */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Taxa de Recorrência</CardTitle>
          <CardDescription>Tendência dos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recurrenceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[80, 95]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Taxa de Recorrência']} />
              <Line 
                type="monotone" 
                dataKey="taxa" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Taxa de Recorrência"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Análise por Ciclo de Compra */}
      <Card>
        <CardHeader>
          <CardTitle>Análise por Ciclo de Compra</CardTitle>
          <CardDescription>Performance por frequência de compra</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ciclo</TableHead>
                <TableHead>Clientes Esperados</TableHead>
                <TableHead>Compraram</TableHead>
                <TableHead>Atrasados</TableHead>
                <TableHead>Taxa de Aderência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cycleAnalysis.map((cycle) => (
                <TableRow key={cycle.ciclo}>
                  <TableCell className="font-medium">{cycle.ciclo}</TableCell>
                  <TableCell>{cycle.esperados}</TableCell>
                  <TableCell>
                    <span className="text-green-600 font-medium">{cycle.compraram}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-red-600 font-medium">{cycle.atrasados}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={cycle.taxa >= 90 ? "default" : cycle.taxa >= 85 ? "secondary" : "destructive"}>
                      {cycle.taxa.toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Performance por Vendedor */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Vendedor</CardTitle>
          <CardDescription>Taxa de recorrência por vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Total Clientes</TableHead>
                <TableHead>Compraram</TableHead>
                <TableHead>Taxa</TableHead>
                <TableHead>Atrasados</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedorRecurrence.map((vendedor) => (
                <TableRow key={vendedor.vendedor}>
                  <TableCell className="font-medium">{vendedor.vendedor}</TableCell>
                  <TableCell>{vendedor.clientes}</TableCell>
                  <TableCell>{vendedor.compraram}</TableCell>
                  <TableCell>
                    <span className={vendedor.taxa >= 90 ? 'text-green-600' : vendedor.taxa >= 85 ? 'text-yellow-600' : 'text-red-600'}>
                      {vendedor.taxa.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>{vendedor.atrasados}</TableCell>
                  <TableCell>
                    <Badge variant={vendedor.taxa >= 90 ? "default" : vendedor.taxa >= 85 ? "secondary" : "destructive"}>
                      {vendedor.taxa >= 90 ? "Excelente" : vendedor.taxa >= 85 ? "Bom" : "Atenção"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Clientes Críticos */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Críticos - Ação Urgente</CardTitle>
          <CardDescription>Clientes com maior atraso no ciclo de compra</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Dias de Atraso</TableHead>
                <TableHead>Ciclo Esperado</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Prioridade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsAtRisk.map((client) => (
                <TableRow key={client.name}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.vendedor}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      +{client.diasAtraso} dias
                    </Badge>
                  </TableCell>
                  <TableCell>{client.cicloEsperado}</TableCell>
                  <Table>{new Date(client.ultimaCompra).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant={client.diasAtraso > 30 ? "destructive" : client.diasAtraso > 14 ? "secondary" : "outline"}>
                      {client.diasAtraso > 30 ? "Crítica" : client.diasAtraso > 14 ? "Alta" : "Média"}
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