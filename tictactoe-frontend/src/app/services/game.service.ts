import { Injectable } from '@angular/core';
import {Resultado} from '../model/Resultado';
import {environment} from '../../environments/environment.development';
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url: string = `${environment.HOST}/partida`;

  private resultadoSubject = new BehaviorSubject<Resultado[]>([]);
  resultados$ = this.resultadoSubject.asObservable();

  private messageChange: Subject<string> = new Subject<string>;

  constructor(private http: HttpClient) { }

  findAll(): void {
    this.http.get<Resultado[]>(this.url).subscribe(data =>{
      this.resultadoSubject.next(data)
    })
  }

  findById(id: number){
    return this.http.get<Resultado>(this.url+`/${id}`);
  }

  save(resultado: Resultado):Observable<Resultado>{
    return this.http.post<Resultado>(this.url, resultado).pipe(
      tap(() => this.findAll())
    );
  }

  update(id: number, resultado: Resultado):Observable<Resultado>{
    return this.http.put<Resultado>(`${this.url}/${id}`, resultado).pipe(
      tap(() => this.findAll())
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => this.findAll())
    );
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  findLast(): Observable<Resultado> {
    return this.http.get<Resultado>(`${this.url}/last`);
  }
}
