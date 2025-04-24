package com.br.ccps.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "operacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Operacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_ccps", nullable = false)
    private Ccps ccps;

    private boolean arquivosProcessosTecnologicos;
    private Date dataAprovacaoArquivos;

    private boolean fluxoOperacionalDefinido;
    private Date dataAprovacaoFluxo;

    private boolean medidasHigienicoSanitariasFuncionarios;
    private Date dataAprovacaoHigieneFunc;

    private boolean medidasHigienicoSanitariasVisitantes;
    private Date dataAprovacaoHigieneVisit;

    private boolean controlePragas;
    private Date dataAprovacaoControlePragas;

    private boolean sistemaEscoamento;
    private Date dataAprovacaoEscoamento;
    
    public void setCcps(Ccps ccps) {
        this.ccps = ccps;
    }

}

