package com.br.ccps.model;

import java.time.LocalDate;
import java.util.UUID;

import com.br.ccps.enums.StatusValidacao;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sala")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_ccps", nullable = false)
    private Ccps ccps;

    @ManyToOne
    @JoinColumn(name = "id_tipo", nullable = false)
    private Tipo tipo;

    @Column(name = "planta")
    private String planta;
    
    private String foto1;
    private String foto2;
    private String foto3;

    @Column(name = "observacao_veterinario")
    private String observacaoVeterinario;

    @Column(name = "observacao_avaliador")
    private String observacaoAvaliador;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_validacao", nullable = false)
    private StatusValidacao statusValidacao;
    
    private LocalDate DataUltimaValidacao;

    @Column(name = "codigo_aprovado", unique = true)
    private String codigoAprovado;

	public Ccps getCcps() {
		return ccps;
	}

	public void setCcps(Ccps ccps) {
		this.ccps = ccps;
	}

	public Tipo getTipo() {
		return tipo;
	}

	public void setTipo(Tipo tipo) {
		this.tipo = tipo;
	}
    
    
}
