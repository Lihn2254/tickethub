package com.tickethub.dto;

import java.math.BigDecimal;

import com.tickethub.dto.ticket.TicketEventDTO;
import com.tickethub.dto.ticket.TicketOrderDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO implements Comparable<TicketEventDTO>{
    private int id;
    private int status;
    //private String qrCode;
    private BigDecimal purchasePrice;
    private int attendees;

    private TicketOrderDTO order;
    private TicketEventDTO event;

    //Natural ordering by startTime of the event
    @Override
    public int compareTo(TicketEventDTO other) {
        int dateComparison = this.event.getStartTime().compareTo(other.getStartTime());
        return dateComparison;
    }
}
