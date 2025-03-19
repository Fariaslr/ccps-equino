package com.br.ccps.repos;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.ccps.model.Tipo;

public interface TipoRepository extends JpaRepository<Tipo, UUID> {
}
