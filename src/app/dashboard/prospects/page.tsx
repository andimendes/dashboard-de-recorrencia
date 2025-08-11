"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Phone, Mail, UserPlus, Target, TrendingUp, Clock } from "lucide-react";
import { AddLeadModal } from "@/components/prospects/add-lead-modal";
import { LeadDetailsModal } from "@/components/prospects/lead-details-modal";

const leads = [
  {
    id: "1",
    name: "Padaria Pão Dourado",
    contact: "Roberto Silva",
    phone: "(16) 99999-1111",
    email: "roberto@paodourado.com",
    source: "Indicação",
    status: "Novo",
    vendedor: "João Silva",
    createdAt: "2024-01-15",
    lastContact: null,
    notes: "Interessado em massa de pastel para revenda"
  },
  {
    id: "2",
    name: "Lanchonete Sabor Caseiro",
    contact: "Ana Costa",
    phone: "(16) 99999-2222",
    email: "ana@saborcaseiro.com",
    source: "Site",
    status: "Contatado",
    vendedor: "Maria Santos",
    createdAt: "2024-01-12",
    lastContact: "2024-01-14",
    notes: "Aguardando retorno sobre proposta de massa de pizza"
  },
  {
    id: "3",
    name: "Restaurante Família Unida",
    contact: "Carlos Mendes",
    phone: "(16) 99999-3333",
    email: "carlos@familiaunida.com",
    source: "Feira",
    status: "Qualificado",
    vendedor: "Carlos Lima",
    createdAt: "2024-01-10",
    lastContact: "2024-01-13",
    notes: "Interessado em todos os produtos, aguardando visita"
  },
  {
    id: "4",
    name: "Bar do Centro",
    contact: "Fernanda Oliveira",
    phone: "(16) 99999-4444",
    email: "fernanda@bardocentro.com",
    source: "Indicação",
    status: "Perdido",
    vendedor: "João Silva",
    createdAt: "2024-01-08",
    lastContact: "2024-01-11",
    notes: "Optou por fornecedor local"
  }
];

export default function ProspectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Novo": return "default";
      case "Contatado": return "secondary";
      case "Qualificado": return "outline";
      case "Perdido": return "destructive";
      default: return "outline";
    }
  };

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "Novo").length;
  const qualifiedLeads = leads.filter(l => l.status === "Qualificado").length;
  const conversionRate = totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) : "0";

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Prospecção</h2>
          <p className="text-muted-foreground">
            Gestão de leads e novos prospects
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      {/* KPIs de Prospecção */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              Na base de prospecção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Novos</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newLeads}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando primeiro contato
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualificados</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualifiedLeads}</div>
            <p className="text-xs text-muted-foreground">
              Prontos para oportunidade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Qualificação</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Leads → Qualificados
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Lista de Leads</TabsTrigger>
          <TabsTrigger value="sources">Fontes</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
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
                      placeholder="Buscar por empresa ou contato..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="Novo">Novo</SelectItem>
                    <SelectItem value="Contatado">Contatado</SelectItem>
                    <SelectItem value="Qualificado">Qualificado</SelectItem>
                    <SelectItem value="Perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por Fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Fontes</SelectItem>
                    <SelectItem value="Site">Site</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                    <SelectItem value="Feira">Feira</SelectItem>
                    <SelectItem value="Telemarketing">Telemarketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Leads */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Leads</CardTitle>
              <CardDescription>
                {filteredLeads.length} leads encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Fonte</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Último Contato</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{lead.contact}</p>
                          <p className="text-sm text-muted-foreground">{lead.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(lead.status)}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.vendedor}</TableCell>
                      <TableCell>
                        {lead.lastContact ? 
                          new Date(lead.lastContact).toLocaleDateString('pt-BR') : 
                          "Nunca"
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedLead(lead)}
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
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Fonte</CardTitle>
              <CardDescription>Performance das diferentes fontes de leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Site", "Indicação", "Feira", "Telemarketing"].map((source) => {
                  const sourceLeads = leads.filter(l => l.source === source);
                  const qualifiedFromSource = sourceLeads.filter(l => l.status === "Qualificado").length;
                  const conversionRate = sourceLeads.length > 0 ? 
                    ((qualifiedFromSource / sourceLeads.length) * 100).toFixed(1) : "0";
                  
                  return (
                    <div key={source} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{source}</h3>
                        <p className="text-sm text-muted-foreground">
                          {sourceLeads.length} leads • {qualifiedFromSource} qualificados
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{conversionRate}%</div>
                        <div className="text-sm text-muted-foreground">conversão</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Vendedor</CardTitle>
              <CardDescription>Leads por vendedor e taxa de qualificação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["João Silva", "Maria Santos", "Carlos Lima"].map((vendedor) => {
                  const vendedorLeads = leads.filter(l => l.vendedor === vendedor);
                  const qualifiedByVendedor = vendedorLeads.filter(l => l.status === "Qualificado").length;
                  const conversionRate = vendedorLeads.length > 0 ? 
                    ((qualifiedByVendedor / vendedorLeads.length) * 100).toFixed(1) : "0";
                  
                  return (
                    <div key={vendedor} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{vendedor}</h3>
                        <p className="text-sm text-muted-foreground">
                          {vendedorLeads.length} leads • {qualifiedByVendedor} qualificados
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{conversionRate}%</div>
                        <div className="text-sm text-muted-foreground">qualificação</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modais */}
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          open={!!selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}

      <AddLeadModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}