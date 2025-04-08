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

        {
            String field = "sku";

            if (produtoDto.getSku() == null || produtoDto.getSku().isBlank()) {
                errors.rejectValue(field, "O campo 'SKU' está vazio.");
            }
    
            else if (produtoDto.getSku().length() >= 50) {
                errors.rejectValue(field, "O campo 'SKU' não pode ser maior que 50 caracteres.");
            }
        }

        {
            String field = "nome";

            if (produtoDto.getNome() == null || produtoDto.getNome().isBlank()) {
                errors.rejectValue(field, "O campo 'Nome' está vazio.");
            }
    
            else if (produtoDto.getNome().length() >= 100) {
                errors.rejectValue(field, "O campo 'Nome' não pode ser maior que 100 caracteres.");
            }
        }

        {
            String field = "preco";

            if (produtoDto.getPreco() == null) {
                errors.rejectValue(field, "O campo 'Preço' está vazio.");
            }
    
            else {
                if (produtoDto.getPreco().doubleValue() >= 99999.99) {
                    errors.rejectValue(field, "O campo 'Preço' ultrapassa o valor limite de 99999.99.");
                }
        
                if (produtoDto.getPreco().doubleValue() <= 0) {
                    errors.rejectValue(field, "O campo 'Preço' não pode ser 0 ou negativo.");
                }
    
                if (produtoDto.getPreco().scale() > 2) {
                    errors.rejectValue(field, "O campo 'Preço' não pode contem mais de 2 casas decimais.");
                }
            }
        }

        {
            String field = "imagem";

            if (produtoDto.getImagem() == null || produtoDto.getImagem().isBlank()) {
                errors.rejectValue(field, "O campo 'Imagem' está vazio.");
            }
    
            else if (produtoDto.getSku().length() >= 255) {
                errors.rejectValue(field, "O campo 'Imagem' não pode ser maior que 255 caracteres.");
            }
        }
    }
    
}
