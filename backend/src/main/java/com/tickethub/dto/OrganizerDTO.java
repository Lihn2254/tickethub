package com.tickethub.dto;

import java.util.Map;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class OrganizerDTO extends UserDTO{
    private String name;
    private Map<String, String> socials;
    private Set<EventDTO> events;
}
