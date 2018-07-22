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
    return this.http.get<any>(`${API_CONFIG.bucketBaseUrl}client${id}.jpg`)
    .pipe(
      catchError((error, caught) => {
          return observableThrowError(error.status);
      })) as any;
  };

}
