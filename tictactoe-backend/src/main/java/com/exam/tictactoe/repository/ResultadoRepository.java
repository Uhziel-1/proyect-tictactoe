package com.exam.tictactoe.repository;

import com.exam.tictactoe.model.Resultado;
import org.springframework.data.jpa.repository.Query;

public interface ResultadoRepository extends GenericCrudRepository<Resultado, Long> {
    @Query(value = "SELECT * FROM resultados ORDER BY resultados.id DESC LIMIT 1", nativeQuery = true)
    Resultado findFirstByOrderByIdDesc();
}
