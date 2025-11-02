package com.evant.services;

import org.springframework.stereotype.Service;

import com.evant.domain.User;
import com.evant.repositories.ClientRepository;
import com.evant.repositories.OrganizerRepository;
import com.evant.repositories.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;
    private ClientRepository clientRepository;
    private OrganizerRepository organizerRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User authenticate(String email, String password) {
        try {
            User tmpUser = userRepository.findByEmail(email);

            if (!(tmpUser == null)) {
                if (tmpUser.getPassword().equals(password)) {
                    // Prevents the User password of being sent to the frontend
                    tmpUser.setPassword(null);
                    return tmpUser;
                } else {
                    throw new Exception("Password is incorrect.");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
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
