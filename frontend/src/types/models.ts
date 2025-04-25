export interface Tipo {
  id: string;
  nomeTipo: string;
}
export interface Veterinario {
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
export interface Ccps {
  id: string; 
  nomeCcps: string;
  cnpj: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  veterinario: Veterinario; // Relacionamento com Veterinario
  codigoAprovado: string;
  dataValidade: string; // data em formato ISO 8601
}
export interface Operacao {
  id: string; // UUID
  ccps: Ccps; // Relacionamento com Ccps
  arquivosProcessosTecnologicos: boolean;
  dataAprovacaoArquivos: string; // data em formato ISO 8601
  fluxoOperacionalDefinido: boolean;
  dataAprovacaoFluxo: string; // data em formato ISO 8601
  medidasHigienicoSanitariasFuncionarios: boolean;
  dataAprovacaoHigieneFunc: string; // data em formato ISO 8601
  medidasHigienicoSanitariasVisitantes: boolean;
  dataAprovacaoHigieneVisit: string; // data em formato ISO 8601
  controlePragas: boolean;
  dataAprovacaoControlePragas: string; // data em formato ISO 8601
  sistemaEscoamento: boolean;
  dataAprovacaoEscoamento: string; // data em formato ISO 8601
}
export interface Sala {
  id: string; // UUID
  ccps: Ccps; // Relacionamento com Ccps
  tipo: Tipo; // Relacionamento com Tipo
  planta: string;
  foto1: string;
  foto2: string;
  foto3: string;
  observacaoVeterinario: string;
  observacaoAvaliador: string;
  statusValidacao: 'SUBMETIDO' | 'EM_AVALIACAO' | 'EM_DILIGENCIA' | 'APROVADO' | 'REPROVADO';
  dataUltimaValidacao: string; // data em formato ISO 8601
  codigoAprovado: string;
}
