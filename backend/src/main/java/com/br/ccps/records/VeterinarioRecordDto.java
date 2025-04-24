package com.br.ccps.records;

import java.time.LocalDate;

public record VeterinarioRecordDto(
    String nome,
    String crmv,
    String cpf,
    LocalDate dataNascimento,
    String email,
    String telefone
) {}
