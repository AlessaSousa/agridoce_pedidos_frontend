import { IPedido } from "./IPedido";

export interface IPagamento {
    id: number;
    pedido: IPedido;
    valorPag: number;
    medodoPag: number;
}