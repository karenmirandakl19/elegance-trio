let carrinho = [];

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
    carrinho.push({ nome, preco, qtd: 1 });
  }

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
    li.textContent = `${item.nome} x${item.qtd} - R$ ${(item.preco * item.qtd).toFixed(2)}`;
    lista.appendChild(li);

    total += item.preco * item.qtd;
    quantidade += item.qtd;
  });

  totalEl.textContent = "Total: R$ " + total.toFixed(2);
  contador.textContent = quantidade;
}

// Finalizar pedido
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de comprar:\n";
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `- ${item.nome} x${item.qtd} (R$ ${(item.preco * item.qtd).toFixed(2)})\n`;
    total += item.preco * item.qtd;
  });

  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

  const numero = "5511912642318"; // SEU WHATSAPP
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

// Atualiza contador ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarCarrinho);
