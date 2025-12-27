package com.tickethub.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tickethub.dto.TicketDTO;
import com.tickethub.services.TicketService;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {
    private TicketService ticketService;

    public TicketController (TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<List<TicketDTO>> getTickets(@RequestParam (required = true) Long client_id) {
        try {
            if (client_id == null) throw new IllegalArgumentException("Client ID cannot be null.");

            List<TicketDTO> tickets = ticketService.getTicketsByClient(client_id);

            if (tickets == null || tickets.isEmpty()) {
                System.out.println("No tickets were found for this user");
                return ResponseEntity.status(404).build();
            }

            return ResponseEntity.ok(tickets);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
