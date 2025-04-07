package com.gustavo.ecommerce.projeto.exception;

public class ProdutoNotExists extends RuntimeException {
    public ProdutoNotExists(String sku) {
        super("O Produto de SKU: " + sku + " não existe.");
    }
}
