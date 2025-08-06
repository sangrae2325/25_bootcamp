// src/main/java/com/example/shop/exception/OutOfStockException.java
package com.example.shop.exception;

public class OutOfStockException extends RuntimeException {
    public OutOfStockException(String message) {
        super(message);
    }
}