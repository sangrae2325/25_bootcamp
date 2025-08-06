package com.example.shop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "상품 이름은 필수입니다.")
    private String name;

    @Min(value = 1, message = "가격은 1원 이상이어야 합니다.")
    private Long price;

    @Min(value = 0, message = "재고는 0 이상이어야 합니다.")
    private Long stock;

    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @NotBlank(message = "카테고리는 필수입니다.")
    private String category;

    private LocalDateTime createdAt;
}