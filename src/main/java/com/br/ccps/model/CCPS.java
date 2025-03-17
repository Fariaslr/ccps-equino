package com.br.ccps.model;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "ccps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CCPS {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nome_ccps", nullable = false)
    private String nomeCCPS;

    @Column(nullable = false, unique = true)
    private String cnpj;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String estado;

    @Column(name = "nome_veterinario", nullable = false)
    private String nomeVeterinario;

    @Column(nullable = false)
    private String crmv;

    @Column(nullable = false, unique = true)
    private String email;

    private String telefone;
    
    @Column(name = "codigo_aprovado", unique = true)
    private String codigoAprovado;

    @Column(name = "data_validade")
    private Date dataValidade;
}
