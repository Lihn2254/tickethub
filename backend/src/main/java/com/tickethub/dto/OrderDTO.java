package com.tickethub.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.tickethub.dto.ticket.TicketClientDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private int id;
    private OffsetDateTime orderDate;
    private BigDecimal total_amount;
    private int paymentStatus;
    private TicketClientDTO client;
}
