import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZipcodeDTO } from '../models/zipcode.dto';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {

constructor(private http: HttpClient) { }

  getZipcodeAPI(zipcode: string): Observable<ZipcodeDTO>
  {
    return this.http.get<ZipcodeDTO>(`https://viacep.com.br/ws/${zipcode}/json/`);
  };
}
