package com.exam.tictactoe.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ResultadoDTO {

    private Long id;

    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String nombrePartida;

    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String nombreJugador1;

    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String nombreJugador2;

    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String ganador;

    @NotNull(message = "No puede ser Nulo")
    private Integer punto;

    @NotNull(message = "No puede ser Nulo")
    @Size(min = 5, max = 15, message = "Caracteres, minimo 5, maximo 15")
    private String estado;

    public ResultadoDTO() {}

    public ResultadoDTO(Long id, String nombrePartida, String nombreJugador1, String nombreJugador2,
                     String ganador, Integer punto, String estado) {
        this.id = id;
        this.nombrePartida = nombrePartida;
        this.nombreJugador1 = nombreJugador1;
        this.nombreJugador2 = nombreJugador2;
        this.ganador = ganador;
        this.punto = punto;
        this.estado = estado;
    }

    // Métodos Getters y Setters (simula @Data)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePartida() {
        return nombrePartida;
    }

    public void setNombrePartida(String nombrePartida) {
        this.nombrePartida = nombrePartida;
    }

    public String getNombreJugador1() {
        return nombreJugador1;
    }

    public void setNombreJugador1(String nombreJugador1) {
        this.nombreJugador1 = nombreJugador1;
    }

    public String getNombreJugador2() {
        return nombreJugador2;
    }

    public void setNombreJugador2(String nombreJugador2) {
        this.nombreJugador2 = nombreJugador2;
    }

    public String getGanador() {
        return ganador;
    }

    public void setGanador(String ganador) {
        this.ganador = ganador;
    }

    public Integer getPunto() {
        return punto;
    }

    public void setPunto(Integer punto) {
        this.punto = punto;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
