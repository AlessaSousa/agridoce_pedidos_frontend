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
    id?: number;
    dataPedido: string;
    statusPedido: string;
    valorTotal: number;
    pagamentos?: Pagamento[];
    entregas?: Entrega[];
}

export interface Pagamento {
    id?: number;
    formaPagamento: string;
    valor: number;
    dataPagamento: string;
}

export interface Entrega {
    id?: number;
    enderecoEntrega: string;
    dataEntrega: string;
    statusEntrega: string;
}
