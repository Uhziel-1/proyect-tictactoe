package com.exam.tictactoe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
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

}
