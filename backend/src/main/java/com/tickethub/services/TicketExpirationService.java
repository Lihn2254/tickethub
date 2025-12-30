package com.tickethub.services;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.tickethub.repositories.TicketRepository;

@Service
public class TicketExpirationService {
    @Autowired
    private TicketRepository ticketRepository;

    // Runs every hour on the hour (e.g., 1:00, 2:00, 3:00)
    // format: sec min hour day month day-of-week
    @Scheduled(cron = "0 0 * * * *") 
    public void checkExpiredTickets() {
        System.out.println("Running scheduled ticket expiration check...");
        
        // Expire when an event started more than 6 hours ago
        OffsetDateTime cutoffTime = OffsetDateTime.now().minus(6, ChronoUnit.HOURS);

        int updatedCount = ticketRepository.expireOldTickets(cutoffTime);
        
        System.out.println("Expired " + updatedCount + " tickets.");
    }
}