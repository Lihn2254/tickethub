package com.tickethub.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tickethub.dto.TicketDTO;
import com.tickethub.services.TicketService;

import lombok.RequiredArgsConstructor;

record NewTicketRequest(String clientId, String eventId, int attendees) {
}

record UpdateTicketRequest(String ticketId, String clientId, int newStatus) {
}

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {
    private final TicketService ticketService;

    @GetMapping
    public ResponseEntity<List<TicketDTO>> getTickets(@RequestParam(required = true) String client_id) {
        System.out.println("\n------\nTicket request received for User with ID = " + client_id);

        try {
            if (client_id == null)
                throw new IllegalArgumentException("Client ID cannot be null.");

            List<TicketDTO> tickets = ticketService.getTicketsByClient(client_id);

            if (tickets == null || tickets.isEmpty()) {
                System.out.println("No tickets were found for this user");
            }

            return ResponseEntity.ok(tickets);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping
    public ResponseEntity<TicketDTO> createTicket(@RequestBody NewTicketRequest ticketRequest) {
        System.out.println("\n------\nRequest receiver for new ticket: event ID = " + ticketRequest.eventId()
                + "; client ID = " + ticketRequest.clientId());

        try {
            TicketDTO ticket = ticketService.createTicket(ticketRequest.clientId(), ticketRequest.eventId(),
                    ticketRequest.attendees());

            return ResponseEntity.ok(ticket);
        } catch (NoSuchElementException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(404).build(); // Not found
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(400).build(); // Bad request
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(500).build(); // Internal server error
        }
    }

    @PutMapping
    public ResponseEntity<TicketDTO> updateTicketStatus(@RequestBody UpdateTicketRequest updateTicketRequest) {
        System.out.println("\n------\nUpdate request receiver for Ticket ID = " + updateTicketRequest.ticketId()
                + " by Client ID = " + updateTicketRequest.clientId() + "\nNew status: "
                + updateTicketRequest.newStatus());

        try {
            TicketDTO updatedTicket = ticketService.updateTicketStatus(updateTicketRequest.ticketId(), updateTicketRequest.clientId(), updateTicketRequest.newStatus());
            return ResponseEntity.ok(updatedTicket);
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(400).build(); // Bad request
        } catch (NoSuchElementException e) {
            System.err.println("Ticket could not be found");
            return ResponseEntity.status(404).build(); // Not found
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(500).build(); // Internal server error
        }
    }
}
