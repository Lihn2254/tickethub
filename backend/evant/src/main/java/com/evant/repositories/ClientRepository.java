package com.evant.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evant.domain.Client;

public interface ClientRepository extends JpaRepository<Client, Long>{
    // @Query("""
    //         select c
    //         from clients c
    //         where c.email = ?1
    //         """)
    public Client findByEmail(String email);
}
