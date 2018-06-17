import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CategoryDTO } from '../../models/category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  list(page: number): Observable<CategoryDTO[]>
  {
    return this.http.get<CategoryDTO[]>(`${environment.api_url}/category?page=${page}`);
  };

  create(category)
  {
    return this.http.post(`${environment.api_url}/category`, category);
  };
}
