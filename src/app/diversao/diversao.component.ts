import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css']
})
export class DiversaoComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(private service: OfertasService) { }

  ngOnInit(): void {
    this.service.getOfertasPorCategoria('diversao')
      .then((resposta) => { this.ofertas = resposta })
  }

}
