import { StorageService } from './../services/storage.service';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, flatMap } from 'rxjs/operators';
import { LocalUser } from '../models/local_user';

@Injectable()
export class RefreshToken implements HttpInterceptor {

    constructor(private storage: StorageService, private injector: Injector, private http: HttpClient){

    };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        return next.handle(req)
            .pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                
                const typeError = (typeof errorResponse.error != 'object') ? JSON.parse(errorResponse.error) : errorResponse;
                
                if(errorResponse.status === 401 && typeError.error.error === 'token_expired')
                {
                    
                    const http = this.injector.get(HttpClient);

                    return this.http.post<any>(`${environment.api_url}/auth/refresh`, {})
                        .pipe(
                        flatMap(data => {
                            console.log(data);
                            
                            let localUser: LocalUser = this.storage.getLocalUser();
                            localUser.token = data.token;
                            this.storage.setLocalUser(localUser);
          
                            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});

                            return next.handle(authReq);
                        }));
                };
                return observableThrowError(errorResponse);
            }))as any;          
    };
};

export const RefreshTokenProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: RefreshToken,
    multi: true,
};