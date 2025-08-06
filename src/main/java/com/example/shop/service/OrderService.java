package com.example.shop.service;

import com.example.shop.dto.OrderRequestDto;
import com.example.shop.entity.*;
import com.example.shop.repository.OrderRepository;
import com.example.shop.repository.ProductRepository;
import com.example.shop.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.shop.exception.OutOfStockException;
import org.springframework.kafka.core.KafkaTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        UserRepository userRepository,
                        KafkaTemplate<String, String> kafkaTemplate) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Transactional
    public Order createOrder(OrderRequestDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("ORDERED");

        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderRequestDto.OrderItemDto itemDto : dto.getItems()) {
            Product product = productRepository.findById((long) itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("상품 없음: " + itemDto.getProductId()));

            if (product.getStock() < itemDto.getQuantity()) {
                throw new OutOfStockException("[" + product.getName() + "] 상품의 재고가 부족합니다. 현재 재고: " + product.getStock());
            }

            product.setStock(product.getStock() - itemDto.getQuantity());

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice((Long) product.getPrice());

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        // Kafka 메시지 보내기
        kafkaTemplate.send("order-topic", "Order created with ID: " + savedOrder.getId());

        return savedOrder;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}