package com.example.shop.repository;

import com.example.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 이름 or 카테고리로 검색 (부분일치 포함)
    List<Product> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(String name, String category);

    // 가격 오름차순 정렬
    List<Product> findAllByOrderByPriceAsc();

    // 가격 내림차순 정렬
    List<Product> findAllByOrderByPriceDesc();

    // 최신순 정렬 (createdAt 기준)
    List<Product> findAllByOrderByCreatedAtDesc();

    // 오래된순 정렬
    List<Product> findAllByOrderByCreatedAtAsc();
}