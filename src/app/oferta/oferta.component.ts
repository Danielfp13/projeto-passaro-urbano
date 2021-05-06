import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';



@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  public id: number;
  public oferta: Oferta;

  constructor(private route: ActivatedRoute, private ofertaService: OfertasService) { }

  ngOnInit(): void {
    this.route.params.subscribe((parametro: Params) => {
      this.ofertaService.getOfertaId(this.route.snapshot.params['id'])
        .then((oferta: Oferta) => { this.oferta = oferta }
        )
      parametro.id
    })
  }

  ngOnDestroy(): void {

  }
}
