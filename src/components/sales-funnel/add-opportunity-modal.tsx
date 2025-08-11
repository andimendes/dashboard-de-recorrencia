"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddOpportunityModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddOpportunityModal({ open, onClose }: AddOpportunityModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    value: "",
    vendedor: "",
    stage: "prospects",
    probability: "25",
    notes: ""
  });

  const vendedores = [
    "João Silva",
    "Maria Santos", 
    "Carlos Lima",
    "Ana Costa"
  ];

  const stages = [
    { value: "prospects", label: "Prospects" },
    { value: "first-contact", label: "Primeiro Contato" },
    { value: "proposal-sent", label: "Proposta Enviada" },
    { value: "negotiation", label: "Negociação" },
    { value: "closing", label: "Fechamento" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova oportunidade:", formData);
    // Aqui seria feita a integração com o backend
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Oportunidade</DialogTitle>
          <DialogDescription>
            Cadastre uma nova oportunidade no funil de vendas
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Restaurante Novo Sabor"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contato Principal *</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                placeholder="Nome do responsável"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="contato@empresa.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Valor Estimado *</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                placeholder="15000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendedor">Vendedor Responsável *</Label>
              <Select value={formData.vendedor} onValueChange={(value) => setFormData(prev => ({ ...prev, vendedor: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {vendedores.map((vendedor) => (
                    <SelectItem key={vendedor} value={vendedor}>
                      {vendedor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Estágio Inicial</Label>
              <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estágio" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="probability">Probabilidade (%)</Label>
              <Select value={formData.probability} onValueChange={(value) => setFormData(prev => ({ ...prev, probability: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a probabilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10% - Muito baixa</SelectItem>
                  <SelectItem value="25">25% - Baixa</SelectItem>
                  <SelectItem value="50">50% - Média</SelectItem>
                  <SelectItem value="75">75% - Alta</SelectItem>
                  <SelectItem value="90">90% - Muito alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações Iniciais</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Informações importantes sobre esta oportunidade..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Oportunidade
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}