package com.exam.tictactoe.service.impl;

import com.exam.tictactoe.dtos.ResultadoDTO;
import com.exam.tictactoe.mappers.ResultadoMapper;
import com.exam.tictactoe.model.Resultado;
import com.exam.tictactoe.repository.GenericCrudRepository;
import com.exam.tictactoe.repository.ResultadoRepository;
import com.exam.tictactoe.service.ResultadoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ResultadoServiceImp extends GenericCrudServiceImp<Resultado,Long> implements ResultadoService {
    private final ResultadoMapper resultadoMapper;
    private final ResultadoRepository repo;
    @Override
    protected GenericCrudRepository<Resultado, Long> getRepo(){
        return repo;
    }

    public ResultadoDTO guardar(ResultadoDTO dto) {
        System.out.println(dto);
        Resultado resultado = resultadoMapper.toEntity(dto);
        System.out.println(resultado);
        return null;
    }
}
