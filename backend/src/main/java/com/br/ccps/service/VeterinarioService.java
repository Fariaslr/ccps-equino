package com.br.ccps.service;

import com.br.ccps.model.Veterinario;
import com.br.ccps.records.VeterinarioRecordDto;
import com.br.ccps.repos.VeterinarioRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VeterinarioService {

    @Autowired
    private VeterinarioRepository veterinarioRepository;

    public Veterinario adicionarVeterinario(VeterinarioRecordDto dto) {
        Veterinario veterinario = new Veterinario();
        BeanUtils.copyProperties(dto, veterinario);
        return veterinarioRepository.save(veterinario);
    }

    public List<Veterinario> listarTodosVeterinarios() {
        return veterinarioRepository.findAll();
    }

    public Veterinario buscarVeterinarioPorId(UUID id) {
        return veterinarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinário não encontrado"));
    }

    public Veterinario atualizarVeterinario(UUID id, VeterinarioRecordDto dto) {
        Veterinario existente = buscarVeterinarioPorId(id);
        BeanUtils.copyProperties(dto, existente, "id");
        return veterinarioRepository.save(existente);
    }

    public void deletarVeterinario(UUID id) {
        veterinarioRepository.deleteById(id);
    }
}
