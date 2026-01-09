package com.tickethub.services;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
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

        // status = Active (1)
        Ticket savedTicket = ticketRepository.save(new Ticket(attendees, 1, event.getPrice(), order, event));

        event.setAvaliablePlaces(event.getAvaliablePlaces() - attendees); // Update available places

        if (event.getAvaliablePlaces() == 0) { // If no places are available, mark event as sold out
            event.setStatus(3); // Sold out
        }

        eventRepository.save(event);

        System.out.println("\tTicket and order were created successfully.\n\tRemaining places for event (id = "
                + event.getId() + ") '" + event.getName() + "': " + event.getAvaliablePlaces());

        return convertToDTO(savedTicket);
    }

    @Transactional
    public TicketDTO updateTicketStatus(String ticketId, String clientId, int newStatus) throws Exception {
        if (ticketId == null || clientId == null) {
            throw new IllegalArgumentException("Parameters cannot be null");
        }

        // (0) Used, (1) Active, (2) Canceled, (3) Expired
        if (newStatus > 3 || newStatus < 0) {
            throw new IllegalArgumentException(newStatus + " is not a valid ticket status");
        }

        int intTicketId = randomizeId.decode(ticketId);
        int intClientId = randomizeId.decode(clientId);

        Ticket ticket = ticketRepository.findById(intTicketId).get();

        if (!ticket.getOrder().getClient().getId().equals(intClientId)) {
            throw new IllegalArgumentException(
                    "Ticket ID = " + ticketId + " does not belong to Client ID = " + clientId);
        }

        if (newStatus == 2) { // If newStatus is a cancelation and the corresponding Order must be processed

            // If the ticket is canceled 48 hours or more before the event, the order will
            // be reimbursed
            long hoursUntilEvent = ChronoUnit.HOURS.between(OffsetDateTime.now(), ticket.getEvent().getStartTime());
            if (hoursUntilEvent >= 48L) {
                System.out.println("\tThe order is eligible for reimbursment");
                ticket.getOrder().setPaymentStatus(2); // status = Reimbursed (2)
                System.out.println("\tReimbursement was processed");
            } else {
                System.out.println(
                        "\tThe order is not eligible for reimbursement. (Event is in " + hoursUntilEvent + " hours)");
            }
        }

        // Update ticket status
        ticket.setStatus(newStatus);

        // As @Transactional is being used, when saving the ticket the order is also
        // saved
        Ticket savedTicket = ticketRepository.save(ticket);

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
