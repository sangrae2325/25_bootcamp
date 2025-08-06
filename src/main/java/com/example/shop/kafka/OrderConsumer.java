package com.example.shop.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderConsumer {

    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void listenOrder(String message) {
        System.out.println("Received order message: " + message);
        // TODO: 메시지 수신 후 실제 주문 처리 로직 작성 가능
    }
}