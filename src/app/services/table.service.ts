import { HttpClient } from "@angular/common/http";
import { inject, Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { BarTable } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private apiURL = 'http://localhost:3000/tables';
  private http = inject(HttpClient);


  getTables(): Observable<BarTable[]> {
    return this.http.get<BarTable[]>(`${this.apiURL}/getTables`);
  };

}
