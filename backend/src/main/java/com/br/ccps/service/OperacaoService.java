package com.br.ccps.service;

import com.br.ccps.model.Ccps;
import com.br.ccps.model.Operacao;
import com.br.ccps.records.OperacaoRecordDto;
import com.br.ccps.repos.CCPSRepository;
import com.br.ccps.repos.OperacaoRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OperacaoService {

    @Autowired
    private OperacaoRepository operacaoRepository;

    @Autowired
    private CCPSRepository ccpsRepository;

    public Operacao adicionarOperacao(OperacaoRecordDto dto) {
        Operacao operacao = new Operacao();
        Ccps ccps = ccpsRepository.findById(dto.ccpsId())
                .orElseThrow(() -> new RuntimeException("CCPS não encontrado"));

        operacao.setCcps(ccps);
        BeanUtils.copyProperties(dto, operacao, "ccpsId");

        return operacaoRepository.save(operacao);
    }

    public List<Operacao> listarOperacoes() {
        return operacaoRepository.findAll();
    }

    public Operacao buscarPorId(UUID id) {
        return operacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operação não encontrada"));
    }

    public Operacao atualizarOperacao(UUID id, OperacaoRecordDto dto) {
        Operacao operacaoExistente = buscarPorId(id);
        Ccps ccps = ccpsRepository.findById(dto.ccpsId())
                .orElseThrow(() -> new RuntimeException("CCPS não encontrado"));

        operacaoExistente.setCcps(ccps);
        BeanUtils.copyProperties(dto, operacaoExistente, "id", "ccpsId");

        return operacaoRepository.save(operacaoExistente);
    }

    public void deletarOperacao(UUID id) {
        operacaoRepository.deleteById(id);
    }
}
