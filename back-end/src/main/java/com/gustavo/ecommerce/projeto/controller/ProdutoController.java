package com.gustavo.ecommerce.projeto.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gustavo.ecommerce.projeto.domain.products.Produto;
import com.gustavo.ecommerce.projeto.domain.products.ProdutoDTO;
import com.gustavo.ecommerce.projeto.service.ProdutoService;
import com.gustavo.ecommerce.projeto.validator.ProdutoDTOValidator;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*") 
@RequestMapping("/produtos")
@RestController
@AllArgsConstructor
public class ProdutoController {
    private final ProdutoService service;

    private final ProdutoDTOValidator dtoValidator;

    @PostMapping("/create")
    public ResponseEntity<?> createProduto(@Validated @RequestBody ProdutoDTO produto, BindingResult bindingResult) {
        dtoValidator.validate(produto, bindingResult);

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new HashMap<String, Object>();

            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errors.put(fieldError.getField(), fieldError.getCode());
            }

            return ResponseEntity.badRequest().body(errors);
        }

        return ResponseEntity.status(201).body(service.createProduto(produto));
    }

    @PatchMapping("/update")
    public ResponseEntity<ProdutoDTO> updaetProduto(@RequestParam String sku, @RequestBody ProdutoDTO produto) {
        return ResponseEntity.status(200).body(service.updateProduto(sku, produto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteProductBySKU(@RequestParam String sku) {
        Map<String, Object> res = new HashMap<String, Object>();

        if(!service.deleteBySKU(sku)) {
            res.put("Message", "Failed to delete product.");
            return ResponseEntity.status(404).body(res);
        }

        res.put("Message", "Product deleted successfully.");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Produto>> getProductByTerm(@RequestParam String s) {
        List<Produto> prods = service.getByTerm(s);

        if (prods.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(prods);
    }

    @GetMapping("/find-sku")
    public ResponseEntity<Produto> getProductBySKU(@RequestParam String sku) {
        Optional<Produto> prod = service.getBySKU(sku);

        if (prod.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(prod.get());
    }

    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> getAllProducts() {
        return ResponseEntity.ok(service.getAll());
    }
}
