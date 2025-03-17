package com.br.ccps.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.ccps.model.Operacao;

public interface OperacaoRepository extends JpaRepository<Operacao, Long> {
}
