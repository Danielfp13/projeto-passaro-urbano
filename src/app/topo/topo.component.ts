import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  private subjectPesquisa: Subject<string> = new Subject
  public ofertas: Observable<Oferta[]>

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if (termo.trim() === '') {
          return of([]); //retorna um Observable de array de ofertas vazio
        }
        return this.ofertaService.pesquisaOferta(termo)
      }
      ), catchError(error => {
        console.log(error)
        return of([])
      })
    )
  }

  pesquisar(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  limpaPesquisa(): void{
    this.subjectPesquisa.next('');
  }

}
 