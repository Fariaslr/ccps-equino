package com.br.ccps.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
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

	private String nomeCCPS;

	private String cnpj;

	private String endereco;

	private String cidade;

	private String estado;

	private String nomeVeterinario;

	private String crmv;

	private String email;

	private String telefone;

	@Column(name = "codigo_aprovado", unique = true)
	private String codigoAprovado;

	@Column(name = "data_validade")
	private Date dataValidade;
}
