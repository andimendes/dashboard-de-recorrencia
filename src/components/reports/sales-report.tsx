"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const salesData = [
  { month: "Jan", vendas: 420000, meta: 450000, pedidos: 156 },
  { month: "Fev", vendas: 380000, meta: 450000, pedidos: 142 },
  { month: "Mar", vendas: 520000, meta: 450000, pedidos: 178 },
  { month: "Abr", vendas: 470000, meta: 450000, pedidos: 165 },
  { month: "Mai", vendas: 510000, meta: 450000, pedidos: 172 },
  { month: "Jun", vendas: 490000, meta: 450000, pedidos: 168 },
];

const productData = [
  { name: "Massa de Pastel", value: 45, color: "#8884d8" },
  { name: "Massa de Pizza", value: 30, color: "#82ca9d" },
  { name: "Massa de Lasanha", value: 20, color: "#ffc658" },
  { name: "Outros", value: 5, color: "#ff7300" },
];

const vendedorData = [
  { vendedor: "João Silva", vendas: 125000, meta: 120000, clientes: 45, conversao: 78 },
  { vendedor: "Maria Santos", vendas: 98000, meta: 100000, clientes: 38, conversao: 82 },
  { vendedor: "Carlos Lima", vendas: 87000, meta: 90000, clientes: 32, conversao: 75 },
  { vendedor: "Ana Costa", vendas: 76000, meta: 80000, clientes: 28, conversao: 71 },
];

export function SalesReport() {
  return (
    <div className="space-y-6">
      {/* Resumo Executivo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.790.000</div>
            <p className="text-xs text-muted-foreground">+12.5% vs período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Meta Atingida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">103.7%</div>
            <p className="text-xs text-muted-foreground">Acima da meta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">981</div>
            <p className="text-xs text-muted-foreground">+8.2% vs período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.845</div>
            <p className="text-xs text-muted-foreground">+3.8% vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Vendas</CardTitle>
            <CardDescription>Vendas vs Meta por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
                <Bar dataKey="vendas" fill="#8884d8" name="Vendas" />
                <Bar dataKey="meta" fill="#82ca9d" name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mix de Produtos</CardTitle>
            <CardDescription>Participação por categoria</CardDescription>
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

      {/* Ranking de Vendedores */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Vendedor</CardTitle>
          <CardDescription>Ranking de vendas no período</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Meta</TableHead>
                <TableHead>% Meta</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Conversão</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedorData.map((vendedor, index) => {
                const percentMeta = (vendedor.vendas / vendedor.meta) * 100;
                return (
                  <TableRow key={vendedor.vendedor}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        {vendedor.vendedor}
                      </div>
                    </TableCell>
                    <TableCell>R$ {vendedor.vendas.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>R$ {vendedor.meta.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={percentMeta >= 100 ? 'text-green-600' : 'text-red-600'}>
                        {percentMeta.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>{vendedor.clientes}</TableCell>
                    <TableCell>{vendedor.conversao}%</TableCell>
                    <TableCell>
                      <Badge variant={percentMeta >= 100 ? "default" : "secondary"}>
                        {percentMeta >= 100 ? "Meta Atingida" : "Abaixo da Meta"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}