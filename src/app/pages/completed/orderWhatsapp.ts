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
    
    gerarLinkWhatsApp() {
        const numeroLoja = '5592996168194';
        let mensagem = `*Novo Pedido!*\n\n`;

        this.pedido.forEach(item => {
            mensagem += `• ${item.qtd}x ${item.nome} - ${this.formatarMoeda(item.preco)}\n`;
        });

        const total = this.pedido.reduce((acc, item) => acc + (item.qtd * item.preco), 0);

        mensagem += `\n---\n *Cliente*: ${this.cliente.nome}`;
        mensagem += `\n *Endereço*: ${this.cliente.rua}, ${this.cliente.numero}, ${this.cliente.bairro}`;
        mensagem += `\n *Telefone*: ${this.cliente.telefone}`;
        mensagem += `\n---\n *Total*: ${this.formatarMoeda(total)}`;

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