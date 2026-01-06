package com.tickethub.services;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.tickethub.domain.Event;
import com.tickethub.dto.ArtistDTO;
import com.tickethub.dto.EventDTO;
import com.tickethub.dto.OrganizerDTO;
import com.tickethub.repositories.EventRepository;
import com.tickethub.utils.randomizeId;

import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventDTO getEvent(String strEventId) throws Exception {
        if (strEventId.equals(null) || strEventId.isEmpty() || strEventId.isBlank()) {
            throw new IllegalArgumentException("eventId cannot be null");
        }

        try {
            return convertToDTO(eventRepository.findById(randomizeId.decode(strEventId)).get());
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            throw new NoSuchElementException("Event with id = " + strEventId + " could not be found");
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An unexpected error ocurred. Event ID could not be decoded");
        }
    }

    public List<EventDTO> getEvents(List<String> genres, List<String> cities, OffsetDateTime start, OffsetDateTime end) throws Exception {
        try {
            Specification<Event> filteredEvents = (root, query, criteriaBuilder) -> {
                List<Predicate> predicates = new ArrayList<>();

                // 1. Genre filter
                // SQL query: (genre ILIKE '%value1%' OR genre ILIKE '%value2%')
                if (genres != null && !genres.isEmpty()) {
                    List<Predicate> genrePredicates = new ArrayList<>();
                    for (String g : genres) {
                        // Add each genre to the predicate using lower(genre) LIKE lower(%value%) to
                        // take into account case sensitivity
                        genrePredicates.add(criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("genre")),
                                "%" + g.toLowerCase() + "%"));
                    }
                    // criteriaBuilder.or() expects an Array, so genrePredicates is transformed to
                    // an Array according to new Predicate[0]
                    // genrePredicates is added to predicates to build the general SQL clause.
                    // OR operator was chosen because an event has only one genre, but we want the
                    // result to be any of the list.
                    predicates.add(criteriaBuilder.or(genrePredicates.toArray(new Predicate[0])));
                }

                // 2. City filter
                if (cities != null && !cities.isEmpty()) {
                    List<Predicate> cityPredicates = new ArrayList<>();
                    for (String c : cities) {
                        cityPredicates.add(criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("city")),
                                "%" + c.toLowerCase() + "%"));
                    }
                    predicates.add(criteriaBuilder.or(cityPredicates.toArray(new Predicate[0])));
                }

                // 3. Start date filter >=
                if (start != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("startTime"), start));
                } else {
                    // If no start date is indicated, the default start date will be today.
                    OffsetDateTime todayStart = LocalDate.now().atStartOfDay()
                            .atOffset(OffsetDateTime.now().getOffset());
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("startTime"), todayStart));
                }

                // 4. End date filter <=
                if (end != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("startTime"), end));
                }

                // Combine all filters with AND
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            };

            // Executes dynamic query and converts to DTOs
            List<Event> events = eventRepository.findAll(filteredEvents);
            return events.stream()
                    .map(this::convertToDTO)
                    .sorted() // Sort by natural ordering of EventDTO
                    .collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An error occurred. Events could not be consulted.");
        }
    }

    private EventDTO convertToDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(randomizeId.encode(event.getId()));
        dto.setFlyerPath(event.getFlyer());
        dto.setName(event.getName());
        dto.setGenre(event.getGenre());
        dto.setSubtitle(event.getSubtitle());
        dto.setDescription(event.getDescription());
        dto.setCity(event.getCity());
        dto.setAddress(event.getAddress());
        dto.setStartTime(event.getStartTime());
        dto.setPrice(event.getPrice());
        dto.setAvaliablePlaces(event.getAvaliablePlaces());
        dto.setMaxAttendees(event.getMaxAttendees());
        dto.setStatus(event.getStatus());

        // Convert organizers to OrganizerDTOs (only id and name)
        if (event.getOrganizers() != null) {
            dto.setOrganizers(event.getOrganizers().stream()
                    .map(org -> new OrganizerDTO(randomizeId.encode(org.getId()), org.getName()))
                    .collect(Collectors.toSet()));
        }

        // Convert artists to ArtistDTOs (only id and name)
        if (event.getArtists() != null) {
            dto.setArtists(event.getArtists().stream()
                    .map(artist -> new ArtistDTO(randomizeId.encode(artist.getId()), artist.getName()))
                    .collect(Collectors.toSet()));
        }

        return dto;
    }
}
