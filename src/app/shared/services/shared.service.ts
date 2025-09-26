import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environments'
import { IProduto } from '../models/IProduto';
import { ICategoria } from '../models/ICategoria';
import { ICliente } from '../models/ICliente';
import { ICreatePedido, IPedido } from '../models/IPedido';
import { IRestaurante } from '../models/IRestaurante';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private http = inject(HttpClient);

  constructor() { }

  getProduto(){
    return lastValueFrom(this.http.get<IProduto[]>(`${environment.apiURL}/api/produtos`))
  }

  getCategoria() {
    return lastValueFrom(this.http.get<ICategoria[]>(`${environment.apiURL}/api/categoria-produtos`))
  }

  getCliente() {
    return lastValueFrom(this.http.get<ICliente[]>(`${environment.apiURL}/api/clientes`))
  }

  getPedido() {
    return lastValueFrom(this.http.get<IPedido[]>(`${environment.apiURL}/api/pedido`))
  }

  getRestaurante() {
    return lastValueFrom(this.http.get<IRestaurante[]>(`${environment.apiURL}/api/restaurantes`))
  }

  getProdutoById(produtoId: number) {
    return lastValueFrom(this.http.get<IProduto>(`${environment.apiURL}/api/produtos/${produtoId}`))
  }

  createPedido(form: ICreatePedido) {
    return lastValueFrom(this.http.post<any>(`${environment.apiURL}/api/pedidos`, form, { withCredentials: true}))
  }
}
