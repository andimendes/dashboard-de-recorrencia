import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

export function formatCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
  }
  return cnpj;
}

export function calculateDaysBetween(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getClientScore(faturamento: number, pmp: number, frequencia: string): "A" | "B" | "C" {
  let score = 0;
  
  // Faturamento (40%)
  if (faturamento >= 40000) score += 40;
  else if (faturamento >= 20000) score += 30;
  else if (faturamento >= 10000) score += 20;
  else score += 10;
  
  // PMP (30%)
  if (pmp <= 15) score += 30;
  else if (pmp <= 30) score += 20;
  else if (pmp <= 45) score += 10;
  else score += 5;
  
  // Frequência (20%)
  if (frequencia === "Semanal") score += 20;
  else if (frequencia === "Quinzenal") score += 15;
  else if (frequencia === "Mensal") score += 10;
  else score += 5;
  
  // Mix de produtos (10%) - simplificado
  score += 10;
  
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  return "C";
}