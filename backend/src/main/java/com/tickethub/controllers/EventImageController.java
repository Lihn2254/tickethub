package com.tickethub.controllers;

import java.util.ArrayList;
import java.util.List;

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
    public ResponseEntity<List<ImageDTO>> getFlyerImage(@RequestParam(name = "flyer_path", required = true) List<String> fileNames) {
        List<ImageDTO> flyerBatch = new ArrayList<>();
        
        System.out.println("Request received for the following images:");
        //Check one by one if the files exist
        for (String fileName : fileNames) {
            System.out.println(fileName);
            ImageDTO flyerImg = eventImageService.getFlyerImage(fileName);
            if (flyerImg != null) {
                System.out.println("Image with name: " + fileName + " was returned.\n------");
                flyerBatch.add(flyerImg);
            } else {
               System.err.println("Image could not be found.\n------"); 
            }
        }

        if (!flyerBatch.isEmpty()) {
            return ResponseEntity.ok(flyerBatch);
        }    
        
        //In caso no images where found
        return ResponseEntity.status(500).build();
    }
}
