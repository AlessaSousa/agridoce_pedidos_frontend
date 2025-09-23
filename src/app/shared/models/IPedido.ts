import { ICliente } from "./ICliente";

export interface IPedido {
    id: number;
    dataPedido: Date;
    statusPedido: IStatusPedido;
    valorTotal: number;
    cliente: ICliente;
}

export enum IStatusPedido {
    Aguardando_pagamento,
    Pagamento_confirmado,
    Em_preparo
}

export interface ICreatePedido {
    dataPedido: string;
    statusPedido: string;
    valorTotal: number;
    usuario: UsuarioPedidoInfo;
    endereco: EnderecoUsuarioInfo;
    pagamento: PagamentoPedido;
    pedido: IListProduto[];
}

export interface UsuarioPedidoInfo {
    nome: string;
    telefone: string;
}

export interface EnderecoUsuarioInfo {
    bairro: string;
    cep: string;
    rua: string;
    numero: string;
}

export interface PagamentoPedido {
    metodo_pag: string;
    valor_pag: number;
}

export interface IListProduto {
    produtoId: number,
    quantidade: number
}