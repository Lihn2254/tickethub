package com.tickethub.dto;

import java.math.BigDecimal;
import java.util.Date;
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
    private String name;
    private String genre;
    private String subtitle;
    private String description;
    private String city;
    private String address;
    private Date startTime;
    private BigDecimal price;
    private Set<OrganizerDTO> organizers;
    private Set<ArtistDTO> artists;

    //Natural ordering by startTime
    @Override
    public int compareTo(EventDTO other) {
        int dateComparison = this.startTime.compareTo(other.startTime);
        return dateComparison;
    }
}
