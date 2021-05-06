import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Oferta } from './shared/oferta.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  private uriDestaque = environment.uriBase+'/ofertas?destaque=true'
  private uriCategoria = environment.uriBase+'/ofertas?categoria='
  private uriCategoriaId = environment.uriBase+'/ofertas?id='
  private uriComoUsarId = environment.uriBase+'/como-usar?id='
  private uriOndeFicaId = environment.uriBase+'/onde-fica?id='
  private uriOfertaDescricao = environment.uriBase+'/ofertas?descricao_oferta_like='
  constructor(private http: HttpClient) { }


  getOfertas(): Promise<Oferta[]> {
    //efetuar requisição http e retornar uma Promise de Oferta
    return this.http.get<any>(`${this.uriDestaque}`)
      .toPromise()
      .then((resposta: any) => resposta)
      ;
  }

  getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get<any>(` ${this.uriCategoria}${categoria}`)
      .toPromise()
      .then((resposta: any) => resposta)
  }

  public getOfertaId(id: number): Promise<Oferta> {

    return this.http.get<any>(`${this.uriCategoriaId}${id}`)
      .toPromise()
      .then((resposta: any) =>  resposta[0]
      )
  }

  public getComoUsarOfertaPorId(id: number): Promise<string>{
    return this.http.get<any>(`${this.uriComoUsarId}${id}`)
    .toPromise()
    .then( (resposta: any) =>  resposta[0].descricao )
  }

  public getOndeFicaOfertaPorId(id: number) : Promise<string>{
    return this.http.get<any>(`${this.uriOndeFicaId}${id}`)
    .toPromise()
    .then( (resposta) =>  resposta[0].descricao )
  }

  public pesquisaOferta(termo: string): Observable<Oferta[]>{
    return this.http.get<Oferta[]>(`${this.uriOfertaDescricao}${termo}`)
    .pipe(retry(3),delay(500))
  }
}
