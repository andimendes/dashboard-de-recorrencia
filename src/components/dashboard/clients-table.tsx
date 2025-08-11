"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Phone, Mail } from "lucide-react";

interface Client {
  id: string;
  name: string;
  score: "A" | "B" | "C";
  faturamento: number;
  ultimaCompra: string;
  frequencia: string;
  vendedor: string;
}

const clients: Client[] = [
  {
    id: "1",
    name: "Supermercado Central",
    score: "A",
    faturamento: 45000,
    ultimaCompra: "2024-01-15",
    frequencia: "Semanal",
    vendedor: "João Silva"
  },
  {
    id: "2", 
    name: "Restaurante Bella Vista",
    score: "A",
    faturamento: 38000,
    ultimaCompra: "2024-01-14",
    frequencia: "Quinzenal",
    vendedor: "Maria Santos"
  },
  {
    id: "3",
    name: "Lanchonete do Parque",
    score: "B",
    faturamento: 22000,
    ultimaCompra: "2024-01-12",
    frequencia: "Mensal",
    vendedor: "João Silva"
  },
  {
    id: "4",
    name: "Bar e Restaurante Oásis",
    score: "B",
    faturamento: 18500,
    ultimaCompra: "2024-01-10",
    frequencia: "Quinzenal",
    vendedor: "Carlos Lima"
  },
  {
    id: "5",
    name: "Mercadinho São José",
    score: "C",
    faturamento: 12000,
    ultimaCompra: "2024-01-08",
    frequencia: "Mensal",
    vendedor: "Maria Santos"
  }
];

interface ClientsTableProps {
  detailed?: boolean;
}

export function ClientsTable({ detailed = false }: ClientsTableProps) {
  const getScoreBadgeVariant = (score: "A" | "B" | "C") => {
    switch (score) {
      case "A": return "default";
      case "B": return "secondary";
      case "C": return "outline";
      default: return "outline";
    }
  };

  if (!detailed) {
    return (
      <div className="space-y-3">
        {clients.slice(0, 5).map((client) => (
          <div key={client.id} className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{client.name}</p>
              <p className="text-xs text-muted-foreground">
                R$ {client.faturamento.toLocaleString('pt-BR')}
              </p>
            </div>
            <Badge variant={getScoreBadgeVariant(client.score)}>
              {client.score}
            </Badge>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Faturamento</TableHead>
          <TableHead>Última Compra</TableHead>
          <TableHead>Frequência</TableHead>
          <TableHead>Vendedor</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell>
              <Badge variant={getScoreBadgeVariant(client.score)}>
                {client.score}
              </Badge>
            </TableCell>
            <TableCell>R$ {client.faturamento.toLocaleString('pt-BR')}</TableCell>
            <TableCell>{new Date(client.ultimaCompra).toLocaleDateString('pt-BR')}</TableCell>
            <TableCell>{client.frequencia}</TableCell>
            <TableCell>{client.vendedor}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}