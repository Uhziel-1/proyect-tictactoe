import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {ActivatedRoute} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {Resultado} from '../../model/Resultado';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idResultado: new FormControl(0),
      nombrePartida: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      nombreJugador1: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      nombreJugador2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    })

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['isEdit'] != null;
      this.initForm();
    })
  }

  initForm(): void {
    if (this.isEdit) {
      this.gameService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idResultado: new FormControl(data.idResultado),
          nombrePartida: new FormControl(data.nombrePartida),
          nombreJugador1: new FormControl(data.nombreJugador1),
          nombreJugador2: new FormControl(data.nombreJugador2),
        })
      })
    }
  }

  operate() {
    const resultado: Resultado = new Resultado();
    resultado.idResultado = this.form.value['idResultado'];
    resultado.nombrePartida = this.form.value['nombrePartida'];
    resultado.nombreJugador1 = this.form.value['nombreJugador1'];
    resultado.nombreJugador2 = this.form.value['nombreJugador2'];

    resultado.ganador = 'Sin Ganador';
    resultado.punto = 0;
    resultado.estado = 'Jugando';

    if (this.isEdit) {
      this.gameService.update(this.id, resultado).subscribe(() => {
        this.gameService.findAll();
        this.gameService.resultados$.subscribe(data => {
          this.gameService.setMessageChange('UPDATE!')
        });
      });
    } else {
      this.gameService.save(resultado)
        .pipe(switchMap(() => this.gameService.resultados$))
        .subscribe(data => {
          this.gameService.setMessageChange('CREATED!')
        })
    }
  }

  get f(){
    return this.form.controls;
  }

}
