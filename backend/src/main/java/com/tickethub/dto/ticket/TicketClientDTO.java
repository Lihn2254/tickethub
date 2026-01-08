package com.tickethub.dto.ticket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketClientDTO {
    private String id;
    private String email, username, name, lastname;
}
