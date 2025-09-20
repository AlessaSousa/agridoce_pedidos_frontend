import { ICategoria } from "./ICategoria";
import { IRestaurante } from "./IRestaurante";

export interface IProduto {
    id: number;
    nomeProduto: string;
    disponibilidadeProduto: IDisponibilidadeProduto;
    descricaoProduto: string;
    precoProd: number;
    categoria: ICategoria;
    restaurante: IRestaurante;
}

export enum IDisponibilidadeProduto {
    Disponivel,
    Esgotado,
    Indisponivel
}