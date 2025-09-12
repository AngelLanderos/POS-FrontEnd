import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private apiURL = `http://localhost:3000/products`;

  constructor() { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiURL}/getProducts`);
  };

  createProduct(){};

};
