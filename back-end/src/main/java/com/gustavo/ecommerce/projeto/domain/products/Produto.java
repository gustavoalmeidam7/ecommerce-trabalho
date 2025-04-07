package com.gustavo.ecommerce.projeto.domain.products;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "produto")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    @Id
    @Column(name = "sku")
    private String sku;

    private String nome;
    private String descricao;
    private Double preco;
    private String imagem;

    @Column(name = "indexproduto")
    private String indexProduto;

    @PrePersist
    @PreUpdate
    private void generateIndex() {
        StringBuilder sb = new StringBuilder();

        sb.append(this.getSku())
          .append(this.getNome())
          .append(this.getDescricao());

        this.setIndexProduto(sb.toString());
    }
}
