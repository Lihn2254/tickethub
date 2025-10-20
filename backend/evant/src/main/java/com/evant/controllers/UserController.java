package com.evant.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evant.domain.User;
import com.evant.dto.LoginRequest;
import com.evant.services.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login (@RequestBody LoginRequest loginRequest) {
        System.out.println("Login request received for email: " + loginRequest.email);
        
        User authenticatedUser = userService.authenticate(loginRequest.email, loginRequest.password);

        if (authenticatedUser == null) {
            return ResponseEntity.status(401).build();
        }

        System.out.println("Employee " + authenticatedUser.toString() + " was returned.");
        return ResponseEntity.ok(authenticatedUser);
    }
}
