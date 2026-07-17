let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let cupomAplicado = false;

// Abrir / fechar carrinho
function toggleCarrinho() {
    const box = document.getElementById("carrinhoBox");

    if (!box) return;

    box.style.display = box.style.display === "block" ? "none" : "block";
}

// Adicionar produto
function addCarrinho(nome, preco) {

    const produto = carrinho.find(item => item.nome === nome);

    if (produto) {
        produto.qtd++;
    } else {
        carrinho.push({
            nome,
            preco,
            qtd: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
}

// Excluir produto
function excluirCarrinho(nome) {

    carrinho = carrinho.filter(item => item.nome !== nome);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("totalCarrinho");
    const contador = document.getElementById("contadorCarrinho");

    if (!lista || !totalEl || !contador) return;

    lista.innerHTML = "";

    let total = 0;
    let quantidade = 0;

    carrinho.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
            <h5 class="card-title">${item.nome}</h5>
            <p>Quantidade: ${item.qtd}</p>
            <p><strong>R$ ${(item.preco * item.qtd).toFixed(2)}</strong></p>

            <button onclick="excluirCarrinho('${item.nome}')">
                🗑️
            </button>
        `;

        lista.appendChild(li);

        total += item.preco * item.qtd;
        quantidade += item.qtd;

    });

    let desconto = 0;

    if (cupomAplicado) {
        desconto = total * 0.10;
    }

    const totalFinal = total - desconto;

    totalEl.innerHTML = `
        <p>Subtotal: <strong>R$ ${total.toFixed(2)}</strong></p>
        <p>Desconto: <strong>R$ ${desconto.toFixed(2)}</strong></p>
        <h5>Total: <strong>R$ ${totalFinal.toFixed(2)}</strong></h5>
    `;

    contador.textContent = quantidade;
}

// Aplicar cupom
function aplicarCupom() {

    const inputCupom = document.getElementById("cupom");
    const textoCupom = inputCupom.value.trim();
    const mensagem = document.getElementById("mensagemCupom");

    if (textoCupom.toLowerCase() === "primeira10") {

        cupomAplicado = true;

        mensagem.textContent = "✅ Cupom aplicado com sucesso!";

    } else {

        cupomAplicado = false;

        mensagem.textContent = "❌ Cupom inválido.";

    }

    atualizarCarrinho();
}

// Finalizar pedido
function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Carrinho vazio!");

        return;

    }

    let mensagem = "Olá! Gostaria de comprar:\n\n";

    let total = 0;

    carrinho.forEach(item => {

        mensagem += `${item.nome}\n`;
        mensagem += `Quantidade: ${item.qtd}\n`;
        mensagem += `Valor: R$ ${(item.preco * item.qtd).toFixed(2)}\n\n`;

        total += item.preco * item.qtd;

    });

    let desconto = 0;

    if (cupomAplicado) {
        desconto = total * 0.10;
    }

    const totalFinal = total - desconto;

    mensagem += `Subtotal: R$ ${total.toFixed(2)}\n`;
    mensagem += `Desconto: R$ ${desconto.toFixed(2)}\n`;
    mensagem += `Total: R$ ${totalFinal.toFixed(2)}`;

    const numero = "5511912642318";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");

}

// Atualiza carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarCarrinho);