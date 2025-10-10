import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymetnsService {

  private http = inject(HttpClient);
  private apiURL = `http://localhost:3000/payments`;

  constructor() { }

  paySelected(payload: any) : Observable<any>{
    return this.http.post(`${this.apiURL}/paySelected`,{payload})
  }

  payAll(payload: any) : Observable<any>{
    return this.http.post(`${this.apiURL}/paySelected`,{payload})
  }

}
