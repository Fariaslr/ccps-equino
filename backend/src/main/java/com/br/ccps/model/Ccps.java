package com.br.ccps.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

	@Column(name = "nome_veterinario")
	private String nomeVeterinario;

	@NotNull
	private String crmv;

	private String email;

	private String telefone;

	@Column(name = "codigo_aprovado", unique = true)
	private String codigoAprovado;

	@Column(name = "data_validade")
<<<<<<< HEAD
	private Date dataValidade;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getNomeCCPS() {
		return nomeCCPS;
	}

	public void setNomeCCPS(String nomeCCPS) {
		this.nomeCCPS = nomeCCPS;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getNomeVeterinario() {
		return nomeVeterinario;
	}

	public void setNomeVeterinario(String nomeVeterinario) {
		this.nomeVeterinario = nomeVeterinario;
	}

	public String getCrmv() {
		return crmv;
	}

	public void setCrmv(String crmv) {
		this.crmv = crmv;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getCodigoAprovado() {
		return codigoAprovado;
	}

	public void setCodigoAprovado(String codigoAprovado) {
		this.codigoAprovado = codigoAprovado;
	}

	public Date getDataValidade() {
		return dataValidade;
	}

	public void setDataValidade(Date dataValidade) {
		this.dataValidade = dataValidade;
	}
	
=======
	private LocalDate dataValidade;
>>>>>>> 212073780baf554a9d004ec21b123a40ff257ce2
}
