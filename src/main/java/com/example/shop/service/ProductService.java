package com.example.shop.service;

import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // 상품 등록
    public Product createProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now()); // 등록 시간 설정
        return productRepository.save(product);
    }

    // 전체 상품 조회
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 상품 ID로 조회
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다. id=" + id));
    }

    // 검색
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(keyword, keyword);
    }

    // 정렬
    public List<Product> getProductsSorted(String sortBy) {
        return switch (sortBy) {
            case "price_asc" -> productRepository.findAllByOrderByPriceAsc();
            case "price_desc" -> productRepository.findAllByOrderByPriceDesc();
            case "newest" -> productRepository.findAllByOrderByCreatedAtDesc();
            case "oldest" -> productRepository.findAllByOrderByCreatedAtAsc();
            default -> productRepository.findAll(); // 기본: 정렬 없음
        };
    }
}