function adicionarProduto() {
    const sku = document.getElementById("skuInput").value;
    const nome = document.getElementById("nomeInput").value;
    const descricao = document.getElementById("descricaoInput").value;
    const preco = parseFloat(document.getElementById("precoInput").value);
    const imagem = document.getElementById("imagemInput").value;

    if (sku === "" || nome === "" || preco === "" || preco === 0 || imagem === "") {
        return erroCadastrar("Campos vazios");
    }

    fetch('http://localhost:8080/produtos/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sku, nome, descricao, preco, imagem })
    })
    .then(res => res.json())
    .then(data => {
        alert('Produto cadastrado com sucesso!');
        console.log(data);
    })
    .catch(err => {
        erroCadastrar(err);
    });
}

function erroCadastrar(error) {
    console.error('Erro ao cadastrar:', error);
    alert('Erro ao cadastrar produto.');
}