package com.tickethub.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tickethub.dto.ImageDTO;
import com.tickethub.services.EventImageService;

@RestController
@RequestMapping("/api/events/images")
@CrossOrigin(origins = "http://localhost:3000")
public class EventImageController {
    EventImageService eventImageService;

    public EventImageController(EventImageService eventImageService) {
        this.eventImageService = eventImageService;
    }

    @GetMapping
    public ResponseEntity<ImageDTO> getFlyerImage(@RequestParam(name = "flyer_path", required = true) String fileName) {
        System.out.println("Request received for image: " + fileName);
        ImageDTO flyerImg = eventImageService.getFlyerImage(fileName);

            if (flyerImg != null) {
                System.out.println("Image with name: " + fileName + " was returned.");
                return ResponseEntity.ok(flyerImg);
            }

            System.err.println("Image could not be found.");
            return ResponseEntity.status(500).build();
    }
}
