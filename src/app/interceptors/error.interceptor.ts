
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private toastr: ToastrService){};

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
            .pipe(
            catchError((error, caught) => {

                let errorObj = error;

                if(errorObj.error)
                {
                    errorObj = errorObj.error;
                };

                console.log('Erro detectado');
                console.log(errorObj);

                switch(errorObj.status)
                {
                    case 401:
                    this.handler401(errorObj.error);
                    break;
                };

                return observableThrowError(errorObj);
            })) as any;
    };

    handler401(error)
    {
        this.toastr.error(error, 'Erro de autorização', {
            timeOut: 3000,
          });
    };
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}