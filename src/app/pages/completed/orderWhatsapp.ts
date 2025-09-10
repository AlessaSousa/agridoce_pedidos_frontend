import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class OrderStructure {

    pedido = [
        { nome: 'Bolo de chocolate', qtd: 2, preco: 40 },
        { nome: 'Salgado Jacaré', qtd: 1, preco: 10 }
    ];

    cliente = {
        nome: 'Alessandra Sousa',
        rua: 'teste rua',
        numero: 'teste numero',
        bairro: 'teste bairro',
        cep: '9999-999',
        telefone: '(99) 99999-9999'
    };
    
    gerarLinkWhatsApp(order: any) {
        const numeroLoja = '5592996168194';
        let mensagem = `*Novo Pedido!*\n\n`;

        // this.pedido.forEach(item => {
        //     mensagem += `• ${item.qtd}x ${item.nome} - ${this.formatarMoeda(item.preco)}\n`;
        // });

        mensagem += `• ${order.quantidade}x ${order.nome} - ${this.formatarMoeda(order.valor)}\n`;

        // const total = this.pedido.reduce((acc, item) => acc + (item.qtd * item.preco), 0);

        mensagem += `\n---\n *Cliente*: ${order.nome_user}`;
        mensagem += `\n *Endereço*: ${order.rua}, ${order.numero}, ${order.bairro}`;
        mensagem += `\n *Telefone*: ${order.telefone}`;
        mensagem += `\n---\n *Total*: ${this.formatarMoeda(order.valor * order.quantidade)}`;

        const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, '_blank');
    }

    formatarMoeda(valor: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

}