package com.evant.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evant.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);

    public User findByUsername(String username);
}
