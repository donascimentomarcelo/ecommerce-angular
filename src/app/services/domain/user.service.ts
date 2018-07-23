import { environment } from './../../../environments/environment';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDTO } from '../../models/user.dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getImageBucket(id: string): Observable<any>
  {
    let url = `${API_CONFIG.bucketBaseUrl}client${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  };

  findOne(id: string): Observable<UserDTO>
  {
    return this.http.get<UserDTO>(`${environment.api_url}/client/${id}`);
  };

}
