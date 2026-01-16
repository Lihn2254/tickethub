package com.tickethub.dto;

import com.tickethub.dto.ticket.TicketClientDTO;
import com.tickethub.dto.ticket.TicketEventDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScannedTicketDTO {
    private String id;
    private int status;
    private int attendees;
    private int remainingAttendees;
    private boolean validInstance;
    private TicketClientDTO client;
    private TicketEventDTO event;
}
