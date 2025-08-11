"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Users, Target, Database, Bell, Shield, Plus, Edit, Trash2 } from "lucide-react";

const vendedores = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@misterottani.com",
    role: "Vendedor",
    territory: "Centro",
    active: true,
    meta: 50000
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@misterottani.com",
    role: "Vendedor",
    territory: "Norte",
    active: true,
    meta: 45000
  },
  {
    id: "3",
    name: "Carlos Lima",
    email: "carlos@misterottani.com",
    role: "Vendedor",
    territory: "Sul",
    active: true,
    meta: 40000
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@misterottani.com",
    role: "Gerente",
    territory: "Todos",
    active: true,
    meta: 200000
  }
];

const produtos = [
  { id: "1", name: "Massa de Pastel", category: "Massas", active: true },
  { id: "2", name: "Massa de Lasanha", category: "Massas", active: true },
  { id: "3", name: "Massa de Pizza", category: "Massas", active: true },
  { id: "4", name: "Massa de Empada", category: "Massas", active: true },
  { id: "5", name: "Massa Folhada", category: "Massas", active: false }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="integration">Integração</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configurações básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input
                    id="company-name"
                    defaultValue="Mister Ottani"
                    placeholder="Nome da empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    defaultValue="12.345.678/0001-90"
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    defaultValue="(16) 3333-4444"
                    placeholder="(00) 0000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contato@misterottani.com"
                    placeholder="contato@empresa.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea
                  id="address"
                  defaultValue="Rua das Indústrias, 123 - Distrito Industrial - Ribeirão Preto/SP"
                  placeholder="Endereço completo da empresa"
                  rows={2}
                />
              </div>
              <Button>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Usuários do Sistema
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </CardTitle>
              <CardDescription>
                Gerencie os usuários e suas permissões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Território</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendedores.map((vendedor) => (
                    <TableRow key={vendedor.id}>
                      <TableCell className="font-medium">{vendedor.name}</TableCell>
                      <TableCell>{vendedor.email}</TableCell>
                      <TableCell>{vendedor.role}</TableCell>
                      <TableCell>{vendedor.territory}</TableCell>
                      <TableCell>
                        <Badge variant={vendedor.active ? "default" : "secondary"}>
                          {vendedor.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Produtos
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </CardTitle>
              <CardDescription>
                Gerencie o catálogo de produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtos.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell className="font-medium">{produto.name}</TableCell>
                      <TableCell>{produto.category}</TableCell>
                      <TableCell>
                        <Badge variant={produto.active ? "default" : "secondary"}>
                          {produto.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Metas de Vendas
              </CardTitle>
              <CardDescription>
                Configure as metas mensais por vendedor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendedores.map((vendedor) => (
                  <div key={vendedor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{vendedor.name}</h3>
                      <p className="text-sm text-muted-foreground">{vendedor.role} - {vendedor.territory}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Meta Atual</p>
                        <p className="text-lg font-bold">R$ {vendedor.meta.toLocaleString('pt-BR')}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure as notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Clientes Atrasados</h3>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando clientes passam do ciclo de compra
                    </p>
                  </div>
                  <Select defaultValue="email">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="push">Push</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                      <SelectItem value="none">Desabilitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Novas Oportunidades</h3>
                    <p className="text-sm text-muted-foreground">
                      Notificar sobre novas oportunidades no funil
                    </p>
                  </div>
                  <Select defaultValue="push">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="push">Push</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                      <SelectItem value="none">Desabilitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Metas Atingidas</h3>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando vendedores atingem suas metas
                    </p>
                  </div>
                  <Select defaultValue="both">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="push">Push</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                      <SelectItem value="none">Desabilitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Relatórios Semanais</h3>
                    <p className="text-sm text-muted-foreground">
                      Enviar relatório semanal de performance
                    </p>
                  </div>
                  <Select defaultValue="email">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="push">Push</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                      <SelectItem value="none">Desabilitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Integração com Sankhya ERP
              </CardTitle>
              <CardDescription>
                Configure a integração com o sistema ERP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="erp-url">URL do Sankhya</Label>
                  <Input
                    id="erp-url"
                    placeholder="https://sankhya.misterottani.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="erp-user">Usuário</Label>
                  <Input
                    id="erp-user"
                    placeholder="usuario_integracao"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="erp-password">Senha</Label>
                  <Input
                    id="erp-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sync-frequency">Frequência de Sincronização</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Tempo Real</SelectItem>
                      <SelectItem value="hourly">A cada hora</SelectItem>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Status da Integração</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Conectado - Última sincronização: Hoje às 14:30</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Salvar Configurações</Button>
                <Button variant="outline">Testar Conexão</Button>
                <Button variant="outline">Sincronizar Agora</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}