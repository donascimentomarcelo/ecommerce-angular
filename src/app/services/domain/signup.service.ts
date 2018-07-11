import { UserDTO } from './../../models/user.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

constructor(private http: HttpClient) { }

  create(user: UserDTO)
  {
    console.log(user)
    return this.http.post(`${environment.api_url}/client`, user);
  }

}
