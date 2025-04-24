package com.br.ccps.controller;

import com.br.ccps.model.Operacao;
import com.br.ccps.records.OperacaoRecordDto;
import com.br.ccps.service.OperacaoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/operacoes")
public class OperacaoController {

    @Autowired
    private OperacaoService operacaoService;

    @PostMapping
    public ResponseEntity<Operacao> adicionar(@RequestBody OperacaoRecordDto dto) {
        return ResponseEntity.ok(operacaoService.adicionarOperacao(dto));
    }

    @GetMapping
    public ResponseEntity<List<Operacao>> listar() {
        return ResponseEntity.ok(operacaoService.listarOperacoes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Operacao> buscar(@PathVariable UUID id) {
        return ResponseEntity.ok(operacaoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Operacao> atualizar(@PathVariable UUID id, @RequestBody OperacaoRecordDto dto) {
        return ResponseEntity.ok(operacaoService.atualizarOperacao(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        operacaoService.deletarOperacao(id);
        return ResponseEntity.noContent().build();
    }
}
