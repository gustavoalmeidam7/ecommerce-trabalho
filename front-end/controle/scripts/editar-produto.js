async function PegarProdutoID(id) {
    try {
        const response = fetch("http://localhost:8080/produtos/find-sku?sku=" + id).then(response => response.json());
        return await response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function editarProduto() {
    const sku = document.getElementById("skuInput").value;
    const nome = document.getElementById("nomeInput").value;
    const descricao = document.getElementById("descricaoInput").value;
    const preco = parseFloat(document.getElementById("precoInput").value);
    const imagem = document.getElementById("imagemInput").value;

    fetch('http://localhost:8080/produtos/update?sku=' + sku, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sku, nome, descricao, preco, imagem })
    })
    .then(res => res.json())
    .then(data => {
        alert('Produto alterado com sucesso!');
        console.log(data);
    })
    .catch(err => {
        alert('Erro a o cadastrar o produto!\n' + err);
    });
}

function procurarProduto() {
    const sku = document.getElementById("skuInput").value;
    const nome = document.getElementById("nomeInput");
    const descricao = document.getElementById("descricaoInput");
    const preco = document.getElementById("precoInput");
    const imagem = document.getElementById("imagemInput");

    PegarProdutoID(sku).then(produto => {
        nome.value = produto["nome"];
        descricao.value = produto["descricao"];
        preco.value = parseFloat(produto["preco"]);
        imagem.value = produto["imagem"];
    });
}