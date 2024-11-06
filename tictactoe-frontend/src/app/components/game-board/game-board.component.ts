import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {ActivatedRoute} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {Resultado} from '../../model/Resultado';
import {Observable, switchMap} from 'rxjs';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {

  form!: FormGroup;

  board: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  gameStatus: string = '';
  gameInProgress: boolean = false;

  player1Name: string = '';
  player2Name: string = '';

  isAnularDisabled: boolean = true;
  isIniciarDisabled: boolean = false;

  ultimoJuego: boolean = true;
  partida: Resultado | null = null;


  constructor(
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nombrePartida: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      nombreJugador1: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      nombreJugador2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    })
  }

  iniciar() {
    const resultado: Resultado = new Resultado();
    resultado.nombrePartida = this.form.value['nombrePartida'];
    resultado.nombreJugador1 = this.form.value['nombreJugador1'];
    resultado.nombreJugador2 = this.form.value['nombreJugador2'];
    resultado.ganador = 'Sin Ganador';
    resultado.punto = 0;
    resultado.estado = 'Jugando';

    this.gameService.save(resultado).subscribe(() => {
      console.log('Created')
      this.partidaJuego()
    });

    this.player1Name = this.form.value['nombreJugador1'];
    this.player2Name = this.form.value['nombreJugador2'];

    this.resetGame();
    this.gameStatus = 'Jugando';
    this.isIniciarDisabled = true;
    this.isAnularDisabled = false;
    this.gameInProgress = true;
    this.ultimoJuego = false
  }

  makeMove(index: number): void {
    if (!this.gameInProgress || this.board[index]) return;

    this.board[index] = this.currentPlayer;
    if (this.checkWinner()) {
      this.ganador()
    } else if (this.board.every(cell => cell)) {
      this.empate()
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  ganador():void {
    this.findLast().subscribe((ultimoRegistro: Resultado) => {
      ultimoRegistro.ganador = this.currentPlayer === 'X' ? this.player1Name : this.player2Name;
      ultimoRegistro.punto = 10;
      ultimoRegistro.estado = 'Finalizado';
      this.gameStatus = `Ganador: ${ultimoRegistro.ganador}`;
      this.gameService.update(ultimoRegistro.id, ultimoRegistro).subscribe(() => {
        console.log(`Ganador: ${ultimoRegistro.ganador}`);
        this.isIniciarDisabled = false;
        this.isAnularDisabled = true;
        this.resetGame();
        this.ultimoJuego = false
        this.partidaJuego()
      });
    })
    this.clearForm()
  }

  empate():void {
    this.findLast().subscribe((ultimoRegistro: Resultado) => {
      ultimoRegistro.ganador = 'Empate';
      ultimoRegistro.punto = 5;
      ultimoRegistro.estado = 'Finalizado';
      this.gameStatus = 'Empate';
      this.gameService.update(ultimoRegistro.id, ultimoRegistro).subscribe(() => {
        console.log(`Empate`);
        this.isIniciarDisabled = false;
        this.isAnularDisabled = true;
        this.ultimoJuego = false
        this.partidaJuego()
      });
    })
    this.clearForm()
  }

  anular():void {
    this.findLast().subscribe((ultimoRegistro: Resultado) => {
      if (ultimoRegistro.id) {
        ultimoRegistro.ganador = '-----';
        ultimoRegistro.punto = 0;
        ultimoRegistro.estado = 'Anulado';

        this.gameService.update(ultimoRegistro.id, ultimoRegistro).subscribe(() => {
          console.log('Anulado')
          this.gameStatus = 'Juego Anulado';
          this.isIniciarDisabled = false;
          this.isAnularDisabled = true;
          this.ultimoJuego = false
          this.partidaJuego()
        });
      }
      this.clearForm()
    });
  }

  checkWinner(): boolean {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
      pattern.every(index => this.board[index] === this.currentPlayer)
    );
  }

  resetGame() {
    this.board.fill('');
    this.currentPlayer = 'X';
    this.gameInProgress = true;
  }

  clearForm() {
    this.form.patchValue({
      nombrePartida: ''
    });
  }

  get f(){
    return this.form.controls;
  }

  findLast(): Observable<Resultado> {
    return this.gameService.findLast();
  }

  partidaJuego(): void {
    this.findLast().subscribe(resultado => {
      this.partida = resultado;
    });
  }

}
