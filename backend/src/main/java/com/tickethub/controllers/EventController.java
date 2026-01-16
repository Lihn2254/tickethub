package com.tickethub.controllers;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tickethub.dto.EventDTO;
import com.tickethub.services.EventService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    private final EventService eventService;

    // Returns a list of events filter by genre, city, start time and end time
    @GetMapping
    public ResponseEntity<List<EventDTO>> getEvents(@RequestParam(required = false) List<String> genre,
            @RequestParam(required = false) List<String> city,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime end) {
        System.out.println("\n------\nFetch request for events with filters: " + genre + "; " + city + "; " + start + "; " + end);

        try {
            List<EventDTO> filteredEvents = eventService.getEvents(genre, city, start, end);
            return ResponseEntity.ok(filteredEvents);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Returns a single event given an ID
    @GetMapping("/id")
    public ResponseEntity<EventDTO> getEvent(@RequestParam(required = true) String event_id) {
        try {
            return ResponseEntity.ok(eventService.getEvent(event_id));
        } catch (NoSuchElementException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(404).build(); //Not found
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); //Error
        }
    }
}