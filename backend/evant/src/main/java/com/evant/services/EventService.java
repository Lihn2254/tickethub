package com.evant.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.evant.domain.Event;
import com.evant.repositories.EventRepository;
import jakarta.persistence.criteria.Predicate;

@Service
public class EventService {
    public EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getEvents(List<String> genres, List<String> cities, Date start, Date end) throws Exception {
    try {
        Specification<Event> filteredEvents = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Genre filter
            // SQL query: (genre ILIKE '%value1%' OR genre ILIKE '%value2%')
            if (genres != null && !genres.isEmpty()) {
                List<Predicate> genrePredicates = new ArrayList<>();
                for (String g : genres) {
                    // Add each genre to the predicate using lower(genre) LIKE lower(%value%) to take into account case sensitivity
                    genrePredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("genre")), 
                        "%" + g.toLowerCase() + "%"
                    ));
                }
                // criteriaBuilder.or() expects an Array, so genrePredicates is transformed to an Array according to new Predicate[0]
                // genrePredicates is added to predicates to build the general SQL clause. 
                // OR operator was chosen because an event has only one genre, but we want the result to be any of the list.
                predicates.add(criteriaBuilder.or(genrePredicates.toArray(new Predicate[0])));
            }

            // 2. City filter
            if (cities != null && !cities.isEmpty()) {
                List<Predicate> cityPredicates = new ArrayList<>();
                for (String c : cities) {
                    cityPredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("city")), 
                        "%" + c.toLowerCase() + "%"
                    ));
                }
                predicates.add(criteriaBuilder.or(cityPredicates.toArray(new Predicate[0])));
            }

            // 3. Start date filter >=
            if (start != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("startTime"), start));
            }

            // 4. End date filter <=
            if (end != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("startTime"), end));
            }

            // Combine all filters with AND
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        // Executes dynamic query
        return eventRepository.findAll(filteredEvents);

    } catch (Exception e) {
        e.printStackTrace();
        throw new Exception("An error occurred. Events could not be consulted.");
    }
}
}
