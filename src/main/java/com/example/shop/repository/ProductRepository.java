package com.example.shop.repository;

import com.example.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

// id가 Long 타입인 Product에 대한 Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}