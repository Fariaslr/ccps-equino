package com.br.ccps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.br.ccps.model.Ccps;
import com.br.ccps.records.CcpsRecordDto;
import com.br.ccps.service.CcpsService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ccps")
public class CcpsController {

	@Autowired
	private CcpsService ccpsService;

	@PostMapping
	public ResponseEntity<Ccps> criarCcps(@RequestBody CcpsRecordDto ccpsDto) {
		System.out.println("Recebido: " + ccpsDto);
		Ccps ccpsCriado = ccpsService.adicionarCcps(ccpsDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(ccpsCriado);
	}

	@GetMapping
	public ResponseEntity<List<Ccps>> listarCcps() {
		List<Ccps> centros = ccpsService.listarTodosOsCcps();
		return ResponseEntity.ok(centros);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Ccps> buscarCcpsPorId(@PathVariable UUID id) {
		Ccps centro = ccpsService.buscarCcpsPorId(id);
		return ResponseEntity.ok(centro);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Ccps> atualizarCcps(@PathVariable UUID id, @RequestBody CcpsRecordDto ccpsDto) {
		Ccps ccpsAtualizado = ccpsService.atualizarCcps(id, ccpsDto);
		return ResponseEntity.ok(ccpsAtualizado);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletarCcps(@PathVariable UUID id) {
		ccpsService.deletarCcps(id);
		return ResponseEntity.ok("CCPS excluído com sucesso");
	}
}
