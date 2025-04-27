import { Ccps } from "./Ccps";

export type Veterinario = {
    id: string;
    nome: string;
    crmv: string;
    cpf: string;
    dataNascimento: string; 
    email: string;
    senha: string;
    telefone: string;
    ccpsList: Ccps[];
  }