package com.gustavo.ecommerce.projeto.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.gustavo.ecommerce.projeto.domain.products.ProdutoDTO;

@Component
public class ProdutoDTOValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return ProdutoDTO.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ProdutoDTO produtoDto = (ProdutoDTO) target;

        if (produtoDto.getSku() == null || produtoDto.getSku().isBlank()) {
            errors.rejectValue("sku", "O campo 'SKU' está vazio.");
        }

        if (produtoDto.getNome() == null || produtoDto.getNome().isBlank()) {
            errors.rejectValue("nome", "O campo 'Nome' está vazio.");
        }

        if (produtoDto.getPreco() == null || produtoDto.getPreco() == 0) {
            errors.rejectValue("preco", "O campo 'Preço' está vazio.");
        }

        if (produtoDto.getImagem() == null || produtoDto.getImagem().isBlank()) {
            errors.rejectValue("imagem", "O campo 'Imagem' está vazio.");
        }
    }
    
}
