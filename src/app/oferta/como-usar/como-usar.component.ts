import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css']
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = '';

  constructor(private route: ActivatedRoute, private service: OfertasService) { }


  ngOnInit(): void {

    this.route.parent?.params.subscribe((parametros: Params) =>
      this.service.getComoUsarOfertaPorId(parametros.id)
        .then((resposta: string) => {
          this.comoUsar = resposta
        })
    )
  }
}
