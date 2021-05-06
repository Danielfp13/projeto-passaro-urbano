import { Injectable } from '@angular/core';
import { Pedido } from './shared/pedido.model';
import { HttpClient,  HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdemCompraService {

  public uriPedido = environment.uriBase +'/pedidos'

  constructor(private http: HttpClient) { }

  public efitivaCompra(pedido: Pedido): Observable<any>{
    const headers = new HttpHeaders
 
    headers.append('Content-type','applicartion.json')
    return this.http.post<any>(`${this.uriPedido}`, pedido, {headers: headers})
    }
}
