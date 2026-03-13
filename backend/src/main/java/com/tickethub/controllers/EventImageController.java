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

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/events/images")
@CrossOrigin(origins = "https://tickethub.erickdh.com")
public class EventImageController {
    private final EventImageService eventImageService;

    @GetMapping
    public ResponseEntity<List<ImageDTO>> getFlyerImage(@RequestParam(name = "flyer_path", required = true) List<String> fileNames) {
        List<ImageDTO> flyerBatch = new ArrayList<>();

        if (fileNames.isEmpty()) {
            //400 - Bad request.
            return ResponseEntity.status(400).build();
        }
        
        System.out.println("\n------\nRequest received for the following images:");
        
        //Check one by one if the files exist
        for (String fileName : fileNames) {
            System.out.println(fileName);

            //Get the image the image from the predetermined location
            ImageDTO flyerImg = eventImageService.getFlyerImage(fileName);

            //If an image with the given name was found, add it to the image batch.
            if (flyerImg != null) {
                System.out.println("Image with name: " + fileName + " was returned.\n------");
                flyerBatch.add(flyerImg);
            } else {
               System.err.println("Image could not be found.\n------"); 
               flyerBatch.add(flyerImg); //Adds null to the batch, so we know that particular image was not found
            }
        }

        if (!flyerBatch.isEmpty()) {
            return ResponseEntity.ok(flyerBatch);
        }    
        
        //404 - Not found. In case no images where found
        return ResponseEntity.status(404).build();
    }
}
