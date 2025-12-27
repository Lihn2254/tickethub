package com.tickethub.repositories;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tickethub.domain.Ticket;

import jakarta.transaction.Transactional;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    @Modifying // Required for UPDATE/DELETE queries
    @Transactional // Required to execute changes
    @Query("""
        UPDATE Ticket t 
        SET t.status = 3 
        WHERE t.status = 1 
        AND t.event.startTime < :cutoffTime
    """)
    int expireOldTickets(@Param("cutoffTime") OffsetDateTime cutoffTime);
    
    List<Ticket> findByOrder_Client_Id(Long clientId);
}