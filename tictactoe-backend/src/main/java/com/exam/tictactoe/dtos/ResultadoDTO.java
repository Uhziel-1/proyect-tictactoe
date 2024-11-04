package com.exam.tictactoe.dtos;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResultadoDTO {

    private Long id;

    // @NotBlank(message = "No puede estar en Blanco")
    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String nombrePartida;

    // @NotBlank(message = "No puede estar en Blanco")
    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String nombreJugador1;

    // @NotBlank(message = "No puede estar en Blanco")
    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String nombreJugador2;

    // @NotBlank(message = "No puede estar en Blanco")
    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String ganador;

    @NotNull(message = "No puede ser Nulo")
    private Integer punto;

    // @NotBlank(message = "No puede estar en Blanco")
    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String estado;

}
