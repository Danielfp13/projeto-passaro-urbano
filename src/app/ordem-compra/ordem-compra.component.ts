import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],

})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null,[ Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

  }

  public confirmarCompra(): void {
    console.log(this.formulario)
    console.log(this.formulario.status)
    if(this.formulario.status === "INVALID"){
      this.formulario.controls.endereco.markAsTouched()
      this.formulario.controls.numero.markAsTouched()
      this.formulario.controls.complemento.markAsTouched()
      this.formulario.controls.formaPagamento.markAsTouched()
    }else{
      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento)
        this.ordemCompraService.efitivaCompra(pedido).subscribe(
          resposta => this.idPedidoCompra = resposta.id
      
        )


    }
  }
}
