package com.tickethub.dto.ticket;

import java.math.BigDecimal;
import java.util.Date;

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
    private Date orderDate;
    private BigDecimal total_amount;
    private int paymentStatus;
    private TicketClientDTO client;
}
