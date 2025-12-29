package com.tickethub.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDTO {
    private Integer id;
    private OffsetDateTime orderDate;
    private BigDecimal totalAmount;
    private int paymentStatus;
    private int clientId;
}
