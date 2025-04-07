package com.gustavo.ecommerce.projeto.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gustavo.ecommerce.projeto.domain.products.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, String> {
    List<Produto> findByIndexProdutoContainingIgnoreCase(String indexProduto);

    Optional<Produto> findBySkuIgnoreCase(String sku);
}
