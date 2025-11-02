package com.evant.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evant.domain.Organizer;

public interface OrganizerRepository extends JpaRepository<Organizer, Long>{
    // @Query("""
    //         select o
    //         from organizers o
    //         where o.email = ?1
    //         """)
    public Organizer findByEmail(String email);
}
