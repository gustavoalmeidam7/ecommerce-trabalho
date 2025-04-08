async function PegarTodosProdutos() {
    try {
        const response = fetch("http://localhost:8080/produtos").then(response => response.json());
        return await response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function PegarProdutoID(id) {
    try {
        const response = fetch("http://localhost:8080/produtos/find-sku?sku=" + id).then(response => response.json());
        return await response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function criarCardsProdutos() {
    const divProdutos = document.getElementById('catalogo');

    PegarTodosProdutos().then(produtos => {
        if (produtos === null) {
            divProdutos.innerHTML = "<p>Erro a se conectar a o backend! tente novamente mais tarde</p>";
    
            return;
        }
    
        if (produtos.length === 0) { 
            divProdutos.innerHTML = "<p>Sem produtos no catalogo, adicione-os!</p>";
    
            return;
        }
    
        produtos.forEach(produto => {
            divProdutos.innerHTML += `
                <section class="produto" id="${produto.sku}">
                    <img src="${produto.imagem}" alt="${produto.nome}" class="imgProduto">
                    <p>${produto.nome}</p>
                    <p class="precoProduto">R$ ${produto.preco}</p>
                    <button class="btnDetalhes" onclick="abrirDetalhesProduto('${produto.sku}')">Detalhes</button>
                </section>`;
        });
    });
}

function abrirDetalhesProduto(idProduto) {
    const div = document.getElementById('detalhesProduto');

    PegarProdutoID(idProduto).then(produto => {
        if (produto === null) {
            return;
        }

        div.style = "display: flex;";
        div.innerHTML = `
        <div class="divInfoFullScreen">
            <div class="tituloFullScreen"> ${produto.nome} </div>
            <div class="precoFullScreen"> R$ ${produto.preco} </div>
            <hr>
            <br>
            <div class="descricaoFullScreeen"> ${produto.descricao} </div>
        </div>
        <div class="divInfoFullScreen">
            <button onclick="fecharDetalhesProduto()" class="botaoFullScreen">X</button>
            <img src=" ${produto.imagem} " alt="${produto.nome}" class="imagemFullScreen">
        </div>`;

        div.classList.replace('produtoFullScreenOculto', 'produtoFullScreen');
    })
}

function fecharDetalhesProduto() {
    const div = document.getElementById('detalhesProduto');

    div.style = "display: none";
    div.classList.replace('produtoFullScreen', 'produtoFullScreenOculto');
}

criarCardsProdutos();