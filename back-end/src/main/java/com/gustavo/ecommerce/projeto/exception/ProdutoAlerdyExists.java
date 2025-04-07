package com.gustavo.ecommerce.projeto.exception;

public class ProdutoAlerdyExists extends RuntimeException{
    public ProdutoAlerdyExists(String sku) {
        super("O Produto de SKU: " + sku + " já existe.");
    }
}
