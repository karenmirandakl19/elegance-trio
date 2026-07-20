// =======================
// Favoritos
// =======================
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let mostrarSomenteFavoritos = false;

// =======================
// Renderizar Produtos
// =======================
function renderizarProdutos(produtosParaExibir) {

    const listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = "";

    produtosParaExibir.forEach(produto => {

        const div = document.createElement("div");
        div.className = "col-md-4";

        let botao = "";

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

        let favorito = "";

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

                <img
                    src="${produto.imagem}"
                    class="card-img-top"
                    alt="${produto.nome}">

                <div class="card-body">

                    <h5 class="card-title">${produto.nome}</h5>

                    <p class="card-text">${produto.descricao}</p>

                    <p>
                        <strong>
                            R$ ${produto.preco.toFixed(2)}
                        </strong>
                    </p>

                    <p>
                        Estoque:
                        <strong>${produto.estoque}</strong>
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

// =======================
// Favoritar
// =======================
function favoritar(id) {

    if (favoritos.includes(id)) {

        favoritos = favoritos.filter(f => f !== id);

    } else {

        favoritos.push(id);

    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    atualizarListaProdutos();

}

// =======================
// Atualizar Lista
// =======================
function atualizarListaProdutos() {

    let lista = [...produtos];

    const pesquisa = document.getElementById("pesquisaProdutos");

    if (pesquisa && pesquisa.value.trim() !== "") {

        lista = lista.filter(produto =>
            produto.nome
                .toLowerCase()
                .includes(pesquisa.value.toLowerCase())
        );

    }

    if (mostrarSomenteFavoritos) {

        lista = lista.filter(produto =>
            favoritos.includes(produto.id)
        );

    }

    renderizarProdutos(lista);

}

// =======================
// Mostrar Favoritos
// =======================
function mostrarFavoritos() {

    mostrarSomenteFavoritos = !mostrarSomenteFavoritos;

    const botao = document.getElementById("btnFavoritos");

    if (botao) {

        if (mostrarSomenteFavoritos) {

            botao.innerHTML = "📦 Mostrar todos os produtos";

        } else {

            botao.innerHTML = "❤️ Mostrar apenas favoritos";

        }

    }

    atualizarListaProdutos();

}

// =======================
// Carregar Página
// =======================
document.addEventListener("DOMContentLoaded", () => {

    atualizarListaProdutos();

    const pesquisa = document.getElementById("pesquisaProdutos");

    if (pesquisa) {

        pesquisa.addEventListener("input", atualizarListaProdutos);

    }

    const btnFavoritos = document.getElementById("btnFavoritos");

    if (btnFavoritos) {

        btnFavoritos.onclick = mostrarFavoritos;

    }

});
