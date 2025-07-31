package com.example.shop.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequestDto {
    private Integer userId;
    private List<OrderItemDto> items;
}