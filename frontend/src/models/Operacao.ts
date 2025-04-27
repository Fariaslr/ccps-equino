import { Ccps } from "./Ccps";

export interface Operacao {
  id: string; 
  ccps: Ccps; 
  arquivosProcessosTecnologicos: boolean;
  dataAprovacaoArquivos: string; 
  fluxoOperacionalDefinido: boolean;
  dataAprovacaoFluxo: string; 
  medidasHigienicoSanitariasFuncionarios: boolean;
  dataAprovacaoHigieneFunc: string; 
  medidasHigienicoSanitariasVisitantes: boolean;
  dataAprovacaoHigieneVisit: string; 
  controlePragas: boolean;
  dataAprovacaoControlePragas: string; 
  sistemaEscoamento: boolean;
  dataAprovacaoEscoamento: string;
}