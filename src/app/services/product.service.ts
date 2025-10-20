import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private apiURL = `http://localhost:3000/products`;

  constructor() { }

  getProducts(): Observable<ProductResponse[]> {

    return this.http.get<ProductResponse[]>(`${this.apiURL}/getProducts`);

  };

  createProduct(){

  };

};
