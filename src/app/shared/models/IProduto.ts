import { ICategoria } from "./ICategoria";
import { IRestaurante } from "./IRestaurante";

export interface IProduto {
    id: number;
    nomeProduto: string;
    disponibilidadeProduto: IDisponibilidadeProduto;
    descricaoProduto: string;
    precoProd: number;
    categoria: ICategoria;
    restaurante?: IRestaurante;
    image: string;
}

export enum IDisponibilidadeProduto {
    Disponivel,
    Esgotado,
    Indisponivel
}


export const PRODUTOS: IProduto[] = [
    {
        id: 1,
        nomeProduto: 'Bolo de Chocolate',
        descricaoProduto: 'Delicioso bolo de chocolate cremoso',
        precoProd: 20,
        disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
        categoria: {
            nomeCategoria: 'Bolos',
            descricao: 'Bolo'
        } as ICategoria,
        restaurante: {} as any,
        image: 'assets/menu/bolo_chocolate.jpg'
    },
    {
        id: 2,
        nomeProduto: 'Torta de Limão',
        descricaoProduto: 'Massa crocante com recheio de limão',
        precoProd: 15,
        disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
        categoria: {
            nomeCategoria: 'Tortas',
            descricao: 'Tortas'
        } as ICategoria,
        restaurante: {} as any,
        image: 'assets/menu/bolo_chocolate.jpg'
    },
    {
        id: 3,
        nomeProduto: 'Coxinha de Frango',
        descricaoProduto: 'Coxinha tradicional com recheio cremoso',
        precoProd: 8,
        disponibilidadeProduto: IDisponibilidadeProduto.Esgotado,
        categoria: {
            nomeCategoria: 'Salgados',
            descricao: 'Salgado'
        } as ICategoria,
        restaurante: {} as any,
        image: 'assets/menu/bolo_chocolate.jpg'
    },
    {
        id: 4,
        nomeProduto: 'Pastel de Carne',
        descricaoProduto: 'Pastel frito recheado com carne moída',
        precoProd: 7,
        disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
        categoria: {
            nomeCategoria: 'Tortas',
            descricao: 'Tortas'
        } as ICategoria,
        restaurante: {} as any,
        image: 'assets/menu/bolo_chocolate.jpg'
    },
    {
        id: 5,
        nomeProduto: 'Bolo Red Velvet',
        descricaoProduto: 'Bolo macio com cobertura de cream cheese',
        precoProd: 30,
        disponibilidadeProduto: IDisponibilidadeProduto.Indisponivel,
        categoria: {
            nomeCategoria: 'Bolos',
            descricao: 'Bolos'
        } as ICategoria,
        restaurante: {} as any,
        image: 'assets/menu/bolo_chocolate.jpg'
    },
    {
        id: 6,
        nomeProduto: 'Torta de Morango',
        descricaoProduto: 'Recheada com creme e coberta com morangos frescos',
        precoProd: 25,
        disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
        categoria: {
            nomeCategoria: 'tortas',
            descricao: 'Tortas'
        } as ICategoria,
        restaurante: {} as any,
        image: 'assets/menu/bolo_chocolate.jpg'
    },
    {
        id: 7,
        nomeProduto: 'Refrigerante Lata',
        descricaoProduto: 'Bebida gelada para acompanhar seu pedido',
        precoProd: 6,
        disponibilidadeProduto: IDisponibilidadeProduto.Disponivel,
        categoria: {
            nomeCategoria: 'Bebidas',
            descricao: 'Bebidas'
        } as ICategoria,
        restaurante: {} as any,
        image: 'assets/menu/bolo_chocolate.jpg'
    },
    {
        id: 8,
        nomeProduto: 'Suco Natural de Laranja',
        descricaoProduto: 'Suco fresco espremido na hora',
        precoProd: 10,
        disponibilidadeProduto: IDisponibilidadeProduto.Esgotado,
        categoria: {
            nomeCategoria: 'Bebidas',
            descricao: 'Bebidas'
        } as ICategoria,
        restaurante: {} as any,
        image: 'assets/menu/bolo_chocolate.jpg'
    }
]