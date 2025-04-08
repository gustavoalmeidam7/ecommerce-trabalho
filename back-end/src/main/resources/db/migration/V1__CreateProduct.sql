CREATE TABLE if not exists produto (
    sku varchar(50) PRIMARY KEY NOT NULL,

    nome varchar(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(7, 2) NOT NULL CHECK (preco >= 0),
    imagem varchar(255) NOT NULL,

    indexProduto TEXT
);
