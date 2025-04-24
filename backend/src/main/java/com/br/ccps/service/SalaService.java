package com.br.ccps.service;

import com.br.ccps.model.Sala;
import com.br.ccps.model.Ccps;
import com.br.ccps.model.Tipo;
import com.br.ccps.records.SalaRecordDto;
import com.br.ccps.repos.CCPSRepository;
import com.br.ccps.repos.SalaRepository;
import com.br.ccps.repos.TipoRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SalaService {

    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private CCPSRepository ccpsRepository;

    @Autowired
    private TipoRepository tipoRepository;

    public Sala adicionarSala(SalaRecordDto dto) {
        Sala sala = new Sala();
        BeanUtils.copyProperties(dto, sala, "ccps", "tipo");

        Ccps ccps = ccpsRepository.findById(dto.ccpsId())
                .orElseThrow(() -> new RuntimeException("CCPS não encontrado"));
        Tipo tipo = tipoRepository.findById(dto.tipoId())
                .orElseThrow(() -> new RuntimeException("Tipo de sala não encontrado"));

        sala.setCcps(ccps);
        sala.setTipo(tipo);
        return salaRepository.save(sala);
    }

    public List<Sala> listarTodas() {
        return salaRepository.findAll();
    }

    public Sala buscarPorId(UUID id) {
        return salaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));
    }

    public Sala atualizarSala(UUID id, SalaRecordDto dto) {
        Sala existente = buscarPorId(id);
        BeanUtils.copyProperties(dto, existente, "id", "ccps", "tipo");

        Ccps ccps = ccpsRepository.findById(dto.ccpsId())
                .orElseThrow(() -> new RuntimeException("CCPS não encontrado"));
        Tipo tipo = tipoRepository.findById(dto.tipoId())
                .orElseThrow(() -> new RuntimeException("Tipo de sala não encontrado"));

        existente.setCcps(ccps);
        existente.setTipo(tipo);
        return salaRepository.save(existente);
    }

    public void deletarSala(UUID id) {
        salaRepository.deleteById(id);
    }
}
