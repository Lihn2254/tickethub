package com.evant.controllers;

import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evant.domain.Client;
import com.evant.domain.User;
import com.evant.services.ClientService;
import com.evant.services.UserService;

record LoginRequest(String email, String password) {}

record singleStringRequest(String text) {} // Email || username

record RegisterRequest(int userId, String email, String username, String password, Date registrationDate, String userType){}


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login request received for email: " + loginRequest.email());

        User authenticatedUser = userService.authenticate(loginRequest.email(), loginRequest.password());

        if (authenticatedUser == null) {
            System.out.println("User was not found.");
            return ResponseEntity.status(401).build();
        }

        System.out.println("User " + authenticatedUser.toString() + " was returned.");
        return ResponseEntity.ok(authenticatedUser);
    }

    @PostMapping("/check-duplicate")
    public ResponseEntity<Boolean> checkDuplicate(@RequestBody singleStringRequest request) {
        Boolean isAvaliable = userService.isCredentialAvaliable(request.text());

        System.out.println(request.text() + " is avaliable: " + isAvaliable);

        return ResponseEntity.ok(isAvaliable);
    }

    // @PostMapping("/register")
    // public ResponseEntity<User> register(@RequestBody singleStringRequest request) {

    //     return ResponseEntity.ok(true);
    // }
}
