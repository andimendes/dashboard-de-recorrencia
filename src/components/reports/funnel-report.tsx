"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const funnelData = [
  { stage: "Prospects", count: 124, value: 2480000, conversion: 100 },
  { stage: "Primeiro Contato", count: 89, value: 1780000, conversion: 71.8 },
  { stage: "Proposta Enviada", count: 56, value: 1120000, conversion: 62.9 },
  { stage: "Negociação", count: 34, value: 680000, conversion: 60.7 },
  { stage: "Fechamento", count: 18, value: 360000, conversion: 52.9 },
];

const conversionTrend = [
  { month: "Jul", prospects: 98, fechamentos: 12, taxa: 12.2 },
  { month: "Ago", prospects: 105, fechamentos: 15, taxa: 14.3 },
  { month: "Set", prospects: 112, fechamentos: 18, taxa: 16.1 },
  { month: "Out", prospects: 118, fechamentos: 16, taxa: 13.6 },
  { month: "Nov", prospects: 124, fechamentos: 18, taxa: 14.5 },
  { month: "Dez", prospects: 89, fechamentos: 14, taxa: 15.7 },
];

const vendedorFunnel = [
  { vendedor: "João Silva", prospects: 32, fechamentos: 6, taxa: 18.8, valorFechado: 120000 },
  { vendedor: "Maria Santos", prospects: 28, fechamentos: 5, taxa: 17.9, valorFechado: 95000 },
  { vendedor: "Carlos Lima", vendedor: 25, fechamentos: 4, taxa: 16.0, valorFechado: 80000 },
  { vendedor: "Ana Costa", prospects: 22, fechamentos: 3, taxa: 13.6, valorFechado: 65000 },
];

const opportunitiesInProgress = [
  { cliente: "Restaurante Novo Sabor", stage: "Negociação", valor: 45000, vendedor: "João Silva", diasNoStage: 5, probabilidade: 75 },
  { cliente: "Supermercado Novo", stage: "Proposta Enviada", valor: 38000, vendedor: "Maria Santos", diasNoStage: 12, probabilidade: 60 },
  { cliente: "Lanchonete Express", stage: "Primeiro Contato", valor: 25000, vendedor: "Carlos Lima", diasNoStage: 8, probabilidade: 40 },
  { cliente: "Pizzaria Família", stage: "Negociação", valor: 32000, vendedor: "Ana Costa", diasNoStage: 18, probabilidade: 80 },
  { cliente: "Bar e Grill", stage: "Proposta Enviada", valor: 28000, vendedor: "João Silva", diasNoStage: 6, probabilidade: 55 },
];

export function FunnelReport() {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Prospects": return "bg-blue-500";
      case "Primeiro Contato": return "bg-yellow-500";
      case "Proposta Enviada": return "bg-orange-500";
      case "Negociação": return "bg-purple-500";
      case "Fechamento": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getProbabilityBadge = (prob: number) => {
    if (prob >= 70) return "default";
    if (prob >= 50) return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-6">
      {/* Resumo do Funil */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+12 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.5%</div>
            <p className="text-xs text-muted-foreground">+1.2% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor em Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.48M</div>
            <p className="text-xs text-muted-foreground">Oportunidades ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fechamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Visualização do Funil */}
      <Card>
        <CardHeader>
          <CardTitle>Funil de Vendas</CardTitle>
          <CardDescription>Distribuição de oportunidades por estágio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className={`h-8 rounded ${getStageColor(stage.stage)}`}
                      style={{ width: `${(stage.count / funnelData[0].count) * 100}%` }}
                    />
                    <span className="text-sm font-medium">{stage.count}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>R$ {(stage.value / 1000).toFixed(0)}k</span>
                    <span>{stage.conversion.toFixed(1)}% conversão</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evolução da Conversão */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Taxa de Conversão</CardTitle>
          <CardDescription>Tendência dos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Taxa de Conversão']} />
              <Line 
                type="monotone" 
                dataKey="taxa" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Taxa de Conversão"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance por Vendedor */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Vendedor</CardTitle>
          <CardDescription>Conversão e valor fechado por vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Prospects</TableHead>
                <TableHead>Fechamentos</TableHead>
                <TableHead>Taxa de Conversão</TableHead>
                <TableHead>Valor Fechado</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedorFunnel.map((vendedor) => (
                <TableRow key={vendedor.vendedor}>
                  <TableCell className="font-medium">{vendedor.vendedor}</TableCell>
                  <TableCell>{vendedor.prospects}</TableCell>
                  <TableCell>{vendedor.fechamentos}</TableCell>
                  <TableCell>
                    <span className={vendedor.taxa >= 17 ? 'text-green-600' : vendedor.taxa >= 15 ? 'text-yellow-600' : 'text-red-600'}>
                      {vendedor.taxa.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>R$ {vendedor.valorFechado.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant={vendedor.taxa >= 17 ? "default" : vendedor.taxa >= 15 ? "secondary" : "destructive"}>
                      {vendedor.taxa >= 17 ? "Excelente" : vendedor.taxa >= 15 ? "Bom" : "Atenção"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Oportunidades em Andamento */}
      <Card>
        <CardHeader>
          <CardTitle>Oportunidades em Andamento</CardTitle>
          <CardDescription>Principais oportunidades no pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Estágio</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Dias no Estágio</TableHead>
                <TableHead>Probabilidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunitiesInProgress.map((opp) => (
                <TableRow key={opp.cliente}>
                  <TableCell className="font-medium">{opp.cliente}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{opp.stage}</Badge>
                  </TableCell>
                  <TableCell>R$ {opp.valor.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>{opp.vendedor}</TableCell>
                  <TableCell>
                    <span className={opp.diasNoStage > 14 ? 'text-red-600' : opp.diasNoStage > 7 ? 'text-yellow-600' : 'text-green-600'}>
                      {opp.diasNoStage} dias
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getProbabilityBadge(opp.probabilidade)}>
                      {opp.probabilidade}%
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