let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function renderizarProdutos(produtosParaExibir) {

    const listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = "";

    produtosParaExibir.forEach(produto => {

        const div = document.createElement("div");
        div.className = "col-md-4";

        // =======================
        // Botão Comprar
        // =======================
        let botao;

        if (produto.estoque > 0) {

            botao = `
                <button
                    class="btn btn-dark flex-grow-1"
                    onclick="addCarrinho('${produto.nome}', ${produto.preco})">

                    Comprar

                </button>
            `;

        } else {

            botao = `
                <button
                    class="btn btn-secondary flex-grow-1"
                    disabled>

                    Produto indisponível

                </button>
            `;

        }

        // =======================
        // Botão Favorito
        // =======================
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

        // =======================
        // Card
        // =======================
        div.innerHTML = `
            <div class="card h-100">

                <img
                    src="${produto.imagem}"
                    class="card-img-top"
                    alt="${produto.nome}">

                <div class="card-body">

                    <h5 class="card-title">${produto.nome}</h5>

                    <p class="card-text">
                        ${produto.descricao}
                    </p>

                    <p>
                        <strong>
                            R$ ${produto.preco.toFixed(2)}
                        </strong>
                    </p>

                    <p>
                        Estoque: <strong>${produto.estoque}</strong>
                    </p>

                    <p class="text-muted">
                        ${produto.categoria}
                    </p>

                    <div class="d-flex gap-2">

                        ${favorito}

                        ${botao}

                    </div>

                </div>

            </div>
        `;

        listaProdutos.appendChild(div);

    });

}

document.addEventListener("DOMContentLoaded", function () {

    renderizarProdutos(produtos);

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
