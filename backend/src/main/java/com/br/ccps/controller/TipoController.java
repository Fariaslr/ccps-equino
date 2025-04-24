package com.br.ccps.controller;

import com.br.ccps.model.Tipo;
import com.br.ccps.records.TipoRecordDto;
import com.br.ccps.service.TipoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tipos")
public class TipoController {

    @Autowired
    private TipoService tipoService;

    @PostMapping
    public ResponseEntity<Tipo> criar(@RequestBody TipoRecordDto dto) {
        Tipo novoTipo = tipoService.adicionarTipo(dto);
        return ResponseEntity.ok(novoTipo);
    }

    @GetMapping
    public ResponseEntity<List<Tipo>> listar() {
        return ResponseEntity.ok(tipoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tipo> buscar(@PathVariable UUID id) {
        return ResponseEntity.ok(tipoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tipo> atualizar(@PathVariable UUID id, @RequestBody TipoRecordDto dto) {
        return ResponseEntity.ok(tipoService.atualizarTipo(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        tipoService.deletarTipo(id);
        return ResponseEntity.noContent().build();
    }
}
