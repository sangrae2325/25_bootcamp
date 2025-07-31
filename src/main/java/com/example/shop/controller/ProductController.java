package com.example.shop.controller;

import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // 상품 전체 목록 조회
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 상품 상세 조회
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다. id=" + id));
    }

    // 상품 등록
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
}