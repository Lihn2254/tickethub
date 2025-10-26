package com.evant.services;

import org.springframework.stereotype.Service;

import com.evant.domain.User;
import com.evant.repositories.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService (UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User authenticate(String email, String password) {
        User userTmp = userRepository.findByEmail(email);
        
        if (!(userTmp == null)) {
            if (userTmp.getPassword().equals(password)) {
                userTmp.setPassword(null);
                return userTmp;
            }
        }
        
        return null;
    }

    public Boolean isCredentialAvaliable(String text) {
        if (text.contains("@")) {
            return userRepository.findByEmail(text) == null;
        } else {
            return userRepository.findByUsername(text) == null;
        }        
    }
}
