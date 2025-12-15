package com.tickethub.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;

import com.tickethub.dto.ImageDTO;

@Service
public class EventImageService {
    public ImageDTO getFlyerImage(String fileName) throws IllegalArgumentException {
        try {
            if (fileName == null) {
                throw new IllegalArgumentException("fileName cannot be null");
            }

            ImageDTO flyerImg = new ImageDTO();
            String imgDirectory = "F:/Git_Repositories/ticketmaster/flyer_img/";
            Path path = Paths.get(imgDirectory, fileName);

            if (Files.exists(path)) {
                flyerImg.setImg(Files.readAllBytes(path));
                flyerImg.setExt(fileName.substring(fileName.indexOf('.') + 1)); //Return the file type without the dot.
                return flyerImg;
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("An error ocurred while trying to read the image.");
        }
        return null;
    }
}
