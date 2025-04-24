export type Veterinario = {
    id?: string; 
    nome: string;
    crmv: string;
    cpf: string;
    dataNascimento: string; 
    email: string;
    telefone: string;
    ccpsList?: CCPS[];
  };
  
  export type CCPS = {
    id?: string;
    nomeCcps: string;
    cnpj: string;
    cep: string;
    endereco: string;
    cidade: string;
    estado: string;
    codigoAprovado?: string;
    dataValidade?: string;
    veterinarioId: string;
  };
  