"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddLeadModal({ open, onClose }: AddLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    source: "",
    vendedor: "",
    notes: ""
  });

  const sources = [
    "Site",
    "Indicação",
    "Feira",
    "Telemarketing",
    "Redes Sociais",
    "Outros"
  ];

  const vendedores = [
    "João Silva",
    "Maria Santos", 
    "Carlos Lima",
    "Ana Costa"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo lead:", formData);
    // Aqui seria feita a integração com o backend
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Lead</DialogTitle>
          <DialogDescription>
            Cadastre um novo lead na base de prospecção
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
                placeholder="Ex: Padaria Pão Dourado"
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
              <Label htmlFor="source">Fonte do Lead *</Label>
              <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Como conheceu a empresa?" />
                </SelectTrigger>
                <SelectContent>
                  {sources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações Iniciais</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Informações importantes sobre este lead..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Cadastrar Lead
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}