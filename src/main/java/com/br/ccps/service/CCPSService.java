package com.br.ccps.service;

import org.springframework.stereotype.Service;

import com.br.ccps.model.CCPS;
import com.br.ccps.repos.CCPSRepository;

import java.util.List;

@Service
public class CCPSService {
    
    private final CCPSRepository ccpsRepository;

    public CCPSService(CCPSRepository ccpsRepository) {
        this.ccpsRepository = ccpsRepository;
    }

    public List<CCPS> listarTodos() {
        return ccpsRepository.findAll();
    }

    public CCPS salvar(CCPS ccps) {
        return ccpsRepository.save(ccps);
    }

    public void deletar(Long id) {
        ccpsRepository.deleteById(id);
    }
}
