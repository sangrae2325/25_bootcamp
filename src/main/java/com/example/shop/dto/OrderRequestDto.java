package com.example.shop.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderRequestDto {
    private Long userId;
    private List<OrderItemDto> items = new ArrayList<>();


    @Getter
    @Setter
    public static class OrderItemDto {
        private Long productId;
        private Long quantity;
    }
}