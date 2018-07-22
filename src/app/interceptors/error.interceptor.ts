
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private toastr: ToastrService){};

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
            .pipe(
            catchError((error, caught) => {

                console.log('Erro detectado');
                console.log(error);

                switch(error.status)
                {
                    case 401:
                    this.handler401(error);
                    break;

                    case 422:
                    this.handler422(error);
                    break;
                };

                return observableThrowError(error);
            })) as any;
    };

    handler401(objError)
    {
        this.toastr.error(objError.error.error, 'Erro de autorização', {
            timeOut: 3000,
          });
    };

    handler422(objError)
    {
        this.toastr.error(this.listError(objError.error), 'Erro de validação', {
            timeOut: 3000,
          });
    };

    listError(error: FieldMessage[]) : string 
    {
        const messageError = error.map(
            error => error.message
        );
        
        return messageError.toString();
    };
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}