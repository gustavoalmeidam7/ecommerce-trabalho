package com.gustavo.ecommerce.projeto.domain.products;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ProdutoDTO {
    private String sku;

    private String nome;
    private String descricao;
    private Double preco;
    private String imagem;

    public static ProdutoDTO fromEntity(Produto prod) {
        return ProdutoDTO
               .builder()
               .sku(prod.getSku())
               .nome(prod.getNome())
               .descricao(prod.getDescricao())
               .preco(prod.getPreco())
               .imagem(prod.getImagem())
               .build();
    }

    public Produto toEntity() {
        return Produto
               .builder()
               .sku(this.getSku())
               .nome(this.getNome())
               .descricao(this.getDescricao())
               .preco(this.getPreco())
               .imagem(this.getImagem())
               .build();
    }
}
