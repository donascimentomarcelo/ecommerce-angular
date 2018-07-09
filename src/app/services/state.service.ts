import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateDTO } from '../models/state.dto';

@Injectable({
  providedIn: 'root'
})
export class StateService {

constructor(
    private http: HttpClient,) { }

    getStateAPI(): Observable<StateDTO[]>
    {
      return this.http.get<StateDTO[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    }
}
