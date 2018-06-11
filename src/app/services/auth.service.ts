import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';

import { CredentialsDTO } from '../models/credentials.dto';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService) { }

  login(cred: CredentialsDTO)
  {
    return this.http.post(`${environment.api_url}/auth/login`, cred);
  };

  successfulLogin(authorizationValue: any)
  {
    let user: LocalUser = {
      id:    authorizationValue.user.id ,
      name:  authorizationValue.user.name ,
      email: authorizationValue.user.email ,
      role:  authorizationValue.user.role ,
      token: authorizationValue.token
    };

    this.storage.setLocalUser(user);
  };
}
