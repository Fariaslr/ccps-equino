import { Veterinario } from "./Veterinario";

export interface Ccps {
    id: string; 
    nomeCcps: string;
    cnpj: string;
    cep: string;
    endereco: string;
    cidade: string;
    estado: string;
    veterinario: Veterinario; 
    codigoAprovado: string;
    dataValidade: string; 
  }