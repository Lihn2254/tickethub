package com.tickethub.dto.ticket;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketEventDTO {
    private int id;
    private String name;
    private String flyer;
    private String city;
    private String address;
    private Date startTime;
}
