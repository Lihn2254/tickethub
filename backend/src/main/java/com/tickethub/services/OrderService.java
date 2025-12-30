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

import jakarta.persistence.EntityManager;

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

    public Order createOrder(int clientId, Event event, int attendees) throws Exception {
        try {
            Client client = clientRepository.findById(clientId).get();

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

    public List<OrderDTO> getOrders(int clientId) {
        return null; //TODO
    }

    private OrderDTO convertToDTO(Order order) {
        return new OrderDTO(order.getId(), order.getOrderDate(), order.getTotalAmount(), order.getPaymentStatus(),
                order.getClient().getId());
    }
}
