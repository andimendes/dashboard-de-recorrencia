"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart } from "recharts";
import { Trophy, Target, TrendingUp, Users } from "lucide-react";

interface PerformanceReportProps {
  dateRange: any;
  vendedor: string;
}

const performanceData = [
  { vendedor: "João Silva", vendas: 180000, meta: 150000, clientes: 45, novosClientes: 8, atividades: 120 },
  { vendedor: "Maria Santos", vendas: 165000, meta: 150000, clientes: 42, novosClientes: 6, atividades: 115 },
  { vendedor: "Carlos Lima", vendas: 145000, meta: 150000, clientes: 38, novosClientes: 5, atividades: 98 },
  { vendedor: "Ana Costa", vendas: 200000, meta: 180000, clientes: 48, novosClientes: 10, atividades: 135 },
];

const monthlyPerformance = [
  { month: "Jan", joao: 28000, maria: 26000, carlos: 24000, ana: 32000 },
  { month: "Fev", joao: 25000, maria: 24000, carlos: 22000, ana: 30000 },
  { month: "Mar", joao: 32000, maria: 29000, carlos: 26000, ana: 35000 },
  { month: "Abr", joao: 30000, maria: 28000, carlos: 25000, ana: 33000 },
  { month: "Mai", joao: 31000, maria: 29000, carlos: 24000, ana: 34000 },
  { month: "Jun", joao: 34000, maria: 29000, carlos: 24000, ana: 36000 },
];

const activityData = [
  { vendedor: "João Silva", ligacoes: 85, emails: 45, visitas: 12, propostas: 8 },
  { vendedor: "Maria Santos", ligacoes: 78, emails: 52, visitas: 15, propostas: 6 },
  { vendedor: "Carlos Lima", ligacoes: 65, emails: 38, visitas: 8, propostas: 5 },
  { vendedor: "Ana Costa", ligacoes: 95, emails: 60, visitas: 18, propostas: 12 },
];

export function PerformanceReport({ dateRange, vendedor }: PerformanceReportProps) {
  return (
    <div className="space-y-4">
      {/* Ranking Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Ranking de Performance
          </CardTitle>
          <CardDescription>Performance geral dos vendedores no período</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posição</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Meta</TableHead>
                <TableHead>Atingimento</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Novos Clientes</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData
                .sort((a, b) => (b.vendas / b.meta) - (a.vendas / a.meta))
                .map((vendedor, index) => {
                  const atingimento = ((vendedor.vendas / vendedor.meta) * 100).toFixed(1);
                  return (
                    <TableRow key={vendedor.vendedor}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-orange-600 text-white' :
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{vendedor.vendedor}</TableCell>
                      <TableCell>R$ {vendedor.vendas.toLocaleString('pt-BR')}</TableCell>
                      <TableCell>R$ {vendedor.meta.toLocaleString('pt-BR')}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{atingimento}%</div>
                          <Progress value={parseFloat(atingimento)} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{vendedor.clientes}</TableCell>
                      <TableCell>{vendedor.novosClientes}</TableCell>
                      <TableCell>
                        <Badge variant={parseFloat(atingimento) >= 100 ? "default" : "secondary"}>
                          {parseFloat(atingimento) >= 100 ? "Meta Atingida" : "Abaixo da Meta"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gráficos de Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Mensal por Vendedor</CardTitle>
            <CardDescription>Evolução das vendas mensais</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
                <Legend />
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
            <CardTitle>Atividades por Vendedor</CardTitle>
            <CardDescription>Volume de atividades realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="vendedor" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="ligacoes" fill="#8884d8" name="Ligações" />
                <Bar dataKey="emails" fill="#82ca9d" name="E-mails" />
                <Bar dataKey="visitas" fill="#ffc658" name="Visitas" />
                <Bar dataKey="propostas" fill="#ff7300" name="Propostas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Detalhadas */}
      <div className="grid gap-4 md:grid-cols-4">
        {performanceData.map((vendedor) => {
          const atingimento = ((vendedor.vendas / vendedor.meta) * 100).toFixed(1);
          const ticketMedio = vendedor.vendas / vendedor.clientes;
          
          return (
            <Card key={vendedor.vendedor}>
              <CardHeader>
                <CardTitle className="text-lg">{vendedor.vendedor}</CardTitle>
                <CardDescription>Métricas detalhadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Atingimento</span>
                  <Badge variant={parseFloat(atingimento) >= 100 ? "default" : "secondary"}>
                    {atingimento}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ticket Médio</span>
                  <span className="text-sm font-medium">R$ {ticketMedio.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Novos Clientes</span>
                  <span className="text-sm font-medium">{vendedor.novosClientes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Atividades</span>
                  <span className="text-sm font-medium">{vendedor.atividades}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}