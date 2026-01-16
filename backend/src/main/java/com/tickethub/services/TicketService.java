package com.tickethub.services;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeansException;
import org.springframework.stereotype.Service;

import com.tickethub.domain.Client;
import com.tickethub.domain.Event;
import com.tickethub.domain.Order;
import com.tickethub.domain.Ticket;
import com.tickethub.dto.OrderDTO;
import com.tickethub.dto.ScannedTicketDTO;
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

        if (newStatus == 2 && isRefundable(ticket)) { // If newStatus is a cancelation then the corresponding Order must
                                                      // be processed
            ticket.getOrder().setPaymentStatus(2); // status = Reimbursed (2)
            System.out.println("\tReimbursement was processed");
        }

        // Update ticket status
        ticket.setStatus(newStatus);

        // As @Transactional is being used, when saving the ticket the order is also
        // saved
        Ticket savedTicket = ticketRepository.save(ticket);

        return convertToDTO(savedTicket);
    }

    public Boolean isRefundable(Ticket ticket) {
        // If the ticket is canceled 48 hours or more before the event, the order will
        // be reimbursed
        long hoursUntilEvent = ChronoUnit.HOURS.between(OffsetDateTime.now(), ticket.getEvent().getStartTime());
        if (hoursUntilEvent >= 48L) {
            System.out.println("\tThe order is eligible for a refund");
            return true;
        } else {
            System.out.println("\tThe order is not eligible for a refund. (Event is in " + hoursUntilEvent + " hours)");
            return false;
        }
    }

    public Boolean isRefundable(String ticketId) {
        if (ticketId == null) {
            throw new IllegalArgumentException("Ticket ID cannot be null");
        }

        Ticket ticket = ticketRepository.findById(randomizeId.decode(ticketId)).get();

        // If the ticket is canceled 48 hours or more before the event, the order will
        // be reimbursed
        long hoursUntilEvent = ChronoUnit.HOURS.between(OffsetDateTime.now(), ticket.getEvent().getStartTime());
        if (hoursUntilEvent >= 48L) {
            System.out.println("\tTicket ID = " + ticketId + " is eligible for a refund");
            return true;
        } else {
            System.out.println("\tTicket ID = " + ticketId + " is not eligible for a refund. (Event is in "
                    + hoursUntilEvent + " hours)");
            return false;
        }
    }

    @Transactional
    public ScannedTicketDTO markAsUsed(String ticketId, boolean markAll) throws Exception {
        if (ticketId == null) {
            throw new IllegalArgumentException("Ticket ID cannot be null");
        }

        Ticket ticket = ticketRepository.findById(randomizeId.decode(ticketId)).get();

        int remainingAttendees = ticket.getRemainingAttendees();

        if (remainingAttendees != 0) {
            if (markAll) {
                ticket.setRemainingAttendees(0);
                ticket.setStatus(0); //Mark ticket as USED
            } else {
                ticket.setRemainingAttendees(remainingAttendees - 1);

                if (remainingAttendees - 1 == 0) {
                    ticket.setStatus(0); //Mark ticket as USED
                }
            }

            System.out.println("\tTicket had " + remainingAttendees + " remaining attendees out of " + ticket.getAttendees() + " total attendees");
            System.out.println("\tCurrent remaining attendees: " + (ticket.getRemainingAttendees()));

            //ticketRepository.save(ticket);
        } else {
            System.out.println("\tTicket has no remaining attendees");
        }

        return converToDTO(ticket);
    }

    private TicketDTO convertToDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();

        dto.setId(randomizeId.encode(ticket.getId()));
        dto.setStatus(ticket.getStatus());
        dto.setPurchasePrice(ticket.getPurchasePrice());
        dto.setAttendees(ticket.getAttendees());
        dto.setRemainingAttendees(ticket.getRemainingAttendees());

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

    private ScannedTicketDTO converToDTO(Ticket ticket) throws Exception {
        try {
            if (ticket != null) {
                ScannedTicketDTO dto = new ScannedTicketDTO();

                BeanUtils.copyProperties(ticket, dto, "id", "event");

                dto.setId(randomizeId.encode(ticket.getId()));

                // Map Client to TicketClietnDTO
                Client client = ticket.getOrder().getClient();
                TicketClientDTO ticketClientDTO = new TicketClientDTO();

                if (client != null) {
                    BeanUtils.copyProperties(client, ticketClientDTO, "id");
                    ticketClientDTO.setId(randomizeId.encode(ticket.getId()));
                }
                dto.setClient(ticketClientDTO);

                // Map Event to TicketEventDTO
                Event event = ticket.getEvent();
                TicketEventDTO ticketEventDTO = new TicketEventDTO();

                if (event != null) {
                    BeanUtils.copyProperties(event, ticketEventDTO, "id");
                    ticketEventDTO.setId(randomizeId.encode(event.getId()));
                }
                dto.setEvent(ticketEventDTO);

                return dto;
            } else {
                throw new IllegalArgumentException("Ticket cannot be null");
            }
        } catch (BeansException e) {
            e.printStackTrace();
            throw new Exception("Something went wrong. Could not convert User to UserDTO");
        }
    }
}
