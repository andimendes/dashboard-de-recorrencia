"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddClientModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddClientModal({ open, onClose }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    telefone: "",
    email: "",
    endereco: "",
    vendedor: "",
    score: "",
    frequencia: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo cliente:", formData);
    // Aqui seria implementada a lógica de salvamento
    onClose();
    setFormData({
      name: "",
      cnpj: "",
      telefone: "",
      email: "",
      endereco: "",
      vendedor: "",
      score: "",
      frequencia: "",
      observacoes: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>
            Adicione um novo cliente à sua base
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome/Razão Social *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Ex: Supermercado Central"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => handleChange("cnpj", e.target.value)}
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleChange("telefone", e.target.value)}
                    placeholder="(16) 99999-9999"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="contato@cliente.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleChange("endereco", e.target.value)}
                  placeholder="Rua, número, bairro, cidade - CEP"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Comerciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vendedor">Vendedor Responsável *</Label>
                  <Select value={formData.vendedor} onValueChange={(value) => handleChange("vendedor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="maria">Maria Santos</SelectItem>
                      <SelectItem value="carlos">Carlos Lima</SelectItem>
                      <SelectItem value="ana">Ana Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="score">Score Inicial</Label>
                  <Select value={formData.score} onValueChange={(value) => handleChange("score", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Definir score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Score A - Alto potencial</SelectItem>
                      <SelectItem value="B">Score B - Médio potencial</SelectItem>
                      <SelectItem value="C">Score C - Baixo potencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequencia">Frequência de Compra Esperada</Label>
                <Select value={formData.frequencia} onValueChange={(value) => handleChange("frequencia", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quinzenal">Quinzenal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="bimestral">Bimestral</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleChange("observacoes", e.target.value)}
                  placeholder="Informações adicionais sobre o cliente..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Cliente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}