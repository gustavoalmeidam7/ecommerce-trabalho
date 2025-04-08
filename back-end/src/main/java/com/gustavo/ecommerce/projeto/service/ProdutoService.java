package com.gustavo.ecommerce.projeto.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gustavo.ecommerce.projeto.domain.products.Produto;
import com.gustavo.ecommerce.projeto.domain.products.ProdutoDTO;
import com.gustavo.ecommerce.projeto.exception.ProdutoAlerdyExists;
import com.gustavo.ecommerce.projeto.exception.ProdutoNotExists;
import com.gustavo.ecommerce.projeto.repository.ProdutoRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProdutoService {
    private final ProdutoRepository repository;

    public List<ProdutoDTO> getAll() {
        List<Produto> produtos =  repository.findAll();

        return produtos.stream()
                       .map(ProdutoDTO::fromEntity)
                       .collect(Collectors.toList());
    }

    public Optional<Produto> getBySKU(String sku) {
        return repository.findById(sku);
    }

    public List<Produto> getByTerm(String term) {
        return repository.findByIndexProdutoContainingIgnoreCase(term);
    }

    public ProdutoDTO createProduto(ProdutoDTO produto) {
        if (getBySKU(produto.getSku()).isPresent()) {
            throw new ProdutoAlerdyExists(produto.getSku());
        }

        Produto entity = repository.save(produto.toEntity());

        return ProdutoDTO.fromEntity(entity);
    }

    public ProdutoDTO updateProduto(String sku, ProdutoDTO updatedProduto) {
        ProdutoDTO originalEntity = ProdutoDTO.fromEntity(getBySKU(sku).get());

        if (originalEntity == null) {
            throw new ProdutoNotExists(sku);
        }

        ProdutoDTO DTO = ProdutoDTO.builder()
                         .sku((updatedProduto.getSku() == null) ? originalEntity.getSku() : updatedProduto.getSku())
                         .nome((updatedProduto.getNome() == null) ? originalEntity.getNome() : updatedProduto.getNome())
                         .descricao((updatedProduto.getDescricao() == null) ? originalEntity.getDescricao() : updatedProduto.getDescricao())
                         .preco((updatedProduto.getPreco() == null) ? originalEntity.getPreco() : updatedProduto.getPreco())
                         .imagem((updatedProduto.getImagem() == null) ? originalEntity.getImagem() : updatedProduto.getImagem())
                         .build();

        if (DTO.getSku() != originalEntity.getSku()) {
            deleteBySKU(originalEntity.getSku());
        }

        Produto entity = repository.save(DTO.toEntity());

        return ProdutoDTO.fromEntity(entity);
    }

    public boolean deleteBySKU(String sku) {
        Optional<Produto> prod = getBySKU(sku);

        if (prod.isEmpty()) {
            return false;
        }

        repository.deleteById(sku);
        return true;
    }
}
