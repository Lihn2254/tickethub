package com.evant.controllers;

import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evant.domain.Client;
import com.evant.domain.User;
import com.evant.services.ClientService;
import com.evant.services.UserService;

record LoginRequest(String email, String password) {
}

record singleStringRequest(String text) {
} // Email || username

record RegisterRequest(int userId, String email, String username, String password, Date registrationDate,
        String userType) {
}

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
            return ResponseEntity.status(500).build();
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

    @PutMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        System.out.println("Sign up request received for user: " + user.toString());

        User registeredUser;
        try {
            registeredUser = userService.register(user);
            System.out.println("User: " + user.toString() + "was registered and returned.");
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestBody User user) {
        System.out.println("Deletion request received for user: " + user.getUsername() + " | " + user.getEmail());
 
        try {
            boolean res = userService.delete(user);
            System.out.println("User: " + user.toString() + "was successfully deleted.");
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }   
    }
}
