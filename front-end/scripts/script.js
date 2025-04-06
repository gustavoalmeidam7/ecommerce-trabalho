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
            divProdutos.innerHTML = `
                <p>Erro a se conectar a o backend! tente novamente mais tarde</p>
            `;
    
            return;
        }
    
        if (produtos.length === 0) { 
            divProdutos.innerHTML = `
                <p>Sem produtos no catalogo, adicione-os!</p>
            `;
    
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

function openTab(tabId) {
    const produtos = document.querySelectorAll('.produtos');
    produtos.forEach(produto => produto.classList.remove('active'));

    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');

    event.target.classList.add('active');
}

const ofertas = [
    {
        imagem: "image/ps5.webp",
        titulo: "PlayStation 5 Slim",
        precoOriginal: 3347.07,
    },
    {
        imagem: "image/iphone.webp",
        titulo: "Apple iPhone 15",
        precoOriginal: 4679.10,
    },
    {
        imagem: "image/Acer Aspire 5.webp",
        titulo: "Notebook Acer Aspire 5",
        precoOriginal: 3199.99,
    },
    {
        imagem: "image/MonitorGamer.webp",
        titulo: "Monitor Gamer LG UltraGear",
        precoOriginal: 1999.99,
    },
    {
        imagem: "image/AMDRyzen.webp",
        titulo: "Processador AMD Ryzen 7",
        precoOriginal: 1749.99,
    },
    {
        imagem: "image/AcerNitroV15.webp",
        titulo: "Notebook Gamer Acer Nitro V15",
        precoOriginal: 4899.99,
    },
    {
        imagem: "image/HeadsetGamer.webp",
        titulo: "Headset Gamer Havit H2002D",
        precoOriginal: 179.99,
    },
    {
        imagem: "image/CadeiraGamer.webp",
        titulo: "Cadeira Gamer KBM! Tempest CG600",
        precoOriginal: 889.90,
    },
];


let ofertaAtual = 0;
function atualizarOferta() {
    const oferta = ofertas[ofertaAtual];
    const precoComDesconto = (oferta.precoOriginal * 0.85).toFixed(2);

    const ofertaDestaque = document.getElementById("oferta-destaque");
    ofertaDestaque.innerHTML = `
        <img src="${oferta.imagem}" alt="${oferta.titulo}">
        <h3>${oferta.titulo}</h3>
        <p><s>R$ ${oferta.precoOriginal.toFixed(2)}</s> <strong>R$ ${precoComDesconto}</strong></p>
        <button class="btnComprar">Comprar Agora</button>
    `;

    ofertaAtual = (ofertaAtual + 1) % ofertas.length;
}
atualizarOferta();

criarCardsProdutos();

setTimeout(atualizarOferta, 5000);

 