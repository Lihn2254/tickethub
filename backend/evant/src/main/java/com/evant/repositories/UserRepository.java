package com.evant.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evant.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("""
            select u
            from User u
            where u.email = ?1
            """)
    public User findByEmail(String email);
}
