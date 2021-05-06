import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

 @ViewChild('formulario') public form: NgForm

public idPedidoCompra: number 

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

  }
  public confirmarCompra(): void {
console.log(this.form.value)
  let pedido: Pedido = new Pedido(this.form.value.endereco, this.form.value.numero, 
    this.form.value.complemento, this.form.value.formaPagamento)
    this.ordemCompraService.efitivaCompra(pedido).subscribe(
      resposta => this.idPedidoCompra = resposta.id
    )
  }

}
