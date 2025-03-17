package com.br.ccps.controller;
import org.springframework.web.bind.annotation.*;

import com.br.ccps.model.CCPS;
import com.br.ccps.service.CCPSService;

import java.util.List;

@RestController
@RequestMapping("/ccps")
public class CCPSController {

    private final CCPSService ccpsService;

    public CCPSController(CCPSService ccpsService) {
        this.ccpsService = ccpsService;
    }

    @GetMapping
    public List<CCPS> listarTodos() {
        return ccpsService.listarTodos();
    }

    @PostMapping
    public CCPS criar(@RequestBody CCPS ccps) {
        return ccpsService.salvar(ccps);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        ccpsService.deletar(id);
    }
}

