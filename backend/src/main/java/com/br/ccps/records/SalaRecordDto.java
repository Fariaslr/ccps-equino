package com.br.ccps.records;

import com.br.ccps.enums.StatusValidacao;

import java.time.LocalDate;
import java.util.UUID;

public record SalaRecordDto(
    UUID ccpsId,
    UUID tipoId,
    String planta,
    String foto1,
    String foto2,
    String foto3,
    String observacaoVeterinario,
    String observacaoAvaliador,
    StatusValidacao statusValidacao,
    LocalDate dataUltimaValidacao,
    String codigoAprovado
) {}
