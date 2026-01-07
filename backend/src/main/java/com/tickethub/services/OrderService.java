package com.tickethub.services;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.tickethub.domain.Client;
import com.tickethub.domain.Event;
import com.tickethub.domain.Order;
import com.tickethub.dto.OrderDTO;
import com.tickethub.dto.ticket.TicketClientDTO;
import com.tickethub.repositories.ClientRepository;
import com.tickethub.repositories.OrderRepository;
import com.tickethub.utils.randomizeId;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;

    public Order createOrder(String clientId, Event event, int attendees) throws Exception {
        try {
            Client client = clientRepository.findById(randomizeId.decode(clientId)).get();

            BigDecimal totalAmount = event.getPrice().multiply(new BigDecimal(attendees));

            Order newOrder = new Order(totalAmount, 1, client); // status = 1 (Paid). For now, all orders will be marked as paid
            newOrder.setOrderDate(OffsetDateTime.now());

            Order savedOrder = orderRepository.save(newOrder);

            return savedOrder;
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            throw new NoSuchElementException("The client does not exist. Operation aborted");
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An unexpected error ocurred. Order could not be saved.");
        }
    }

    public List<OrderDTO> getOrdersByClient(String clientId) {
        try {
            List<Order> orders = orderRepository.findByClient_Id(randomizeId.decode(clientId));

            List<OrderDTO> mappedOrders = new ArrayList<>();

            for (Order order : orders) {
                mappedOrders.add(convertToDTO(order));
            }

            return mappedOrders;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("An error ocurred. Orders could not be consulted.");
            return null;
        }
    }

    private OrderDTO convertToDTO(Order order) {
        return new OrderDTO(randomizeId.encode(order.getId()), order.getOrderDate(), order.getTotalAmount(), order.getPaymentStatus(),
                new TicketClientDTO(randomizeId.encode(order.getClient().getId()), order.getClient().getEmail(),
                        order.getClient().getUsername()));
    }
}