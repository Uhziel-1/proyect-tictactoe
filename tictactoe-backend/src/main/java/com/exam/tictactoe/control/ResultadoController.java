package com.exam.tictactoe.control;


import com.exam.tictactoe.dtos.ResultadoDTO;
import com.exam.tictactoe.mappers.ResultadoMapper;
import com.exam.tictactoe.model.Resultado;
import com.exam.tictactoe.service.ResultadoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/partida")
@CrossOrigin("*")
public class ResultadoController {
    private static final Logger logger = LoggerFactory.getLogger(ResultadoController.class);

    private final ResultadoService resultadoService;
    private final ResultadoMapper resultadoMapper;

    @GetMapping
    public ResponseEntity<List<ResultadoDTO>> findAll() {
        List<ResultadoDTO> list = resultadoMapper.toDTOs(resultadoService.findAll());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultadoDTO> findById(@PathVariable("id") Long id) {
        Resultado obj = resultadoService.findById(id);
        return ResponseEntity.ok(resultadoMapper.toDTO(obj));
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody ResultadoDTO dto) {
        logger.info("Recibiendo datos para guardar: {}", dto);
        resultadoService.guardar(dto);
        Resultado obj = resultadoService.save(resultadoMapper.toEntity(dto));
        // logger.info("Entidad mapeada: {}", obj);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResultadoDTO> update(@Valid @PathVariable("id") Long id, @RequestBody ResultadoDTO dto) {
        dto.setId(id);
        Resultado obj =resultadoService.update(id, resultadoMapper.toEntity(dto));
        return ResponseEntity.ok(resultadoMapper.toDTO(obj));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        resultadoService.delete((id));
        return ResponseEntity.noContent().build();
    }
}
