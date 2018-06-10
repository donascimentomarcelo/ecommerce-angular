import { environment } from './../environments/environment';
import { CredentialsDTO } from './../app/models/credentials.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(cred: CredentialsDTO)
  {
    return this.http.post(`${environment.api_url}/auth/login`, cred);
  }
}
