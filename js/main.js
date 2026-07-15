function renderizarProdutos() {

    const listaProdutos = document.getElementById("listaProdutos");

    produtos.forEach(produto => {

        const div = document.createElement("div");
        div.className = "col-md-4";

        div.innerHTML = `
            <div class="card h-100">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">

                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${produto.descricao}</p>
                    <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
                    <p class="text-muted">${produto.categoria}</p>

                    
                    <button class="btn btn-dark w-100""
        onclick="addCarrinho('${produto.nome}', ${produto.preco})">
    Comprar
</button>
                </div>
            </div>
        `;

        listaProdutos.appendChild(div);

    });

}

document.addEventListener("DOMContentLoaded", renderizarProdutos);