package com.tickethub.domain;

import java.util.Map;
import java.util.Set;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true, exclude = {"events"})
@ToString(callSuper = true, exclude = {"events"})
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "organizers")
public class Organizer extends User{
    String name;
    
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, String> socials;

    @ManyToMany(mappedBy = "organizers")
    @JsonIgnore
    private Set<Event> events;
}
