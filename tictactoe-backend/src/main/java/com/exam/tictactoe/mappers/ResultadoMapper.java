package com.exam.tictactoe.mappers;

import com.exam.tictactoe.dtos.ResultadoDTO;
import com.exam.tictactoe.model.Resultado;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ResultadoMapper extends GenericMapper<ResultadoDTO, Resultado> {

}
