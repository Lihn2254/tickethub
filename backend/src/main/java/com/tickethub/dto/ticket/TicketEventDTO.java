package com.tickethub.dto.ticket;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketEventDTO {
    private String id;
    private String name;
    private String flyerPath;
    private String city;
    private String address;
    private OffsetDateTime startTime;
}
