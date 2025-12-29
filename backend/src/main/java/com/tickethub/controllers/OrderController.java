package com.tickethub.controllers;

import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tickethub.domain.Order;
import com.tickethub.dto.OrderDTO;
import com.tickethub.services.OrderService;

record OrderRequest (int clientId, int eventId, int attendees) {}

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // @PostMapping("")
    // public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderRequest orderRequest) {
    //     try {
    //         OrderDTO order = orderService.createOrder(orderRequest.clientId(), orderRequest.eventId(), orderRequest.attendees());

    //         return ResponseEntity.ok(order);
    //     } catch (NoSuchElementException e) {
    //         System.err.println(e.getMessage());
    //         return ResponseEntity.status(404).build(); //Not found
    //     } catch (Exception e) {
    //         System.err.println(e.getMessage());
    //         return ResponseEntity.status(500).build(); //Internal server error
    //     }
    // }
}
