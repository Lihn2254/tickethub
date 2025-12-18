package com.tickethub.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tickethub.domain.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByOrder_Client_Id(Long clientId);
}