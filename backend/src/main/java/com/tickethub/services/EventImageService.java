package com.tickethub.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.tickethub.dto.ImageDTO;

@Service
public class EventImageService {

    // Inject the path from properties
    @Value("${app.images.directory}")
    private String imgDirectory;

    public ImageDTO getFlyerImage(String fileName) {
        if (fileName == null || fileName.isBlank()) {
            throw new IllegalArgumentException("fileName cannot be null or empty");
        }

        try {
            // Get the current working directory and construct the path to the project root
            // This handles both running from backend directory and from project root
            String currentDir = System.getProperty("user.dir");
            Path basePath;
            
            if (currentDir.endsWith("backend")) {
                // Running from backend directory, go up one level to project root
                basePath = Paths.get(currentDir).getParent().resolve(imgDirectory).toAbsolutePath().normalize();
            } else {
                // Running from project root or elsewhere
                basePath = Paths.get(currentDir).resolve(imgDirectory).toAbsolutePath().normalize();
            }
            
            Path filePath = basePath.resolve(fileName).normalize();

            // Security check: Ensure the file is actually inside the image directory
            if (!filePath.startsWith(basePath)) {
                throw new IllegalArgumentException("Invalid file path");
            }

            if (Files.exists(filePath)) {
                ImageDTO flyerImg = new ImageDTO();
                flyerImg.setImg(Files.readAllBytes(filePath));

                // Safe extension extraction
                int dotIndex = fileName.lastIndexOf('.');
                String ext = (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);
                flyerImg.setExt(ext);

                return flyerImg;
            } else {
                System.err.println("File not found at: " + filePath.toString());
            }
        } catch (IOException e) {
            System.err.println("Error reading image: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
}
