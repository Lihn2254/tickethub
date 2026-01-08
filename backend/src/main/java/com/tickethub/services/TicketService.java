package com.tickethub.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tickethub.domain.Client;
import com.tickethub.domain.Event;
import com.tickethub.domain.Order;
import com.tickethub.domain.Ticket;
import com.tickethub.dto.OrderDTO;
import com.tickethub.dto.TicketDTO;
import com.tickethub.dto.ticket.TicketClientDTO;
import com.tickethub.dto.ticket.TicketEventDTO;
import com.tickethub.repositories.EventRepository;
import com.tickethub.repositories.TicketRepository;
import com.tickethub.utils.randomizeId;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final OrderService orderService;

    public List<TicketDTO> getTicketsByClient(String clientId) {
        try {

            List<Ticket> tickets = ticketRepository.findByOrder_Client_Id(randomizeId.decode(clientId));

            List<TicketDTO> mappedTickets = new ArrayList<>();

            for (Ticket ticket : tickets) {
                mappedTickets.add(convertToDTO(ticket));
            }

            return mappedTickets;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("An error ocurred. Tickets could not be consulted.");
            return null;
        }
    }

    @Transactional
    public TicketDTO createTicket(String clientId, String eventId, int attendees) throws Exception {
        if (attendees <= 0) {
            throw new IllegalArgumentException("The number of attendees must be greater than zero. Operation aborted.");
        }

        Event event = eventRepository.findById(randomizeId.decode(eventId)).get();

        if (event.getAvaliablePlaces() < attendees) {
            throw new Exception("Not enough available places for this event. Operation aborted.");
        }

        Order order = orderService.createOrder(clientId, event, attendees);
        Ticket savedTicket = ticketRepository.save(new Ticket(attendees, 1, event.getPrice(), order, event)); // status
                                                                                                              // =
                                                                                                              // Active
                                                                                                              // (1)

        event.setAvaliablePlaces(event.getAvaliablePlaces() - attendees); // Update available places

        if (event.getAvaliablePlaces() == 0) { // If no places are available, mark event as sold out
            event.setStatus(3); // Sold out
        }

        eventRepository.save(event);

        System.out.println("\tTicket and order were created successfully.\n\tRemaining places for event (id = "
                + event.getId() + ") '" + event.getName() + "': " + event.getAvaliablePlaces());

        return convertToDTO(savedTicket);
    }

    private TicketDTO convertToDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();

        dto.setId(randomizeId.encode(ticket.getId()));
        dto.setStatus(ticket.getStatus());
        // dto.setQrCode(ticket.getQrcode());
        dto.setPurchasePrice(ticket.getPurchasePrice());
        dto.setAttendees(ticket.getAttendees());

        Order order = ticket.getOrder();
        if (order != null) {
            Client client = order.getClient();
            if (client != null) {
                dto.setOrder(new OrderDTO(
                        randomizeId.encode(order.getId()),
                        order.getOrderDate(),
                        order.getTotalAmount(),
                        order.getPaymentStatus(),
                        new TicketClientDTO(
                                randomizeId.encode(client.getId()),
                                client.getEmail(),
                                client.getUsername(),
                                client.getName(),
                                client.getLastname())));
            }
        }

        Event event = ticket.getEvent();
        if (event != null) {
            dto.setEvent(new TicketEventDTO(
                    randomizeId.encode(event.getId()),
                    event.getName(),
                    event.getFlyer(),
                    event.getCity(),
                    event.getAddress(),
                    event.getStartTime()));
        }

        return dto;
    }
}
