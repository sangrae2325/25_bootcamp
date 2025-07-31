# 25_bootcamp


- 상품 등록 및 구매 기능 구현
    
    ## 진행과정
    
    1. 개발 환경 세팅
    2. API 명세서 작성
    3. 백엔드 설계
        1. DB연동(MySQL)
        2. 기본 MVC 구조 설계
        3. API 구현
        4. kafka 연동
    4. 프론트 설계
        1. React 프로젝트 생성
        2. API 호출 모듈 작성
        3. UI 컴포넌트 개발
        4. 사용자 인터렉션 처리
    5. 연결
    
    ## 1. 개발 환경 세팅
    
    - Spring Boot
        - **Spring Web**
        - **Spring Data JPA**
        - **MySQL Driver**
        - Kafka
        - Lombok
    - 빌드 도구: Gradle
    - MySQL
    - React, React Query, React router
    
    ## 2. API 명세서 작성
    
    - [GET] 상품 목록 불러오기
    - [POST] 상품 등록
    - [GET] 특정 상품 조회
    - [POST] 상품 구매
    - [GET] 구매 내역 불러오기
    
    → 각각의 API 마다 Path Variable, Query Variable, Request Body, Response Body, 엔드포인트 설정 
    
    ## 3-1. 백엔드 설계 - DB연동(MySQL)
    
    - dbdigram에서 ERD설계 후 MySQL workbench에 Export
    - `application.properties`에 설정
    
    ## 3-2. 백엔드 설계 - 기본 MVC 구조 설계
    
    ```tsx
    src/main/java/com/example/shop
    ├── ShopApplication.java
    ├── controller
     │   └── ProductController.java
    ├── entity
    │   └── Product.java
    │   └── User.java
    │   └── Order.java
    │   └── OrderItem.java
    ├── repository
    │   └── ProductRepository.java
    ├── service
    │   └── ProductService.java
    ```
    
    ## 3-3. 백엔드 설계 - API 구현
    
    ### 3-3-1. Product 기능 구현
    
    - **Product Entity 생성**
        - id, name, price, stock, description, imageUrl 필드 구성
        
        ```java
        package com.example.shop.entity;
        
        import jakarta.persistence.*;
        import lombok.Getter;
        import lombok.NoArgsConstructor;
        import lombok.Setter;
        
        @Entity
        @Table(name = "product")
        @Getter
        @Setter
        @NoArgsConstructor
        public class Product {
        
            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            private Integer id;
        
            private String name;
        
            private Integer price;
        
            private Integer stock;
        
            private String description;
        
            @Column(name = "image_url")
            private String imageUrl;
        }
        ```
        
    - **ProductRepository 생성**
        - JpaRepository<Product, Integer> 상속
        
        ```java
        package com.example.shop.repository;
        
        import com.example.shop.entity.Product;
        import org.springframework.data.jpa.repository.JpaRepository;
        
        public interface ProductRepository extends JpaRepository<Product, Integer> {
        }
        ```
        
    - **ProductController 구현**
        - 전체 상품 목록 조회 (GET /products)
        - 특정 상품 상세 조회 (GET /products/{id})
        - 상품 등록 (POST /products)
        
        ```java
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
        ```
        
    - **Postman 테스트 완료**
    
    ### 3-3-2. 상품구매 및 구매항목 기능 구현
    
    - **Order Entity 생성**
        - 주문 ID, 사용자(User) - 로그인 기능까지는 구현을 안해서 어떻게 할지 고민, 생성일, 주문 상품 목록(OrderItem) 포함
    - **OrderItem Entity 생성**
        - 주문 상품 ID, 상품(Product), 수량, 가격 필드 포함
    - **OrderRepository, OrderItemRepository 생성**
    - **DTO 생성**
        - OrderRequestDto: 주문 요청 본문 전체
        - OrderItemDto: 개별 주문 항목 정보
    - **OrderController 구현**
        - 상품 구매 요청 처리 (POST /orders)
            - 유저 존재 확인
            - 재고 수량 확인 및 차감
            - 주문 및 주문 항목 저장
        - 사용자별 구매 내역 조회 (GET /orders/{userId})
    
    ## 4. 프론트 설계
    
    ### 4-1. **React 프로젝트 생성**
    
    - 라이브러리 : react-router-dom , axios
    - react router 설정
    - 구조
        
        ```
        #tshop_frontend/
        │
        ├── public/
        │   └── index.html             # Tailwind 사용 예정
        │
        ├── src/
        │   ├── api/                    
        │   │    └── api.ts             
        │   │
        │   ├── components/             # 아직 미정 
        │   │    └── Button.ts
        │   │    └── ProductCard.ts
        │   │
        │   ├── pages/                  
        │   │    └── ProductList.ts     # 상품 목록 페이지
        │   │    └── ProductDetail.ts   # 상품 상세 페이지
        │   │    └── OrderList.tts       # 구매 내역 페이지
        │   │
        │   ├── router/                 # React Router 관련 설정
        │   │    └── AppRouter.ts       # 라우터 경로 정의
        │   │
        │   ├── context/                # React Context 상태 관리
        │   │    └── UserContext.ts
        │   │
        │   ├── App.ts                  
        │   ├── index.ts                # ReactDOM.render 진입점
        │   └── setupTests.ts           
        │
        ├── package.json                
        ├── .gitignore                 
        └── README.md                   
        
        ```
