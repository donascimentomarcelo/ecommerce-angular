import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductDTO } from '../../models/product.dto.ts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }

  list(page: number): Observable<ProductDTO[]>
  {
    return this.http.get<ProductDTO[]>(`${environment.api_url}/product?page=${page}`);
  };
}
