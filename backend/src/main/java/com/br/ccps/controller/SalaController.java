package com.br.ccps.controller;

import com.br.ccps.model.Sala;
import com.br.ccps.records.SalaRecordDto;
import com.br.ccps.service.SalaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/salas")
public class SalaController {

    @Autowired
    private SalaService salaService;

    @PostMapping
    public ResponseEntity<Sala> criar(@RequestBody SalaRecordDto dto) {
        Sala novaSala = salaService.adicionarSala(dto);
        return ResponseEntity.ok(novaSala);
    }

    @GetMapping
    public ResponseEntity<List<Sala>> listar() {
        return ResponseEntity.ok(salaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sala> buscar(@PathVariable UUID id) {
        return ResponseEntity.ok(salaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sala> atualizar(@PathVariable UUID id, @RequestBody SalaRecordDto dto) {
        return ResponseEntity.ok(salaService.atualizarSala(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        salaService.deletarSala(id);
        return ResponseEntity.noContent().build();
    }
}
