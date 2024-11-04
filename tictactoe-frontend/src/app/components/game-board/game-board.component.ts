import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Resultado} from '../../model/Resultado';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    MaterialModule,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {

  nombreJugador1: string = '';
  nombreJugador2: string = '';
  board: string[] = Array(9).fill(''); // Tablero vacío de 3x3
  currentPlayer: string = 'X'; // El jugador actual (X o O)
  winner: string | null = null; // Ganador actual
  gameHistory: Resultado[] = []; // Historial de resultados

  ngOnInit() {
    this.resetGame();
  }

  startGame() {
    this.resetGame();
  }

  makeMove(index: number) {
    // Verificar si el juego ya tiene un ganador o si la celda ya está ocupada
    if (this.winner || this.board[index]) return;

    // Marcar la celda con el símbolo del jugador actual
    this.board[index] = this.currentPlayer;

    // Verificar si hay un ganador después de este movimiento
    if (this.checkWinner()) {
      this.winner = this.currentPlayer === 'X' ? this.nombreJugador1 : this.nombreJugador2;
      this.saveGameResult();
    } else if (this.board.every(cell => cell)) {
      // Si no hay celdas vacías y no hay ganador, es empate
      this.winner = 'Empate';
      this.saveGameResult();
    } else {
      // Cambiar de jugador
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
  }

  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
      [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      );
    });
  }

  saveGameResult() {
    // Guardar el resultado en el historial de partidas
    const resultado: Resultado = {
      id: this.gameHistory.length + 1,
      nombrePartida: `Partida #${this.gameHistory.length + 1}`,
      nombreJugador1: this.nombreJugador1,
      nombreJugador2: this.nombreJugador2,
      ganador: this.winner === 'Empate' ? 'Empate' : this.winner!,
      punto: this.winner === 'Empate' ? 0 : 1,
      estado: this.winner === 'Empate' ? 'Empate' : 'Finalizado'
    };

    this.gameHistory.push(resultado);
  }

}
