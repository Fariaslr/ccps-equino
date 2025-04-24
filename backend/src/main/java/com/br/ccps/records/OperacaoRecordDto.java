package com.br.ccps.records;

import java.util.Date;
import java.util.UUID;

public record OperacaoRecordDto(
    UUID ccpsId,
    boolean arquivosProcessosTecnologicos,
    Date dataAprovacaoArquivos,
    
    boolean fluxoOperacionalDefinido,
    Date dataAprovacaoFluxo,
    
    boolean medidasHigienicoSanitariasFuncionarios,
    Date dataAprovacaoHigieneFunc,
    
    boolean medidasHigienicoSanitariasVisitantes,
    Date dataAprovacaoHigieneVisit,
    
    boolean controlePragas,
    Date dataAprovacaoControlePragas,
    
    boolean sistemaEscoamento,
    Date dataAprovacaoEscoamento
) {}
