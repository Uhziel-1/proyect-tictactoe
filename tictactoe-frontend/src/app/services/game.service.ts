import { Injectable } from '@angular/core';
import {Resultado} from '../model/Resultado';
import {GenericService} from './generic.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GameService extends GenericService<Resultado> {

  private resultadoSubject = new BehaviorSubject<Resultado[]>([]);
  private messageChange: Subject<string> = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/partida`);
  }

  setUnidadMedidaChange(data: Resultado[]) {
    this.resultadoSubject.next(data);
  }

  getUnidadMedidaChange() {
    return this.resultadoSubject.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

}
