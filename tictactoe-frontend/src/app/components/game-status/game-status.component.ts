import {Component, OnInit} from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {MatTableDataSource} from '@angular/material/table';
import {Resultado} from '../../model/Resultado';
import {GameService} from '../../services/game.service';
import {MaterialModule} from '../../material/material.module';

@Component({
  selector: 'app-game-status',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.css'
})
export class GameStatusComponent implements OnInit {

  displayedColumns: string[] = ['gameNumber', 'jugador1', 'jugador2', 'winner', 'punto', 'estado'];
  gameHistory = new MatTableDataSource<Resultado>([]);

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGameHistory();
  }

  loadGameHistory() {
    this.gameService.findAll().subscribe(
      (data: Resultado[]) => {
        this.gameHistory.data = data;
      },
      (error) => {
        console.error('Error al cargar el historial de partidas:', error);
      }
    );
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Historial de Partidas de Tres en Raya', 10, 10);
    (doc as any).autoTable({
      head: [['# Partida', 'Jugador 1', 'Jugador 2', 'Ganador', 'Puntaje', 'Estado']],
      body: this.gameHistory.data.map((game, index) => [
        index + 1,
        game.nombreJugador1,
        game.nombreJugador2,
        game.ganador,
        game.punto,
        game.estado
      ]),
    });
    doc.save('game_history.pdf');
  }
}
