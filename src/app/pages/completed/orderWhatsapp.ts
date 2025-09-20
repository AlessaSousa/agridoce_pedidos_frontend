import { inject, Injectable } from "@angular/core";
import { CartService } from "../../shared/services/cart.service";

@Injectable({
    providedIn: 'root'
})
export class OrderStructure {
    private cartService = inject(CartService);

    gerarLinkWhatsApp() {

        const order = this.cartService.getPedido();
        const numeroLoja = '';
        let mensagem = `*Novo Pedido!*\n\n`;

        // order?.pedido?.forEach(item => {
        //     mensagem += `• ${item.quantidade}x ${item.produto.nomeProduto} - ${this.formatarMoeda(item.produto.precoProd)}\n`;
        // });

        for (let item of order?.pedido) {
            mensagem += `• ${item.quantidade}x ${item.produto.nomeProduto} - ${this.formatarMoeda(item.produto.precoProd)}\n`;
        }


        // mensagem += `• ${order.quantidade}x ${order.nome} - ${this.formatarMoeda(order.valor)}\n`;

        // const total = this.pedido.reduce((acc, item) => acc + (item.qtd * item.preco), 0);
        mensagem += `\n -----------------------\n`;
        mensagem += `*Cliente*: ${order?.usuario.nome}`;
        mensagem += `\n *Telefone*: ${order?.usuario.telefone}`;
        mensagem += `\n -----------------------\n`;
        mensagem += `*Endereço de Entrega*`;
        mensagem += `\n *Rua*: ${order?.usuario.rua}`;
        mensagem += `\n *N°*: ${order?.usuario.numero}`;
        mensagem += `\n *Bairro*: ${order?.usuario.bairro}`;
        mensagem += `\n *CEP*: ${order?.usuario.cep}`;
        mensagem += `\n-----------------------\n`;
        mensagem += `*Método de pagamento: ${order?.usuario.metodo_pgto}*`;
        // if (order?.usuario.metodo_pgto === 'dinheiro' && order?.usuario.valor) {

        // }
        mensagem += `\n---\n *Total*: ${this.formatarMoeda(order.total)}`;

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