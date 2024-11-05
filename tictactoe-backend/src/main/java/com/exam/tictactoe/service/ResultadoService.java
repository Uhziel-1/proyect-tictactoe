package com.exam.tictactoe.service;

import com.exam.tictactoe.dtos.ResultadoDTO;
import com.exam.tictactoe.model.Resultado;
import org.springframework.data.jpa.repository.Query;

public interface ResultadoService extends GenericCrudService<Resultado, Long> {

    public ResultadoDTO guardar(ResultadoDTO dto);

    @Query(value = "SELECT * FROM resultados ORDER BY resultados.id DESC LIMIT 1", nativeQuery = true)
    public ResultadoDTO findLast();
}
