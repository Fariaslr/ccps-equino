package com.br.ccps.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "ccps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ccps {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(name = "nome_ccps")
	private String nomeCcps;

	@Column(length = 18)
	private String cnpj;
	
	@Column(length = 8)
	private String cep;
	
	private String endereco;
		
	private String cidade;

	private String estado;
	
	@ManyToOne
    @JoinColumn(name = "veterinario_id")
    private Veterinario veterinario;

	@Column(name = "codigo_aprovado", unique = true)
	private String codigoAprovado;

	@Column(name = "data_validade")
	private LocalDate dataValidade;

}
