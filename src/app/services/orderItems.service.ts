import { Injectable, Inject, inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    private apiUrl = `http://localhost:3000/orderItems`;
    private http = inject(HttpClient);

    getOrdersItem(tableId: number) : Observable<any> {
      return this.http.post(`${this.apiUrl}/getOrderItems`, {tableId})
    }

    



}
