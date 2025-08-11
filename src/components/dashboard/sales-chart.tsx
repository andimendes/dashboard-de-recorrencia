"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", faturamento: 420000, meta: 450000 },
  { month: "Fev", faturamento: 380000, meta: 450000 },
  { month: "Mar", faturamento: 520000, meta: 450000 },
  { month: "Abr", faturamento: 470000, meta: 450000 },
  { month: "Mai", faturamento: 510000, meta: 450000 },
  { month: "Jun", faturamento: 490000, meta: 450000 },
  { month: "Jul", faturamento: 530000, meta: 450000 },
  { month: "Ago", faturamento: 480000, meta: 450000 },
  { month: "Set", faturamento: 520000, meta: 450000 },
  { month: "Out", faturamento: 510000, meta: 450000 },
  { month: "Nov", faturamento: 485230, meta: 450000 },
  { month: "Dez", faturamento: 0, meta: 450000 },
];

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis 
          dataKey="month" 
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip 
          formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
          labelFormatter={(label) => `Mês: ${label}`}
        />
        <Line 
          type="monotone" 
          dataKey="faturamento" 
          stroke="#8884d8" 
          strokeWidth={2}
          name="Faturamento"
        />
        <Line 
          type="monotone" 
          dataKey="meta" 
          stroke="#82ca9d" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Meta"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}