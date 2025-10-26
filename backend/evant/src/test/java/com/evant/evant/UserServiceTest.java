// src/test/java/com/evant/services/UserServiceTest.java

package com.evant.evant;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.evant.domain.User;
import com.evant.repositories.UserRepository;
import com.evant.services.UserService;

@ExtendWith(MockitoExtension.class) // Enables Mockito annotations
class UserServiceTest {

    @Mock
    private UserRepository userRepository; // Create a mock instance of the repository

    @InjectMocks
    private UserService userService; // Create an instance of UserService and inject the mock repository into it

    @Test
    void isEmailAvaliable_ShouldReturnTrue_WhenEmailDoesntExists() {
        String newEmail = "erick.davidhf@gmail.com";

        when(userRepository.findByEmail(newEmail)).thenReturn(null);

        boolean isAvailable = userService.isCredentialAvaliable(newEmail);

        assertTrue(isAvailable, "The method should return false for an existing email.");
    }
}