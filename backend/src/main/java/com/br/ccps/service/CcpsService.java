package com.br.ccps.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.ccps.model.Ccps;
import com.br.ccps.records.CcpsRecordDto;
import com.br.ccps.repos.CCPSRepository;

import java.util.List;
import java.util.UUID;

@Service
public class CcpsService {

	@Autowired
	private CCPSRepository ccpsRepository;

	public Ccps adicionarCcps(CcpsRecordDto ccpsDto) {
		Ccps ccps = new Ccps();
		BeanUtils.copyProperties(ccpsDto, ccps);
		return ccpsRepository.save(ccps);
	}

	public List<Ccps> listarTodosOsCcps() {
		return ccpsRepository.findAll();
	}

	public Ccps buscarCcpsPorId(UUID id) {
		return ccpsRepository.findById(id).orElseThrow(() -> new RuntimeException("CCPS não encontrado"));
	}

	public Ccps atualizarCcps(UUID id, CcpsRecordDto ccpsDto) {
		Ccps ccpsExistente = buscarCcpsPorId(id);
		BeanUtils.copyProperties(ccpsDto, ccpsExistente, "id");
		return ccpsRepository.save(ccpsExistente);
	}

	public void deletarCcps(UUID id) {
		ccpsRepository.deleteById(id);
	}
}
