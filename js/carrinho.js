let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let cupomAplicado = false;

// =======================
// Abrir / Fechar Carrinho
// =======================
function toggleCarrinho() {

    const box = document.getElementById("carrinhoBox");

    if (!box) return;

    box.style.display =
        box.style.display === "block"
            ? "none"
            : "block";
}

// =======================
// Adicionar Produto
// =======================
function addCarrinho(id) {

    const produto = produtos.find(produto => produto.id === id);

    if (!produto) return;

    // Apenas impede adicionar caso já esteja sem estoque
    if (produto.estoque <= 0) {

        alert("Produto indisponível.");

        return;

    }

    const item = carrinho.find(item => item.id === id);

    if (item) {

        item.qtd++;

    } else {

        carrinho.push({

            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            qtd: 1

        });

    }

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();

}

// =======================
// Aumentar Quantidade
// =======================
function aumentarQuantidade(id) {

       

    const item = carrinho.find(item => item.id === id);

    const produto = produtos.find(produto => produto.id === id);

    if (!item || !produto) return;

    // Não deixa vender além do estoque
    if (item.qtd >= produto.estoque) {

        alert("Quantidade máxima disponível em estoque.");

        return;

    }

    item.qtd++;

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();

}

// =======================
// Diminuir Quantidade
// =======================
function diminuirQuantidade(id) {

    const item = carrinho.find(item => item.id === id);

    if (!item) return;

    item.qtd--;

    // Remove do carrinho quando chegar a zero
    if (item.qtd <= 0) {

        excluirCarrinho(id);

        return;

    }

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();

}

// =======================
// Excluir Produto
// =======================
function excluirCarrinho(id) {

    carrinho = carrinho.filter(item => item.id !== id);

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();

}

// =======================
// Atualizar Carrinho
// =======================
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
    <h5>${item.nome}</h5>

    <div class="d-flex align-items-center gap-2">

        <button
            class="btn btn-outline-secondary btn-sm"
            onclick="diminuirQuantidade(${item.id})">

            ➖

        </button>

        <strong>${item.qtd}</strong>

        <button
            class="btn btn-outline-secondary btn-sm"
            onclick="aumentarQuantidade(${item.id})">

            ➕

        </button>

    </div>

    <p class="mt-2">
        <strong>
            R$ ${(item.preco * item.qtd).toFixed(2)}
        </strong>
    </p>

    <button
        class="btn btn-danger btn-sm"
        onclick="excluirCarrinho(${item.id})">

        🗑️ Remover

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

// =======================
// Aplicar Cupom
// =======================
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

// =======================
// Finalizar Pedido
// =======================
function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Carrinho vazio!");

        return;

    }

    // Atualiza o estoque
    carrinho.forEach(item => {

        const produto = produtos.find(produto => produto.id === item.id);

        if (produto) {

            produto.estoque -= item.qtd;

        }

    });

    // Salva o estoque atualizado
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

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

    // Limpa o carrinho
    carrinho = [];

    localStorage.removeItem("carrinho");

    cupomAplicado = false;

    const mensagemCupom = document.getElementById("mensagemCupom");

    if (mensagemCupom) {

        mensagemCupom.textContent = "";

    }

    const inputCupom = document.getElementById("cupom");

    if (inputCupom) {

        inputCupom.value = "";

    }

    atualizarCarrinho();
    atualizarListaProdutos();

}

// =======================
// Carregar Página
// =======================
document.addEventListener(
    "DOMContentLoaded",
    atualizarCarrinho
);
