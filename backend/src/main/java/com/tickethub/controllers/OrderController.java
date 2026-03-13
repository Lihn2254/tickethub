package com.tickethub.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tickethub.dto.OrderDTO;
import com.tickethub.services.OrderService;

import lombok.RequiredArgsConstructor;

record OrderRequest (int clientId, int eventId, int attendees) {}

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "https://tickethub.erickdh.com")
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getOrders(@RequestParam(required = true) String client_id) {
        try {
            if (client_id == null)
                throw new IllegalArgumentException("Client ID cannot be null.");

            List<OrderDTO> orders = orderService.getOrdersByClient(client_id);

            if (orders == null || orders.isEmpty()) {
                System.out.println("No orders were found for this user");
                return ResponseEntity.status(404).build();
            }

            return ResponseEntity.ok(orders);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
