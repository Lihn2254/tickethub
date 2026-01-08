package com.tickethub.services;

import java.time.OffsetDateTime;
import java.util.Random;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeansException;
import org.springframework.stereotype.Service;

import com.tickethub.domain.Client;
import com.tickethub.domain.Organizer;
import com.tickethub.domain.User;
import com.tickethub.dto.ClientDTO;
import com.tickethub.dto.OrganizerDTO;
import com.tickethub.dto.UserDTO;
import com.tickethub.repositories.UserRepository;
import com.tickethub.utils.randomizeId;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserDTO authenticate(String credentials, String password) {
        try {
            User tmpUser;

            if (credentials.contains("@")) {
                tmpUser = userRepository.findByEmail(credentials);
            } else {
                tmpUser = userRepository.findByUsername(credentials);
            }

            if (tmpUser != null) {
                if (tmpUser.getPassword().equals(password)) {
                    return convertToDTO(tmpUser);
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

    @Transactional
    public UserDTO register(UserDTO dto) throws Exception {
        try {
            User user = convertToUser(dto);
            user.setId(generateUserId());
            user.setRegistrationDate(OffsetDateTime.now());
            User savedUser = userRepository.save(user);
            return convertToDTO(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("An error ocurred. User could not be saved.");
        }
    }

    // TODO - Temp solution
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

    @Transactional
    public Boolean delete(UserDTO dto) throws Exception {
        try {
            User user = convertToUser(dto);

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

    private UserDTO convertToDTO(User user) throws Exception{
        try {
            if (user != null) {
                UserDTO dto;

                if (user instanceof Client) {
                    dto = new ClientDTO();
                    //dto.setAccountType("client");
                } else {
                    dto = new OrganizerDTO();
                    //dto.setAccountType("organizer");
                };

                BeanUtils.copyProperties(user, dto, "id", "password", "accountType"); //Copy all properties from User to UserDTO, but ignores id, password and accountType since they'll be handled manually

                dto.setId(randomizeId.encode(user.getId()));
                dto.setPassword(null); // Prevents the User password from being sent to the frontend

                return dto;
            } else {
                throw new IllegalArgumentException("User cannot be null");
            }
        } catch (BeansException e) {
            e.printStackTrace();
            throw new Exception("Something went wrong. Could not convert User to UserDTO");
        }
    }

    private User convertToUser(UserDTO dto) throws Exception {
        try {
            if (dto != null) {
                User user = (dto instanceof ClientDTO) ? new Client() : new Organizer();

                BeanUtils.copyProperties(dto, user, "id", "accountType"); //Copy all properties from UserDTO to User, but ignores id and accountType since they'll be handled manually

                //If the DTO object has a null ID (which means its a new user) the User object ID remains as null
                //If the DTO object does have an ID, it is decoded and assigned to the User object
                if (dto.getId() != null) {
                    user.setId(randomizeId.decode(dto.getId()));
                }

                return user;
            } else {
                throw new IllegalArgumentException("UserDTO cannot be null");
            }
        } catch (BeansException e) {
            e.printStackTrace();
            throw new Exception("Something went wrong. Could not convert UserDTO to User");
        }
    }
}
