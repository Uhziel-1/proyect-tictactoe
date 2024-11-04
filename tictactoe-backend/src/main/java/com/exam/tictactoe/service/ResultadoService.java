package com.exam.tictactoe.service;

import com.exam.tictactoe.dtos.ResultadoDTO;
import com.exam.tictactoe.model.Resultado;

public interface ResultadoService extends GenericCrudService<Resultado, Long> {

    public ResultadoDTO guardar(ResultadoDTO dto);
}
