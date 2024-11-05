package com.exam.tictactoe.model;

import jakarta.persistence.*;
import lombok.Builder;

@Builder
@Entity
@Table(name = "resultados")
public class Resultado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_partida", nullable = false, unique = true, length = 15)
    private String nombrePartida;

    @Column(name = "nombre_jugador_1", nullable = false, length = 15)
    private String nombreJugador1;

    @Column(name = "nombre_jugador_2", nullable = false, length = 15)
    private String nombreJugador2;

    @Column(name = "ganador", nullable = false, length = 15)
    private String ganador;

    @Column(name = "punto", nullable = false)
    private Integer punto;

    @Column(name = "estado", nullable = false, length = 15)
    private String estado;

    public Resultado() {}

    public Resultado(Long id, String nombrePartida, String nombreJugador1, String nombreJugador2,
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
