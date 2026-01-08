package com.tickethub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tickethub.domain.Client;

public interface ClientRepository extends JpaRepository<Client, Integer>{
    // @Query("""
    //         select c
    //         from clients c
    //         where c.email = ?1
    //         """)
    public Client findByEmail(String email);
}
