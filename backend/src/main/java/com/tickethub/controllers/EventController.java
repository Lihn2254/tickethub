package com.tickethub.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tickethub.dto.EventDTO;
import com.tickethub.services.EventService;

record EventRequest(List<String> genre, List<String> city, Date start, Date end) {
}

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {
    private EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> getEvents(@RequestParam(name = "genre", required = false) List<String> genre,
            @RequestParam(name = "city", required = false) List<String> city,
            @RequestParam(name = "start", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start,
            @RequestParam(name = "end", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
        System.out.println("Fetch request for events with filters: " + genre + "; " + city + "; " + start + "; " + end);

        try {
            List<EventDTO> filteredEvents = eventService.getEvents(genre, city, start, end);
            //Sort events by date
            //filteredEvents.stream().sort
            return ResponseEntity.ok(filteredEvents);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}