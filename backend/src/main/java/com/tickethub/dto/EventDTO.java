package com.tickethub.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO implements Comparable<EventDTO>{
    private int id;
    private String flyerPath;
    private String name, genre, subtitle, description, city, address;
    private OffsetDateTime startTime;
    private BigDecimal price;
    private int maxAttendees, avaliablePlaces, status;
    private Set<OrganizerDTO> organizers;
    private Set<ArtistDTO> artists;

    //Natural ordering by startTime
    @Override
    public int compareTo(EventDTO other) {
        int dateComparison = this.startTime.compareTo(other.startTime);
        return dateComparison;
    }
}
