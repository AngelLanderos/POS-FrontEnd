import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/interfaces';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private http = inject(HttpClient);
  private apiURL = `http://localhost:3000/accounts`;

  createProvitionalAccount(order: any): Observable<any>{
    return this.http.post(`${this.apiURL}/createProvitionalAccount`,{order});
  };

  provitionalPayment(tableNumber: number, payment: number): Observable<any>{
    return this.http.post(`${this.apiURL}/provitionalPayment`,{tableNumber,payment});
  }

}
