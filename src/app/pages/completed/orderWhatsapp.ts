import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class OrderStructure {
    
    gerarLinkWhatsApp(order: any) {
        const numeroLoja = '';
        let mensagem = `*Novo Pedido!*\n\n`;

        // this.pedido.forEach(item => {
        //     mensagem += `• ${item.qtd}x ${item.nome} - ${this.formatarMoeda(item.preco)}\n`;
        // });

        mensagem += `• ${order.quantidade}x ${order.nome} - ${this.formatarMoeda(order.valor)}\n`;

        // const total = this.pedido.reduce((acc, item) => acc + (item.qtd * item.preco), 0);
        mensagem += `\n -----------------------\n`;
        mensagem += `*Cliente*: ${order.nome_user}`;
        mensagem += `\n *Telefone*: ${order.telefone}`;
        mensagem += `\n -----------------------\n`;
        mensagem += `*Endereço de Entrega*`;
        mensagem += `\n *Rua*: ${order.rua}`;
        mensagem += `\n *N°*: ${order.numero}`;
        mensagem += `\n *Bairro*: ${order.bairro}`;
        mensagem += `\n *CEP*: ${order.cep}`;
        mensagem += `\n-----------------------\n`;
        mensagem += `*Método de pagamento: ${order.metodo_pgto}*`;
        if(order.metodo_pgto === 'dinheiro' && order.valor ) {

        }
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