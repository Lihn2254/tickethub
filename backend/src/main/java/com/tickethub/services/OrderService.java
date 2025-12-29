package com.tickethub.services;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.tickethub.domain.Client;
import com.tickethub.domain.Event;
import com.tickethub.domain.Order;
import com.tickethub.dto.OrderDTO;
import com.tickethub.repositories.ClientRepository;
import com.tickethub.repositories.EventRepository;
import com.tickethub.repositories.OrderRepository;

@Service
public class OrderService {
    private OrderRepository orderRepository;
    private EventRepository eventRepository;
    private ClientRepository clientRepository;

    public OrderService(OrderRepository orderRepository, EventRepository eventRepository,
            ClientRepository clientRepository) {
        this.orderRepository = orderRepository;
        this.eventRepository = eventRepository;
        this.clientRepository = clientRepository;
    }

    public Order createOrder(int clientId, int eventId, int attendees) {
        try {
            Event event = eventRepository.findById(eventId).get();
            Client client = clientRepository.findById(clientId).get();

            BigDecimal totalAmount = event.getPrice().multiply(new BigDecimal(attendees));

            Order newOrder = new Order(totalAmount, 1, client); // status = 1 (Paid). For now, all orders will be marked as paid
            newOrder.setOrderDate(OffsetDateTime.now());

            Order savedOrder = orderRepository.save(newOrder);
            savedOrder.getClient().setPassword(null);

            return savedOrder;
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            System.err.println("Either the client or event does not exist. Order could not be saved.");
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("An unexpected error ocurred. Order could not be saved.");
            return null;
        }
    }

    public List<OrderDTO> getOrders(int clientId) {
        return null; //TODO
    }

    private OrderDTO convertToDTO(Order order) {
        return new OrderDTO(order.getId(), order.getOrderDate(), order.getTotalAmount(), order.getPaymentStatus(),
                order.getClient().getId());
    }
}
