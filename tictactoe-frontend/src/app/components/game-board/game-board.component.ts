import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {ActivatedRoute} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {Resultado} from '../../model/Resultado';
import {switchMap} from 'rxjs';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {

  form!: FormGroup;
  id: number | null = null;  // Inicializamos id como null
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
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
    if (this.isEdit && this.id !== null) {
      this.gameService.findById(this.id).subscribe(data => {
        if (data) {
          // Usamos patchValue para evitar errores de referencia
          this.form.patchValue({
            id: data.id,
            nombrePartida: data.nombrePartida,
            nombreJugador1: data.nombreJugador1,
            nombreJugador2: data.nombreJugador2,
          });
        }
      })
    }
  }

  operate() {
    const resultado: Resultado = new Resultado();
    resultado.id = this.form.value['id'];
    resultado.nombrePartida = this.form.value['nombrePartida'];
    resultado.nombreJugador1 = this.form.value['nombreJugador1'];
    resultado.nombreJugador2 = this.form.value['nombreJugador2'];

    resultado.ganador = 'Sin Ganador';
    resultado.punto = 0;
    resultado.estado = 'Jugando';

    if (this.isEdit && resultado.id !== null) {
      this.gameService.update(resultado.id, resultado).subscribe(() => {
        this.gameService.findAll();
        this.gameService.resultados$.subscribe(data => {
          this.gameService.setMessageChange('UPDATE!')
          this.initForm();
        });
      });
    } else {
      this.gameService.save(resultado)
        .pipe(switchMap(() => this.gameService.resultados$))
        .subscribe(data => {
          this.gameService.findLast().subscribe((lastResultado) => {
            console.log('Last Resultado ID:', lastResultado.id);
            this.form.patchValue({
              id: lastResultado.id,
            });
            console.log('Formulario actualizado:', this.form.value);

          });
          this.gameService.setMessageChange('CREATED!')
          this.initForm();
        });
    }
  }

  anular() {
    const resultado: Resultado = {
      id: this.form.value['id'],
      nombrePartida: this.form.value['nombrePartida'],
      nombreJugador1: this.form.value['nombreJugador1'],
      nombreJugador2: this.form.value['nombreJugador2'],
      ganador: '-----',
      punto: 0,
      estado: 'Anulado'
    };

    if (resultado.id !== null) {  // Solo intentamos anular si hay un id válido
      this.gameService.update(resultado.id, resultado).subscribe(() => {
        this.gameService.findAll();
        this.gameService.resultados$.subscribe(() => {
          this.gameService.setMessageChange('ANULADO!');
          this.initForm();  // Refresca el formulario tras anular
        });
      });
    }
  }

  get f(){
    return this.form.controls;
  }

}
