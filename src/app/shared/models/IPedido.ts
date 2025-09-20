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