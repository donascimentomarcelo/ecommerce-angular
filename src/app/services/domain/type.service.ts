import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TypeDTO } from '../../models/type.dto';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  list(): Observable<TypeDTO[]>
  {
    return this.http.get<TypeDTO[]>(`${environment.api_url}/types/getActives`);
  };
}