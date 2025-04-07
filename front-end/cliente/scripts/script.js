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
        imagem: "https://images.tcdn.com.br/img/img_prod/616573/playstation_5_slim_1tb_versao_standard_com_leitor_1174_1_8dcb3fb3ca9d2793533099b7a2aad2ab.jpg",
        titulo: "PlayStation 5 Slim",
        precoOriginal: 3347.07,
    },
    {
        imagem: "https://http2.mlstatic.com/D_NQ_NP_896424-MLA71783367608_092023-O.webp",
        titulo: "Apple iPhone 15",
        precoOriginal: 4679.10,
    },
    {
        imagem: "https://acerstore.vtexassets.com/arquivos/ids/162844/A515-57_1.jpg?v=638271284278670000",
        titulo: "Notebook Acer Aspire 5",
        precoOriginal: 3199.99,
    },
    {
        imagem: "https://m.media-amazon.com/images/I/61aIuJu0M0L.jpg",
        titulo: "Monitor Gamer LG UltraGear",
        precoOriginal: 1999.99,
    },
    {
        imagem: "https://images.kabum.com.br/produtos/fotos/520369/processador-amd-ryzen-7-5700x3d-3-6-ghz-4-1ghz-max-turbo-cache-4mb-8-nucleos-16-threads-am4-video-integrado-100-100001503wof_1708023990_gg.jpg",
        titulo: "Processador AMD Ryzen 7",
        precoOriginal: 1749.99,
    },
    {
        imagem: "https://images.kabum.com.br/produtos/fotos/564916/notebook-gamer-acer-nitro-v15-intel-core-i5-13420h-8gb-ram-geforce-rtx-3050-ssd-512gb-15-6-fhd-ips-144hz-windows-11-preto-anv15-51-58az_1715197002_gg.jpg",
        titulo: "Notebook Gamer Acer Nitro V15",
        precoOriginal: 4899.99,
    },
    {
        imagem: "https://m.media-amazon.com/images/I/61CIubm4EBL._AC_UF894,1000_QL80_.jpg",
        titulo: "Headset Gamer Havit H2002D",
        precoOriginal: 179.99,
    },
    {
        imagem: "https://images.kabum.com.br/produtos/fotos/471927/cadeira-gamer-kbm-gaming-cg600-branco-com-almofadas-descanso-para-pernas-retratil-reclinavel-kgcg600br_1700660778_gg.jpg",
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

setInterval(atualizarOferta, 5000);
 