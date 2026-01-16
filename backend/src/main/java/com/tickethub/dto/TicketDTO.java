package com.tickethub.dto;

import java.math.BigDecimal;

import com.tickethub.dto.ticket.TicketEventDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO implements Comparable<TicketEventDTO>{
    private String id;
    private int status;
    private BigDecimal purchasePrice;
    private int attendees;
    private int remainingAttendees;
    private OrderDTO order;
    private TicketEventDTO event;

    //Natural ordering by startTime of the event
    @Override
    public int compareTo(TicketEventDTO other) {
        int dateComparison = this.event.getStartTime().compareTo(other.getStartTime());
        return dateComparison;
    }
}
