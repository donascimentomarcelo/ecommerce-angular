import { StorageService } from './../services/storage.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){

    };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        let localUser = this.storage.getLocalUser();

        let N = environment.api_url.length;
        let requestAPI = req.url.substring(0, N) == environment.api_url;

        if(localUser && requestAPI)
        {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        else
        {
            return next.handle(req);
        };

    };
};

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};