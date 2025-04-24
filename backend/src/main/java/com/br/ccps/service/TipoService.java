package com.br.ccps.service;

import com.br.ccps.model.Tipo;
import com.br.ccps.records.TipoRecordDto;
import com.br.ccps.repos.TipoRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TipoService {

    @Autowired
    private TipoRepository tipoRepository;

    public Tipo adicionarTipo(TipoRecordDto dto) {
        Tipo tipo = new Tipo();
        BeanUtils.copyProperties(dto, tipo);
        return tipoRepository.save(tipo);
    }

    public List<Tipo> listarTodos() {
        return tipoRepository.findAll();
    }

    public Tipo buscarPorId(UUID id) {
        return tipoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tipo não encontrado"));
    }

    public Tipo atualizarTipo(UUID id, TipoRecordDto dto) {
        Tipo tipoExistente = buscarPorId(id);
        BeanUtils.copyProperties(dto, tipoExistente, "id");
        return tipoRepository.save(tipoExistente);
    }

    public void deletarTipo(UUID id) {
        tipoRepository.deleteById(id);
    }
}
