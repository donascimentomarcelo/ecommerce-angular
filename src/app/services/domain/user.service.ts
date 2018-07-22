import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


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

}
