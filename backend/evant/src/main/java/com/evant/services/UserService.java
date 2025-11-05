package com.evant.services;

import java.util.Date;
import java.util.Random;

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
            user.setId(new Random().nextInt(1, (int) Math.pow(2, 31)));
            user.setRegistrationDate(new Date());
            tmpUser = userRepository.save(user);
            tmpUser.setPassword(null);
            return tmpUser;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An error ocurred. User could not be saved.");
        }
    }

    public Boolean isCredentialAvaliable(String text) {
        if (text.contains("@")) {
            return userRepository.findByEmail(text) == null;
        } else {
            return userRepository.findByUsername(text) == null;
        }
    }

    public Boolean delete(User user) throws Exception{
        try {
            userRepository.delete(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An error ocurred. User could not be deleted properly.");
        }
    }
}
