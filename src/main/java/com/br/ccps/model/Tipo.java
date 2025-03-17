package com.br.ccps.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tipo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_tipo", unique = true, nullable = false)
    private String nomeTipo;
}

