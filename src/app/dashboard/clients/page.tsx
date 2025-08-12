"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Eye, Phone, Mail, TrendingUp, TrendingDown, Users } from "lucide-react";
import { ClientDetailsModal } from "@/components/clients/client-details-modal";
import { AddClientModal } from "@/components/clients/add-client-modal";

type ClientScore = "A" | "B" | "C";

const clients = [
  {
    id: "1",
    name: "Supermercado Central",
    cnpj: "12.345.678/0001-90",
    score: "A" as ClientScore,
    faturamento: 45000,
    ultimaCompra: "2024-01-15",
    frequencia: "Semanal",
    vendedor: "João Silva",
    telefone: "(16) 99999-1234",
    email: "contato@supermercadocentral.com",
    endereco: "Rua das Flores, 123 - Centro",
    pmp: 15,
    produtos: ["Massa de Pastel", "Massa de Lasanha", "Massa de Pizza"]
  },
  {
    id: "2",
    name: "Restaurante Bella Vista",
    cnpj: "98.765.432/0001-10",
    score: "A" as ClientScore,
    faturamento: 38000,
    ultimaCompra: "2024-01-14",
    frequencia: "Quinzenal",
    vendedor: "Maria Santos",
    telefone: "(16) 99999-5678",
    email: "pedidos@bellavista.com",
    endereco: "Av. Principal, 456 - Jardins",
    pmp: 21,
    produtos: ["Massa de Lasanha", "Massa de Pizza"]
  },
  {
    id: "3",
    name: "Lanchonete do Parque",
    cnpj: "11.222.333/0001-44",
    score: "B" as ClientScore,
    faturamento: 22000,
    ultimaCompra: "2024-01-12",
    frequencia: "Mensal",
    vendedor: "João Silva",
    telefone: "(16) 99999-9012",
    email: "lanchonete@parque.com",
    endereco: "Rua do Parque, 789 - Vila Nova",
    pmp: 30,
    produtos: ["Massa de Pastel"]
  },
  {
    id: "4",
    name: "Padaria do Centro",
    cnpj: "22.333.444/0001-55",
    score: "C" as ClientScore,
    faturamento: 15000,
    ultimaCompra: "2024-01-10",
    frequencia: "Bimestral",
    vendedor: "Ana Costa",
    telefone: "(16) 99999-3456",
    email: "padaria@centro.com",
    endereco: "Rua Central, 321 - Centro",
    pmp: 45,
    produtos: ["Massa de Pastel"]
  }
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.cnpj.includes(searchTerm);
    const matchesScore = scoreFilter === "all" || client.score === scoreFilter;
    return matchesSearch && matchesScore;
  });

  const getScoreBadgeVariant = (score: ClientScore) => {
    switch (score) {
      case "A": return "default";
      case "B": return "secondary";
      case "C": return "outline";
      default: return "outline";
    }
  };

  const totalClients = clients.length;
  const scoreAClients = clients.filter(c => c.score === "A").length;
  const scoreBClients = clients.filter(c => c.score === "B").length;
  const scoreCClients = clients.filter(c => c.score === "C").length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Base de Clientes</h2>
          <p className="text-muted-foreground">
            Gestão completa da carteira de clientes
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* KPIs de Clientes */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +2 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Score A</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scoreAClients}</div>
            <p className="text-xs text-muted-foreground">
              {((scoreAClients / totalClients) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Score B</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scoreBClients}</div>
            <p className="text-xs text-muted-foreground">
              {((scoreBClients / totalClients) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Score C</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scoreCClients}</div>
            <p className="text-xs text-muted-foreground">
              {((scoreCClients / totalClients) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou CNPJ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={scoreFilter} onValueChange={setScoreFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por Score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Scores</SelectItem>
                <SelectItem value="A">Score A</SelectItem>
                <SelectItem value="B">Score B</SelectItem>
                <SelectItem value="C">Score C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            {filteredClients.length} clientes encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.cnpj}</p>
                    </div>
                  </TableCell>
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedClient(client)}
                      >
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
        </CardContent>
      </Card>

      {/* Modais */}
      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          open={!!selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

      <AddClientModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}