import { UserDTO } from './../../models/user.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

constructor(private http: HttpClient) { }

  update(user: UserDTO, id: string): Observable<UserDTO>
  {
    return this.http.put<UserDTO>(`${environment.api_url}/client/${id}`, user);
  }
}
