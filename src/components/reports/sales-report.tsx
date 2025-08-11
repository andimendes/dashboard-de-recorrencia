"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, PieChart, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Target } from "lucide-react";

interface SalesReportProps {
  dateRange: any;
  vendedor: string;
}

const salesData = [
  { month: "Jan", vendas: 420000, meta: 450000, pedidos: 85 },
  { month: "Fev", vendas: 380000, meta: 450000, pedidos: 76 },
  { month: "Mar", vendas: 520000, meta: 450000, pedidos: 104 },
  { month: "Abr", vendas: 470000, meta: 450000, pedidos: 94 },
  { month: "Mai", vendas: 510000, meta: 450000, pedidos: 102 },
  { month: "Jun", vendas: 490000, meta: 450000, pedidos: 98 },
];

const productData = [
  { name: "Massa de Pastel", value: 35, color: "#8884d8" },
  { name: "Massa de Pizza", value: 30, color: "#82ca9d" },
  { name: "Massa de Lasanha", value: 25, color: "#ffc658" },
  { name: "Massa de Empada", value: 10, color: "#ff7300" },
];

const vendedorData = [
  { name: "João Silva", vendas: 180000, meta: 150000, atingimento: 120 },
  { name: "Maria Santos", vendas: 165000, meta: 150000, atingimento: 110 },
  { name: "Carlos Lima", vendas: 145000, meta: 150000, atingimento: 97 },
  { name: "Ana Costa", vendas: 200000, meta: 180000, atingimento: 111 },
];

export function SalesReport({ dateRange, vendedor }: SalesReportProps) {
  const totalVendas = salesData.reduce((acc, item) => acc + item.vendas, 0);
  const totalMeta = salesData.reduce((acc, item) => acc + item.meta, 0);
  const atingimentoMeta = ((totalVendas / totalMeta) * 100).toFixed(1);
  const totalPedidos = salesData.reduce((acc, item) => acc + item.pedidos, 0);
  const ticketMedio = totalVendas / totalPedidos;

  return (
    <div className="space-y-4">
      {/* KPIs Principais */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalVendas.toLocaleString('pt-BR')}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atingimento da Meta</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atingimentoMeta}%</div>
            <Progress value={parseFloat(atingimentoMeta)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPedidos}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {ticketMedio.toLocaleString('pt-BR')}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+3.8%</span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Vendas vs Meta</CardTitle>
            <CardDescription>Comparativo mensal de vendas realizadas e metas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
                <Legend />
                <Bar dataKey="vendas" fill="#8884d8" name="Vendas" />
                <Bar dataKey="meta" fill="#82ca9d" name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mix de Produtos</CardTitle>
            <CardDescription>Distribuição de vendas por produto</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance por Vendedor */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Vendedor</CardTitle>
          <CardDescription>Ranking de vendedores por atingimento de meta</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Meta</TableHead>
                <TableHead>Atingimento</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedorData.map((vendedor) => (
                <TableRow key={vendedor.name}>
                  <TableCell className="font-medium">{vendedor.name}</TableCell>
                  <TableCell>R$ {vendedor.vendas.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>R$ {vendedor.meta.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>{vendedor.atingimento}%</TableCell>
                  <TableCell>
                    <Badge variant={vendedor.atingimento >= 100 ? "default" : "secondary"}>
                      {vendedor.atingimento >= 100 ? "Meta Atingida" : "Abaixo da Meta"}
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