package com.tickethub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tickethub.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{
    
}
