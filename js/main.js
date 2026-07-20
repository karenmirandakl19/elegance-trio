let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function renderizarProdutos(produtosParaExibir) {

    const listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = "";

    produtosParaExibir.forEach(produto => {

        const div = document.createElement("div");
        div.className = "col-md-4";

        let botao;

            if (produto.estoque > 0) {

                botao = `
                    <button class="btn btn-dark w-100"
                        onclick="addCarrinho('${produto.nome}', ${produto.preco})">
                        Comprar
                    </button>
                `;

            } else {

                botao = `
                    <button class="btn btn-secondary w-100" disabled>
                        Produto indisponível
                    </button>
                `;

            }
        let favorito;

        if (favoritos.includes(produto.id)) {

            favorito = `
                <button
                    class="btn btn-outline-danger"
                    onclick="favoritar(${produto.id})">
                    ❤️
                </button>
            `;

        } else {

            favorito = `
                <button
                    class="btn btn-outline-secondary"
                    onclick="favoritar(${produto.id})">
                    🤍
                </button>
            `;

        }

        div.innerHTML = `
            <div class="card h-100">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">

                        <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <p class="card-text">${produto.descricao}</p>
                <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
                <p><strong> ${produto.estoque}</strong></p>
                <p class="text-muted">${produto.categoria}</p>

                ${botao}

            </div>
        `;

        listaProdutos.appendChild(div);

    });

}

document.addEventListener("DOMContentLoaded", function () {

    // Carrega todos os produtos ao abrir a página
    renderizarProdutos(produtos);

    // Pesquisa
    const inputPesquisa = document.getElementById("pesquisaProdutos");

    inputPesquisa.addEventListener("input", function () {

        const textoPesquisa = inputPesquisa.value;

        const produtosFiltrados = produtos.filter(produto =>
            produto.nome
                .toLowerCase()
                .includes(textoPesquisa.toLowerCase())
        );

        renderizarProdutos(produtosFiltrados);

    });

});
