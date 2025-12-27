package com.tickethub.dto.ticket;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketOrderDTO {
    private int id;
    private OffsetDateTime orderDate;
    private BigDecimal total_amount;
    private int paymentStatus;
    private TicketClientDTO client;
}
