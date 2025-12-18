package com.tickethub.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tickethub.domain.Client;
import com.tickethub.domain.Event;
import com.tickethub.domain.Order;
import com.tickethub.domain.Ticket;
import com.tickethub.dto.TicketDTO;
import com.tickethub.dto.ticket.TicketClientDTO;
import com.tickethub.dto.ticket.TicketEventDTO;
import com.tickethub.dto.ticket.TicketOrderDTO;
import com.tickethub.repositories.TicketRepository;

@Service
public class TicketService {
    private TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketDTO> getTicketsByClient(Long clientId) {
        try {
            List<Ticket> tickets = ticketRepository.findByOrder_Client_Id(clientId);

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

    private TicketDTO convertToDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();

        dto.setId(ticket.getId());
        dto.setStatus(ticket.getStatus());
        dto.setQrCode(ticket.getQrcode());
        dto.setPurchasePrice(ticket.getPurchasePrice());
        dto.setAttendees(ticket.getAttendees());

        Order order = ticket.getOrder();
        if (order != null) {
            Client client = order.getClient();
            if (client != null) {
                dto.setOrder(new TicketOrderDTO(
                        order.getId(),
                        order.getOrderDate(),
                        order.getTotalAmount(),
                        order.getPaymentStatus(),
                        new TicketClientDTO(
                                client.getId(),
                                client.getEmail(),
                                client.getUsername())));
            }
        }

        Event event = ticket.getEvent();
        if (event != null) {
            dto.setEvent(new TicketEventDTO(
                    event.getId(),
                    event.getName(),
                    event.getFlyer(),
                    event.getCity(),
                    event.getAddress(),
                    event.getStartTime()));
        }

        return dto;
    }
}
