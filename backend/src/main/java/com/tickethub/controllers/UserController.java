package com.tickethub.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tickethub.dto.UserDTO;
import com.tickethub.services.UserService;

import lombok.RequiredArgsConstructor;

record LoginRequest(String credentials, String password) { //credentials refers to either a username or email, couldn't find a better word
}

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("\n------\nLogin request received for: " + loginRequest.credentials());

        UserDTO authenticatedUser = userService.authenticate(loginRequest.credentials(), loginRequest.password());

        if (authenticatedUser == null) {
            System.out.println("User was not found.");
            return ResponseEntity.status(500).build();
        }

        System.out.println("User " + authenticatedUser.toString() + " was returned successfully.");
        return ResponseEntity.ok(authenticatedUser);
    }

    @PostMapping("/check-duplicate")
    public ResponseEntity<Boolean> checkDuplicate(@RequestBody String identifier) { //Email or Username
        Boolean isAvaliable = userService.isCredentialAvaliable(identifier);

        System.out.println("\n------\n" + identifier + " is avaliable: " + isAvaliable);

        return ResponseEntity.ok(isAvaliable);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO user) {
        System.out.println("\n------\nSign up request received for user: " + user.toString());

        UserDTO registeredUser;
        try {
            registeredUser = userService.register(user);
            System.out.println("User: ID=" + registeredUser.getId().toUpperCase() + " " + registeredUser.toString() + " was registered successfully.");
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestBody UserDTO user) {
        try {
            boolean res = userService.delete(user);
            System.out.println("\n------\nDeletion request received for user: " + user.getUsername() + " | " + user.getEmail());
            System.out.println("User: " + user.toString() + " was successfully deleted.");
            return ResponseEntity.ok(res);
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(500).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }   
    }
}
