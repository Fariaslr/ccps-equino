package com.br.ccps.records;

import jakarta.validation.constraints.NotBlank;

public record CcpsRecordDto(
	    @NotBlank String nomeCCPS,
	    @NotBlank String cnpj,
	    @NotBlank String endereco,
	    @NotBlank String cidade,
	    @NotBlank String estado,
	    @NotBlank String nomeVeterinario,
	    @NotBlank String crmv,
	    @NotBlank String email,
	    String telefone
	) {}

