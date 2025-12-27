package com.tickethub.services;

import java.time.OffsetDateTime;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.tickethub.domain.User;
import com.tickethub.repositories.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User authenticate(String credentials, String password) {
        try {
            User tmpUser;

            if (credentials.contains("@")) {
                tmpUser = userRepository.findByEmail(credentials);
            } else {
                tmpUser = userRepository.findByUsername(credentials);
            }

            if (!(tmpUser == null)) {
                if (tmpUser.getPassword().equals(password)) {
                    // Prevents the User password of being sent to the frontend
                    tmpUser.setPassword(null);
                    return tmpUser;
                } else {
                    throw new Exception("Password is incorrect.");
                }
            } else {
                throw new Exception("User was not found.");
            }
        } catch (Exception e) {
            e.getStackTrace();
        }

        return null;
    }

    public User register(User user) throws Exception {
        User tmpUser;
        try {
            user.setId(generateUserId());
            user.setRegistrationDate(OffsetDateTime.now());
            tmpUser = userRepository.save(user);
            tmpUser.setPassword(null);
            return tmpUser;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An error ocurred. User could not be saved.");
        }
    }

    // Temp solution
    private int generateUserId() {
        return new Random().nextInt(1, (int) Math.pow(2, 31));
    }

    public Boolean isCredentialAvaliable(String text) {
        if (text.contains("@")) {
            return userRepository.findByEmail(text) == null;
        } else {
            return userRepository.findByUsername(text) == null;
        }
    }

    public Boolean delete(User user) throws Exception {
        try {
            if (user != null) {
                userRepository.delete(user);
                return true;
            } else {
                throw new IllegalArgumentException("The user cannot be null.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An error ocurred. User could not be deleted properly.");
        }
    }
}
